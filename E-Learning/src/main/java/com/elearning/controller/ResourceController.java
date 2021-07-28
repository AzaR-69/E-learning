package com.elearning.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elearning.model.ResourceModel;
import com.elearning.repository.ResourceRepository;

@RestController
@CrossOrigin
@RequestMapping("/resource")
public class ResourceController {

	@Autowired
	ResourceRepository resourceRepository;
	
	@GetMapping("")
	public List<ResourceModel> getLinks(){
		return resourceRepository.findAll();
	}
	
	@PostMapping("/add")
	public void addLink(@RequestBody ResourceModel resource) {
		resourceRepository.save(resource);
	}
}
