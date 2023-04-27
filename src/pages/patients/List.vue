<template>
  <v-container>

    <v-btn variant="flat" color="success" prepend-icon="mdi-plus-box" to="/patient/create">
      Criar Registro
    </v-btn>

    <v-divider class="my-2"></v-divider>

    <v-card class="mb-4">
      <v-form fast-fail @submit.prevent="submitQuery" :disabled="isFetching">
        <v-text-field
          hide-details
          placeholder="Buscar por Nome, CPF ou CNS"
          prepend-inner-icon="mdi-magnify"
          clearable
          persistent-clear
          variant="solo"
          v-model="query"
          @keydown="submitQuery"
          @click:clear="submitQuery"
        ></v-text-field>
      </v-form>
    </v-card>

    <v-dialog
      v-model="isFetching"
      persistent
      width="auto"
    >
      <v-card
        color="primary"
      >
        <v-card-text>
          Carregando...
          <v-progress-circular
            :size="30"
            :width="5"
            indeterminate
          ></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-card class="mb-4" v-if="patients.length && loaded">
      <v-list lines="three">
        <v-list-item
          v-for="(item) in patients"
          :key="item.id"
          :title="item.fullname"
          :to="`/patient/${item.id}`"
          :prepend-avatar="item.photo"
        >

        <template v-slot:title>
          <div class="v-list-item-title text-primary">{{item.fullname}}</div>
        </template>

        <template v-slot:subtitle>
          <p>{{item.cns}}</p>
          <p>{{item.cpf}}</p>
        </template>
        </v-list-item>
      </v-list>
    </v-card>

    <v-card v-if="!query && !patients.length">
      <v-alert type="warning" variant="outlined">
        <p>Digite os termos de busca para começar.</p>
      </v-alert>
    </v-card>    

  </v-container>

</template>
<script>
  import ApiPrivate from '@/ApiPrivate';
  export default {
    data: () => ({
      isFetching: false,
      loaded: false,
      query: '',
      patients: [],
      timeountSubmit: null
    }),
    methods: {
      async fetchData() {
        this.patients = [];
        if(this.isFetching){ return; }
        this.isFetching = true;
        
        const patients = await ApiPrivate.get(`/patients?${this.query ? 'q='+this.query+'&' : '' }_page=1&_limit=10`);
        this.patients = patients;

        this.isFetching = false;
        if(!this.loaded) { this.loaded = true };

      },
      submitQuery() {
        if( this.timeountSubmit ){ clearTimeout(this.timeountSubmit); }
        this.timeountSubmit = setTimeout(() => {
          this.fetchData();
        }, 700);
      }
    },
    created() {
      this.fetchData();
    }
  }
</script>
