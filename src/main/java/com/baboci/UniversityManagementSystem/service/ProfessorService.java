package com.baboci.UniversityManagementSystem.service;

import com.baboci.UniversityManagementSystem.model.Course;
import com.baboci.UniversityManagementSystem.model.Professor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;


public interface ProfessorService {

    void save(Professor professor);
    Professor get(int id);
    Page<Professor> get(Pageable pageable);
    void delete (int id);
    List<Professor> search(String keyword);
    void addCourse(Course course, int ID);

}
