package com.baboci.UniversityManagementSystem.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tbl_student")
@Getter
@Setter
public class Student {

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

    @Override
    public String toString(){
        return "Student [id=" + id + ", name=" + name + ", gender=" + gender +
                ", department=" + department + "]";
    }
}
