package com.baboci.UniversityManagementSystem.service;

import com.baboci.UniversityManagementSystem.model.Professor;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ProfessorService {

    void save(Professor professor);
    Professor get(int id);
    List<Professor> get();
    void delete (int id);
    List<Professor> searchByName(String name);

}
