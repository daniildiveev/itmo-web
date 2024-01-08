package web.itmo.lab4.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.itmo.lab4.models.Response;
import web.itmo.lab4.models.User;
import web.itmo.lab4.service.JWTService;
import web.itmo.lab4.service.implementation.UserServiceImplementation;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/authentication")
public class AuthenticationController {
    private final UserServiceImplementation userService;
    private final JWTService jwtService;

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody User user) {
        boolean success = userService.register(user);

        if(success) {
            String jwt = jwtService.generateToken(user, new HashMap<>());

            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .data(Map.of("user", true))
                            .message("Registration successful")
                            .status(HttpStatus.CREATED)
                            .statusCode(HttpStatus.CREATED.value())
                            .jwt(jwt)
                            .build()
            );
        }

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .data(Map.of("user", false))
                        .message("Username taken")
                        .status(HttpStatus.CONFLICT)
                        .statusCode(HttpStatus.CONFLICT.value())
                        .build()
        );
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody User user) {
        boolean success = userService.authenticate(user);

        if(success){
            String jwt = jwtService.generateToken(user, new HashMap<>());

            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .data(Map.of("Logged in", true))
                            .message("User logged in")
                            .status(HttpStatus.OK)
                            .statusCode(HttpStatus.OK.value())
                            .jwt(jwt)
                            .build()
            );
        }

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .data(Map.of("Logged in", false))
                        .message("Incorrect password or username")
                        .status(HttpStatus.UNAUTHORIZED)
                        .statusCode(HttpStatus.UNAUTHORIZED.value())
                        .build()
        );
    }
}
