package com.elearning.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.elearning.model.ChatModel;


@Transactional
public interface ChatRepository extends JpaRepository<ChatModel, Long> {
	List<ChatModel> findByUserIdAndProfessorId(long userId,long ProfessorId);
	
	@Query(value="SELECT * FROM chat WHERE professor_username=?1 GROUP BY username",nativeQuery=true)
	
	List<ChatModel> findByProfessorUsername(String professorUsername);
	@Modifying
	void deleteAllByUserIdAndProfessorId(long userId,long ProfessorId);
}
