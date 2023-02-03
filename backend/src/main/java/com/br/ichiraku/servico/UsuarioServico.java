package com.br.ichiraku.servico;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.ichiraku.Usuario;
import com.br.ichiraku.modelo.RespostaModelo;
import com.br.ichiraku.repositories.UsuarioRepository;

@Service
public class UsuarioServico {
    
    @Autowired
    private UsuarioRepository ur;

    @Autowired
    private RespostaModelo rm;

    public Iterable<Usuario> listar(){
        return ur.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Usuario user, String acao){

        if(user.getNome().equals("")){
            rm.setMensagem("O nome do usuario é obrigatorio!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(user.getEmail().equals("")){
            rm.setMensagem("O email do usuario é obrigatorio!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(user.getSenha().equals("")){
            rm.setMensagem("a senha do usuario é obrigatorio!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            if(acao.equals("cadastrar")){
                if(verificar(user.getEmail())==true){
                    return new ResponseEntity<Usuario>(ur.save(user), HttpStatus.CREATED);
                } else{
                    rm.setMensagem("email ja usado!");
                    return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
                }
            } else{
                return new ResponseEntity<Usuario>(ur.save(user), HttpStatus.OK);
            }
        }
    }

    public ResponseEntity<RespostaModelo> excluir(Integer id){
        ur.deleteById(id);
        rm.setMensagem("Foi excluido!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }

    public boolean verificar(String email){
        if(ur.findByEmail(email).size()==0){
            return true;
        } else {
            return false;
        }
    }

    public ResponseEntity<?> login(Usuario user){
        List<Usuario> listUsuario = ur.findByEmail(user.getEmail());
        if(listUsuario.size()>0 && listUsuario.get(0).getEmail().equals(user.getEmail()) && listUsuario.get(0).getSenha().equals(user.getSenha())){
            rm.setMensagem("Correto");
            return new ResponseEntity<Usuario>(listUsuario.get(0), HttpStatus.ACCEPTED);
        } else {
            rm.setMensagem("errado");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
