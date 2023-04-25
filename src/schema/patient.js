import { object, string, setLocale } from 'yup';
import { pt } from 'yup-locales';
setLocale(pt);

let patient = object({
  fullname: string().required(),
  birthdate: string().required(),
  photo: string().required(),
  mothersName: string().required(),
  cpf: string().required().label('CPF'),
  cns: string().required().required(),
  address: string().required()
});

export default patient;
