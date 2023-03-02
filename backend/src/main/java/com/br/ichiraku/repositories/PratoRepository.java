package com.br.ichiraku.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.br.ichiraku.Prato;

@Repository
public interface PratoRepository extends JpaRepository<Prato, Integer>{

    Iterable<Prato> findAllByRestauranteId(Integer restauranteId);

    Prato findAllById(Integer pratoId);

    List<Prato> findAllByNomeLike(String nome);
    
}
