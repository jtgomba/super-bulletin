import {
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

import baseApi from "./baseApi";
import { UserCredential } from "firebase/auth";
import { AuthInterface } from "../../Types/types";
import { auth } from "../firebaseConfig";

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
  }),
});

export const { useLoginUserMutation } = authApi;
