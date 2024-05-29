package org.example.realtimelocationsharing.repository;

import org.example.realtimelocationsharing.model.FamilyMember;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyMemberRepository extends MongoRepository<FamilyMember, String> {
    List<FamilyMember> findByUserIdAndStatus(String userId, String status);
    List<FamilyMember> findByMemberIdAndStatus(String memberId, String status);
}