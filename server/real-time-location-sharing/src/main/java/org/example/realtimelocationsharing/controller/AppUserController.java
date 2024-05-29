package org.example.realtimelocationsharing.controller;

import org.example.realtimelocationsharing.model.AppUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppUserController {

    @GetMapping("/appuser/current")
    public AppUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return new AppUser(authentication.getName(), null, null);
    }
}