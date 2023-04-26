<template>
<v-form fast-fail @submit.prevent="submitForm">  
  <v-container>
    <v-row>
      <v-col>
        <v-card class="px-4 py-4">
          <v-card-title class="text-primary"><v-icon icon="mdi-account-circle"></v-icon> Dados Pessoais</v-card-title>
          <v-card-subtitle>Informações necessárias para identificação do paciente.</v-card-subtitle>
          <v-card-item>

            <div v-if="photo" class="align-center py-5 d-flex flex-column">
              <v-avatar image="https://dummyimage.com/150x150/444/ccc.jpg" color="primary" size="150"></v-avatar>
              <v-btn class="mt-2" @click="() => photo = ''" variant="text" size="x-small"  >Remover</v-btn>
            </div>
            <div v-else class="align-center py-5 d-flex flex-column">
              <v-btn prepend-icon="mdi-camera" size="large" color="primary">Adicionar Foto</v-btn>
            </div>

              <v-text-field 
                v-model="values.fullname"
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
                    v-if="errors.cpf"
                    color="error"
                    icon="mdi-alert-circle"
                  />
                </template>
                <input type="hidden" v-model="values.cpf" v-maska data-maska="###.###.###-##">
              </v-text-field>

              <v-text-field 
                v-model="values.cns"
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
                    v-if="errors.cns"
                    color="error"
                    icon="mdi-alert-circle"
                  />
                </template>
              </v-text-field>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="px-4 py-4">
          <v-card-title class="text-primary"><v-icon icon="mdi-mail"></v-icon> Endereço</v-card-title>
          <v-card-subtitle>Informações de residência do paciente.</v-card-subtitle>

          <v-card-item>
            <v-text-field 
              v-model="values.zipcode"
              class="mb-2"
              :readonly="isFetching" 
              label="CEP"
              :hint="errors.zipcode || ''"
              persistent-hint
              @blur="validate('zipcode')"
              @keyup="validate('zipcode')"
              :disabled="isFetching"
              >
              <input type="hidden" v-model="values.zipcode" v-maska data-maska="#####-###">
              <template v-slot:append-inner>
                <v-icon
                  v-if="errors.zipcode"
                  color="error"
                  icon="mdi-alert-circle"
                />
              </template>
            </v-text-field>

            <v-text-field 
              v-model="values.address1"
              class="mb-2"
              :readonly="isFetching" 
              label="Logradouro"
              :hint="errors.address1 || ''"
              persistent-hint
              @blur="validate('address1')"
              @keyup="validate('address1')"
              :disabled="isFetching"
            >
              <template v-slot:append-inner>
                <v-icon
                  v-if="errors.address1"
                  color="error"
                  icon="mdi-alert-circle"
                />
              </template>
            </v-text-field>

            <v-text-field 
              v-model="values.address2"
              class="mb-2"
              :readonly="isFetching" 
              label="Complemento"
              :hint="errors.address2 || ''"
              persistent-hint
              @blur="validate('address2')"
              @keyup="validate('address2')"
              :disabled="isFetching"
            >
              <template v-slot:append-inner>
                <v-icon
                  v-if="errors.address2"
                  color="error"
                  icon="mdi-alert-circle"
                />
              </template>
            </v-text-field>

            <v-text-field 
              v-model="values.number"
              class="mb-2"
              :readonly="isFetching" 
              label="Número"
              :hint="errors.number || ''"
              persistent-hint
              @blur="validate('number')"
              @keyup="validate('number')"
              :disabled="isFetching"
            >
              <template v-slot:append-inner>
                <v-icon
                  v-if="errors.number"
                  color="error"
                  icon="mdi-alert-circle"
                />
              </template>
            </v-text-field>

            <v-text-field 
              v-model="values.neighborhood"
              class="mb-2"
              :readonly="isFetching" 
              label="Bairro"
              :hint="errors.neighborhood || ''"
              persistent-hint
              @blur="validate('neighborhood')"
              @keyup="validate('neighborhood')"
              :disabled="isFetching"
            >
              <template v-slot:append-inner>
                <v-icon
                  v-if="errors.neighborhood"
                  color="error"
                  icon="mdi-alert-circle"
                />
              </template>
            </v-text-field>


            <v-text-field 
              v-model="values.city"
              class="mb-2"
              :readonly="isFetching" 
              label="Cidade"
              :hint="errors.city || ''"
              persistent-hint
              @blur="validate('city')"
              @keyup="validate('city')"
              :disabled="isFetching"
            >
              <template v-slot:append-inner>
                <v-icon
                  v-if="errors.city"
                  color="error"
                  icon="mdi-alert-circle"
                />
              </template>
            </v-text-field>

            <v-select
              v-model="values.uf"
              class="mb-2"
              :readonly="isFetching" 
              label="UF"
              :hint="errors.uf || ''"
              persistent-hint
              @blur="validate('uf')"
              @change="validate('uf')"
              :disabled="isFetching"
              :items="arrUfs"
            >
            <template v-slot:append-inner>
              <v-icon
                v-if="errors.uf"
                color="error"
                icon="mdi-alert-circle"
              />
            </template>
          </v-select>


          </v-card-item>
        </v-card>        
      </v-col>
    </v-row>
    <v-row class="text-right">
      <v-col>
        <v-btn color="success" size="large" class="ml-3">Salvar Alterações</v-btn>
      </v-col>
    </v-row>
  </v-container>
</v-form>  
</template>
<script>
  import patientSchema from '@/schema/patient';
  import listUF from '@/data/uf';
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
        zipcode: "",
        address1: "",
        address2: "",
        number: "",
        neighborhood: "",
        city: "",
        uf: "AC"
      },
      errors: {}
    }),
    computed: {
      arrUfs() {
        return listUF.map(a => a.sigla);
      }
    },
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
