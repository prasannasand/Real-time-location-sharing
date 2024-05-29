package org.example.realtimelocationsharing.controller;

import org.example.realtimelocationsharing.model.AppLocation;
import org.example.realtimelocationsharing.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @PostMapping("/update")
    public void updateLocation(@RequestBody AppLocation location, Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : "anonymous";
        locationService.updateLocation(userId, location);
    }

    @GetMapping("/{userId}")
    public AppLocation getLocationByUserId(@PathVariable String userId) {
        return locationService.getLocationByUserId(userId);
    }

}