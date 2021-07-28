package com.elearning.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elearning.model.ChatModel;
import com.elearning.repository.ChatRepository;

@RestController
@CrossOrigin
@RequestMapping("/chat")
public class ChatController {

	@Autowired
	ChatRepository chatRepository;
	
	@PostMapping("/message")
	public void sendMessage(@RequestBody ChatModel chat) {
		chatRepository.save(chat);
	}
	
	@PatchMapping("/respond")
	public void responsd(@RequestBody ChatModel chat) {
		chatRepository.save(chat);
	}
	
	@GetMapping("/getMessages/{userId}/{professorId}")
	public List<ChatModel> getMessages(@PathVariable long userId, @PathVariable long professorId){
		return chatRepository.findByUserIdAndProfessorId(userId, professorId);
	}
	
	@GetMapping("/professorMessages/{professorUsername}")
	public List<ChatModel> getProfessorMessages(@PathVariable String professorUsername){
		return chatRepository.findByProfessorUsername(professorUsername);
	}
	
	@DeleteMapping("/clear/{userId}/{professorId}")
	public void deleteMessages(@PathVariable long userId, @PathVariable long professorId) {
		chatRepository.deleteAllByUserIdAndProfessorId(userId, professorId);
	}
}
