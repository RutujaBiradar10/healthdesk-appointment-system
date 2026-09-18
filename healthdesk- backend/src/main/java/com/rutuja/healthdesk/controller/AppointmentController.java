package com.rutuja.healthdesk.controller;

import com.rutuja.healthdesk.model.Appointment;
import com.rutuja.healthdesk.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        return appointmentService.getAppointmentsByDoctor(doctorId);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatient(@PathVariable Long patientId) {
        return appointmentService.getAppointmentsByPatient(patientId);
    }

    @PostMapping("/book")
    public Appointment bookAppointment(
            @RequestParam Long doctorId,
            @RequestParam Long patientId,
            @RequestParam String date,
            @RequestParam String time) {

        LocalDate appointmentDate = LocalDate.parse(date);
        LocalTime timeSlot = LocalTime.parse(time);

        return appointmentService.bookAppointment(doctorId, patientId, appointmentDate, timeSlot);
    }

    @PutMapping("/cancel/{appointmentId}")
    public Appointment cancelAppointment(@PathVariable Long appointmentId) {
        return appointmentService.cancelAppointment(appointmentId);
    }
}