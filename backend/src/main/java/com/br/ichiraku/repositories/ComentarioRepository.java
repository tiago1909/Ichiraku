package com.br.ichiraku.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.br.ichiraku.entities.Comentario;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Integer>{


public List<Comentario> findAllByRestaurante_id(Integer id);

public List<Comentario> findAllByPrato_id(Integer id);  


    
}
