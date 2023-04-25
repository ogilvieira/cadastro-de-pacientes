<template>
  <div class="d-flex align-center justify-center flex-column px-3" style="height: 100vh">
    <h1 class="text-h5 mb-1 text-primary">Bem Vindo</h1>
    <p class="text-caption">Preencha com seus dados para acessar:</p>
    <v-sheet max-width="400" width="100%" class="mx-auto my-3 rounded-lg px-4 py-4" elevation="0">
      <v-form fast-fail @submit.prevent="submitForm">
        <v-text-field 
          v-model="values.email"
          variant="outlined"
          class="mb-2"
          :readonly="isFetching" 
          prepend-inner-icon="mdi-account"
          label="E-mail "
          :hint="errors.email || ''"
          persistent-hint
          @blur="validate('email')"
          @keypress="validate('email')"
          :disabled="isFetching"
          >
          <template v-slot:append-inner>
            <v-icon
              v-if="errors.email"
              color="error"
              icon="mdi-alert-circle"
            />
          </template>

        </v-text-field>
        
        <v-text-field 
          v-model="values.password" 
          variant="outlined" 
          :readonly="isFetching" 
          prepend-inner-icon="mdi-lock" 
          :type="showPass ? 'text' : 'password'"
          label="Senha"
          class="mb-2"
          :hint="errors.password || ''"
          persistent-hint
          @blur="validate('password')"
          @keypress="validate('password')"
          :disabled="isFetching"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPass = !showPass"
          >
          <template v-slot:append-inner>
            <v-icon
              v-if="errors.password"
              color="error"
              icon="mdi-alert-circle"
            />
          </template>
        </v-text-field>

        <v-alert v-if="fetchErrorText" type="error" :text="fetchErrorText" closable variant="tonal">
        </v-alert>

        <v-btn v-if="!isFetching" type="submit" color="primary" size="large" block class="mt-2">
          Entrar

          <template v-slot:append>
            <v-icon icon="mdi-login"></v-icon>
          </template>

        </v-btn>

        <div class="text-center mt-2" v-if="isFetching">
          <v-progress-circular color="primary" indeterminate></v-progress-circular>
        </div>


      </v-form>
    </v-sheet>
  </div>
</template>
<script>
  import authFormSchema from "@/schema/authForm";

  export default {
    name: 'Login',
    data() {
      return {
        values: {
          email: '',
          password: '',
        },
        errors: {},
        isFetching: false,
        fetchErrorText: '',
        showPass: false
      }
    },
    methods: {
      submitForm() {
        this.fetchErrorText = '';
        this.errors = {};
        authFormSchema.validate(this.values)
          .then(() => {
            this.sendData();
          })
          .catch(err => {
            this.fetchErrorText = err.message ?? err;
          })
      },
      async sendData() {
        if(this.isFetching){ return; }
        this.isFetching = true;
      },
      validate(field) {
        authFormSchema
          .validateAt(field, this.values)
          .then(() => {
            this.errors[field] = "";
          })
          .catch(err => {
            this.errors[field] = err.message;
          });
      },
    }
  }
</script>
