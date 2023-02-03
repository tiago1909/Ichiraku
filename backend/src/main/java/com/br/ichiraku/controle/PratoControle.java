package com.br.ichiraku.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.br.ichiraku.Prato;
import com.br.ichiraku.servico.PratoServico;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class PratoControle {
    
    @Autowired
    private PratoServico ps;

    @PostMapping("/prato/adicionar")
    public ResponseEntity<?> criar(@RequestBody Prato prato){
        return ps.criar(prato);
    }

    @GetMapping("/prato/mostrar/{id}")
    public ResponseEntity<?> mostrar(@PathVariable Integer id){
        return ps.mostrar(id);
    }

    @DeleteMapping("prato/excluir/{id}")
    public ResponseEntity<?> excluir(@PathVariable Integer id){
        return ps.exluir(id);
    }

    @PutMapping("prato/editar")
    public ResponseEntity<?> editar(@RequestBody Prato prato){
        return ps.editar(prato);
    }
}
