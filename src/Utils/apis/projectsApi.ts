import {
  addDoc,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  serverTimestamp,
  WithFieldValue,
  DocumentReference,
  getDoc,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";

import baseApi from "./baseApi";
import { ProjectType, ProjectClass } from "../../Types/types";
import { db } from "../firebaseConfig";

const projectConverter = {
  toFirestore: (
    project: WithFieldValue<Partial<ProjectType>>
  ): DocumentData => {
    return {
      projectName: project.projectName,
      description: project.description,
      managerID: project.managerID,
      createdAt: serverTimestamp(),
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new ProjectClass(
      data.id,
      data.projectName,
      data.description,
      data.managerID,
      new Date(data.createdAt.seconds).toUTCString(),
      data.users,
      data.tickets
    );
  },
};

type ProjectResponse = ProjectType[];

export const firestoreApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation<ProjectClass, Partial<ProjectType>>({
      queryFn: async (arg) => {
        try {
          //here is where the magic happens
          const ref = collection(db, "projects").withConverter(
            projectConverter
          );
          const docRef = await addDoc(ref, arg);
          const docSnap = await getDoc(docRef.withConverter(projectConverter));
          return {
            data: { ...docSnap.data() } as ProjectClass,
          };
        } catch (e) {
          console.log(e);
          return { error: "could not create project" };
        }
      },
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    getProjects: build.query<ProjectResponse, string>({
      queryFn: async (arg) => {
        try {
          const projects: ProjectResponse = [];

          const q = query(
            collection(db, "projects"),
            where("managerID", "==", arg)
          ).withConverter(projectConverter);
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            projects.push({
              ...doc.data({ serverTimestamps: "estimate" }),
              id: doc.id,
            });
          });
          return {
            data: projects,
          };
        } catch (e) {
          console.log(e);
          return { error: "cound not get projects" };
        }
      },
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Project", id } as const)),
              { type: "Project", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Project', id: 'LIST' }` is invalidated
            [{ type: "Project", id: "LIST" }],
    }),
    getProject: build.query<ProjectType, string>({
      queryFn: async (arg) => {
        try {
          const docRef = doc(db, "projects", arg).withConverter(
            projectConverter
          );
          const docSnap = await getDoc(docRef);
          const project = { id: docSnap.id, ...docSnap.data() } as ProjectType;
          return {
            data: project,
          };
        } catch (e) {
          console.log(e);
          return { error: "cound not get project" };
        }
      },
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
} = firestoreApi;
