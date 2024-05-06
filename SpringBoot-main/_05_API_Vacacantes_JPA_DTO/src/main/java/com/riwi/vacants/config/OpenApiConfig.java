package com.riwi.vacants.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

//configuracion de swagger

@Configuration
@OpenAPIDefinition(info = @Info(
title = "API para administrar empresas y vacantes de empresas",
version ="1.0",
description = "Docuemntacion Api de administracion de empresas y vacantes"))
public class OpenApiConfig {

}
