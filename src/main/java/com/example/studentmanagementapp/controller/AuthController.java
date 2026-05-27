package com.example.studentmanagementapp.controller;

import com.example.studentmanagementapp.dto.LoginRequest;
import com.example.studentmanagementapp.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        if(request.getUsername().equals("admin")
                && request.getPassword().equals("1234")) {

            return jwtUtil.generateToken(request.getUsername());
        }

        return "Invalid Username or Password";
    }
}