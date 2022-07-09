// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
const baseApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Ticket"],
  endpoints: () => ({}),
});

export default baseApi;
