<template>
  <v-form fast-fail @submit.prevent="submitForm">
    
    <v-text-field 
      v-model="values.fullname"
      variant="outlined"
      class="mb-2"
      :readonly="isFetching" 
      label="Nome Completo"
      :hint="errors.fullname || ''"
      persistent-hint
      @blur="validate('fullname')"
      @keyup="validate('fullname')"
      :disabled="isFetching"
      >
      <template v-slot:append-inner>
        <v-icon
          v-if="errors.fullname"
          color="error"
          icon="mdi-alert-circle"
        />
      </template>
    </v-text-field>

    <v-text-field 
      v-model="values.mothersName"
      variant="outlined"
      class="mb-2"
      :readonly="isFetching" 
      label="Nome Completo da Mãe"
      :hint="errors.mothersName || ''"
      persistent-hint
      @blur="validate('mothersName')"
      @keyup="validate('mothersName')"
      :disabled="isFetching"
      >
      <template v-slot:append-inner>
        <v-icon
          v-if="errors.mothersName"
          color="error"
          icon="mdi-alert-circle"
        />
      </template>
    </v-text-field>

    <v-text-field 
      v-model="values.birthdate"
      variant="outlined"
      type="date"
      class="mb-2"
      :readonly="isFetching" 
      label="Data de Nascimento"
      :hint="errors.birthdate || ''"
      persistent-hint
      @blur="validate('birthdate')"
      @keyup="validate('birthdate')"
      :disabled="isFetching"
      >
      <template v-slot:append-inner>
        <v-icon
          v-if="errors.birthdate"
          color="error"
          icon="mdi-alert-circle"
        />
      </template>
    </v-text-field>

    <v-text-field 
      v-model="values.cpf"
      variant="outlined"
      class="mb-2"
      :readonly="isFetching" 
      label="Número do CPF"
      :hint="errors.cpf || ''"
      persistent-hint
      @blur="validate('cpf')"
      @keyup="validate('cpf')"
      :disabled="isFetching"
      >
      <template v-slot:append-inner>
        <v-icon
          v-if="errors.mothersname"
          color="error"
          icon="mdi-alert-circle"
        />
        <input type="hidden" v-model="values.cpf" v-maska data-maska="###.###.###-##">
      </template>
    </v-text-field>

    <v-text-field 
      v-model="values.cns"
      variant="outlined"
      class="mb-2"
      :readonly="isFetching" 
      label="Número do CNS"
      :hint="errors.cns || ''"
      persistent-hint
      @blur="validate('cns')"
      @keyup="validate('cns')"
      :disabled="isFetching"
      >
      <input type="hidden" v-model="values.cns" v-maska data-maska="### #### #### ####">
      <template v-slot:append-inner>
        <v-icon
          v-if="errors.mothersname"
          color="error"
          icon="mdi-alert-circle"
        />
      </template>
    </v-text-field>

    <button type="submit">ok</button>

  </v-form>
</template>
<script>
  import patientSchema from '@/schema/patient';
  export default {
    data: () => ({
      isFetching: false,
      values: {
        fullname: '',
        birthdate: '',
        photo: '',
        mothersName: '',
        cpf: '',
        cns: '',
        address: ''
      },
      errors: {}
    }),
    methods: {
      submitForm() {
        console.info('submit', this.values);
      },
      validate(field) {
        patientSchema
          .validateAt(field, this.values)
          .then(() => {
            this.errors[field] = "";
          })
          .catch(err => {
            this.errors[field] = err.message;
          });
      }
    }
  }
</script>
