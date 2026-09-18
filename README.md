# HealthDesk — Doctor Appointment Booking System

A full-stack web application for booking doctor appointments, built with Spring Boot and React. Includes real business logic to prevent double-booking the same doctor at the same time slot.

## Features

- Browse doctors with specialization, available days and slots
- Book an appointment by selecting a doctor, date and time
- Automatic slot-conflict validation — prevents overlapping bookings for the same doctor
- View appointments by patient ID and cancel a booking
- View all appointments across all patients with a live booked-count

## Tech Stack

**Backend:** Java, Spring Boot, Spring Data JPA (Hibernate), MySQL, Maven  
**Frontend:** React.js (Vite), Axios  
**Tools:** Postman, MySQL Workbench, Git

## Architecture

Layered backend structure: Controller → Service → Repository → Database

- `Doctor`, `Patient`, `Appointment` entities
- `Appointment` holds `@ManyToOne` relationships to both `Doctor` and `Patient`
- Booking logic checks for existing "BOOKED" appointments on the same doctor, date and time before allowing a new booking
- Cancelling an appointment updates its status to `CANCELLED` instead of deleting it, preserving history

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | List all doctors |
| POST | `/api/doctors` | Add a doctor |
| GET | `/api/patients` | List all patients |
| POST | `/api/patients` | Add a patient |
| GET | `/api/appointments` | List all appointments |
| GET | `/api/appointments/patient/{id}` | Get appointments for a patient |
| POST | `/api/appointments/book` | Book an appointment |
| PUT | `/api/appointments/cancel/{id}` | Cancel an appointment |

## Running Locally

### Backend
1. Create a MySQL database named `healthdesk_db`
2. Update `application.properties` with your MySQL username/password
3. Run `HealthdeskApplication.java` — starts on `http://localhost:9090`

### Frontend
cd healthdesk-frontend
npm install
npm run dev


Runs on `http://localhost:5173`

## Author
Rutuja Biradar
