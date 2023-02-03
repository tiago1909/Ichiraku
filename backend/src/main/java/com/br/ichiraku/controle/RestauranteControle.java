package com.br.ichiraku.controle;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.br.ichiraku.Restaurante;
import com.br.ichiraku.servico.RestauranteServico;


@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class RestauranteControle {
    
    @Autowired
    private RestauranteServico rs;

    @PostMapping("/criar")
    private ResponseEntity<?> criar(@RequestBody Restaurante restaurante){
        return rs.criar(restaurante);
    }

    @GetMapping("/mostrar/restaurante/{id}")
    private ResponseEntity<?> mostrar(@PathVariable Integer id){
        return rs.mostrarInformacoes(id);
    }

    @GetMapping("/usuariopossuirestaurante/{id}")
    private ResponseEntity<?> usuarioPossuiRestaurante(@PathVariable Integer id){
        return rs.usuarioPossuiRestaurante(id);
    }

    @GetMapping("/mostrar/usuario/{id}")
    private ResponseEntity<?> mostrarPorIdUsuario(@PathVariable Integer id){
        return rs.mostrarInformacoesPorIdUsuario(id);
    }

    @PutMapping("/restaurante/editar")
    private ResponseEntity<?> editar(@RequestBody Restaurante restaurante){
        return rs.editar(restaurante);
    }
    
}
