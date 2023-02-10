package com.br.ichiraku.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.ichiraku.Prato;

@Repository
public interface PratoRepository extends JpaRepository<Prato, Integer>{

    Iterable<Prato> findAllByRestauranteId(Integer restauranteId);

    Prato findAllById(Integer pratoId);
    
}
