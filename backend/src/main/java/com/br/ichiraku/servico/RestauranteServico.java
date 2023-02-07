package com.br.ichiraku.servico;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.ichiraku.Restaurante;
import com.br.ichiraku.modelo.RespostaModelo;
import com.br.ichiraku.repositories.RestauranteRepository;

@Service
public class RestauranteServico {
    
    @Autowired
    private RestauranteRepository rr;

    @Autowired
    private RespostaModelo rm;

    public ResponseEntity<?> criar(Restaurante restaurante){
        if(restaurante.getNome().equals("")){
            rm.setMensagem("Nome não inserido");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(restaurante.getDescricao().equals("")){
            rm.setMensagem("Nome não inserido");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(restaurante.getEndereco().equals("")){
            rm.setMensagem("Nome não inserido");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(restaurante.getHorario().equals("")){
            rm.setMensagem("Nome não inserido");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(restaurante.getTelefone().equals("")){
            rm.setMensagem("Nome não inserido");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(restaurante.getUsuario()==null){
            rm.setMensagem("Não tem usuario");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(rr.findByUsuarioId(restaurante.getUsuario().getId())!=null){
            rm.setMensagem("Usuario ja criou restaurante");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }
            else {

            return new ResponseEntity<Restaurante>(rr.save(restaurante), HttpStatus.CREATED);
        }
    }

    public ResponseEntity<?> mostrarInformacoes(String nome){
        Restaurante restaurante = rr.findAllByNome(nome);
        if(restaurante == null){
            rm.setMensagem("Não tem restaurante");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<Restaurante>(restaurante, HttpStatus.OK);
        }
    }

    public ResponseEntity<Boolean> usuarioPossuiRestaurante(Integer id){
        boolean b = rr.existsByUsuarioId(id);
        if(b==true){
            return new ResponseEntity<Boolean>(b, HttpStatus.OK);
        } else {
            return new ResponseEntity<Boolean>(b, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> mostrarInformacoesPorIdUsuario(Integer id){
        Restaurante restaurante = rr.findByUsuarioId(id);
        return new ResponseEntity<Restaurante>(restaurante, HttpStatus.OK);
    }

    public ResponseEntity<?> editar(Restaurante restaurante){
        if(restaurante.getNome().equals("")){
            rm.setMensagem("Nome não inserido");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(restaurante.getDescricao().equals("")){
            rm.setMensagem("Nome não inserido");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(restaurante.getEndereco().equals("")){
            rm.setMensagem("Nome não inserido");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(restaurante.getHorario().equals("")){
            rm.setMensagem("Nome não inserido");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(restaurante.getTelefone().equals("")){
            rm.setMensagem("Nome não inserido");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(restaurante.getUsuario()==null){
            rm.setMensagem("Não tem usuario");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<Restaurante>(rr.save(restaurante), HttpStatus.CREATED);
        }
    }    

    public ResponseEntity<?> pesquisar(String nome){
        
        if(rr.findByNome(nome)!=null){
            return new ResponseEntity<Restaurante>(rr.findByNome(nome), HttpStatus.OK);
        } else {
            rm.setMensagem("Não foi encontrado");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.NOT_FOUND);
        }
        
        
    }

    public ResponseEntity<?> avaliar(Restaurante restaurante, int i){
        restaurante.setQntAvaliacao(restaurante.getQntAvaliacao()+1);
        restaurante.setSomaAvaliacao(restaurante.getSomaAvaliacao()+i);
        return new ResponseEntity<>(rr.save(restaurante), HttpStatus.OK);
        
    }
}


