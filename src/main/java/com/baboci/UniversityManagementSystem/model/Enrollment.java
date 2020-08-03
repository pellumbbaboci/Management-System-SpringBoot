package com.baboci.UniversityManagementSystem.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

enum Grade{
    A,B,C,D,E,F
}

@Entity
@Table(name = "tbl_enrollment")
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_id")
    private Integer id;

    @Column(name = "grade")
    private Grade grade;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name="course_id")
    private Course courseID;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name="student_id")
    private Student studentID;


    public Course getCourseID() {
        return courseID;
    }

    public void setCourseID(Course courseID) {
        this.courseID = courseID;
    }

    public Student getStudentID() {
        return studentID;
    }

    public void setStudentID(Student studentID) {
        this.studentID = studentID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    @Override
    public String toString(){
        return "Enrollment [id=" + id + ", Course ID=" + courseID +
                ", Student ID=" + studentID + "Grade="+ grade +"]";
    }

}