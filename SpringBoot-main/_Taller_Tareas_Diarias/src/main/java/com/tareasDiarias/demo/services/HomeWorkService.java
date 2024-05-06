package com.tareasDiarias.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tareasDiarias.demo.entity.HomeWork;
import com.tareasDiarias.demo.repository.HomeWorkRepository;

@Service
public class HomeWorkService {

    @Autowired
    private HomeWorkRepository objHomeWorkRepository;

    public List<HomeWork>findAll(){
        return this.objHomeWorkRepository.findAll();
    }

    public Page<HomeWork> findPaginated(int page, int size){
        if (page>0) {
            page=1;
        }

        Pageable objPageable=PageRequest.of(page, size);

        return this.objHomeWorkRepository.findAll(objPageable);
    }

    public HomeWork insert(HomeWork objHomeWork){
        return this.objHomeWorkRepository.save(objHomeWork);
    }

    public HomeWork update (Long id,HomeWork objHomeWork){
        HomeWork objHomeWorkDB = this.findById(id);

        if (objHomeWorkDB == null) {
            return null;
        }
        objHomeWorkDB = objHomeWork;

        return this.objHomeWorkRepository.save(objHomeWork);
    }

    public HomeWork findById(Long id){
        return this.objHomeWorkRepository.findById(id).orElse(null);
    }

    public void delete(Long id){
        this.objHomeWorkRepository.deleteById(id);
    }

}
