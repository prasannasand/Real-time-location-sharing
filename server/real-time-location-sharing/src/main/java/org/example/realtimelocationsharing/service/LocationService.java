package org.example.realtimelocationsharing.service;

import org.example.realtimelocationsharing.model.AppLocation;
import org.example.realtimelocationsharing.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public void updateLocation(String userId, AppLocation location) {
        AppLocation existingLocation = locationRepository.findByUserId(userId);
        if (existingLocation != null) {
            existingLocation.setLatitude(location.getLatitude());
            existingLocation.setLongitude(location.getLongitude());
            existingLocation.setTimestamp(LocalDateTime.now());
            locationRepository.save(existingLocation);
        } else {
            location.setUserId(userId);
            location.setTimestamp(LocalDateTime.now());
            locationRepository.save(location);
        }
    }

    public AppLocation getLocationByUserId(String userId) {
        return locationRepository.findByUserId(userId);
    }
}