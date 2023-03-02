package com.br.ichiraku.controle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.br.ichiraku.entities.Ingrediente;
import com.br.ichiraku.servico.IngredienteServico;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class IngredienteControle {
    
    @Autowired
    private IngredienteServico is;

    @PostMapping("/ingrediente/criar")
    public ResponseEntity<?> criar(@RequestBody Ingrediente ingrediente){
        return is.criar(ingrediente);
    }

    @GetMapping("/ingredientes/mostrar/{id}")
    public List<Ingrediente> mostrar(@PathVariable Integer id){
        return is.mostrar(id);
    }
}
