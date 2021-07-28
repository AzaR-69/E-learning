package com.elearning.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.elearning.model.User;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
	boolean existsByEmail(String email);
	boolean existsByUsername(String username);
	
	@Query(value="SELECT * FROM users as u WHERE u.role='ROLE_USER' OR u.role='ROLE_PROFESSOR'",nativeQuery=true)
	List<User> getUsers();
	
	@Modifying
	void deleteByEmail(String email);
}
