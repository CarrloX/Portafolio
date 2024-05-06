package com.riwi.registros.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.riwi.registros.entity.Registro;
import com.riwi.registros.repos.RegistroRepository;
import com.riwi.registros.services.service_abstract.IRegistroService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegistroService implements IRegistroService{

    private final RegistroRepository registroRepository;

    @Override
    public void delete(String id) {
        Registro registroFind =this.registroRepository.findById(id).orElseThrow();
        this.registroRepository.delete(registroFind);
    }

    @Override
    public Registro findById(String id) {
        return this.registroRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Registro> getAll() {
        return this.registroRepository.findAll();
    }

    @Override
    public Registro save(Registro registro) {
        return this.registroRepository.save(registro);
    }

    @Override
    public Registro update(String id, Registro objRegistro) {
       this.registroRepository.findById(id).orElseThrow();
       objRegistro.setId(id);
       return this.registroRepository.save(objRegistro);
    }

    
}
