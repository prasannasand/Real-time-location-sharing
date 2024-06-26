package org.example.realtimelocationsharing.service;

import org.example.realtimelocationsharing.model.AppUser;
import org.example.realtimelocationsharing.model.FamilyMember;
import org.example.realtimelocationsharing.repository.UserRepository;
import org.example.realtimelocationsharing.repository.FamilyMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FamilyMemberService {

    @Autowired
    private FamilyMemberRepository familyMemberRepository;

    @Autowired
    private UserRepository appUserRepository; // Add this line

    public List<FamilyMember> getFamilyMembersByUserId(String userId) {
        return familyMemberRepository.findByUserIdAndStatus(userId, "ACCEPTED");
    }

    public List<FamilyMember> getPendingRequests(String memberId) {
        return familyMemberRepository.findByMemberIdAndStatus(memberId, "PENDING");
    }

    public FamilyMember addFamilyMember(FamilyMember familyMember) throws Exception {
        if (familyMember.getUserId().equals(familyMember.getMemberId())) {
            throw new Exception("Cannot add yourself as a family member.");
        }

        Optional<AppUser> member = appUserRepository.findByUsername(familyMember.getMemberId());
        if (!member.isPresent()) {
            throw new Exception("User does not exist.");
        }

        familyMember.setStatus("PENDING");
        return familyMemberRepository.save(familyMember);
    }

    public void acceptFamilyMemberRequest(String id) {
        Optional<FamilyMember> familyMember = familyMemberRepository.findById(id);
        familyMember.ifPresent(member -> {
            member.setStatus("ACCEPTED");
            familyMemberRepository.save(member);
        });
    }

    public void declineFamilyMemberRequest(String id) {
        Optional<FamilyMember> familyMember = familyMemberRepository.findById(id);
        familyMember.ifPresent(member -> {
            member.setStatus("DECLINED");
            familyMemberRepository.save(member);
        });
    }

    public void deleteFamilyMember(String id) {
        familyMemberRepository.deleteById(id);
    }
}