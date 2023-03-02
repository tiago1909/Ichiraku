package com.br.ichiraku.entities;

import com.br.ichiraku.Prato;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ingredientes")
public class Ingrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 30)
    private String nome;

    @OneToOne
    @JoinColumn(name = "prato_id", referencedColumnName = "id")
    private Prato prato;

    public Ingrediente(){

    }
    
    public Ingrediente(String nome, Prato prato) {
        this.nome = nome;
        this.prato = prato;
    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public Prato getPrato() {
        return prato;
    }
    public void setPrato(Prato prato) {
        this.prato = prato;
    }
}
