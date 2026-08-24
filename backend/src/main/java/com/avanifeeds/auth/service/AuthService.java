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

import java.util.stream.Collectors;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    public AuthService(AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
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
}
