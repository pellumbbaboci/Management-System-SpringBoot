package com.baboci.UniversityManagementSystem.controller;

import com.baboci.UniversityManagementSystem.model.Course;
import com.baboci.UniversityManagementSystem.model.Professor;
import com.baboci.UniversityManagementSystem.model.Student;
import com.baboci.UniversityManagementSystem.service.CourseService;
import com.baboci.UniversityManagementSystem.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class CourseController {

    private CourseService courseService;
    private ProfessorService professorService;

    @Autowired
    public CourseController(CourseService courseService,ProfessorService professorService){
        this.courseService = courseService;
        this.professorService = professorService;
    }

    @PostMapping("/save_course/under/{id}")
    public Course save(@RequestBody Course courseObj , @PathVariable int id){
        Professor professor = professorService.get(id);
        Course course = new Course(courseObj.getCourseName(),courseObj.getDepartment(),professor.getName());
        professorService.addCourse(course, professor.getId());
        courseService.save(course);
        return course;
    }

    @GetMapping("/list_course")
    public List<Course> get(){
        return courseService.get();
    }

    @GetMapping("/getById_course/{id}")
    public Course get(@PathVariable int id){

        Course courseObj = courseService.get(id);
        if(courseObj == null){
            throw new RuntimeException("There is no course object");
        }
        return courseObj;

    }

    @DeleteMapping("/delete_course/{id}")
    public String delete(@PathVariable int id){
        courseService.delete(id);
        return "Course deleted with id: "+id;
    }

    @PutMapping("/update_course/under/{id}")
    public Course update(@RequestBody Course courseObj, @PathVariable int id){
        Professor professor = new Professor();
        professor.setId(id);
        courseObj.setProfessorID(professor);
        courseService.save(courseObj);
        return courseObj;

    }

    @GetMapping("/search_course/{keyword}")
    public List<Course> search(@PathVariable String keyword){
        List<Course> courses = courseService.search(keyword);
        if (courses == null)
            throw  new RuntimeException("There is no courses with searched criteria");
        return courses;
    }

}
