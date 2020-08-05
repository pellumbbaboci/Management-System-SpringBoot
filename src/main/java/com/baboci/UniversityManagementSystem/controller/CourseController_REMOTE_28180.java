package com.baboci.UniversityManagementSystem.controller;

import com.baboci.UniversityManagementSystem.model.Course;
import com.baboci.UniversityManagementSystem.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/save_course")
    public Course save(@RequestBody Course professorObj){
        courseService.save(professorObj);
        return professorObj;
    }

    @GetMapping("/list_course")
    public List<Course> get(){
        return courseService.get();
    }

    @GetMapping("/getById_course/{id}")
    public Course get(@PathVariable int id){
        Course profObj = courseService.get(id);
        if(profObj == null){
            throw new RuntimeException("There is no course object");
        }
        return profObj;
    }

    @DeleteMapping("/delete_course/{id}")
    public String delete(@PathVariable int id){
        courseService.delete(id);
        return "Course deleted with id: "+id;
    }

    @PutMapping("/update_course")
    public Course update(@RequestBody Course professorObj){
        courseService.save(professorObj);
        return professorObj;
    }

}
