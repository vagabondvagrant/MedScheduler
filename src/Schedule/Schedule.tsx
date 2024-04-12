import React, { useState } from 'react';

const DoctorSchedule = () => {
  const [filter, setFilter] = useState('');
  const doctorSchedule = [
    {
      name: 'Dr. Mahnoor Saleem',
      days: ['Monday', 'Tuesday', 'Thursday'],
      times: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM']
    },
    {
      name: 'Dr. Jane Smith',
      days: ['Wednesday', 'Friday'],
      times: ['10:00 AM - 1:00 PM', '3:00 PM - 6:00 PM']
    },
    {
      name: 'Dr. Patrick Bateman',
      days: ['Monday', 'Wednesday', 'Friday'],
      times: ['8:00 AM - 11:00 AM', '1:00 PM - 4:00 PM']
    }
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredSchedule = doctorSchedule.filter(doctor =>
    doctor.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Doctor Availability Schedule</h2>
      <div className="mb-4">
        <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Doctor Name:</label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
          placeholder="Enter doctor name"
        />
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-brown-200">
            <th className="border border-gray-300 py-2 px-4">Doctor Name</th>
            <th className="border border-gray-300 py-2 px-4">Day</th>
            <th className="border border-gray-300 py-2 px-4">Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredSchedule.map((doctor, index) => (
            <React.Fragment key={index}>
              {doctor.days.map((day, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-100' : ''}>
                  {i === 0 && <td rowSpan={doctor.days.length} className="border border-gray-300 py-2 px-4 text-gray-800">{doctor.name}</td>}
                  <td className="border border-gray-300 py-2 px-4 text-gray-800">{day}</td>
                  <td className="border border-gray-300 py-2 px-4 text-gray-800">{doctor.times[i]}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorSchedule;
