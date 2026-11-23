package com.bpi.backend.service;

import com.bpi.backend.model.Account;
import com.bpi.backend.model.User;
import com.bpi.backend.repository.AccountRepository;
import com.bpi.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User> login(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(u -> passwordEncoder.matches(password, u.getPasswordHash()));
    }

    @Transactional
    public User register(String username, String rawPassword, String email,
                         String mobile, String firstName, String lastName) {

        if (userRepository.existsByUsername(username))
            throw new IllegalArgumentException("Username already taken.");
        if (userRepository.existsByEmail(email))
            throw new IllegalArgumentException("Email already registered.");

        User user = new User();
        user.setUsername(username);
        user.setPasswordHash(passwordEncoder.encode(rawPassword));
        user.setEmail(email);
        user.setMobile(mobile);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user = userRepository.save(user);

        Account acct = new Account();
        acct.setUser(user);
        acct.setAccountNumber("BPI" + System.currentTimeMillis()
                + UUID.randomUUID().toString().substring(0, 4).toUpperCase());
        acct.setAccountType("SAVINGS");
        acct.setBalance(BigDecimal.ZERO);
        accountRepository.save(acct);

        return user;
    }
}
