import { useState, useEffect } from 'react';
import { getDoctors } from '../services/api';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDoctors()
      .then((response) => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load doctors. Is the backend running?');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const selectedDoctor = doctors.find((d) => d.id === Number(selectedId));

  return (
    <div>
      <h2>Our Doctors</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
      >
        <option value="">-- Select a doctor to view details --</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name} ({doctor.specialization})
          </option>
        ))}
      </select>

      {selectedDoctor && (
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px'
          }}
        >
          <h3>{selectedDoctor.name}</h3>
          <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
          <p><strong>Available Days:</strong> {selectedDoctor.availableDays}</p>
          <p><strong>Available Slots:</strong> {selectedDoctor.availableSlots}</p>
        </div>
      )}
    </div>
  );
}

export default DoctorList;