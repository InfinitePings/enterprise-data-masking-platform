package com.masking.datamasking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masking.datamasking.model.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog,Long> {

	List<AuditLog> findByDatasetId(Long datasetId);
	
	List<AuditLog> findByUserId(Long userId);
	
	List<AuditLog> findByUserIdAndDatasetId(Long userId, Long datasetId);
}