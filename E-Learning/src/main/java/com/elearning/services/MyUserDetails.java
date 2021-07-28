package com.elearning.services;


import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.elearning.model.User;


public class MyUserDetails implements UserDetails{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long id;
	private String name;
	private String email;
	private String username;
	private String password;
	private String role;
	private Collection<? extends GrantedAuthority> authorities;
	

	public MyUserDetails(long id, String name, String email, String username, String password, String role,
			Collection<? extends GrantedAuthority> authorities) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.username = username;
		this.password = password;
		this.role = role;
		this.authorities = authorities;
	}


	static MyUserDetails build(User user)
	{
		List<GrantedAuthority> authorities=Arrays.asList(new SimpleGrantedAuthority(user.getRole()));
		
		return new MyUserDetails(
				user.getId(),
				user.getName(),
				user.getEmail(),
				user.getUsername(),
				user.getPassword(),
				user.getRole(),
				authorities);
		
	} 	
	

	
	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getRole() {
		return role;
	}

	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
