package com.baboci.UniversityManagementSystem.dao;

import com.baboci.UniversityManagementSystem.model.Student;

import java.util.List;

public interface StudentDAO {
    void save(Student student);
    Student get(int id);
    List<Student> get();
    void delete (int id);
    List<Student> search(String keyword);
}
