package com.baboci.UniversityManagementSystem.dao.ImplDAO;

import com.baboci.UniversityManagementSystem.dao.StudentDAO;
import com.baboci.UniversityManagementSystem.model.Student;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import org.hibernate.query.Query;
import java.util.List;

@Repository
public class StudentDAOImpl implements StudentDAO {

    @Autowired
    EntityManager entityManager;

    @Override
    public void save(Student student) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(student);
    }

    @Override
    public Student get(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Student studentObj = currentSession.get(Student.class,id);
        return studentObj;
    }

    @Override
    public List<Student> get() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("from Student", Student.class);
        List<Student> list = query.getResultList();
        return list;
    }

    @Override
    public void delete(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Student studentObj = currentSession.get(Student.class, id);
        currentSession.delete(studentObj);
    }

    @Override
    public List<Student> search(String keyword) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Student> query = currentSession.createQuery("FROM Student s WHERE s.name LIKE :namestudent OR s.gender LIKE :gender OR s.department LIKE :dep ", Student.class)
                .setParameter("namestudent","%"+keyword+"%")
                .setParameter("dep","%"+keyword+"%")
                .setParameter("gender","%"+keyword+"%");

        List<Student> list = query.getResultList();
        return list;
    }
}
