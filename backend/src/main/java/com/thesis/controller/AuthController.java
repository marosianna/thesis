package com.thesis.controller;

import com.thesis.config.*;
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

    @PostMapping("/logout")
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        authService.logout(request,response,authentication);
    }



    /*
    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody UserCredentialsDto userCredentialsDto) {
       UserDto user = userService.login(userCredentialsDto);
       user.setToken(userAuthProvider.createToken(user));
       return ResponseEntity.ok(user);
    }

    @PostMapping("/login/admin")
    public ResponseEntity<AdminDto> loginAdmin(@RequestBody AdminCredentialsDto adminCredentialsDto) {
        AdminDto adminDto = adminService.login(adminCredentialsDto);
        adminDto.setToken(adminAuthProvider.createToken(adminDto));
        return ResponseEntity.ok(adminDto);
    }


    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserSignUpDto userSignUpDto) {
        UserDto user = userService.register(userSignUpDto);
        user.setToken(userAuthProvider.createToken(user));
        return ResponseEntity.created(URI.create("/users/" + user.getId())).body(user);
    }

    @PostMapping("/register/admin")
    public ResponseEntity<AdminDto> register(@RequestBody AdminSignUpDto adminSignUpDto) {
        AdminDto adminDto = adminService.register(adminSignUpDto);
        adminDto.setToken(adminAuthProvider.createToken(adminDto));
        return ResponseEntity.created(URI.create("/admins/" + adminDto.getId())).body(adminDto);
    }

     */

}
