import { useState, useEffect } from 'react';
import { getDoctors, addPatient, bookAppointment } from '../services/api';

function BookingForm() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    getDoctors().then((res) => setDoctors(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Step 1: create the patient
      const patientRes = await addPatient({ name, email, phone, age: Number(age) });
      const patientId = patientRes.data.id;

      // Step 2: book the appointment
      await bookAppointment(selectedDoctor, patientId, date, time);

      setMessage('Appointment booked successfully!');
      setMessageType('success');

      // reset form
      setName('');
      setEmail('');
      setPhone('');
      setAge('');
      setDate('');
      setTime('');
      setSelectedDoctor('');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'This slot may already be booked. Try a different time.';
      setMessage(errorMsg);
      setMessageType('error');
    }
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px', maxWidth: '400px' }}>

        <label>
          Doctor:
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>
        </label>

        <label>
          Your Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>

        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </label>

        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>

        <label>
          Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </label>

        <button type="submit">Book Appointment</button>
      </form>

      {message && (
        <p style={{ color: messageType === 'success' ? 'green' : 'red', marginTop: '12px' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default BookingForm;