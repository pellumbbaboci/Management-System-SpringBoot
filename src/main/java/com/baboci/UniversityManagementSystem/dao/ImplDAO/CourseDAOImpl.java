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
        Query<Course> query = currentSession.createQuery("from tbl_course", Course.class);
        List<Course> list = query.getResultList();
        return list;
    }

    @Override
    public void delete(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Course courseObj = currentSession.get(Course.class, id);
        currentSession.delete(courseObj);
    }
}
