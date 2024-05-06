package com.riwi.registros.services.service_abstract;

import java.util.List;

import com.riwi.registros.entity.Registro;

public interface IRegistroService {

    public Registro save(Registro registro);

    public List<Registro> getAll();
    
    public Registro findById(String id);

    public void delete(String id);

    public Registro update(String id,Registro registro);
}
