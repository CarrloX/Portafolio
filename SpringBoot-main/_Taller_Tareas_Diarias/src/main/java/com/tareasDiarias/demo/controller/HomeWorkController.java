package com.tareasDiarias.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.tareasDiarias.demo.entity.HomeWork;
import com.tareasDiarias.demo.services.HomeWorkService;

@Controller
@RequestMapping("/")
public class HomeWorkController {
    @Autowired
    private HomeWorkService objHomeWorkService;

    @GetMapping
    public String showViewGetAll (Model objModel,
    @RequestParam(defaultValue = "1")int page
    ,@RequestParam(defaultValue = "3")int size){
        Page<HomeWork> list=this.objHomeWorkService.findPaginated(page-1, size);
        objModel.addAttribute("homeworkList", list);
        objModel.addAttribute("currentPage", page);
        objModel.addAttribute("totalPages", list.getTotalPages());
        return "viewHomeWorks";
    }
}
