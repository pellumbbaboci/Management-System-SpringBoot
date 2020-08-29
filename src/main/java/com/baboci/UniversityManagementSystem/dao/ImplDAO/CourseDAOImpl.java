package com.baboci.UniversityManagementSystem.dao.ImplDAO;

import com.baboci.UniversityManagementSystem.dao.CourseDAO;
import com.baboci.UniversityManagementSystem.model.Course;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class CourseDAOImpl implements CourseDAO {

    @Autowired
    private EntityManager entityManager;

    @Override
    public void save(Course course) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(course);
    }

    @Override
    public Course get(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Course courseObj = currentSession.get(Course.class,id);
        return courseObj;
    }

    @Override
    public List<Course> get() {
        Session currentSession = entityManager.unwrap(Session.class);
        //Query<Course> query = currentSession.createNativeQuery("select * from tbl_course", Course.class);

        Query<Course> query = currentSession.createNativeQuery("SELECT * FROM tbl_course c JOIN tbl_professor p ON p.professor_id = c.prof_id", Course.class);
        List<Course> list = query.getResultList();
        return list;
    }

    @Override
    public void delete(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Course courseObj = currentSession.get(Course.class, id);
        currentSession.delete(courseObj);
    }

    @Override
    public List<Course> search(String keyword) {
        Session currentSession = entityManager.unwrap(Session.class);
//        Query<Professor> query = currentSession.createQuery("from Professor p where p.name = :name ", Professor.class)
//        .setParameter("name",name);
        Query<Course> query = currentSession.createQuery("FROM Course c WHERE c.courseName LIKE :course_name OR c.department LIKE :dep OR c.professorName LIKE :professorName ", Course.class)
                .setParameter("course_name","%"+keyword+"%")
                .setParameter("dep","%"+keyword+"%")
                .setParameter("professorName","%"+keyword+"%");

        List<Course> list = query.getResultList();
        return list;
    }
}
