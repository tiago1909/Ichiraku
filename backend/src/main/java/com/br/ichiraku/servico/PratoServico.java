package com.br.ichiraku.servico;

import java.util.ArrayList;
import java.util.List;

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

    public ResponseEntity<?> mostrarPrato(Integer pratoId){
        Prato prato = pr.findAllById(pratoId);
        return new ResponseEntity<Prato>(prato, HttpStatus.OK);
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

    public ResponseEntity<?> avaliar(Prato prato, int i){
        prato.setQntAvaliacao(prato.getQntAvaliacao()+1);
        prato.setSomaAvaliacao(prato.getSomaAvaliacao()+i);
        pr.save(prato);
        return new ResponseEntity<>(prato, HttpStatus.OK);
    }

    public ResponseEntity<?> pratoPesquisa(String nome, String cidade){
        List<Prato> pratosT = pr.findAllByNomeLike("%"+nome+"%");
        List<Prato> pratos = new ArrayList<>();
        
        for(int i = 0; i < pratosT.size(); i++){
            if(pratosT.get(i).getRestaurante().getCidade().toLowerCase().equals(cidade.toLowerCase())){
                pratos.add(pratosT.get(i));
            }
        }
        
        return new ResponseEntity<>(pratos, HttpStatus.OK);
    }
}
