package com.baboci.UniversityManagementSystem.dao;

import com.baboci.UniversityManagementSystem.model.Professor;

import java.util.List;

public interface ProfessorDAO {

    void save(Professor professor);
    Professor get(int id);
    List<Professor> get();
    void delete (int id);

}
