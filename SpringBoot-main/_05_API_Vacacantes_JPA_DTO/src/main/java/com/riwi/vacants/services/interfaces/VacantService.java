package com.riwi.vacants.services.interfaces;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.riwi.vacants.entity.Company;
import com.riwi.vacants.entity.Vacant;
import com.riwi.vacants.repos.CompanyRepository;
import com.riwi.vacants.repos.VacantRepository;
import com.riwi.vacants.utils.dto.request.VacantRequest;
import com.riwi.vacants.utils.dto.response.CompanyToVacantResponse;
import com.riwi.vacants.utils.dto.response.VacantsResponse;
import com.riwi.vacants.utils.enums.StatusVacant;
import com.riwi.vacants.utils.exceptions.IdNotFoundException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VacantService implements IVacantsService {

    @Autowired
    private final VacantRepository vacantRepository;
    @Autowired
    private final CompanyRepository companyRepository;

    @Override
    public Page<VacantsResponse> getAll(int page, int size) {

        if (page < 0)
            page = 0;

        PageRequest pagination = PageRequest.of(page, size);

        // obetenemos todas las vacantes, las iteramos para convertir cada una

        return this.vacantRepository.findAll(pagination)
                .map(vacant -> this.entityToRespons(vacant));
    }

    @Override
    public VacantsResponse create(VacantRequest request) {

        // buscamos la compañia que correponda con el id que esta dentro del request

        Company company = this.companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new IdNotFoundException("Company"));

        // convertimos el request a una instancia de vacante

        Vacant vacant = this.requestToVacant(request, new Vacant());
        vacant.setCompany(company);

        // guardamos en la DB y convertimos la nueva entidad al DTO de respuesta

        return this.entityToRespons(this.vacantRepository.save(vacant));
    }

    @Override
    public VacantsResponse update(VacantRequest request, Long id) {
        // buscamos la vacante
        Vacant vacant = this.find(id);

        // validamos la compañia
        Company company = this.companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new IdNotFoundException("Company"));

        // convertimos el DTO de request
        vacant = this.requestToVacant(request, vacant);
        // agregamos la vancate
        vacant.setCompany(company);
        // agregamos el nuevo status
        vacant.setStatus(request.getStatus());

        return this.entityToRespons(this.vacantRepository.save(vacant));
    }

    @Override
    public void delete(Long id) {
        Vacant vacant = this.find(id);
        this.vacantRepository.delete(vacant);
    }

    @Override
    public VacantsResponse getById(Long id) {
        return this.entityToRespons(this.find(id));
    }

    private VacantsResponse entityToRespons(Vacant entity) {
        // creamos la instancia del DTO del vacante
        VacantsResponse response = new VacantsResponse();

        // copiar toda la enitidad en el DTO
        BeanUtils.copyProperties(entity, response);

        // creamos la instancia del dto de compañia dentro de la vacante
        CompanyToVacantResponse companyDto = new CompanyToVacantResponse();

        // copio todas las propiedades de la compañia que se encuentra dentro de la
        // entidad
        // (vacante) en el dto de repuesta

        BeanUtils.copyProperties(entity.getCompany(), companyDto);

        // agregamos el dto lleno a la respuesta final
        response.setCompany(companyDto);

        return response;
    }

    private Vacant requestToVacant(VacantRequest request, Vacant entity) {

        entity.setTitle(request.getTitle());
        entity.setDescription(request.getDescription());
        entity.setStatus(StatusVacant.ACTIVE);

        return entity;
    }

    private Vacant find(Long id) {
        return this.vacantRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Vacant"));
    }
}
