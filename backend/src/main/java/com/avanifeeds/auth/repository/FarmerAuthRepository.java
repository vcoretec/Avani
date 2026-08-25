package com.avanifeeds.auth.repository;

import com.avanifeeds.auth.entity.FarmerAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FarmerAuthRepository extends JpaRepository<FarmerAuth, Long> {
    Optional<FarmerAuth> findByMobileNumber(String mobileNumber);
}
