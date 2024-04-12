import React, { useState } from 'react';

interface PatientFormData {
  id: number;
  name: string;
  age: number;
  gender: string;
  symptoms: string[];
  customSymptom: string;
}

interface PatientFormProps {
  onFormSubmit: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState<PatientFormData>({
    id: 1,
    name: '',
    age: 0,
    gender: '',
    symptoms: [],
    customSymptom: '',
  });

  const [patients, setPatients] = useState<PatientFormData[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSymptomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      symptoms: [...prevFormData.symptoms, value]
    }));
  };

  const handleCustomSymptomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      customSymptom: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.gender || formData.symptoms.length === 0) {
      return;
    }
    if (editMode) {
      const updatedPatients = patients.map(patient =>
        patient.id === formData.id ? formData : patient
      );
      setPatients(updatedPatients);
      setEditMode(false);
    } else {
      const newPatient: PatientFormData = { ...formData, id: formData.id + 1 };
      setPatients(prevPatients => [...prevPatients, newPatient]);
    }
    clearForm();
    onFormSubmit();
  };

  const handleEdit = (id: number) => {
    const patientToEdit = patients.find(patient => patient.id === id);
    if (patientToEdit) {
      setFormData(patientToEdit);
      setEditMode(true);
    }
  };

  const handleDelete = (id: number) => {
    setPatients(prevPatients => prevPatients.filter(patient => patient.id !== id));
  };

  const clearForm = () => {
    setFormData({
      id: editMode ? formData.id : formData.id + 1,
      name: '',
      age: 0,
      gender: '',
      symptoms: [],
      customSymptom: '',
    });
    setEditMode(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <p className='text-gray-900 font-bold'>Warning: You can't move ahead without filling this form⚠️</p>
      <h2 className="text-lg font-semibold mb-4">{editMode ? 'Edit Patient Details' : 'New Patient Form'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms:</label>
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="Fever"
                checked={formData.symptoms.includes("Fever")}
                onChange={handleSymptomsChange}
                className="form-checkbox text-blue-500 focus:ring-blue-400"
              />
              <span className="ml-2">Fever</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="Cough"
                checked={formData.symptoms.includes("Cough")}
                onChange={handleSymptomsChange}
                className="form-checkbox text-blue-500 focus:ring-blue-400"
              />
              <span className="ml-2">Cough</span>
            </label>
            <input
              type="text"
              value={formData.customSymptom}
              onChange={handleCustomSymptomChange}
              placeholder="Other symptom"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white rounded-xl px-2 py-2 mr-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
            {editMode ? 'Update' : 'Submit'}
          </button>
          <button type="button" onClick={clearForm} className="bg-gray-300 text-gray-700 rounded-xl px-2 py-2 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400">
            Clear
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Patient List</h3>
        <ul>
          {patients.map(patient => (
            <li key={patient.id} className="mb-2">
              <div>
                <span className="font-semibold">{patient.name}</span> - Age: {patient.age}, Gender: {patient.gender}
              </div>
              <div className="mt-1">
                <span className="font-semibold">Symptoms:</span> {patient.symptoms.join(', ')}
              </div>
              <div className="mt-1">
                <button onClick={() => handleEdit(patient.id)} className="text-white hover:underline mr-2 px-2 py-1 rounded-lg bg-gray-900 hover:opacity-80">Edit</button>
                <button onClick={() => handleDelete(patient.id)} className="text-red-500 hover:underline px-2 py-1 rounded-lg bg-gray-900 hover:opacity-80">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientForm;
