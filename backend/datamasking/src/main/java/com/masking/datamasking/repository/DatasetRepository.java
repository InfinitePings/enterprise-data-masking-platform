package com.masking.datamasking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masking.datamasking.model.Dataset;
import com.masking.datamasking.model.User;

public interface DatasetRepository extends JpaRepository<Dataset,Long> {
	
	List<Dataset> findByUploadedBy(User user);
}