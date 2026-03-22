package com.masking.datamasking.service;

import com.masking.datamasking.model.MaskingRule;
import com.masking.datamasking.repository.MaskingRuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaskingRuleService {

    private final MaskingRuleRepository repository;

    public MaskingRule create(MaskingRule rule) {
        return repository.save(rule);
    }

    public List<MaskingRule> getAll() {
        return repository.findAll();
    }

    public MaskingRule getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rule not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public MaskingRule update(Long id, MaskingRule updated) {
        MaskingRule rule = getById(id);

        rule.setName(updated.getName());
        rule.setRegexPattern(updated.getRegexPattern());
        rule.setMaskType(updated.getMaskType());
        rule.setMaskChar(updated.getMaskChar());

        return repository.save(rule);
    }
}