package com.baboci.UniversityManagementSystem.dao;

import com.baboci.UniversityManagementSystem.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StudentDAO {
    void save(Student student);
    Student get(int id);
    Page<Student> get(Pageable pageable);
    void delete (int id);
    List<Student> search(String keyword);
}
