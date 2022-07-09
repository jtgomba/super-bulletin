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

const ticketConverter = {
  toFirestore: (ticket: WithFieldValue<Partial<TicketType>>): DocumentData => {
    return {
      title: ticket.title,
      status: ticket.status,
      projectID: ticket.projectID,
      submittedByID: ticket.submittedByID,
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
      data.submittedByID,
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
    createTicket: build.mutation<TicketClass, Partial<TicketType>>({
      queryFn: async (arg) => {
        try {
          const ref = collection(db, "tickets").withConverter(ticketConverter);
          const docRef = await addDoc(ref, arg);
          const docSnap = await getDoc(docRef.withConverter(ticketConverter));
          return {
            data: { ...docSnap.data() } as TicketClass,
          };
        } catch (e) {
          console.log(e);
          return { error: "could not create ticket" };
        }
      },
      invalidatesTags: [{ type: "Ticket", id: "LIST" }],
    }),
    getTickets: build.query<
      TicketResponse,
      { fieldToSearchBy: string; searchCriteria: string }
    >({
      queryFn: async ({ fieldToSearchBy, searchCriteria }) => {
        try {
          const tickets: TicketResponse = [];

          const q = query(
            collection(db, "tickets"),
            where(`${fieldToSearchBy}`, "==", `${searchCriteria}`)
          ).withConverter(ticketConverter);
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            tickets.push({
              ...doc.data({ serverTimestamps: "estimate" }),
              id: doc.id,
            });
          });
          return {
            data: tickets,
          };
        } catch (e) {
          console.log(e);
          return { error: "cound not get tickets" };
        }
      },
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Ticket", id } as const)),
              { type: "Ticket", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Ticket", id: "LIST" }],
    }),
    getTicket: build.query<TicketType, string>({
      queryFn: async (arg) => {
        try {
          const docRef = doc(db, "tickets", arg).withConverter(ticketConverter);
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
      providesTags: (result, error, id) => [{ type: "Ticket", id }],
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetTicketsQuery,
  useGetTicketQuery,
} = firestoreApi;
