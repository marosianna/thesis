package com.thesis.controller;

import com.thesis.auth.AuthenticationRequest;
import com.thesis.auth.AuthenticationResponse;
import com.thesis.auth.RegisterRequest;
import com.thesis.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/admin/register")
    public ResponseEntity<AuthenticationResponse> registerAdmin(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authService.registerAdmin(request));

    }

    @PostMapping("/admin/login")
    public ResponseEntity<AuthenticationResponse> loginAdmin(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authService.loginAdmin(request));
    }

    @PostMapping("/logout")
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        authService.logout(request,response,authentication);
    }


    /*
    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        authService.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

     */

}
