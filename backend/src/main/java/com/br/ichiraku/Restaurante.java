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
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "restaurantes")
public class Restaurante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String nome;
    @Column(nullable = false)
    private String descricao;
    @Column(nullable = false)
    private String horario;
    @Column(nullable = false)
    private String endereco;
    @Column(nullable = false)
    private boolean situacao;
    @Column(nullable = false)
    private String telefone;
    @Column(nullable = false)
    private String cidade;
    @Column(nullable = true)
    private int qntAvaliacao;
    @Column(nullable = false)
    private int somaAvaliacao;

    @OneToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    
    @OneToMany(mappedBy = "restaurante", cascade = CascadeType.MERGE)
    private List<Prato> pratos;

    @OneToMany(mappedBy = "restaurante")
    private List<Comentario> comentarios;

    


    public void Restaurante(String nome, String descricao,
    String horario,
    String endereco,
    boolean situacao,
    String telefone,
    Usuario usuario,
    String cidade){
        this.nome = nome;
        this.descricao = descricao;
        this.horario = horario;
        this.endereco = endereco;
        this.situacao = situacao;
        this.telefone = telefone;
        this.qntAvaliacao = 0;
        this.somaAvaliacao = 0;
        this.usuario = usuario;
        this.cidade = cidade;
    }

    public String getCidade() {
      return cidade;
    }

    public void setCidade(String cidade) {
      this.cidade = cidade;
    }

    public String getNome() {
        return nome;
      }
      
      // Setter
      public void setNome(String nome) {
        this.nome = nome;
      }

      public String getEndereco() {
        return endereco;
      }
      
      // Setter
      public void setEndereco(String endereco) {
        this.endereco = endereco;
      }

      public String getDescricao() {
        return descricao;
      }
      
      // Setter
      public void setDescricao(String descricao) {
        this.descricao = descricao;
      }

      public String getHorario() {
        return horario;
      }
      
      // Setter
    public void setHorario(String horario) {
        this.horario = horario;
      }

    public boolean isSituacao() {
        return situacao;
    }

    public void setSituacao(boolean situacao) {
        this.situacao = situacao;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public int getQntAvaliacao() {
        return qntAvaliacao;
    }

    public void setQntAvaliacao(int qntAvaliacao) {
        this.qntAvaliacao = qntAvaliacao;
    }

    public int getSomaAvaliacao() {
        return somaAvaliacao;
    }

    public void setSomaAvaliacao(int somaAvaliacao) {
        this.somaAvaliacao = somaAvaliacao;
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
