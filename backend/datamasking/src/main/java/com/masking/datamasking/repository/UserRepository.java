package com.masking.datamasking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masking.datamasking.model.User;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);
}