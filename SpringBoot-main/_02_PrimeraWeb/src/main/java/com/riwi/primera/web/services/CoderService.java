package com.riwi.primera.web.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.riwi.primera.web.entity.Coder;
import com.riwi.primera.web.repository.CoderRepository;

@Service//esta clase sera un servicio
public class CoderService {

    //autowired le indica a springboot que esto es una inyeccion de dependencias

    @Autowired
    private CoderRepository objCoderRepository;

    //servicio para listar todos los coders

    public List<Coder> findAll(){
        return this.objCoderRepository.findAll();
    }

    //metodo para listar los coders de forma paginada

    public Page <Coder> findPaginated(int page, int size){
        if (page <0) {
            page = 1;
        }

        //crear objeto de paginacion

        Pageable objPageable=PageRequest.of(page,size);

        return this.objCoderRepository.findAll(objPageable);
    }

    //servicio para guardar un coder

    public Coder insert(Coder objCoder){
        return this.objCoderRepository.save(objCoder);
    }

    //servicio para actualizar un coder 

    public Coder update(Long id,Coder objCoder){
        //buscar al coder con ese id
        Coder objCoderDB = this.findById(id);

        if (objCoderDB == null) {
            return null;
        }
        //actualizar el coder antiguo 
        objCoderDB = objCoder;

        //guardarlo
        return this.objCoderRepository.save(objCoder);
    }

    public Coder findById(Long id){
        return this.objCoderRepository.findById(id).orElse(null);
    }

    public void delete(Long id){
        this.objCoderRepository.deleteById(id);;
    }
}
