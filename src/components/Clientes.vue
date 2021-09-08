<template>
  <section class="clientes">
    <div class="container">
      <h3>Pedido</h3>
      <div class="col-md-12">
        <span>Clientes:</span>
        <input
          type="text"
          name="CPF"
          id="cpf"
          placeholder="Digite seu CPF"
          v-model="cpfInput"
        />
        <button class="btn-search" @click="getClienteCpf">Buscar</button>
      </div>
      <div class="col-md-12" v-if="clientes">
        <p>Nome: {{ this.none }} {{ this.sobrenome }}</p>
        <p>CPF: {{ this.CPF }}</p>
        <p>Data de Nascimento: {{ this.dataDeNascimento }}</p>
        <hr />
        <button class="btn-save" @click="adicionaPedido">
          Armazenar Pedido
        </button>
      </div>
      <p v-if="messagem">{{ this.aviso }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Clientes",
  props: {
    produtoId: String,
    valorUnitario: String,
    quantidade: String,
    valorTotal: String,
  },

  data: function() {
    return {
      cpfInput: "",
      nome: "",
      sobrenome: "",
      cpf: "",
      dataDeNascimento: "",
      Cliente: false,
      mensagem: false,
      aviso: "",
    };
  },
  methods: {
    getCLienteCpf: async function() {
      const result = await fetch(
        "http://localhost:3000/clientes/busca" + this.$route.params.cpfInput
      )
        .then((res) => res.json())
        .catch((error) => {
          return {
            error: true,
            message: error,
          };
        });

      if (!result.error) {
        this.nome = result.nome;
        this.sobrenome = result.sobrenome;
        this.cpf = result.cpf;
        this.dataDeNascimento = result.dataDeNascimento;

        if (!this.Clientes) {
          this.Clientes = true;
        }
        if (!this.message) {
          this.message = false;
        }
      } else {
        this.Clientes = false;
        this.message = true;
        this.aviso = "cliente não localizado";
      }
    },
    adicionaPedido: async function() {
      const newPedido = {
        produtoId: this.produtoId,
        ValorTotal: this.valorTotal.replace(".", ","),
        valorUnitario: this.valorUnitario,
        quantidade: this.quantidade,
        getClienteCpf: this.cpfInput,
      };
      const result = await fetch("http://localhost:3000/pedidos", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newPedido),
      })
        .then((res) => res.json())
        .then((res) => res)
        .catch((error) => {
          return {
            error: true,
            message: error,
          };
        });
      this.Cliente = false;
      if (result.insertedId) {
        this.mensagem = true;
        this.aviso = "Pedido cadastrado com sucesso.";
      }
    },
  },
};
</script>

<style>
.btn-search {
  width: 90px;
  height: 40px;
  border-radius: 6px;
  background-color: #ae382b;
  color: #f5a022;
  border: none;
  font-weight: bold;
  cursor: pointer;
}
#cpf {
  width: 280px;
  margin-left: 20px;
}
.btn-save {
  width: 170px;
  height: 40px;
  border-radius: 6px;
  background-color: #ae382b;
  color: #f5a022;
  border: none;
  font-weight: bold;
  display: block;
  margin: 30px auto;
  cursor: pointer;
}
</style>
