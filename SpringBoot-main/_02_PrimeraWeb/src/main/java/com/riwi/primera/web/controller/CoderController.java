package com.riwi.primera.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.riwi.primera.web.entity.Coder;
import com.riwi.primera.web.services.CoderService;

@Controller
@RequestMapping("/")
public class CoderController {
    @Autowired
    private CoderService objCoderService;

    //metodo para mostrar la lista y enviarle la lista de coders

    @GetMapping
    public String showViewGetAll(Model objModel,
     @RequestParam(defaultValue = "1")int page
    ,@RequestParam(defaultValue = "3")int size){
        //llamo al servicio y guardo la vista de coders
        Page<Coder> list=this.objCoderService.findPaginated(page-1,size);
        objModel.addAttribute("coderList", list);//llave-valor
        objModel.addAttribute("currentPage", page);
        objModel.addAttribute("totalPages", list.getTotalPages());

        return "viewCoder";
    }

    @GetMapping("/form")
    public String showViewFormCoder(Model objModel){
        
        objModel.addAttribute("coder",new Coder());
        objModel.addAttribute("action","/coder/create");
        return "viewForm";
    }

    //metodo para mostrar el formulario de actualizar un coder 

    @GetMapping("/update/{id}")
    public String showFormUpdate(@PathVariable Long id,Model objModel){
        Coder objCoderFind = this.objCoderService.findById(id);
        objModel.addAttribute("coder",objCoderFind);
        objModel.addAttribute("action","/edit/"+id);
        return "viewForm";
    }

    //metodo para actualizar 
    @PostMapping("/edit/{id}")
    public String updateCoder(@PathVariable Long id, @ModelAttribute Coder objCoder){
        this.objCoderService.update(id, objCoder);

        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String deleteCoder(@PathVariable Long id){
        this.objCoderService.delete(id);
        return "redirect:/";
    }

    //metodo para insertar un coder mediante el verbo POST
    //model atribute se encarga de obtener la informacion enviada desde la vista
    @PostMapping("/coder/create")
    public String createCoder(@ModelAttribute Coder objCoder){
        //llamamos al servicio enviandole el coder al insertar
            this.objCoderService.insert(objCoder);
            return "redirect:/";
    }
}
