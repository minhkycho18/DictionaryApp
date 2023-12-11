package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.auth.RegisterRequestDto;
import com.pbl6.dictionaryappbe.exception.DuplicateDataException;
import com.pbl6.dictionaryappbe.persistence.role.Role;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.repository.RoleRepository;
import com.pbl6.dictionaryappbe.repository.UserRepository;
import com.pbl6.dictionaryappbe.utils.AccountStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service("userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email" + username));
    }

    @Override
    public User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email" + userId));
    }

    @Override
    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User createAccount(RegisterRequestDto userRequest) {
        if (userRepository.existsByEmail(userRequest.getEmail())) {
            throw new DuplicateDataException("Email is already registered");
        }
        String passwordEncode = passwordEncoder.encode(userRequest.getPassword());
        Role role = roleRepository.findByName(RoleName.valueOf(userRequest.getRole()));
        User user = User.builder()
                .email(userRequest.getEmail())
                .gender(userRequest.getGender())
                .name(userRequest.getName())
                .password(passwordEncode)
                .role(role)
                .createdAt(LocalDateTime.now())
                .isLock(false)
                .build();
        return userRepository.save(user);
    }

    @Override
    public void updateStatusAccount(Long id, AccountStatus status) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found"));
        if (status == AccountStatus.LOCK) {
            user.setIsLock(true);
        }
        if (status == AccountStatus.UNLOCK) {
            user.setIsLock(false);
        }
        userRepository.save(user);
    }
}
