package com.masking.datamasking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.masking.datamasking.model.AuditAction;
import com.masking.datamasking.model.AuditLog;
import com.masking.datamasking.model.User;
import com.masking.datamasking.repository.AuditLogRepository;
import com.masking.datamasking.repository.UserRepository;
import com.masking.datamasking.util.SecurityUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditRepo;
    
    @Autowired
    private UserRepository userRepository;

    public void log(User user, Long datasetId, AuditAction action, String details, String rulesApplied) {

        AuditLog log = new AuditLog();

        log.setUser(user);
        log.setDatasetId(datasetId);
        log.setAction(action);
        log.setDetails(details);
        log.setRulesApplied(rulesApplied);

        auditRepo.save(log);
    }
    
    public List<AuditLog> getMyLogs() {
        String username = SecurityUtil.getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
            return auditRepo.findAll();
        }

        return auditRepo.findByUserId(user.getId());
    }

    public List<AuditLog> getMyLogsByDataset(Long datasetId) {
        String username = SecurityUtil.getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
            return auditRepo.findByDatasetId(datasetId);
        }

        return auditRepo.findByUserIdAndDatasetId(user.getId(), datasetId);
    }
}