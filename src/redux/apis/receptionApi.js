import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const receptionApi = createApi({
    reducerPath: "receptionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin`,
        credentials: "include"
    }),
    tagTypes: ["auth", "doctors"],
    endpoints: (builder) => {
        return {
            getReception: builder.query({
                query: () => {
                    return {
                        url: "/get-reception",
                        method: "GET"
                    }
                },
                providesTags: ["auth"]
            }),
            getTransaction: builder.query({
                query: () => {
                    return {
                        url: "/get-transaction",
                        method: "GET"
                    }
                },
                providesTags: ["auth"]
            }),
            addReception: builder.mutation({
                query: userData => {
                    return {
                        url: "/add-reception",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            addDoctor: builder.mutation({
                query: userData => {
                    return {
                        url: "/add-doctor",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth", "doctors"]
            }),
            addPlan: builder.mutation({
                query: userData => {
                    return {
                        url: "/add-plan",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            getPlans: builder.query({
                query: () => {
                    return {
                        url: "/get-plans",
                        method: "GET"
                    }
                },
                providesTags: ["auth"]
            }),


        }
    }
})

export const { useAddPlanMutation, useAddReceptionMutation, useGetTransactionQuery, useGetReceptionQuery, useAddDoctorMutation, useGetPlansQuery, useAddUserMutation } = receptionApi
