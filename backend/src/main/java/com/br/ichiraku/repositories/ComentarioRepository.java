package com.br.ichiraku.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.br.ichiraku.entities.Comentario;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Integer>{

public Iterable<Comentario> findAllByRestaurante_id(Integer id);  
    
}
