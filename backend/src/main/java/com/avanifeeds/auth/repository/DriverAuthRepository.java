package com.avanifeeds.auth.repository;

import com.avanifeeds.auth.entity.DriverAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DriverAuthRepository extends JpaRepository<DriverAuth, Long> {
    Optional<DriverAuth> findByVehicleNumber(String vehicleNumber);
}
