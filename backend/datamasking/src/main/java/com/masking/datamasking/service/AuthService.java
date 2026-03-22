package com.masking.datamasking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.masking.datamasking.model.User;
import com.masking.datamasking.repository.UserRepository;
import com.masking.datamasking.util.JwtUtil;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtil jwtUtil;

    public String register(User user){

        user.setPassword(encoder.encode(user.getPassword()));
        
        user.setRole("USER");

        userRepository.save(user);

        return "User Registered";
    }

    public String login(String username,String password){

        User user=userRepository.findByUsername(username).orElseThrow();

        if(encoder.matches(password,user.getPassword())){

            return jwtUtil.generateToken(username);
        }

        throw new RuntimeException("Invalid Credentials");
    }
}