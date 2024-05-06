package com.riwi.hola.mundo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller

@RequestMapping("/controller")

public class holamundo {
        
        private static final String Int = null;

        @GetMapping("/holamundo")
        @ResponseBody
        public String mostrarMensaje(){
            return "Hola Mundo";
        }

        @GetMapping("/sumar")
        @ResponseBody
        public String sumar(){
            int a = 2;
            int b = 4;
            return String.valueOf(a+b);
        }
}
