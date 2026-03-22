package com.masking.datamasking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.masking.datamasking.model.AuditLog;
import com.masking.datamasking.repository.AuditLogRepository;
import com.masking.datamasking.service.AuditLogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/audit")
@RequiredArgsConstructor
@CrossOrigin
public class AuditController {
	
	@Autowired
	private AuditLogService auditService;

    private final AuditLogRepository repo;
    
    @GetMapping
    public List<AuditLog> getMyLogs() {
        return auditService.getMyLogs();
    }

    @GetMapping("/{datasetId}")
    public List<AuditLog> getByDataset(@PathVariable Long datasetId) {
        return repo.findByDatasetId(datasetId);
    }
}