package com.example.studentmanagementapp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class StudentController {
    @GetMapping("/")
    public String home(){
        return "<h1> Welcome to Springboot</h1>";
    }


}
