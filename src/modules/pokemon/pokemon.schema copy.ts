import * as yup from 'yup';
import { object, string, number, date, array } from 'yup';

const user = yup.object().shape({
  'nome': string().required('Nome é um campo obrigatório.').min(3, 'O nome deve ter o mínimo de 3 caracteres.'),
  'idade': number().required('Idade é um compo obrigatório.').integer('Idade deve ser um número inteiro').min(1, 'Idade deve ser maior ou igual a 1').default(1),
  'telefones': array().of(object({
    'ddd': number().required('DDD é um campo obrigatório.'),
    'number': number().required('Campo obrigatório.').min(8, 'Minímo 8 digitos'),
    'tipo': string().required('Campo obrigatório.').oneOf(['residencial', 'comercial', 'celular'])
  })).max(3, 'Máximo 3 telefones').default([]),
  'endereco': object({
    'rua': string().required('campo obrigatório.').min(3, 'O nome da rua deve ter o mínimo de 3 caracteres.'),
    'numero': number().required('campo obrigatório.').integer('Número deve ser um número inteiro').min(1, 'Número deve ser maior ou igual a 1'),
    'complemento': string().optional(),
  }),
  'ponto': number().required('Campo obrigatório.').oneOf([1, 2, 3]),
  'profissao': string().when('profissao', {
    is: (value: string) => ['programador', 'analista', 'gerente'].includes(value),
    then: string().required('Campo obrigatório.').oneOf(['programador', 'analista', 'gerente']),
    otherwise: string().optional(),
  }),
  'prossisao': string().when('profissao', {
    is: (value: string)=>  ['professor', 'diretor', 'recepcionista'].includes(value),
    then: string().required('Campo obrigatório.').oneOf(['professor', 'diretor', 'recepcionista']),
    otherwise: string().optional(), 
  })
});



const schemaCpf = yup.string()
  .required()
  .transform((value) =>
    value.replace(/\D/g, '') // remove tudo que não é número
  );
  
const entrada = {
  cpf: ' 123.456.789-09 ',
};
  
 const cpfLimpo = schemaCpf.cast(entrada.cpf, {
    stripUnknown: true,
 });
 
 const dadosLimpos = {
  ...entrada,
  cpf: schemaCpf.cast(entrada.cpf),
}; 
