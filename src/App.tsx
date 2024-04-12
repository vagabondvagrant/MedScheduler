import { useState } from 'react';
import AppointmentBooking from "./Appointment/Appointment";
import Navbar from "./Components/Navbar";
import PatientForm from "./Patients/PatientForm";
import DoctorSchedule from './Schedule/Schedule';

function App() {
  const [isPatientFormFilled, setIsPatientFormFilled] = useState(false);

  const handlePatientFormSubmit = () => {
    setIsPatientFormFilled(true);
  };

  return (
    <>
      <div className="">
        <Navbar />
        {!isPatientFormFilled && <PatientForm onFormSubmit={handlePatientFormSubmit} />}
        {isPatientFormFilled && <AppointmentBooking />}
        <DoctorSchedule/>
      </div>
    </>
  );
}

export default App;
