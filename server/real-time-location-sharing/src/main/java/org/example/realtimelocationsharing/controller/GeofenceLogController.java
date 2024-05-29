package org.example.realtimelocationsharing.controller;

import org.example.realtimelocationsharing.model.GeofenceLog;
import org.example.realtimelocationsharing.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/geofence-log")
public class GeofenceLogController {

    @Autowired
    private LocationService locationService;

    @GetMapping("/get")
    public List<GeofenceLog> getGeofenceLog(Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : "anonymous";
        return locationService.getGeofenceLog(userId);
    }
}