import DoctorList from './components/DoctorList';
import BookingForm from './components/BookingForm';
import AppointmentList from './components/AppointmentList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>HealthDesk</h1>
      <DoctorList />
      <hr style={{ margin: '32px 0' }} />
      <BookingForm />
      <hr style={{ margin: '32px 0' }} />
      <AppointmentList />
    </div>
  );
}

export default App;