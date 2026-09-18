package com.rutuja.healthdesk.repository;

import com.rutuja.healthdesk.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}