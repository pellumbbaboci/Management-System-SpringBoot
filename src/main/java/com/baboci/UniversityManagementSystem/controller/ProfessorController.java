package com.baboci.UniversityManagementSystem.controller;

import com.baboci.UniversityManagementSystem.model.Professor;
import com.baboci.UniversityManagementSystem.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/management")
public class ProfessorController {

    @Autowired
    ProfessorService professorService;


    @PostMapping("/professor")
    public Professor save(@RequestBody Professor professorObj){
        professorService.save(professorObj);
        return professorObj;
    }

    @GetMapping("/list_professor")
    public List<Professor> get(){
        return professorService.get();
    }

    @GetMapping("/professor/{id}")
    public Professor get(@PathVariable int id){
        Professor profObj = professorService.get(id);
        if(profObj == null){
            throw new RuntimeException("There is no Professor object");
        }
        return profObj;
    }

    @DeleteMapping("/professor/{id}")
    public String delete(@PathVariable int id){
        professorService.delete(id);
        return "Professor deleted with id: "+id;
    }


}
