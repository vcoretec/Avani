package com.avanifeeds;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AvaniApplication {

    public static void main(String[] args) {
        SpringApplication.run(AvaniApplication.class, args);
    }

    @org.springframework.context.annotation.Bean
    public org.springframework.boot.CommandLineRunner updatePassword(
            com.avanifeeds.user.repository.UserRepository userRepository,
            org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        return args -> {
            com.avanifeeds.user.entity.User admin = userRepository.findByUsernameAndIsActiveTrue("admin").orElse(null);
            if (admin != null) {
                admin.setPassword(passwordEncoder.encode("Admin@123"));
                userRepository.save(admin);
            }
        };
    }
}
