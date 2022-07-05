import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { UserCredential } from "firebase/auth";
import { AuthInterface } from "../../Types/types";
import { auth } from "../firebaseConfig";

interface UserInterface {
  displayName: string;
  email: string;
  uid: string;
}

export const api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    loginUser: build.mutation<
      UserInterface,
      { email: string; password: string }
    >({
      queryFn: async (arg) => {
        try {
          const result: UserCredential = await signInWithEmailAndPassword(
            auth,
            arg.email,
            arg.password
          );
          return {
            data: {
              displayName: result.user.displayName,
              email: result.user.email,
              uid: result.user.uid,
            } as AuthInterface,
          };
        } catch (e) {
          return { error: "could not log in" };
        }
      },
      async onCacheEntryAdded(_arg, { cacheDataLoaded }) {
        await cacheDataLoaded;
        await auth.setPersistence(browserSessionPersistence);
      },
    }),
  }),
});

export const { useLoginUserMutation } = api;
