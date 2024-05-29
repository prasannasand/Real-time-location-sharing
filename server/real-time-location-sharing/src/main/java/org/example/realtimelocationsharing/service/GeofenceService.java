package org.example.realtimelocationsharing.service;

import org.example.realtimelocationsharing.model.Geofence;
import org.example.realtimelocationsharing.repository.GeofenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeofenceService {

    @Autowired
    private GeofenceRepository geofenceRepository;

    public Geofence addGeofence(Geofence geofence) {
        return geofenceRepository.save(geofence);
    }

    public List<Geofence> getGeofencesByUserId(String userId) {
        return geofenceRepository.findByUserId(userId);
    }

    public void deleteGeofence(String id) {
        geofenceRepository.deleteById(id);
    }
}