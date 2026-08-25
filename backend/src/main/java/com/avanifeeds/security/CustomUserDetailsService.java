package com.avanifeeds.security;

import com.avanifeeds.user.entity.User;
import com.avanifeeds.user.repository.UserRepository;
import com.avanifeeds.auth.entity.FarmerAuth;
import com.avanifeeds.auth.entity.DriverAuth;
import com.avanifeeds.auth.repository.FarmerAuthRepository;
import com.avanifeeds.auth.repository.DriverAuthRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Custom UserDetailsService loading users from MySQL with their roles and permissions.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final FarmerAuthRepository farmerAuthRepository;
    private final DriverAuthRepository driverAuthRepository;

    public CustomUserDetailsService(UserRepository userRepository,
                                    FarmerAuthRepository farmerAuthRepository,
                                    DriverAuthRepository driverAuthRepository) {
        this.userRepository = userRepository;
        this.farmerAuthRepository = farmerAuthRepository;
        this.driverAuthRepository = driverAuthRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.startsWith("farmer:")) {
            String mobile = username.substring(7);
            FarmerAuth farmer = farmerAuthRepository.findByMobileNumber(mobile)
                    .orElseThrow(() -> new UsernameNotFoundException("Farmer not found: " + mobile));
            return new org.springframework.security.core.userdetails.User(
                    username, farmer.getPassword(), true, true, true, true,
                    List.of(new SimpleGrantedAuthority("ROLE_FARMER"))
            );
        } else if (username.startsWith("driver:")) {
            String vehicle = username.substring(7);
            DriverAuth driver = driverAuthRepository.findByVehicleNumber(vehicle)
                    .orElseThrow(() -> new UsernameNotFoundException("Driver not found: " + vehicle));
            return new org.springframework.security.core.userdetails.User(
                    username, driver.getPassword(), true, true, true, true,
                    List.of(new SimpleGrantedAuthority("ROLE_DRIVER"))
            );
        }

        User user = userRepository.findByUsernameAndIsActiveTrue(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        // Add role authorities
        if (user.getRole() != null) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().getName().toUpperCase()));

            // Add permission authorities
            if (user.getRole().getPermissions() != null) {
                user.getRole().getPermissions().forEach(permission ->
                        authorities.add(new SimpleGrantedAuthority(permission.getCode()))
                );
            }
        }

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getIsActive(),
                true, true, true,
                authorities
        );
    }
}
