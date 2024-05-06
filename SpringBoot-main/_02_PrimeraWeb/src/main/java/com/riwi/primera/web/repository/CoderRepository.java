package com.riwi.primera.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.riwi.primera.web.entity.Coder;

@Repository
public interface CoderRepository extends JpaRepository<Coder, Long> {
 
    
}
