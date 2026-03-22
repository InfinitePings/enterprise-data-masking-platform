package com.masking.datamasking.service;

import java.io.FileReader;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.masking.datamasking.model.AuditAction;
import com.masking.datamasking.model.Dataset;
import com.masking.datamasking.model.DatasetStatus;
import com.masking.datamasking.model.MaskingRule;
import com.masking.datamasking.model.User;
import com.masking.datamasking.repository.UserRepository;
import com.masking.datamasking.util.RegexMaskingUtil;
import com.masking.datamasking.util.SecurityUtil;
import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MaskingEngineService {

    private final DatasetService datasetService;
    private final MaskingRuleService ruleService;
    
    @Autowired
    private AuditLogService auditService;
    
    @Autowired
    private UserRepository userRepository;
    

    public String applyMasking(Long datasetId, List<Long> ruleIds) throws Exception {
    	
    	String username = SecurityUtil.getCurrentUsername();
    	User user = userRepository.findByUsername(username)
    	        .orElseThrow(() -> new RuntimeException("User not found"));

        Dataset dataset = datasetService.getById(datasetId);

        List<MaskingRule> rules = ruleIds.stream()
                .map(ruleService::getById)
                .toList();

        List<String[]> data;

        try (CSVReader reader = new CSVReader(new FileReader(dataset.getFilePath()))) {
            data = reader.readAll();
        }

        // Apply masking
        for (String[] row : data) {
            for (int i = 0; i < row.length; i++) {
                String cell = row[i];

                for (MaskingRule rule : rules) {
                    cell = RegexMaskingUtil.mask(cell, rule);
                }

                row[i] = cell;
            }
        }

        String maskedPath = "masked/masked_" + dataset.getFileName();
        Files.createDirectories(Paths.get("masked/"));

        try (CSVWriter writer = new CSVWriter(new FileWriter(maskedPath))) {
            writer.writeAll(data);
        }

        dataset.setStatus(DatasetStatus.MASKED);
        dataset.setMaskedAt(LocalDateTime.now());

        datasetService.save(dataset);
        
        String rulesApplied = rules.stream()
                .map(MaskingRule::getName)
                .toList()
                .toString();
        
        auditService.log(
                user,
                datasetId,
                AuditAction.MASK_APPLIED,
                "Masking applied on dataset: " + dataset.getFileName(),
                rulesApplied
        );

        return maskedPath;
    }

    public List<String[]> preview(Long datasetId) throws Exception {
    	
    	String username = SecurityUtil.getCurrentUsername();
    	User user = userRepository.findByUsername(username)
    	        .orElseThrow(() -> new RuntimeException("User not found"));

        Dataset dataset = datasetService.getById(datasetId);
        String maskedPath = "masked/masked_" + dataset.getFileName();

        try (CSVReader reader = new CSVReader(new FileReader(maskedPath))) {
        	
        	auditService.log(
        		    user,
        		    datasetId,
        		    AuditAction.PREVIEW,
        		    "Preview viewed",
        		    null
        		);
        	
            return reader.readAll().stream().limit(10).toList();
        }
    }

    public byte[] download(Long datasetId) throws Exception {

    	String username = SecurityUtil.getCurrentUsername();
    	User user = userRepository.findByUsername(username)
    	        .orElseThrow(() -> new RuntimeException("User not found"));
    	
        Dataset dataset = datasetService.getById(datasetId);
        String maskedPath = "masked/masked_" + dataset.getFileName();
        
        auditService.log(
        	    user,
        	    datasetId,
        	    AuditAction.DOWNLOAD,
        	    "Masked file downloaded",
        	    null
        	);

        return Files.readAllBytes(Paths.get(maskedPath));
    }
}