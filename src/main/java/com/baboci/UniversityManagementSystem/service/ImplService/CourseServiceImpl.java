package com.baboci.UniversityManagementSystem.service.ImplService;

import com.baboci.UniversityManagementSystem.dao.CourseDAO;
import com.baboci.UniversityManagementSystem.dao.ProfessorDAO;
import com.baboci.UniversityManagementSystem.model.Course;
import com.baboci.UniversityManagementSystem.model.Professor;
import com.baboci.UniversityManagementSystem.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseDAO courseDAO;

    @Autowired
    private ProfessorDAO professorDAO;

    @Transactional
    @Override
    public void save(Course course) {
        courseDAO.save(course);
    }

    @Transactional
    @Override
    public Course get(int id) {
        return courseDAO.get(id);
    }

    @Transactional
    @Override
    public List<Course> get() {
        return courseDAO.get();
    }

    @Transactional
    @Override
    public void delete(int id) {
        courseDAO.delete(id);
    }

    @Override
    public List<Course> search(String keyword) {
        return courseDAO.search(keyword);
    }


}

