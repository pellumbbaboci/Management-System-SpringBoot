package com.baboci.UniversityManagementSystem.repository;

import com.baboci.UniversityManagementSystem.model.ERole;
import com.baboci.UniversityManagementSystem.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}
