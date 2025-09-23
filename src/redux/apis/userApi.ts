import baseApi from "./baseApi";

const auth = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSingleUserById: build.query({
            query: () => ({
                url:"",
                method:"GET",
            })
        })
    })
})


export const {useGetSingleUserByIdQuery} = auth;