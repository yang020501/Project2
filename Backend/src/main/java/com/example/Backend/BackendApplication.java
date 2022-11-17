package com.example.Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {

		SpringApplication.run(BackendApplication.class, args);
	}

	// nhớ kỹ bật cors khi làm spring boot
//	@EnableWebSecurity
//	public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//
////		@Override
////		protected void configure(HttpSecurity http) throws Exception {
////			http.cors().and().csrf().disable();
////			http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
////			http.authorizeHttpRequests().anyRequest().permitAll();
////			http.addFilter(null);
////		}
//
//	}

//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**").allowedMethods("GET", "POST", "PATCH", "DELETE")
//						.allowedOrigins("*").allowedHeaders("*");
//			}
//		};
//	}

}
