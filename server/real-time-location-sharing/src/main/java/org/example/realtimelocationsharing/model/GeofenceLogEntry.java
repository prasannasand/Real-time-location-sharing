package org.example.realtimelocationsharing.model;

import java.time.LocalDateTime;

public class GeofenceLogEntry {

    private String memberId;
    private String action;
    private LocalDateTime timestamp;

    // Getters and Setters

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}