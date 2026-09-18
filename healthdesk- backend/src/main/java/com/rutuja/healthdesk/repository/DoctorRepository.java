package com.rutuja.healthdesk.repository;

import com.rutuja.healthdesk.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}