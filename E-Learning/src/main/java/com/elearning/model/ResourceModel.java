package com.elearning.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="resources")
public class ResourceModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(unique=true)
	private String link;

	public long getId() {
		return id;
	}

	public String getLink() {
		return link;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setLink(String link) {
		this.link = link;
	}
	
	
}
