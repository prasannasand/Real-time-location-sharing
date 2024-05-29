package org.example.realtimelocationsharing.service;

import org.example.realtimelocationsharing.model.AppLocation;
import org.example.realtimelocationsharing.model.Geofence;
import org.example.realtimelocationsharing.model.GeofenceLogEntry;
import org.example.realtimelocationsharing.repository.GeofenceRepository;
import org.example.realtimelocationsharing.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


import org.example.realtimelocationsharing.model.GeofenceLog;
import org.example.realtimelocationsharing.repository.GeofenceLogRepository;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private GeofenceLogRepository geofenceLogRepository;

    @Autowired
    private GeofenceRepository geofenceRepository;

    public void updateLocation(String userId, AppLocation location) {
        AppLocation existingLocation = locationRepository.findByUserId(userId);
        if (existingLocation != null) {
            checkGeofenceTransitions(userId, existingLocation, location);
            existingLocation.setLatitude(location.getLatitude());
            existingLocation.setLongitude(location.getLongitude());
            existingLocation.setTimestamp(LocalDateTime.now());
            locationRepository.save(existingLocation);
        } else {
            location.setUserId(userId);
            location.setTimestamp(LocalDateTime.now());
            locationRepository.save(location);
            checkGeofenceTransitions(userId, null, location); // Initial check
        }
    }

    private void checkGeofenceTransitions(String userId, AppLocation oldLocation, AppLocation newLocation) {
        List<Geofence> geofences = geofenceRepository.findAll();
        for (Geofence geofence : geofences) {
            boolean wasInside = oldLocation != null && isInsideGeofence(geofence, oldLocation);
            boolean isInside = isInsideGeofence(geofence, newLocation);

            if (!wasInside && isInside) {
                addGeofenceLogEntry(geofence.getUserId(), userId, "entered");
            } else if (wasInside && !isInside) {
                addGeofenceLogEntry(geofence.getUserId(), userId, "exited");
            }
        }
    }

    private boolean isInsideGeofence(Geofence geofence, AppLocation location) {
        double latDiff = geofence.getLatitude() - location.getLatitude();
        double lonDiff = geofence.getLongitude() - location.getLongitude();
        double distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 111000; // Convert to meters
        return distance <= geofence.getRadius();
    }

    private void addGeofenceLogEntry(String userId, String memberId, String action) {
        GeofenceLog log = new GeofenceLog();
        log.setUserId(userId);
        log.setMemberId(memberId);
        log.setAction(action);
        log.setTimestamp(LocalDateTime.now());
        geofenceLogRepository.save(log);
    }

    public List<GeofenceLog> getGeofenceLog(String userId) {
        return geofenceLogRepository.findByUserId(userId);
    }

    public AppLocation getLocationByUserId(String userId) {
        return locationRepository.findByUserId(userId);
    }
}