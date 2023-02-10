package com.br.ichiraku;

import java.util.List;

import com.br.ichiraku.entities.Comentario;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "pratos")
public class Prato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 30)
    private String nome;

    @Column(nullable = false, length = 100)
    private String descricao;

    @Column(nullable = false, scale = 2)
    private double preco;

    private int qntAvaliacao;
    private int somaAvaliacao;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "restaurante_id")
    private Restaurante restaurante;

    @OneToMany(mappedBy = "prato")
    private List<Comentario> comentarios;

    public Prato(){

    }

    public Prato(String nome, int qntAvaliacao, int somaAvaliacao, String descricao, double preco, Restaurante restaurante) {
        this.nome = nome;
        this.qntAvaliacao = qntAvaliacao;
        this.somaAvaliacao = somaAvaliacao;
        this.restaurante = restaurante;
        this.preco = preco;
        this.descricao = descricao;
        this.qntAvaliacao = 0;
        this.somaAvaliacao = 0;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }
    
    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Restaurante getRestaurante() {
        return restaurante;
    }

    public void setRestaurante(Restaurante restaurante) {
        this.restaurante = restaurante;
    }

    public int getSomaAvaliacao() {
        return somaAvaliacao;
    }

    public void setSomaAvaliacao(int somaAvaliacao) {
        this.somaAvaliacao = somaAvaliacao;
    }

    public int getQntAvaliacao() {
        return qntAvaliacao;
    }

    public void setQntAvaliacao(int qntAvaliacao) {
        this.qntAvaliacao = qntAvaliacao;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    
}
