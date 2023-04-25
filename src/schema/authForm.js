import { object, string, setLocale } from 'yup';
import { pt } from 'yup-locales';
setLocale(pt);

let authForm = object({
  email: string().email().required().label('E-mail'),
  password: string().required().min(6).label('Senha'),
});

export default authForm;
