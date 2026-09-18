import { useState, useEffect } from 'react';
import { getAppointmentsByPatient, cancelAppointment, getAllAppointments } from '../services/api';

function AppointmentList() {
  const [patientId, setPatientId] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState('');

  const [allAppointments, setAllAppointments] = useState([]);

  useEffect(() => {
    loadAllAppointments();
  }, []);

  const loadAllAppointments = () => {
    getAllAppointments().then((res) => setAllAppointments(res.data));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await getAppointmentsByPatient(patientId);
      setAppointments(res.data);
      setSearched(true);
      setMessage('');
    } catch (err) {
      setMessage('Could not find appointments for this patient ID.');
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      const res = await getAppointmentsByPatient(patientId);
      setAppointments(res.data);
      loadAllAppointments();
    } catch (err) {
      setMessage('Failed to cancel appointment.');
    }
  };

  const bookedCount = allAppointments.filter((a) => a.status === 'BOOKED').length;

  return (
    <div>
      <h2>My Appointments</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: '16px' }}>
        <label>
          Enter your Patient ID:
          <input
            type="number"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
            style={{ marginLeft: '8px' }}
          />
        </label>
        <button type="submit" style={{ marginLeft: '8px' }}>Search</button>
      </form>

      {message && <p style={{ color: 'red' }}>{message}</p>}
      {searched && appointments.length === 0 && <p>No appointments found.</p>}

      {appointments.map((appt) => (
        <div key={appt.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '12px', marginBottom: '10px' }}>
          <p><strong>Doctor:</strong> {appt.doctor.name} ({appt.doctor.specialization})</p>
          <p><strong>Date:</strong> {appt.appointmentDate}</p>
          <p><strong>Time:</strong> {appt.timeSlot}</p>
          <p><strong>Status:</strong> {appt.status}</p>
          {appt.status === 'BOOKED' && (
            <button onClick={() => handleCancel(appt.id)}>Cancel Appointment</button>
          )}
        </div>
      ))}

      <hr style={{ margin: '32px 0' }} />

      <h2>All Appointments ({bookedCount} currently booked)</h2>
      {allAppointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        allAppointments.map((appt) => (
          <div key={appt.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '8px' }}>
            <p><strong>Patient:</strong> {appt.patient.name} (ID: {appt.patient.id})</p>
            <p><strong>Doctor:</strong> {appt.doctor.name}</p>
            <p><strong>Date/Time:</strong> {appt.appointmentDate} at {appt.timeSlot}</p>
            <p><strong>Status:</strong> {appt.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AppointmentList;