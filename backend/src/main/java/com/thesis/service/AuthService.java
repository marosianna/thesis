package com.thesis.service;

import com.thesis.auth.AuthenticationRequest;
import com.thesis.auth.AuthenticationResponse;
import com.thesis.auth.ChangePasswordRequest;
import com.thesis.auth.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;

import java.security.Principal;

public interface AuthService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(AuthenticationRequest request);

    AuthenticationResponse registerAdmin(RegisterRequest request);

    AuthenticationResponse loginAdmin(AuthenticationRequest request);

    void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    );

   /* void changePassword(
            ChangePasswordRequest request,
            Principal connectedUser
    );

    */
}
