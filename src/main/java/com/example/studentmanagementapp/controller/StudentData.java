package com.example.studentmanagementapp.controller;

import com.example.studentmanagementapp.entity.Student;
import com.example.studentmanagementapp.repository.StudentRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentData {

    private final StudentRepository studentRepository;

    public StudentData(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // GET ALL STUDENTS
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // ADD STUDENT
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    // UPDATE STUDENT
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id,
                                 @RequestBody Student updatedStudent) {

        Student student = studentRepository.findById(id).orElseThrow();

        student.setName(updatedStudent.getName());
        student.setCourse(updatedStudent.getCourse());
        student.setMarks(updatedStudent.getMarks());

        return studentRepository.save(student);
    }

    // DELETE STUDENT
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentRepository.deleteById(id);
    }
}