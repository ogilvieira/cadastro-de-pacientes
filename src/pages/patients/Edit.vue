<template>
<v-form fast-fail @submit.prevent="submitForm">  
  <v-container>
    <v-row>
      <v-col>
        <v-card class="px-2 py-2">
          <v-card-title class="text-primary"><v-icon icon="mdi-account-circle"></v-icon> Dados Pessoais</v-card-title>
          <v-card-subtitle>Informações necessárias para identificação do paciente.</v-card-subtitle>
          <v-card-item>

            <div v-if="values.photo" class="align-center py-5 d-flex flex-column">
              <v-avatar :image="values.photo" color="primary" size="150"></v-avatar>
              <v-btn class="mt-2" @click="() => values.photo = ''" variant="text" size="x-small"  >Remover</v-btn>
            </div>
            <div v-else class="align-center py-5 d-flex flex-column" @click="() => $refs.imageInput.click()">
              <v-btn prepend-icon="mdi-camera" size="large" color="primary">Adicionar Foto</v-btn>
            </div>

            <input class="d-none" @change="getImage" required type="file" accept="image/*" name="photo" ref="imageInput" />

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
        <v-card class="px-2 py-2">
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
              @change="getAddress()"
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
    <v-row v-if="fetchErrorText">
      <v-col>
        <v-alert type="error" :text="fetchErrorText" closable variant="tonal">
        </v-alert>        
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <v-btn color="success" type="submit" size="large" class="ml-3">Salvar Alterações</v-btn>
      </v-col>
    </v-row>
  </v-container>
</v-form>  
</template>
<script>
  import patientSchema from '@/schema/patient';
  import listUF from '@/data/uf';
  import ApiPrivate from '@/ApiPrivate';

  export default {
    data: () => ({
      isFetching: false,
      fetchErrorText: "",
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
        this.fetchErrorText = '';
        this.errors = {};
        patientSchema.validate(this.values)
          .then(() => {
            this.sendData();
          })
          .catch(err => {
            this.fetchErrorText = err.message ?? err;
          })
      },
      async sendData() {
        const values = { ...this.values };
        ApiPrivate.post('/patients', values)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.error(err);
          })
      },
      async getAddress() {
        fetch(`https://viacep.com.br/ws/${this.values.zipcode.replace(/\D/gi, '')}/json/`)
          .then(res => res.json())
          .then(data => {
            const obj = {
              address1: data?.logradouro,
              address2: data?.complemento,
              neighborhood: data?.bairro,
              city: data?.localidade,
              uf: data?.uf
            }
            
            this.values = {
              ...this.values,
              ...obj
            }

          })
          .catch(err => {
            console.error(err);
          })
      },
      getImage() {
        if (this.$refs.imageInput.files) {
            const imageFile = this.$refs.imageInput.files[0];
            if(!imageFile){ return; }
            const reader = new FileReader();
            
            reader.onload = (e) => {
              const img = document.createElement("img");
              img.onload = () => {

                const MAX_WIDTH = 300;
                const MAX_HEIGHT = 300;

                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = height * (MAX_WIDTH / width);
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width = width * (MAX_HEIGHT / height);
                        height = MAX_HEIGHT;
                    }
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                const dataurl = canvas.toDataURL(imageFile.type);
                
                this.values.photo = dataurl;
              }
              img.src = e.target.result;
            }

            reader.readAsDataURL(imageFile);
        }
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
