package com.masking.datamasking.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.masking.datamasking.model.Dataset;
import com.masking.datamasking.service.DatasetService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/datasets")
@RequiredArgsConstructor
public class DatasetController {

    private final DatasetService service;

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws Exception {
        return ResponseEntity.ok(service.upload(file));
    }

    @GetMapping
    public List<Dataset> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Dataset getById(@PathVariable Long id) {
        return service.getById(id);
    }
    
    @GetMapping("/my")
    public List<Dataset> getMyDatasets() {
        return service.getMyDatasets();
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> download(@PathVariable Long id) throws Exception {

        byte[] data = service.download(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=file.csv")
                .body(data);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) throws Exception {
        service.delete(id);
    }
}