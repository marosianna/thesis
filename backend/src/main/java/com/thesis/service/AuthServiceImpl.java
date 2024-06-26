package com.thesis.service;

import com.thesis.auth.AuthenticationRequest;
import com.thesis.auth.AuthenticationResponse;
import com.thesis.auth.RegisterRequest;
import com.thesis.config.JwtService;
import com.thesis.entity.Role;
import com.thesis.entity.TokenEntity;
import com.thesis.entity.TokenType;
import com.thesis.entity.UserEntity;
import com.thesis.exception.AppException;
import com.thesis.repository.TokenRepository;
import com.thesis.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements LogoutHandler, AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {

        if (usernameValidation(request.getUsername())) {
            throw new AppException("A felhasználónév már foglalt!");
        }

        if (medIdValidation(request.getMedId())){
            throw new AppException("A taj számnak egyedinek kell lennie!");
        }

        UserEntity user = new UserEntity();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getUsername());
        user.setRole(Role.USER);
        user.setMedId(request.getMedId());
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse
                .builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .role(user.getRole())
                .build();

    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            throw new AppException("Hibás felhasználónév vagy jelszó!");
        }

        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new AppException("A felhasználó nem található!"));
        if (!Role.USER.equals(user.getRole())) {
            throw new AppException("Nem rendelkezik felhasználói jogosultsággal!");
        }
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .role(user.getRole())
                .build();
    }

    @Override
    public AuthenticationResponse registerAdmin(RegisterRequest request) {

        if (usernameValidation(request.getUsername())) {
            throw new AppException("A felhasználónév már foglalt!");
        }

        if (medIdValidation(request.getMedId())){
            throw new AppException("Az azonosítónak egyedinek kell lennie!");
        }

        UserEntity user = new UserEntity();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getUsername());
        user.setRole(Role.ADMIN);
        user.setMedId(request.getMedId());
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse
                .builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .role(user.getRole())
                .build();

    }

    @Override
    public AuthenticationResponse loginAdmin(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            throw new AppException("Hibás felhasználónév vagy jelszó!");
        }
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new AppException("A felhasználó nem található!"));
        if (!Role.ADMIN.equals(user.getRole())) {
            throw new AppException("Nem rendelkezik adminisztrátor jogosultsággal!");
        }
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .role(user.getRole())
                .build();
    }

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        jwt = authHeader.substring(7);
        var storedToken = tokenRepository.findByToken(jwt)
                .orElse(null);
        if (storedToken != null) {
            storedToken.setExpired(true);
            storedToken.setRevoked(true);
            tokenRepository.save(storedToken);
            SecurityContextHolder.clearContext();
        }

}

    private void saveUserToken(UserEntity user, String jwtToken) {
        var token = TokenEntity.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(UserEntity user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUserId(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private boolean usernameValidation(String username) {
        Optional<UserEntity> optUser = userRepository.findByUsername(username);
        return optUser.isPresent();
    }

    private boolean medIdValidation(Long medId) {
        Optional<UserEntity> optUser = userRepository.findByMedId(medId);
        return optUser.isPresent();
    }

}
