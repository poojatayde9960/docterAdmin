import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../AdminLayout'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from '../Protected/PrivateRoute'
import PublicRoute from '../Protected/PublicRoute'
import Appointments from '../pages/Appointments'
import MyPatient from '../pages/patients/MyPatients'
import PatientDetails from '../pages/patients/PatientDetails'
import Prescriptions from '../pages/prescriptions/Prescriptions'
import AllDoctors from '../pages/doctors/AllDoctors'
import DoctorDetails from '../pages/doctors/DoctorDetails'
import WeeklySchedule from '../pages/schedule/WeeklySchedule'
import Invoice from '../pages/Invoice'
import Receptionists from '../pages/Receptionists'
import Plans from '../pages/Plans'
import Transactions from '../pages/Transactions'
import InvoiceReceipt from '../pages/invoiceReceipt'
import PrescriptionModal from '../pages/Invoicemodal/PrescriptionModal'

const AppRoutes = () => {

    return (

        <Routes>
            {/* Public */}
            <Route path="/login" element={<PublicRoute />} />

            {/* Protected */}
            <Route element={<PrivateRoute />}>
                <Route element={<AdminLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="myPatient" element={<MyPatient />} />
                    <Route path="patientDetails/:patientId" element={<PatientDetails />} />

                    <Route path="prescriptions" element={<Prescriptions />} />
                    <Route path="alldoctors" element={<AllDoctors />} />
                    <Route path="doctordetails/:id" element={<DoctorDetails />} />

                    <Route path="schedule" element={<WeeklySchedule />} />
                    <Route path="invoice" element={<Invoice />} />
                    <Route path="prescriptionModal" element={<PrescriptionModal />} />
                    <Route path="invoiceReceipt" element={<InvoiceReceipt />} />
                    <Route path="receptionist" element={<Receptionists />} />
                    <Route path="plans" element={<Plans />} />
                    <Route path="transactions" element={<Transactions />} />
                </Route>
            </Route>
        </Routes>


    )
}

export default AppRoutes