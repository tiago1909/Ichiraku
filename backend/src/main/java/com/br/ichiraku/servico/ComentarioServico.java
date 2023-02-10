package com.br.ichiraku.servico;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.ichiraku.Restaurante;
import com.br.ichiraku.entities.Comentario;
import com.br.ichiraku.entities.Comentario.tipoEnum;
import com.br.ichiraku.repositories.ComentarioRepository;

@Service
public class ComentarioServico {
    @Autowired
    private ComentarioRepository cr;

    public ResponseEntity<?> criar(Comentario comentario, String tipo){
        if(tipo.equals("prato")){
            comentario.setTipo(tipoEnum.PRATO);
        } else {
            comentario.setTipo(tipoEnum.RESTAURANTE);
        }
        return new ResponseEntity<>(cr.save(comentario), HttpStatus.ACCEPTED);
    }

    public List<Comentario> mostrar(Integer id){
        List<Comentario> comentariosA = cr.findAllByRestaurante_id(id);
        List<Comentario> comentariosB = new ArrayList<>();
        for(int i = 0; i < comentariosA.size(); i++){
            if(comentariosA.get(i).getTipo() == tipoEnum.RESTAURANTE){
                comentariosB.add(comentariosA.get(i));
            }
        }
        return comentariosB;
    }

    public List<Comentario> mostrarPrato(Integer id){
        List<Comentario> comentariosA = cr.findAllByPrato_id(id);
        List<Comentario> comentariosB = new ArrayList<>();
        for(int i = 0; i < comentariosA.size(); i++){
            if(comentariosA.get(i).getTipo() == tipoEnum.PRATO){
                comentariosB.add(comentariosA.get(i));
            }
        }
        return comentariosB;
    }

    public ResponseEntity<?> excluir(Comentario comentario){
        cr.deleteById(comentario.getId());
        return new ResponseEntity<>("foi ", HttpStatus.OK);
    }

    public ResponseEntity<?> editar(Comentario comentario){
        cr.save(comentario);
        return new ResponseEntity<>("foi ", HttpStatus.OK);
    }
}
