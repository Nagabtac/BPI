package com.bpi.backend.repository;

import com.bpi.backend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUserIdAndIsActiveTrue(Long userId);
}
