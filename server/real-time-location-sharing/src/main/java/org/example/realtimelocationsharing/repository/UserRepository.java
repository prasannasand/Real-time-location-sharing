package org.example.realtimelocationsharing.repository;
import org.example.realtimelocationsharing.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<AppUser, String> {
    AppUser findByUsername(String username);

}