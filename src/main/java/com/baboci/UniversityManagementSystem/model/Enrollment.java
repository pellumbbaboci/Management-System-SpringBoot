package com.baboci.UniversityManagementSystem.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

enum Grade{
    A,B,C,D,E,F
}

@Entity
@Table(name = "tbl_enrollment")
@Getter
@Setter
public class Enrollment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_id")
    private Integer id;

    @Column(name = "grade")
    private Grade grade;

    @Column(name = "student_dateOfReg")
    private Date dateOfRegistration;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name="course_id")
    private Course courseID;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name="student_id")
    private Student studentID;

    public Enrollment(){

    }

    public Enrollment(Grade grade, Date dateOfRegistration, Course courseID, Student studentID) {
        this.grade = grade;
        this.dateOfRegistration = dateOfRegistration;
        this.courseID = courseID;
        this.studentID = studentID;
    }

    @Override
    public String toString(){
        return "Enrollment [id=" + id + ", Course ID=" + courseID +
                ", Student ID=" + studentID + "Grade="+ grade +"]";
    }

}
