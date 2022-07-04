import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { User, UserCredential } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    //              ResultType  QueryArg
    //                    v       v
    loginUser: build.mutation<string, { email: string; password: string }>({
      // inferred as `string` from the `QueryArg` type
      //         v
      queryFn: async (arg, queryApi, extraOptions) => {
        try {
          const result: UserCredential = await signInWithEmailAndPassword(
            auth,
            arg.email,
            arg.password
          );
          return { data: result.user.uid };
        } catch (e) {
          return { error: "could not log in" };
        }
      },
    }),
  }),
});

export const { useLoginUserMutation } = api;
