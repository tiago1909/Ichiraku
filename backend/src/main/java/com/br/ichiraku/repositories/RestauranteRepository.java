package com.br.ichiraku.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.ichiraku.Restaurante;

@Repository
public interface RestauranteRepository extends JpaRepository<Restaurante, Integer>{
    public Restaurante findByUsuarioId(Integer id);

    public Restaurante findAllById(Integer id);

    public boolean existsByUsuarioId(Integer id);

    public Restaurante findByNome(String nome);

    public Restaurante findAllByNome(String nome);
    
}
