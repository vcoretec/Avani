package com.avanifeeds.auth.controller;

import com.avanifeeds.auth.dto.LoginRequest;
import com.avanifeeds.auth.dto.LoginResponse;
import com.avanifeeds.auth.service.AuthService;
import com.avanifeeds.common.dto.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import com.avanifeeds.auth.dto.RegisterRequest;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<LoginResponse>> refresh(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        LoginResponse response = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(ApiResponse.success("Token refreshed", response));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("User registered successfully", null));
    }

    @PostMapping("/farmer/login")
    public ResponseEntity<ApiResponse<LoginResponse>> loginFarmer(@RequestBody Map<String, String> request) {
        String mobile = request.get("mobileNumber");
        String password = request.get("password");
        return ResponseEntity.ok(ApiResponse.success("Login successful", authService.loginFarmer(mobile, password)));
    }
    
    @PostMapping("/farmer/register")
    public ResponseEntity<ApiResponse<String>> registerFarmer(@RequestBody Map<String, String> request) {
        String password = request.get("password");
        String confirmPassword = request.get("confirmPassword");
        if (password == null || !password.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Passwords do not match"));
        }
        authService.registerFarmer(request.get("mobileNumber"), password);
        return ResponseEntity.ok(ApiResponse.success("Farmer registered successfully", null));
    }
    
    @PostMapping("/driver/login")
    public ResponseEntity<ApiResponse<LoginResponse>> loginDriver(@RequestBody Map<String, String> request) {
        String vehicle = request.get("vehicleNumber");
        String password = request.get("password");
        return ResponseEntity.ok(ApiResponse.success("Login successful", authService.loginDriver(vehicle, password)));
    }
    
    @PostMapping("/driver/register")
    public ResponseEntity<ApiResponse<String>> registerDriver(@RequestBody Map<String, String> request) {
        String password = request.get("password");
        String confirmPassword = request.get("confirmPassword");
        if (password == null || !password.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Passwords do not match"));
        }
        authService.registerDriver(request.get("vehicleNumber"), password);
        return ResponseEntity.ok(ApiResponse.success("Driver registered successfully", null));
    }
    
    @GetMapping("/driver/profile")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDriverProfile(Authentication authentication) {
        if (authentication == null || !authentication.getName().startsWith("driver:")) {
            return ResponseEntity.status(401).body(ApiResponse.error("Unauthorized"));
        }
        String vehicleNumber = authentication.getName().substring(7);
        Map<String, Object> profile = new java.util.HashMap<>();
        profile.put("vehicleNumber", vehicleNumber);
        profile.put("role", "DRIVER");
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved", profile));
    }
    @GetMapping("/farmer/profile")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getFarmerProfile(Authentication authentication) {
        if (authentication == null || !authentication.getName().startsWith("farmer:")) {
            return ResponseEntity.status(401).body(ApiResponse.error("Unauthorized"));
        }
        String mobileNumber = authentication.getName().substring(7);
        Map<String, Object> profile = new java.util.HashMap<>();
        profile.put("mobileNumber", mobileNumber);
        profile.put("role", "FARMER");
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved", profile));
    }
}
