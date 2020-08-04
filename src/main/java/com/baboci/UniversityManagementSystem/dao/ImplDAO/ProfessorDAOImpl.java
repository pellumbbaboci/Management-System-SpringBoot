package com.baboci.UniversityManagementSystem.dao.ImplDAO;

import com.baboci.UniversityManagementSystem.dao.ProfessorDAO;
import com.baboci.UniversityManagementSystem.model.Professor;
import org.hibernate.query.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class ProfessorDAOImpl implements ProfessorDAO {

    @Autowired
    private EntityManager entityManager;

    @Override
    public void save (Professor professor){
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(professor);
    }

    @Override
    public Professor get(int id){
        Session currentSession = entityManager.unwrap(Session.class);
        Professor profObj = currentSession.get(Professor.class,id);
        return profObj;
    }

    @Override
    public List<Professor> get(){
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Professor> query = currentSession.createQuery("from Professor", Professor.class);
        List<Professor> list = query.getResultList();
        return list;
    }

    @Override
    public void delete(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Professor profObj = currentSession.get(Professor.class, id);
        currentSession.delete(profObj);
    }

}
