package com.pbl6.dictionaryappbe.configuration;

import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.service.UserServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public UserDetailsService userDetailsService(UserServiceImpl userService) {
        return userService;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserServiceImpl userService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return authenticationProvider;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*");
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT", "PATCH"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(withDefaults())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.GET, "/vocabs/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/vocabs/**").hasAnyAuthority(forAdminAndManager())
                        .requestMatchers(HttpMethod.PUT, "/vocabs/**").hasAnyAuthority(forAdminAndManager())
                        .requestMatchers(HttpMethod.DELETE, "/vocabs/**").hasAnyAuthority(forAdminAndManager())
                        .requestMatchers(HttpMethod.GET, "/wordlists/**").permitAll()
                        .requestMatchers("/wordlists/**").hasAnyAuthority(forAllRole())
                        .requestMatchers("/subcategories/types").permitAll()
                        .requestMatchers(
                                "/roles/**",
                                "/users/register",
                                "/users/authenticate",
                                "/v3/api-docs/**",
                                "/swagger-ui/**").permitAll()
                        .requestMatchers("/users/change-password").hasAnyAuthority(forAllRole())
                        .requestMatchers(HttpMethod.PATCH, "/users").hasAnyAuthority(forAllRole())
                        .requestMatchers("/users/me/**").hasAnyAuthority(forAllRole())
                        .requestMatchers("/users/**").hasAnyAuthority(forAdminAndManager())
                        .requestMatchers("/leitners/**").hasAnyAuthority(forAllRole())
                        .requestMatchers("/managements/**").hasAnyAuthority(forAdminAndManager())
                        .anyRequest()
                        .authenticated()
                )
                .httpBasic(withDefaults())
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );
        return http.build();
    }

    public String[] forAdminAndManager() {
        return new String[]{RoleName.ADMIN.toString(), RoleName.CONTENT_MANAGER.toString()};
    }

    public String[] forAllRole() {
        return new String[]{RoleName.ADMIN.toString(), RoleName.CONTENT_MANAGER.toString(), RoleName.LEARNER.toString()};
    }
}
