package com.baboci.UniversityManagementSystem.service.ImplService;

import com.baboci.UniversityManagementSystem.dao.StudentDAO;
import com.baboci.UniversityManagementSystem.model.Student;
import com.baboci.UniversityManagementSystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentDAO studentDAO;

    @Transactional
    @Override
    public void save(Student student) {
        studentDAO.save(student);
    }

    @Transactional
    @Override
    public Student get(int id) {
        return studentDAO.get(id);
    }

    @Transactional
    @Override
    public Page<Student> get(Pageable pageable) {
        return studentDAO.get(pageable);
    }

    @Transactional
    @Override
    public void delete(int id) {
        studentDAO.delete(id);
    }

    @Transactional
    @Override
    public List<Student> search(String keyword) {
        return studentDAO.search(keyword);
    }
}
