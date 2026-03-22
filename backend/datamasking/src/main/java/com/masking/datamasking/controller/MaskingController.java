package com.masking.datamasking.controller;

import com.masking.datamasking.service.MaskingEngineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mask")
@RequiredArgsConstructor
@CrossOrigin
public class MaskingController {

    private final MaskingEngineService service;

    @PostMapping("/apply")
    public ResponseEntity<?> apply(@RequestParam Long datasetId,
                                  @RequestBody List<Long> ruleIds) throws Exception {

        String path = service.applyMasking(datasetId, ruleIds);
        return ResponseEntity.ok("Masking completed: " + path);
    }

    @GetMapping("/preview/{datasetId}")
    public List<String[]> preview(@PathVariable Long datasetId) throws Exception {
        return service.preview(datasetId);
    }

    @GetMapping("/download/{datasetId}")
    public ResponseEntity<byte[]> download(@PathVariable Long datasetId) throws Exception {

        byte[] data = service.download(datasetId);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=masked.csv")
                .body(data);
    }
}