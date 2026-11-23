package com.bpi.backend.controller;

import com.bpi.backend.model.User;
import com.bpi.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        if (username == null || password == null)
            return ResponseEntity.badRequest().body(Map.of("error", "Username and password are required."));

        return authService.login(username, password)
                .map(u -> ResponseEntity.ok(Map.of(
                        "id",        u.getId(),
                        "username",  u.getUsername(),
                        "firstName", u.getFirstName(),
                        "lastName",  u.getLastName(),
                        "email",     u.getEmail()
                )))
                .orElse(ResponseEntity.status(401).body(Map.of("error", "Invalid username or password.")));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        try {
            String username  = body.get("username");
            String password  = body.get("password");
            String email     = body.get("email");
            String mobile    = body.get("mobile");
            String firstName = body.get("firstName");
            String lastName  = body.get("lastName");

            if (username == null || password == null || email == null ||
                mobile == null || firstName == null || lastName == null)
                return ResponseEntity.badRequest().body(Map.of("error", "All fields are required."));

            User user = authService.register(username, password, email, mobile, firstName, lastName);
            return ResponseEntity.ok(Map.of(
                    "message",   "Registration successful.",
                    "username",  user.getUsername(),
                    "firstName", user.getFirstName()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
