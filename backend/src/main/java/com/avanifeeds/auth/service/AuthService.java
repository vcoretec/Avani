package com.avanifeeds.auth.service;

import com.avanifeeds.auth.dto.LoginRequest;
import com.avanifeeds.auth.dto.LoginResponse;
import com.avanifeeds.security.JwtTokenProvider;
import com.avanifeeds.user.entity.User;
import com.avanifeeds.user.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.avanifeeds.auth.dto.RegisterRequest;
import com.avanifeeds.user.entity.Role;
import com.avanifeeds.user.repository.RoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.avanifeeds.common.exception.BusinessException;
import com.avanifeeds.auth.entity.FarmerAuth;
import com.avanifeeds.auth.entity.DriverAuth;
import com.avanifeeds.auth.repository.FarmerAuthRepository;
import com.avanifeeds.auth.repository.DriverAuthRepository;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final FarmerAuthRepository farmerAuthRepository;
    private final DriverAuthRepository driverAuthRepository;

    public AuthService(AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder,
                       FarmerAuthRepository farmerAuthRepository,
                       DriverAuthRepository driverAuthRepository) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.farmerAuthRepository = farmerAuthRepository;
        this.driverAuthRepository = driverAuthRepository;
    }

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        String accessToken = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(request.getUsername());

        User user = userRepository.findByUsernameAndIsActiveTrue(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        LoginResponse response = new LoginResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        response.setUsername(user.getUsername());
        response.setFullName(user.getFullName());
        response.setRole(user.getRole().getName());
        response.setPermissions(
                user.getRole().getPermissions().stream()
                        .map(p -> p.getCode())
                        .collect(Collectors.toList())
        );

        return response;
    }

    public LoginResponse refreshToken(String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new IllegalArgumentException("Invalid or expired refresh token");
        }

        String username = tokenProvider.getUsernameFromToken(refreshToken);
        User user = userRepository.findByUsernameAndIsActiveTrue(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Create a new authentication for token generation
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                username, null,
                new org.springframework.security.core.userdetails.User(
                        user.getUsername(), user.getPassword(), true, true, true, true,
                        java.util.Collections.emptyList()
                ).getAuthorities()
        );

        String newAccessToken = tokenProvider.generateAccessToken(authentication);
        String newRefreshToken = tokenProvider.generateRefreshToken(username);

        LoginResponse response = new LoginResponse();
        response.setAccessToken(newAccessToken);
        response.setRefreshToken(newRefreshToken);
        response.setUsername(user.getUsername());
        response.setFullName(user.getFullName());
        response.setRole(user.getRole().getName());
        response.setPermissions(
                user.getRole().getPermissions().stream()
                        .map(p -> p.getCode())
                        .collect(Collectors.toList())
        );

        return response;
    }

    public void register(RegisterRequest request) {
        if (userRepository.findByUsernameAndIsActiveTrue(request.getUsername()).isPresent()) {
            throw new BusinessException("Username already exists");
        }

        Role userRole = roleRepository.findByName("MANAGEMENT")
                .orElseGet(() -> roleRepository.findAll().stream().findFirst()
                        .orElseThrow(() -> new BusinessException("No roles available")));

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setRole(userRole);
        user.setIsActive(true);

        userRepository.save(user);
    }

    public void registerFarmer(String mobileNumber, String password) {
        if (mobileNumber == null || !mobileNumber.matches("\\d{10}")) {
            throw new BusinessException("Please enter a valid 10-digit mobile number");
        }
        if (farmerAuthRepository.findByMobileNumber(mobileNumber).isPresent()) {
            throw new BusinessException("Mobile number already registered");
        }
        FarmerAuth farmerAuth = new FarmerAuth();
        farmerAuth.setMobileNumber(mobileNumber);
        farmerAuth.setPassword(passwordEncoder.encode(password));
        farmerAuthRepository.save(farmerAuth);
    }

    public LoginResponse loginFarmer(String mobileNumber, String password) {
        if (mobileNumber == null || !mobileNumber.matches("\\d{10}")) {
            throw new BusinessException("Please enter a valid 10-digit mobile number");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken("farmer:" + mobileNumber, password)
        );

        String accessToken = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken("farmer:" + mobileNumber);

        LoginResponse response = new LoginResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        response.setUsername(mobileNumber);
        response.setFullName("Farmer " + mobileNumber);
        response.setRole("FARMER");
        response.setPermissions(java.util.List.of());
        return response;
    }

    public LoginResponse loginDriver(String vehicleNumber, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken("driver:" + vehicleNumber, password)
        );

        String accessToken = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken("driver:" + vehicleNumber);

        LoginResponse response = new LoginResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        response.setUsername(vehicleNumber);
        response.setFullName("Driver " + vehicleNumber);
        response.setRole("DRIVER");
        response.setPermissions(java.util.List.of());
        return response;
    }

    public void registerDriver(String vehicleNumber, String password) {
        if (driverAuthRepository.findByVehicleNumber(vehicleNumber).isPresent()) {
            throw new BusinessException("Vehicle number already registered");
        }
        DriverAuth driverAuth = new DriverAuth();
        driverAuth.setVehicleNumber(vehicleNumber);
        driverAuth.setPassword(passwordEncoder.encode(password));
        driverAuthRepository.save(driverAuth);
    }
}
