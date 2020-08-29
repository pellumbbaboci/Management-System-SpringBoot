package com.baboci.UniversityManagementSystem.model;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(	name = "users",
		uniqueConstraints = { 
			@UniqueConstraint(columnNames = "username")
		})
public class User implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 20)
	private String username;

	@NotBlank
	@Size(max = 120)
	private String password;

	//bi-directional many-to-one association to Instructor
//	@OneToMany(mappedBy="user")
//	private Set<Professor> professors;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Professor professor;

	//bi-directional many-to-one association to Student
//	@OneToMany(mappedBy="user")
//	private Set<Student> students;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Student student;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles",
				joinColumns = @JoinColumn(name = "user_id"),
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	public User() {
	}

	public User(String username,  String password) {
		this.username = username;
		this.password = password;
	}

	public User(@NotBlank @Size(max = 20) String username, @NotBlank @Size(max = 120) String password, Professor professor, Student student) {
		this.username = username;
		this.password = password;
		this.professor = professor;
		this.student = student;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
