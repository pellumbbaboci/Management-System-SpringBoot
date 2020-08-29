package com.baboci.UniversityManagementSystem.service;

import com.baboci.UniversityManagementSystem.model.Course;

import java.util.List;

public interface CourseService {

    void save(Course course);
    Course get(int id);
    List<Course> get();
    void delete (int id);
    List<Course> search(String keyword);


}
