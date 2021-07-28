package com.elearning.model;


import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;

@RestController 
@RequestMapping(path="send")
@CrossOrigin
public class MailModel {

	@Autowired
	private JavaMailSender javaMailSender;
	
//	@RequestMapping("/email")
//    String home() {
//        try {
//            successMail();
//            return "Email Sent!";
//        }catch(Exception ex) {
//            return "Error in sending email: "+ex;
//        }
//    }
	
	@RequestMapping("/approved/{email}")
	public String success(@PathVariable String email) {
		try {
            successMail(email);
            return "Email Sent!";
        }catch(Exception ex) {
            return "Error in sending email: "+ex;
        }
	}
	
	@RequestMapping("/rejected/{email}")
	public String rejected(@PathVariable String email) {
		try {
            rejectedMail(email);
            return "Email Sent!";
        }catch(Exception ex) {
            return "Error in sending email: "+ex;
        }
	}
	
	public void successMail(String email) throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
         
        helper.setTo(email);
        helper.setText("Your request has been accepted and your account is activated!");
        helper.setSubject("Professor Request Status");
         
        javaMailSender.send(message);
	}
	
	public void rejectedMail(String email) throws MessagingException {
		MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
         
        helper.setTo(email);
        helper.setText("Your request is rejected due to incorrect details. The data you entered and the data in ID card does not match.Please try again later");
        helper.setSubject("Professor Request Status");
         
        javaMailSender.send(message);
	}
}
