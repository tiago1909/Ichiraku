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

import com.br.ichiraku.entities.Comentario;
import com.br.ichiraku.repositories.ComentarioRepository;
import com.br.ichiraku.servico.ComentarioServico;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class ComentarioControle {
    
    @Autowired
    private ComentarioServico cs;

    @Autowired
    private ComentarioRepository cr;

    @PostMapping("/comentario/criar")
    public ResponseEntity<?> criar(@RequestBody Comentario comentario){
        return cs.criar(comentario);
    }

    @GetMapping("/comentario/mostrar/{id}")
    public Iterable<Comentario> mostrar(@PathVariable Integer id){
        return cs.mostrar(id);
    }
}
