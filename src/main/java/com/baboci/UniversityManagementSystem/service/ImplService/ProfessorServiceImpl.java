package com.baboci.UniversityManagementSystem.service.ImplService;

import com.baboci.UniversityManagementSystem.dao.ProfessorDAO;
import com.baboci.UniversityManagementSystem.model.Course;
import com.baboci.UniversityManagementSystem.model.Professor;
import com.baboci.UniversityManagementSystem.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
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
    public Page<Professor> get(Pageable pageable) {
        return professorDAO.get(pageable);
    }

    @Transactional
    @Override
    public void delete(int id) {
        professorDAO.delete(id);
    }

    @Transactional
    @Override
    public List<Professor> search(String keyword) {
        return professorDAO.search(keyword);
    }

    @Override
    @Transactional(readOnly = true)
    public void addCourse(Course course, int ID){
        Professor professor = professorDAO.get(ID);
        System.out.println("asdasdas");
        List<Course> courseList = professor.getCourseList();
//        if(courseList == null){
//            courseList = new ArrayList<>();
//        }
        courseList.add(course);
        course.setProfessorID(professor);
    }
}
