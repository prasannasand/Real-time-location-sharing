package org.example.realtimelocationsharing.repository;

import org.example.realtimelocationsharing.model.AppLocation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends MongoRepository<AppLocation, String> {
    AppLocation findByUserId(String userId);
}