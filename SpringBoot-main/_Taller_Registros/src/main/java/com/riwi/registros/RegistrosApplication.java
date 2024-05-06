package com.riwi.registros;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RegistrosApplication {

	public static void main(String[] args) {
		SpringApplication.run(RegistrosApplication.class, args);
	}

}


//use taller_registros

//desc registro
//SELECT * FROM registro;

//INSERT INTO registro (id, name, fecha, ubicacion, capacidad) 
//VALUES (1, 'Zapato', '2025-12-12', 'medellin', 24);

//INSERT INTO registro (id, name, fecha, ubicacion, capacidad) 
//VALUES (2, 'camisa', '2026-11-12', 'cauca', 46);