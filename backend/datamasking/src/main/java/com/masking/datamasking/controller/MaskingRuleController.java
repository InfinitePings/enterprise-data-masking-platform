package com.masking.datamasking.controller;

import com.masking.datamasking.model.MaskingRule;
import com.masking.datamasking.service.MaskingRuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rules")
@RequiredArgsConstructor
@CrossOrigin
public class MaskingRuleController {

    private final MaskingRuleService service;

    @PostMapping
    public MaskingRule create(@RequestBody MaskingRule rule) {
        return service.create(rule);
    }

    @GetMapping
    public List<MaskingRule> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public MaskingRule getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public MaskingRule update(@PathVariable Long id, @RequestBody MaskingRule rule) {
        return service.update(id, rule);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}