import React, { useState } from 'react';

interface Appointment {
  date: string;
  time: string;
  doctorId: string;
}

const doctors = [
  { id: "1", name: "Dr. Mahnoor Saleem", specialty: "Cardiologist", availability: ["Monday", "Wednesday", "Friday"] },
  { id: "2", name: "Dr. Michael Johnson", specialty: "Pediatrician", availability: ["Tuesday", "Thursday", "Saturday"] },
  { id: "3", name: "Dr. Sarah Patel", specialty: "Dermatologist", availability: ["Monday", "Wednesday", "Friday"] },
];

const AppointmentBooking: React.FC = () => {
  const [appointment, setAppointment] = useState<Appointment>({
    date: '',
    time: '',
    doctorId: '',
  });
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAppointment(prevAppointment => ({
      ...prevAppointment,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Appointment submitted:", appointment);
    setAppointment({
      date: '',
      time: '',
      doctorId: '',
    });
    setModalVisible(true);
  };

  const availableSlots = (selectedDate: string, selectedDoctorId: string): string[] => {
    return ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"];
  };

  const doctorInfo = (doctorId: string) => {
    const doctor = doctors.find(doc => doc.id === doctorId);
    return doctor ? `${doctor.name}, ${doctor.specialty}` : '';
  };

  const openModal = (doctorId: string) => {
    const doctor = doctors.find(doc => doc.id === doctorId);
    setSelectedDoctor(doctor);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setModalVisible(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="max-w-md mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Book an Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-900 mb-1">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={appointment.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]} // Ensure future dates only
              className="w-full px-3 py-2 rounded-md bg-gray-200 text-gray-900 focus:outline-none focus:bg-white focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-900 mb-1">Time:</label>
            <select
              id="time"
              name="time"
              value={appointment.time}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md bg-gray-200 text-gray-900 focus:outline-none focus:bg-white focus:border-blue-400"
              required
            >
              <option value="">Select a time</option>
              {availableSlots(appointment.date, appointment.doctorId).map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-900 mb-1">Select Doctor:</label>
            <select
              id="doctor"
              name="doctorId"
              value={appointment.doctorId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md bg-gray-200 text-gray-900 focus:outline-none focus:bg-white focus:border-blue-400"
              required
            >
              <option value="">Select a doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}, {doctor.specialty}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
            Book Appointment
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-700">Note: This is a placeholder component to demonstrate key features. Actual functionality and design may vary.</p>
      </div>
      {modalVisible && selectedDoctor && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">{selectedDoctor.name}</h2>
            <p className="text-sm mb-4">Specialty: {selectedDoctor.specialty}</p>
            <p className="text-sm mb-4">Availability: {selectedDoctor.availability.join(', ')}</p>
            <button onClick={closeModal} className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
