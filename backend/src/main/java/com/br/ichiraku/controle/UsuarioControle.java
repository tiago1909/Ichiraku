package com.br.ichiraku.controle;

import java.util.List;

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

import com.br.ichiraku.Usuario;
import com.br.ichiraku.modelo.RespostaModelo;
import com.br.ichiraku.repositories.UsuarioRepository;
import com.br.ichiraku.servico.UsuarioServico;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class UsuarioControle {
    @Autowired
    private UsuarioRepository ur;

    @Autowired
    private UsuarioServico us;
   
    @GetMapping("/listar")
    public List<Usuario> home(){
        return ur.findAll();
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario user){
        return us.cadastrarAlterar(user, "cadastrar");
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody Usuario user){
        return us.cadastrarAlterar(user, "alterar");
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<RespostaModelo> excluir(@PathVariable Integer id){
        return us.excluir(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario user){
        return us.login(user);
    }
}
