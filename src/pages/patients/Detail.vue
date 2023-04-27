<template>
  <v-card class="text-center" v-if="isFetching">
    <v-card-text>
      Carregando...
      <v-progress-circular
        :size="30"
        :width="5"
        indeterminate
      ></v-progress-circular>
    </v-card-text>
  </v-card>
  <v-card class="text-center" v-if="!isFetching && !patient">
    <v-card-text>
      <p class="body-2 mb-3">
        Erro ao tentar carregar dados do paciente.
      </p>
      <v-btn @click="fetchData()" prepend-icon="mdi-refresh" color="warning">Tentar Novamente</v-btn>
    </v-card-text>
  </v-card>
  <v-card v-if="!isFetching && patient" style="max-width: 400px; margin: 0 auto;">
    <v-card-text>
      <div class="mb-4 d-flex flex-column align-center text-center">
        
        <v-avatar v-if="patient.photo" size="150" :image="patient.photo" class="mb-4"></v-avatar>

        <div class="mb-2">
          <div class="caption mb-1 text-grey-darken-1">Nome Completo:</div> 
          <h1>{{ patient.fullname }}</h1>
        </div>
      </div>

      <div class="my-3">
        <div class="mb-2">
          <div><strong class="text-grey-darken-1">Nome da Mãe:</strong><br/>{{ patient.mothersName }}</div>
        </div>
        <v-divider class="my-2"/>
        <div class="mb-2">
          <div><strong class="text-grey-darken-1">Data de Nascimento:</strong><br/> {{ patient.birthdate }}</div>
        </div>
        <v-divider class="my-2"/>
        <div class="mb-2">
          <div><strong class="text-grey-darken-1">Número do CPF:</strong><br/> {{ patient.cpf }}</div>
        </div>
        <v-divider class="my-2"/>
        <div class="mb-2">
          <div><strong class="text-grey-darken-1">Número do CNS:</strong><br/> {{ patient.cns }}</div>
        </div>
        <v-divider class="my-2"/>
        <div class="mb-2">
          <div><strong class="text-grey-darken-1">Endereço</strong>
            <div>
              <div>{{ patient.zipcode }}</div>
              <div>{{ patient.address1 }}</div>
              <div>{{ patient.number }}</div>
              <div>{{ patient.address2 }}</div>
              <div>{{ patient.neighborhood }}</div>
              <div>{{ patient.city }}</div>
              <div>{{ patient.uf }}</div>
            </div>
          </div>
        </div>
      </div>

    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" prepend-icon="mdi-pencil" :to="`/patient/${patient.id}/edit`">
        Editar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import Api from '@/Api';

  export default {
    data:() => ({
      isFetching: true,
      patient: null
    }),
    methods: {
      async fetchData() {
        if(!this.$route.params.id){ return; }
        this.isFetching = true;
        
        try {
          const patient = await Api.get(`/patients/${this.$route.params.id}`);
          this.patient = patient;
        } catch(err) {
          console.error(err);
        }

        this.isFetching = false;
      }
    },
    created() {
      this.fetchData();
    }
  }
</script>
