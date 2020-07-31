package com.baboci.UniversityManagementSystem.model;

import javax.persistence.*;

@Entity
@Table(name = "tbl_professor")
public class Professor {

    @Column
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String name;
    @Column
    private String gender;
    @Column
    private String department;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString(){
        return "Professor [id=" + id + ", name=" + name + ", gender=" + gender +
                ", department=" + department + "]";
    }
}
