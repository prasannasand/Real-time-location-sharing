package org.example.realtimelocationsharing.repository;

import org.example.realtimelocationsharing.model.GeofenceLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeofenceLogRepository extends MongoRepository<GeofenceLog, String> {
    List<GeofenceLog> findByUserId(String userId);
}