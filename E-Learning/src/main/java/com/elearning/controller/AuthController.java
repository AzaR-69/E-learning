package com.elearning.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.validation.Valid;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.elearning.model.Professor;
import com.elearning.model.User;
import com.elearning.repository.ProfessorRepository;
import com.elearning.repository.UserRepository;
import com.elearning.security.JwtUtil;
import com.elearning.services.JwtResponse;

@RestController
@CrossOrigin
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	ProfessorRepository professorRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	JwtUtil jwtUtil;
	
	@GetMapping("/")
	public String home() {
		return "HOME";
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody User user){
		Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt=jwtUtil.generateJwtToken(authentication);
		return ResponseEntity.ok(new JwtResponse(jwt));
	}
	
	@PostMapping("/signup")
	public void register(@RequestBody User user) throws Exception {
		if (userRepository.existsByUsername(user.getUsername())) {
			throw new Exception("Error: username is already taken");
		}
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new Exception("Error: email is already taken");
		}
		user.setPassword(encoder.encode(user.getPassword()));
		user.setRole("ROLE_USER");
		userRepository.save(user);
	}
	
	@PostMapping("/addProfessor")
	public void addProfessor(@RequestBody Professor professor) {
		User user=new User();
		user.setId(professor.getProfessorId());
		user.setEmail(professor.getEmail());
		user.setName(professor.getName());
		user.setUsername(professor.getUsername());
		user.setPassword(professor.getPassword());
		user.setRole("ROLE_PROFESSOR");
		professor.setStatus(true);
		professorRepository.save(professor);
		userRepository.save(user);
	}
	
	@GetMapping(value = "/getDetails/{token}", produces = MediaType.APPLICATION_JSON_VALUE)
	public String getPayload(@PathVariable String token) throws UnsupportedEncodingException {
		String payload = token.split("\\.")[1];
		return new String(Base64.decodeBase64(payload), "UTF-8");
	}
	
	@PostMapping("/addAdmin")
	public void addAdmins(@RequestBody User user) throws Exception {
		if (userRepository.existsByUsername(user.getUsername())) {
			throw new Exception("Error: username is already taken");
		}
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new Exception("Error: email is already taken");
		}
		user.setPassword(encoder.encode(user.getPassword()));
		user.setRole("ROLE_ADMIN");
		userRepository.save(user);
	}
	
	@GetMapping("/getUsers")
	public List<User> getUsers(){
		return userRepository.getUsers();
	}
	
	@PatchMapping("/updateUser")
	public void update(@RequestBody User user) {
		userRepository.save(user);
	}
	
	
	@DeleteMapping("/deleteUser/{email}")
	public void delete(@PathVariable String email) {
		userRepository.deleteByEmail(email);
		if(professorRepository.existsByEmail(email)) {
			professorRepository.deleteByEmail(email);
		}
	}
}
