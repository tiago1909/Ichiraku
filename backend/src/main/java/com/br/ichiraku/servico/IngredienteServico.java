package com.br.ichiraku.servico;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.ichiraku.entities.Ingrediente;
import com.br.ichiraku.repositories.IngredienteRepository;

@Service
public class IngredienteServico {
    
    @Autowired
    private IngredienteRepository ir;

    public ResponseEntity<?> criar(Ingrediente ingrediente){
        ir.save(ingrediente);
        return new ResponseEntity<>("Salvo!", HttpStatus.CREATED);
    }

    public List<Ingrediente> mostrar(Integer id){
        List<Ingrediente> ingredientes = ir.findAllByPratoId(id);
        return ingredientes;
    }
}
