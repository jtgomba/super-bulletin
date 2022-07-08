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
import { TicketType, TicketClass } from "../../Types/types";
import { db } from "../firebaseConfig";

const projectConverter = {
  toFirestore: (ticket: WithFieldValue<Partial<TicketType>>): DocumentData => {
    return {
      title: ticket.title,
      createdAt: serverTimestamp(),
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new TicketClass(
      data.id,
      data.title,
      data.description,
      data.priority,
      data.status,
      data.type,
      new Date(data.createdAt.seconds).toUTCString(),
      data.projectID,
      data.submittedBy,
      data.assignedTo,
      data.updatedAt,
      data.comments,
      data.history
    );
  },
};

type TicketResponse = TicketType[];

export const firestoreApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTicket: build.mutation<
      DocumentReference<Partial<TicketType>>,
      Partial<TicketType>
    >({
      queryFn: async (arg) => {
        try {
          const ref = collection(db, "tickets").withConverter(projectConverter);
          const docRef = await addDoc(ref, arg);
          const docSnap = await getDoc(docRef.withConverter(projectConverter));
          if (docSnap.exists()) {
            // Convert to ticket object
            const project = docSnap.data();
            // print the raw data
            console.log(project);
          }
          return {
            data: { ...docRef } as DocumentReference<Partial<TicketType>>,
          };
        } catch (e) {
          console.log(e);
          return { error: "could not create ticket" };
        }
      },
    }),
    getTickets: build.query<
      TicketResponse,
      { fieldToSearchBy: string; searchCriteria: string }
    >({
      queryFn: async ({ fieldToSearchBy, searchCriteria }) => {
        try {
          const projects: TicketResponse = [];

          const q = query(
            collection(db, "tickets"),
            where(`${fieldToSearchBy}`, "==", `${searchCriteria}`)
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
          return { error: "cound not get tickets" };
        }
      },
    }),
    getTicket: build.query<TicketType, string>({
      queryFn: async (arg) => {
        try {
          const docRef = doc(db, "tickets", arg).withConverter(
            projectConverter
          );
          const docSnap = await getDoc(docRef);
          const project = { id: docSnap.id, ...docSnap.data() } as TicketType;
          return {
            data: project,
          };
        } catch (e) {
          console.log(e);
          return { error: "cound not get project" };
        }
      },
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetTicketsQuery,
  useGetTicketQuery,
} = firestoreApi;
