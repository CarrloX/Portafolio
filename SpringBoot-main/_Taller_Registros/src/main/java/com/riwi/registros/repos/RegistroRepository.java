package com.riwi.registros.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.riwi.registros.entity.Registro;

@Repository
public interface RegistroRepository extends JpaRepository<Registro, String>{
    public Registro findByName (String name);
}
