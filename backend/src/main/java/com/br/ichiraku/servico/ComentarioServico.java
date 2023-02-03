package com.br.ichiraku.servico;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.ichiraku.entities.Comentario;
import com.br.ichiraku.repositories.ComentarioRepository;

@Service
public class ComentarioServico {
    @Autowired
    private ComentarioRepository cr;

    public ResponseEntity<?> criar(Comentario comentario){
        return new ResponseEntity<>(cr.save(comentario), HttpStatus.ACCEPTED);
    }

    public Iterable<Comentario> mostrar(Integer id){
        return cr.findAllByRestaurante_id(id);
    }

    
}