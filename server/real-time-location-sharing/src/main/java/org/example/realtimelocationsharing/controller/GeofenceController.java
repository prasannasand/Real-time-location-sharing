package org.example.realtimelocationsharing.controller;

import org.example.realtimelocationsharing.model.Geofence;
import org.example.realtimelocationsharing.service.GeofenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/geofence")
public class GeofenceController {

    @Autowired
    private GeofenceService geofenceService;

    @PostMapping("/add")
    public Geofence addGeofence(@RequestBody Geofence geofence, Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : "anonymous";
        geofence.setUserId(userId);
        return geofenceService.addGeofence(geofence);
    }

    @GetMapping("/all")
    public List<Geofence> getAllGeofences(Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : "anonymous";
        return geofenceService.getGeofencesByUserId(userId);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGeofence(@PathVariable String id) {
        geofenceService.deleteGeofence(id);
    }
}