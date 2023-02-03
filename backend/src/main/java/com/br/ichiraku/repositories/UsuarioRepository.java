package com.br.ichiraku.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.ichiraku.Usuario;

@Repository
public interface UsuarioRepository  extends JpaRepository<Usuario, Integer>{
    public List<Usuario> findByEmail(String email);
    
}
