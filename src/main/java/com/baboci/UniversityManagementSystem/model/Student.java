package com.baboci.UniversityManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tbl_student")
@Getter
@Setter
public class Student implements Serializable {

    @Column(name = "student_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "student_name")
    private String name;
    @Column(name = "student_gender")
    private String gender;
    @Column(name = "student_dep")
    private String department;

    @OneToMany(mappedBy="studentID",
            cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.DETACH})
    private List<Enrollment> enrollments;

    //bi-directional many-to-one association to User
//    @JsonIgnore
//    @ManyToOne
//    @JoinColumn(name="user_id")
//    private User user;
    @OneToOne(fetch = FetchType.LAZY, cascade=CascadeType.ALL,
            mappedBy = "student")
    private User user;

    public Student(){

    }

    public Student(String name, String gender, String department, List<Enrollment> enrollments) {
        this.name = name;
        this.gender = gender;
        this.department = department;
        this.enrollments = enrollments;
    }

    @Override
    public String toString(){
        return "Student [id=" + id + ", name=" + name + ", gender=" + gender +
                ", department=" + department + "]";
    }
}
