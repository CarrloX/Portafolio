package com.riwi.operaciones.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.riwi.operaciones.entitys.Operations;

@RestController
@RequestMapping("/api/v1/operations")
public class OperationsController {
    
    @PostMapping(path = "/add")
    public String add(@RequestBody Operations objOperations){
        String message = String.valueOf(objOperations.getNum1()+objOperations.getNum2());

        return objOperations.getNum1()+" + " + objOperations.getNum2() +" = " + message;
    }

    @PostMapping(path = "/rest")
    public String rest(@RequestBody Operations objOperations){
        String message = String.valueOf(objOperations.getNum1()-objOperations.getNum2());

        return objOperations.getNum1()+" - " + objOperations.getNum2() +" = " + message;
    }

    @PostMapping(path = "/mult")
    public String mult(@RequestBody Operations objOperations){
        String message = String.valueOf(objOperations.getNum1()*objOperations.getNum2());

        return objOperations.getNum1()+" x " + objOperations.getNum2() +" = " + message;
    }

    @PostMapping(path = "/div")
    public String div(@RequestBody Operations objOperations){

        if (objOperations.getNum2()== 0) {
            return "No se pueden dividir numeros entre 0";
        }

        String message = String.valueOf(objOperations.getNum1()/objOperations.getNum2());

        return objOperations.getNum1()+" / " + objOperations.getNum2() +" = " + message;
    }
}
