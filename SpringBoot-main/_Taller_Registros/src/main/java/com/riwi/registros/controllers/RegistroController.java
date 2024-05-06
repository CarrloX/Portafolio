package com.riwi.registros.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.riwi.registros.entity.Registro;
import com.riwi.registros.services.service_abstract.IRegistroService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1/registros")
@AllArgsConstructor
public class RegistroController {

    @Autowired
    private final IRegistroService registroService;

    @GetMapping
    public ResponseEntity<List<Registro>>getAll(){
        return ResponseEntity.ok(this.registroService.getAll());
    }

    @GetMapping(path="/{id}")
    public ResponseEntity<Registro>get(@PathVariable String id){
        return ResponseEntity.ok(this.registroService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Registro> insert(@RequestBody Registro objRegistro){
        return ResponseEntity.ok(this.registroService.save(objRegistro));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Registro> update(
        @PathVariable String id,
        @RequestBody Registro registro){
            return ResponseEntity.ok(this.registroService.update(id, registro));
        }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id){
        this.registroService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
