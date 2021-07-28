package com.elearning.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.elearning.model.Professor;

@Transactional
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
	Optional<Professor> findByName(String name);
	void deleteByProfessorId(long professorId);
	
	@Query(value="SELECT id_card from professors WHERE professor_id=?1",nativeQuery=true)
	byte[] getIdCardById(long professorId);
	
	boolean existsByEmail(String email);
	
	@Modifying
	void deleteByEmail(String email);
}
