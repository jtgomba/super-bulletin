import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { ProjectType, ProjectClass } from "../../Types/types";
import { db } from "../firebaseConfig";

const projectConverter = {
  toFirestore: (project: ProjectType): DocumentData => {
    return {
      projectName: project.projectName,
      description: project.description,
      manager: project.manager,
      users: project.users,
      createdAt: serverTimestamp(),
      tickets: project.tickets,
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
      data.manager,
      data.users,
      data.createdAt,
      data.tickets
    );
  },
};

export const api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    createProject: build.mutation<ProjectType, ProjectType>({
      queryFn: async (arg) => {
        try {
          //here is where the magic happens
          const ref = collection(db, "projects").withConverter(
            projectConverter
          );
          await addDoc(ref, arg);
          return {
            data: {} as ProjectType,
          };
        } catch (e) {
          return { error: "could not create project" };
        }
      },
    }),
  }),
});

export const { useCreateProjectMutation } = api;
