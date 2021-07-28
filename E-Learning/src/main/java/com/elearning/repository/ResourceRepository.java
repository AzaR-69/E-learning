package com.elearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elearning.model.ResourceModel;

public interface ResourceRepository extends JpaRepository<ResourceModel, Long> {

}
