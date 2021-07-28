package com.elearning.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="professors")
public class Professor {

	@Id
	private long professorId;
	
	@Column(nullable=true,length=30)
	private String name;
	
	@Column(unique=true,nullable=true,length=30)
	private String email;
	
	@Column(nullable=true,length=5000)
	private byte[] idCard;
	
	@Column(nullable=true,length=50)
	private String university;
	
	@Column(nullable=true,length=50)
	private String department;
	
	@Column(unique=true,nullable=true,length=25)
	private String username;
	
	private String password;
	
	private String description;
	
	private boolean status;

	public long getProfessorId() {
		return professorId;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public byte[] getIdCard() {
		return idCard;
	}

	public String getUniversity() {
		return university;
	}

	public String getDepartment() {
		return department;
	}

	public void setUniversity(String university) {
		this.university = university;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public void setProfessorId(long professorId) {
		this.professorId = professorId;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setIdCard(byte[] idCard) {
		this.idCard = idCard;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	
}
