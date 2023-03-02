package com.br.ichiraku.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.ichiraku.entities.Ingrediente;

@Repository
public interface IngredienteRepository extends JpaRepository<Ingrediente, Integer>{

    List<Ingrediente> findAllByPratoId(Integer id);
    
}
