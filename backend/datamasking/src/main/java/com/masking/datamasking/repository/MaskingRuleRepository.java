package com.masking.datamasking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masking.datamasking.model.MaskingRule;

public interface MaskingRuleRepository extends JpaRepository<MaskingRule,Long> {
}