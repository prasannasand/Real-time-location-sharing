package org.example.realtimelocationsharing.controller;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.example.realtimelocationsharing.model.AppUser;
import org.example.realtimelocationsharing.repository.UserRepository;
import java.util.Optional;

@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String registerUser(@RequestBody AppUser appUser) {
        System.out.println("Register endpoint called with user: " + appUser.getUsername());

        // Check if username or email already exists
        Optional<AppUser> existingUserByUsername = userRepository.findByUsername(appUser.getUsername());
        if (existingUserByUsername.isPresent()) {
            return "Username already taken";
        }

        Optional<AppUser> existingUserByEmail = userRepository.findByEmail(appUser.getEmail());
        if (existingUserByEmail.isPresent()) {
            return "Email already registered";
        }

        // Encode password and save new user
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        userRepository.save(appUser);

        return "User registered successfully";
    }

    @GetMapping("/login")
    public String login(@RequestParam(value = "error", required = false) String error,
                        @RequestParam(value = "logout", required = false) String logout) {
        if (error != null) {
            return "Invalid username or password.";
        }
        if (logout != null) {
            return "You have been logged out.";
        }
        return "Please login.";
    }

    @GetMapping("/auth/current")
    public Authentication getCurrentUser(Authentication authentication) {
        return authentication;
    }
}