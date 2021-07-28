package com.elearning.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.elearning.model.Professor;
import com.elearning.repository.ProfessorRepository;

@RestController
@CrossOrigin
@RequestMapping(path="professors")
public class ProfessorController {

	@Autowired
	ProfessorRepository professorRepository;

	@Autowired
	PasswordEncoder encoder;
	
	
	@GetMapping(value="")
	public List<Professor> getProfessor(){
		return professorRepository.findAll();
	}
	
	@PostMapping(value="/addId/{id}")
	public void addIdCard(@RequestParam("imageFile") MultipartFile file,@PathVariable Long id)
			throws Exception {
		Professor professor=new Professor();
		professor.setProfessorId(id);
		professor.setIdCard(compressBytes(file.getBytes()));
		professorRepository.save(professor);
	}
	
	@PatchMapping(value="/add")
	public void addProfessor(@RequestBody Professor professor){
		Professor existing=professorRepository.getById(professor.getProfessorId());
		professor.setPassword(encoder.encode(professor.getPassword()));
		professor.setIdCard(existing.getIdCard());
		professorRepository.save(professor);
	}
	
	@GetMapping("/getImage/{professorId}")
	public byte[] getImageById(@PathVariable Long professorId) throws Exception {
		byte[] image=professorRepository.getIdCardById(professorId);
		return decompressBytes(image);
	}

	@GetMapping("/getById/{professorId}")
	public Professor getProfessor(@PathVariable Long professorId ) throws Exception {
		return professorRepository.findById(professorId).orElseThrow(()-> new Exception ("Not Found"));
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable Long id)
			throws IOException {
		professorRepository.deleteById(id);
	}


	public static byte[] compressBytes(byte[] data) {
		Deflater deflater = new Deflater();
		deflater.setInput(data);
		deflater.finish();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		while (!deflater.finished()) {
			int count = deflater.deflate(buffer);
			outputStream.write(buffer, 0, count);
		}
		try {
			outputStream.close();
		} catch (IOException e) {
		}
		System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
		return outputStream.toByteArray();
	}

	public static byte[] decompressBytes(byte[] data) {
		Inflater inflater = new Inflater();
		inflater.setInput(data);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		try {
			while (!inflater.finished()) {
				int count = inflater.inflate(buffer);
				outputStream.write(buffer, 0, count);
			}
			outputStream.close();
		} catch (IOException ioe) {
		} catch (DataFormatException e) {
		}
		return outputStream.toByteArray();
	}
}
