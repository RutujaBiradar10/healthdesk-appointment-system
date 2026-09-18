import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090/api';
export const getAllAppointments = () => axios.get(`${API_BASE_URL}/appointments`);
export const getDoctors = () => axios.get(`${API_BASE_URL}/doctors`);
export const getDoctorById = (id) => axios.get(`${API_BASE_URL}/doctors/${id}`);

export const getPatients = () => axios.get(`${API_BASE_URL}/patients`);
export const addPatient = (patient) => axios.post(`${API_BASE_URL}/patients`, patient);

export const bookAppointment = (doctorId, patientId, date, time) =>
  axios.post(`${API_BASE_URL}/appointments/book`, null, {
    params: { doctorId, patientId, date, time }
  });

export const getAppointmentsByPatient = (patientId) =>
  axios.get(`${API_BASE_URL}/appointments/patient/${patientId}`);

export const cancelAppointment = (appointmentId) =>
  axios.put(`${API_BASE_URL}/appointments/cancel/${appointmentId}`);