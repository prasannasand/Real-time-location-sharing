package org.example.realtimelocationsharing.controller;

import org.example.realtimelocationsharing.model.FamilyMember;
import org.example.realtimelocationsharing.service.FamilyMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/family")
public class FamilyMemberController {

    @Autowired
    private FamilyMemberService familyMemberService;

    @GetMapping("/members")
    public List<FamilyMember> getFamilyMembers(Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : "anonymous";
        return familyMemberService.getFamilyMembersByUserId(userId);
    }

    @GetMapping("/pending")
    public List<FamilyMember> getPendingRequests(Authentication authentication) {
        String memberId = authentication != null ? authentication.getName() : "anonymous";
        return familyMemberService.getPendingRequests(memberId);
    }

    @PostMapping("/add")
    public FamilyMember addFamilyMember(@RequestBody FamilyMember familyMember, Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : "anonymous";
        familyMember.setUserId(userId);
        return familyMemberService.addFamilyMember(familyMember);
    }

    @PostMapping("/accept/{id}")
    public void acceptFamilyMemberRequest(@PathVariable String id) {
        familyMemberService.acceptFamilyMemberRequest(id);
    }

    @PostMapping("/decline/{id}")
    public void declineFamilyMemberRequest(@PathVariable String id) {
        familyMemberService.declineFamilyMemberRequest(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteFamilyMember(@PathVariable String id) {
        familyMemberService.deleteFamilyMember(id);
    }
}