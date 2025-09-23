import { CLIENT_URL } from "@/lib/access-env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tabTypes";

const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: CLIENT_URL,
    }),
    endpoints: () => ({}),
    tagTypes: tagTypesList
})

export default baseApi