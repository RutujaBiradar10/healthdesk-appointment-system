package com.rutuja.healthdesk.service;

import com.rutuja.healthdesk.model.Appointment;
import com.rutuja.healthdesk.model.Doctor;
import com.rutuja.healthdesk.model.Patient;
import com.rutuja.healthdesk.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepository.findAll().stream()
                .filter(a -> a.getDoctor().getId().equals(doctorId))
                .toList();
    }

    public List<Appointment> getAppointmentsByPatient(Long patientId) {
        return appointmentRepository.findAll().stream()
                .filter(a -> a.getPatient().getId().equals(patientId))
                .toList();
    }

    public Appointment bookAppointment(Long doctorId, Long patientId, LocalDate date, LocalTime time) {
        Doctor doctor = doctorService.getDoctorById(doctorId);
        Patient patient = patientService.getPatientById(patientId);

        boolean slotTaken = appointmentRepository.findAll().stream()
                .anyMatch(a -> a.getDoctor().getId().equals(doctorId)
                        && a.getAppointmentDate().equals(date)
                        && a.getTimeSlot().equals(time)
                        && a.getStatus().equals("BOOKED"));

        if (slotTaken) {
            throw new RuntimeException("This slot is already booked for the selected doctor.");
        }

        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentDate(date);
        appointment.setTimeSlot(time);
        appointment.setStatus("BOOKED");

        return appointmentRepository.save(appointment);
    }

    public Appointment cancelAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + appointmentId));
        appointment.setStatus("CANCELLED");
        return appointmentRepository.save(appointment);
    }
}