import { object, string, number, date, setLocale, addMethod } from 'yup';
import { pt } from 'yup-locales';
setLocale(pt);

import isValidCPF from '@/utils/isValidCPF';

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


let patient = object({
  fullname: string().required().fullName('Nome Completo inválido.').label('Nome Completo'),
  birthdate: date().max(new Date(), 'Não pode ser maior que o dia de hoje.').required().label('Data de Nascimento'),
  photo: string().required().label('Foto'),
  mothersName: string().required().fullName('Nome Completo da mãe inválido.'),
  cpf: string().required().cpf("Número de CPF inválido").label('Número de CPF'),
  cns: string().required().required(),
  address: string().required()
});

export default patient;
