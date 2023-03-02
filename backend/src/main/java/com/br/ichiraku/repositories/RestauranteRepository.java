package com.br.ichiraku.repositories;

import java.util.List;
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

    public Restaurante findByNomeAndCidade(String nome, String lugar);

    public Iterable<Restaurante> findByNomeLike(String string);

    public List<Restaurante> findByCidadeAndNomeLike(String cidade, String nome);
    
}
