package com.baboci.UniversityManagementSystem.service;

import com.baboci.UniversityManagementSystem.model.Course;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CourseService {

    void save(Course course);
    Course get(int id);
    List<Course> get();
    void delete (int id);
}
