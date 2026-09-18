package com.rutuja.healthdesk.repository;

import com.rutuja.healthdesk.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}