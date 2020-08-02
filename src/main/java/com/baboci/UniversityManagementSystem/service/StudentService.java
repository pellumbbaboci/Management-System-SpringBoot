package com.baboci.UniversityManagementSystem.service;

import com.baboci.UniversityManagementSystem.model.Student;

import java.util.List;

public interface StudentService {

    void save(Student student);
    Student get(int id);
    List<Student> get();
    void delete(int id);

}
