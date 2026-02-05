import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const patientsApi = createApi({
    reducerPath: "patientsApi",
    baseQuery: fetchBaseQuery({
        // api/v1/doctor/change-status
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin`,

        credentials: "include"
    }),
    tagTypes: ["patients", "doctors"],
    endpoints: (builder) => {
        return {
            myPatients: builder.query({
                query: () => ({
                    url: "/get-patients",
                    method: "GET"
                }),
                providesTags: ["patients"]
            }),
            getPatientByID: builder.query({
                query: (patientId) => ({
                    url: `/get-patient/${patientId}`,
                    method: "GET",
                }),
                providesTags: ["patients"]
            }),

            getInvoice: builder.query({
                query: () => ({
                    url: "/get-invoice",
                    method: "GET"
                }),
                providesTags: ["patients"]
            }),

            getVisits: builder.query({
                query: (doctorId) => {
                    return {
                        url: `/get-visits/${doctorId}`,
                        method: "GET"
                    }
                },
                providesTags: ["patients"]
            }),
            getAppointments: builder.query({
                query: (doctorId) => {
                    return {
                        url: `/get-appoinments/${doctorId}`,
                        method: "GET"
                    }
                },
                providesTags: ["patients"]
            }),
            getDoctors: builder.query({
                query: (doctorId) => {
                    return {
                        url: "/get-doctors",
                        method: "GET"
                    }
                },
                providesTags: ["patients", "doctors"]
            }),
            getDash: builder.query({
                query: (doctorId) => {
                    return {
                        url: `/get-dash`,
                        method: "GET"
                    }
                },
                providesTags: ["patients"]
            }),
            changeStatus: builder.mutation({
                query: ({ appointmentId, status }) => ({
                    url: `/change-status/${appointmentId}`, // ✅ ID in URL
                    method: "POST",
                    body: { status } // ✅ only status in body
                }),
                invalidatesTags: ["patients"]
            }),

            addPrescription: builder.mutation({
                query: userData => ({
                    url: `/add-Prescription`,
                    method: "POST",
                    body: userData
                }),
                invalidatesTags: ["patients"]
            }),
            addDoctorSchedule: builder.mutation({
                query: userData => ({
                    url: `/add-doctorshedule`,
                    method: "POST",
                    body: userData
                }),
                invalidatesTags: ["patients"]
            }),
            deleteSchedule: builder.mutation({
                query: userData => ({
                    url: `/delete-schedule`,
                    method: "DELETE",
                    body: userData
                }),
                invalidatesTags: ["patients"]
            }),
            getDoctorSchedule: builder.query({
                query: (doctorId) => {
                    return {
                        url: `/get-schedule/${doctorId}`,
                        method: "GET"
                    }
                },
                providesTags: ["patients"]
            }),
            resheduleAppointment: builder.mutation({
                query: userData => ({
                    url: `/reshedule-apoinment`,
                    method: "POST",
                    body: userData
                }),
                invalidatesTags: ["patients"]
            }),
            // /api/v1/doctor/transfer-appoinment
            transferAppointment: builder.mutation({
                query: ({ appointmentId, doctorId }) => ({
                    url: `/transfer-appoinment`,
                    method: "POST",
                    body: {
                        AppoinmentId: appointmentId,
                        DoctorId: doctorId
                    }
                }),
                invalidatesTags: ["patients"]
            }),
        }
    }
})

export const { useAddDoctorScheduleMutation, useGetPatientByIDQuery, useGetInvoiceQuery, useDeleteScheduleMutation, useGetDoctorScheduleQuery, useGetDashQuery, useResheduleAppointmentMutation, useGetVisitsQuery, useTransferAppointmentMutation, useGetAppointmentsQuery, useAddPrescriptionMutation, useGetDoctorsQuery, useChangeStatusMutation, useMyPatientsQuery } = patientsApi
