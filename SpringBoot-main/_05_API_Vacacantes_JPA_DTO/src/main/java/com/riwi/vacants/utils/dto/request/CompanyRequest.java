package com.riwi.vacants.utils.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder //patorn de diseño para crear clases
@AllArgsConstructor
@NoArgsConstructor
public class CompanyRequest {
    @Size(min = 0,max = 40,message = "el nombre supera la cantidad de caracteres permitidos")
    @NotBlank(message = "el nombre de la compañia es requerido")
    private String name;
    @NotBlank(message = "el nombre de la locacion es requerida")
    private String location;
    @Size(min = 0,max = 15,message = "el contacto supera la cantidad de caracteres permitidos")
    @NotBlank(message = "el numero del contacto es requerido")
    private String contact;
}
