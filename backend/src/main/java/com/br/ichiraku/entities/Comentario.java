package com.br.ichiraku.entities;

import com.br.ichiraku.Prato;
import com.br.ichiraku.Restaurante;
import com.br.ichiraku.Usuario;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "comentarios")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @OneToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;
    
    @OneToOne
    @JoinColumn(name = "restaurante_id", referencedColumnName = "id")
    private Restaurante restaurante;

    @OneToOne
    @JoinColumn(name = "prato_id", referencedColumnName = "id")
    private Prato prato;

    private String comentario;

    public enum tipoEnum{
        PRATO, RESTAURANTE
    }


    private tipoEnum tipo;

    public tipoEnum getTipo() {
        return tipo;
    }

    public void setTipo(tipoEnum tipo) {
        this.tipo = tipo;
    }

    public Comentario() {
    }

    public Comentario(Usuario usuario, Restaurante restaurante, String comentario, tipoEnum tipo, Prato prato) {
        this.usuario = usuario;
        this.restaurante = restaurante;
        this.prato = prato;
        this.comentario = comentario;
        this.tipo = tipo;
        this.prato = prato;
    }


    public Prato getPrato() {
        return prato;
    }

    public void setPrato(Prato prato) {
        this.prato = prato;
    }
    
    public String getComentario() {
        return comentario;
    }
    
    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Restaurante getRestaurante() {
        return restaurante;
    }
    
    public void setRestauranteId(Restaurante restaurante) {
        this.restaurante = restaurante;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
}
