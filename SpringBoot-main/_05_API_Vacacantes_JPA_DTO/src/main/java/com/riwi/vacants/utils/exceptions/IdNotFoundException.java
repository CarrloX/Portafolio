package com.riwi.vacants.utils.exceptions;

//runtimeException es la clase general de errores de java
//la utilizaremos para utilizar su constructor y generar errores

public class IdNotFoundException extends RuntimeException{
    private static final String ERROR_MESSAGE = "No hay registros en la entidad %s con el id suministrado";


    //utilizamos el constructor de runtime exception y enviamos el mensaje inyectando el nombre de la entidad

    public IdNotFoundException(String nameEntity){
        super(String.format(ERROR_MESSAGE, nameEntity));
    }
}
