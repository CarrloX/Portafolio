package com.tareasDiarias.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tareasDiarias.demo.entity.HomeWork;

@Repository
public interface HomeWorkRepository extends JpaRepository<HomeWork, Long>{

}
