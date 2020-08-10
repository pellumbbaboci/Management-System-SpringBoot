package com.baboci.UniversityManagementSystem.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tbl_professor")
@Getter
@Setter
public class Professor {

    @Column(name = "professor_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "professor_name")
    private String name;
    @Column(name = "professor_gender")
    private String gender;
    @Column(name = "professor_dep")
    private String department;

    @OneToMany(mappedBy="professorID",
            cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.DETACH})
    private List<Course> courseList;

    @Override
    public String toString(){
        return "Professor [id=" + id + ", name=" + name + ", gender=" + gender +
                ", department=" + department + "]";
    }
}
