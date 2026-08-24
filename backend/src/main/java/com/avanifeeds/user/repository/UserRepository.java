package com.avanifeeds.user.repository;

import com.avanifeeds.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsernameAndIsActiveTrue(String username);

    Optional<User> findByEmailAndIsActiveTrue(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
