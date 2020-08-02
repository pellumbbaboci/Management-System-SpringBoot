package com.baboci.UniversityManagementSystem.controller;

import com.baboci.UniversityManagementSystem.model.Student;
import com.baboci.UniversityManagementSystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/save_student")
    public Student save(@RequestBody Student studentObj){
        studentService.save(studentObj);
        return studentObj;
    }

    @GetMapping("/list_student")
    public List<Student> get(){
        return studentService.get();
    }

    @GetMapping("/getById_student")
    public Student get(@PathVariable int id) {
        Student studentObj = studentService.get(id);
        if(studentObj == null){
            throw new RuntimeException("There is no Student !!!");
        }
        return studentObj;
    }

    @DeleteMapping("/delete_student")
    public String delete(int id){
        studentService.delete(id);
        return "Student Deleted with id: "+id;
    }

    @PutMapping("/update_student")
    public Student update(Student studentObj){
        studentService.save(studentObj);
        return studentObj;
    }

}
