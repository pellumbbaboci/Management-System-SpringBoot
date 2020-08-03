package com.baboci.UniversityManagementSystem.service.ImplService;

import com.baboci.UniversityManagementSystem.dao.ProfessorDAO;
import com.baboci.UniversityManagementSystem.model.Professor;
import com.baboci.UniversityManagementSystem.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProfessorServiceImpl implements ProfessorService {

    @Autowired
    private ProfessorDAO professorDAO;

    @Transactional
    @Override
    public void save(Professor professor) {
        professorDAO.save(professor);
    }

    @Transactional
    @Override
    public Professor get(int id) {
        return professorDAO.get(id);
    }

    @Transactional
    @Override
    public List<Professor> get() {
        return professorDAO.get();
    }

    @Transactional
    @Override
    public void delete(int id) {
        professorDAO.delete(id);
    }
}
