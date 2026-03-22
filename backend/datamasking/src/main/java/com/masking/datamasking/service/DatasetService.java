package com.masking.datamasking.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.masking.datamasking.model.AuditAction;
import com.masking.datamasking.model.Dataset;
import com.masking.datamasking.model.DatasetStatus;
import com.masking.datamasking.model.User;
import com.masking.datamasking.repository.DatasetRepository;
import com.masking.datamasking.repository.UserRepository;
import com.masking.datamasking.util.SecurityUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DatasetService {
	
	private final AuditLogService auditService;
	private final UserRepository userRepository;

    private final DatasetRepository datasetRepository;

    private final String UPLOAD_DIR = "uploads/";

    public Dataset upload(MultipartFile file) throws Exception {

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path path = Paths.get(UPLOAD_DIR + fileName);
        
        String username = SecurityUtil.getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Files.createDirectories(path.getParent());
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        Dataset dataset = new Dataset();
        dataset.setFileName(fileName);
        dataset.setFilePath(path.toString());
        dataset.setUploadedAt(LocalDateTime.now());
        dataset.setStatus(DatasetStatus.valueOf("UPLOADED"));
        dataset.setUploadedBy(user);

        Dataset saved = datasetRepository.save(dataset);
        
        auditService.log(
            user,
            saved.getId(),
            AuditAction.UPLOAD,
            "Dataset uploaded: " + saved.getFileName(),
            null
        );
        
        return saved;
    }
    
    public Dataset save(Dataset dataset) {
        return datasetRepository.save(dataset);
    }

    public Dataset getById(Long id) {
        return datasetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dataset not found"));
    }
    
    public List<Dataset> getMyDatasets() {

        String username = SecurityUtil.getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return datasetRepository.findByUploadedBy(user);
    }

    public List<Dataset> getAll() {
        return datasetRepository.findAll();
    }

    public byte[] download(Long id) throws Exception {
        Dataset dataset = getById(id);
        return Files.readAllBytes(Paths.get(dataset.getFilePath()));
    }

    public void delete(Long id) throws Exception {
        Dataset dataset = getById(id);
        Files.deleteIfExists(Paths.get(dataset.getFilePath()));
        datasetRepository.deleteById(id);
    }
}