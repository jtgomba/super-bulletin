import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
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
      data.manager,
      new Date(data.createdAt[0]).toUTCString(),
      data.users,
      data.tickets
    );
  },
};

type ProjectResponse = ProjectType[];

export const firestoreApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation<
      DocumentReference<Partial<ProjectType>>,
      Partial<ProjectType>
    >({
      queryFn: async (arg) => {
        try {
          //here is where the magic happens
          const ref = collection(db, "projects").withConverter(
            projectConverter
          );
          const docRef = await addDoc(ref, arg);
          const docSnap = await getDoc(docRef.withConverter(projectConverter));
          if (docSnap.exists()) {
            // Convert to project object
            const project = docSnap.data();
            // print the raw data
            console.log(project);
          }
          return {
            data: { ...docRef } as DocumentReference<Partial<ProjectType>>,
          };
        } catch (e) {
          console.log(e);
          return { error: "could not create project" };
        }
      },
    }),
    getProjects: build.query<ProjectResponse, string>({
      queryFn: async (arg) => {
        try {
          const projects: ProjectResponse = [];

          const q = query(
            collection(db, "projects"),
            where("manager", "==", arg)
          ).withConverter(projectConverter);
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            projects.push({ ...doc.data() });
          });
          return {
            data: projects,
          };
        } catch (e) {
          console.log(e);
          return { error: "cound not get projects" };
        }
      },
    }),
  }),
});

export const { useCreateProjectMutation, useGetProjectsQuery } = firestoreApi;
