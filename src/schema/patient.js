import { object, number, string, date, setLocale, addMethod } from 'yup';
import { pt } from 'yup-locales';
setLocale(pt);

import isValidCPF from '@/utils/isValidCPF';
import isValidCNS from '@/utils/isValidCNS';
import listUF from '@/data/uf';

addMethod(string, "fullName", function (errorMessage) {
  return this.test('test-full-name', errorMessage, function (value) {
    const { path, createError } = this;
    return (!!value.trim().match(/\s/g) && !value.match(/\d/gi)) || createError({ path, message: errorMessage })
  });
});

addMethod(string, "cpf", function (errorMessage) {
  return this.test('test-cpf', errorMessage, function (value) {
    const { path, createError } = this;
    return isValidCPF(value) || createError({ path, message: errorMessage })
  });
});

addMethod(string, "cns", function (errorMessage) {
  return this.test('test-cns', errorMessage, function (value) {
    const { path, createError } = this;
    return isValidCNS(value) || createError({ path, message: errorMessage })
  });
});


addMethod(string, "uf", function (errorMessage) {
  return this.test('test-uf', errorMessage, function (value) {
    const { path, createError } = this;
    return value.length === 2 || listUF.findIndex(a => a.sigla === value.toUpperCase()) !== -1 || createError({ path, message: errorMessage })
  });
});


let patient = object({
  fullname: string().required().fullName('Nome Completo inválido.').label('Nome Completo'),
  birthdate: date('Data de Nascimento inválida.').max(new Date(), 'Não pode ser maior que o dia de hoje.').required().label('Data de Nascimento'),
  photo: string().label('Foto'),
  mothersName: string().required().fullName('Nome Completo da mãe inválido.').label('Nome Completo da mãe'),
  cpf: string().required().cpf("Número de CPF inválido").label('Número de CPF'),
  cns: string().required().cns("Número de Cartão Nacional de Saúde inválido").required().label('Número de Cartão Nacional de Saúde'),
  zipcode: string().required().min(9).label("CEP"),
  address1: string().required().label("Logradouro"),
  address2: string().required().label("Complemento"),
  number: string().required().label("Número"),
  neighborhood: string().required().label("Bairro"),
  city: string().required().label("Cidade"),
  uf: string().uf("UF inválida.").required().label("UF")
});

export default patient;
