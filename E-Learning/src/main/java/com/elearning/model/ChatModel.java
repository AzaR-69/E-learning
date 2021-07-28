package com.elearning.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="chat")
public class ChatModel {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private long userId;
	
	private long professorId;
	
	private String username;
	
	private String professorUsername;
	
	private String message;
	
	private String response;

	
	public String getProfessorUsername() {
		return professorUsername;
	}

	public void setProfessorUsername(String professorUsername) {
		this.professorUsername = professorUsername;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public long getId() {
		return id;
	}

	public long getUserId() {
		return userId;
	}

	public long getProfessorId() {
		return professorId;
	}

	public String getMessage() {
		return message;
	}

	public String getResponse() {
		return response;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public void setProfessorId(long professorId) {
		this.professorId = professorId;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public void setResponse(String response) {
		this.response = response;
	}
	
	
}
