package com.br.ichiraku.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.ichiraku.Prato;
import com.br.ichiraku.modelo.RespostaModelo;
import com.br.ichiraku.repositories.PratoRepository;

@Service
public class PratoServico {
    
    @Autowired
    private PratoRepository pr;

    @Autowired
    private RespostaModelo rm;

    public ResponseEntity<?> criar(Prato prato){
        
        return new ResponseEntity<>(pr.save(prato), HttpStatus.CREATED);
    }

    public ResponseEntity<?> mostrar(Integer restauranteId){
        Iterable<Prato> pratos = pr.findAllByRestauranteId(restauranteId);
        return new ResponseEntity<>(pratos, HttpStatus.OK);
    }

    public ResponseEntity<?> exluir(Integer id){
        pr.deleteById(id);
        rm.setMensagem("Excluido!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public ResponseEntity<?> editar(Prato prato){
        if(prato.getDescricao().equals("")){
            rm.setMensagem("nao tem descricao");
        } else {
            rm.setMensagem("Editado com sucesso");
            pr.save(prato);
            
        }
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }
}
