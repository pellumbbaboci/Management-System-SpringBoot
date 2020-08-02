package com.baboci.UniversityManagementSystem.service.ImplService;

import com.baboci.UniversityManagementSystem.dao.StudentDAO;
import com.baboci.UniversityManagementSystem.model.Student;
import com.baboci.UniversityManagementSystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
    public List<Student> get() {
        return studentDAO.get();
    }

    @Transactional
    @Override
    public void delete(int id) {
        studentDAO.delete(id);
    }
}
