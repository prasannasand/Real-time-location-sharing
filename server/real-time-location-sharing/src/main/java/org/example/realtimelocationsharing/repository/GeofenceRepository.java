package org.example.realtimelocationsharing.repository;

import org.example.realtimelocationsharing.model.Geofence;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeofenceRepository extends MongoRepository<Geofence, String> {
    List<Geofence> findByUserId(String userId);
}