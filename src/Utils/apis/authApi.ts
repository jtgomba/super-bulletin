import {
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

import baseApi from "./baseApi";
import { UserCredential } from "firebase/auth";
import { AuthInterface, UserClass, UserType } from "../../Types/types";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

const userConverter = {
  toFirestore: (user: WithFieldValue<Partial<UserType>>): DocumentData => {
    return {
      name: user.name,
      email: user.email,
      createdAt: serverTimestamp(),
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new UserClass(
      data.id,
      data.name,
      data.email,
      data.role,
      new Date(data.createdAt.seconds).toUTCString()
    );
  },
};

type UserResponse = UserType[];

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<
      AuthInterface,
      { email: string; password: string }
    >({
      queryFn: async (arg) => {
        try {
          const result: UserCredential = await signInWithEmailAndPassword(
            auth,
            arg.email,
            arg.password
          );
          await auth.setPersistence(browserSessionPersistence);
          return {
            data: {
              displayName: result.user.displayName,
              email: result.user.email,
              uid: result.user.uid,
              authenticated: "authenticated",
            } as AuthInterface,
          };
        } catch (e) {
          return { error: "could not log in" };
        }
      },
    }),
    getUsers: build.query<UserResponse, void>({
      queryFn: async () => {
        try {
          const users: UserResponse = [];

          const q = query(collection(db, "users")).withConverter(userConverter);
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            users.push({
              ...doc.data({ serverTimestamps: "estimate" }),
              id: doc.id,
            });
          });
          return {
            data: users,
          };
        } catch (e) {
          console.log(e);
          return { error: "cound not get users" };
        }
      },
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "User", id } as const)),
              { type: "User", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'User', id: 'LIST' }` is invalidated
            [{ type: "User", id: "LIST" }],
    }),
    getUser: build.query<UserType, string>({
      queryFn: async (arg) => {
        try {
          const docRef = doc(db, "users", arg).withConverter(userConverter);
          const docSnap = await getDoc(docRef);
          const project = { id: docSnap.id, ...docSnap.data() } as UserType;
          return {
            data: project,
          };
        } catch (e) {
          console.log(e);
          return { error: "cound not get user details" };
        }
      },
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const { useLoginUserMutation, useGetUserQuery, useGetUsersQuery } =
  authApi;
