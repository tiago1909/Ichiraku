package com.br.ichiraku.controle;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.br.ichiraku.Restaurante;
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

    @PostMapping("/comentario/restaurante/criar")
    public ResponseEntity<?> criarRestaurante(@RequestBody Comentario comentario){
        return cs.criar(comentario, "restarurante");
    }

    @PostMapping("/comentario/prato/criar")
    public ResponseEntity<?> criarPrato(@RequestBody Comentario comentario){
        return cs.criar(comentario, "prato");
    }

    @GetMapping("/comentario/restaurante/mostrar/{id}")
    public Iterable<Comentario> mostrarRestaurante(@PathVariable Integer id){
        return cs.mostrar(id);
    }

    @GetMapping("/comentario/prato/mostrar/{id}")
    public Iterable<Comentario> mostrarPrato(@PathVariable Integer id){
        return cs.mostrarPrato(id);
    }

    @DeleteMapping("/comentario/excluir")
    public ResponseEntity<?> excluir(@RequestBody Comentario comentario){
        return cs.excluir(comentario);
    }

    @PutMapping("/comentario/editar")
    public ResponseEntity<?> editar(@RequestBody Comentario comentario){
        return cs.editar(comentario);
    }
}
