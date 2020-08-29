package com.baboci.UniversityManagementSystem.controller;

import com.baboci.UniversityManagementSystem.model.Student;
import com.baboci.UniversityManagementSystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins="http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/save_student")
    public Student save(@RequestBody Student studentObj){
        studentService.save(studentObj);
        return studentObj;
    }

    @GetMapping("/list_student")
    public Page<Student> get(Pageable pageable){
        return studentService.get(pageable);
    }

    @GetMapping("/getById_student/{id}")
    public Student get(@PathVariable int id) {
        Student studentObj = studentService.get(id);
        if(studentObj == null){
            throw new RuntimeException("There is no Student !!!");
        }
        return studentObj;
    }

    @DeleteMapping("/delete_student/{id}")
    public String delete(@PathVariable int id){
        studentService.delete(id);
        return "Student Deleted with id: "+id;
    }

    @PutMapping("/update_student")
    public Student update(@RequestBody Student studentObj){
        studentService.save(studentObj);
        return studentObj;
    }

    @GetMapping("/search_student/{keyword}")
    public List<Student> search(@PathVariable String keyword){
        List<Student> students = studentService.search(keyword);
        if (students == null)
            throw  new RuntimeException("There is no student with searched criteria");
        return students;
    }

}
