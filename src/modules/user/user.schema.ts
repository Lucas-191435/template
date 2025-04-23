import * as yup from "yup";
import { cpf, cnpj } from "cpf-cnpj-validator";

const createUserSchema = yup.object().shape({
    name: yup
      .string()
      .required("Nome é um campo obrigatório.")
      .min(3, "O nome deve possuir no mínimo 3 caracteres.")
      .max(60, "O nome deve possuir no máximo 60 caracteres."),

    email: yup
      .string().email('Verifique o email')
      .required("Nome é um campo obrigatório.")
      .min(3, "O nome deve possuir no mínimo 3 caracteres.")
      .max(60, "O nome deve possuir no máximo 60 caracteres."),
  
    document: yup
      .string()
      .required("document é um campo obrigatório.")
      .min(11, "O documento deve possuir no mínimo 11 caracteres.")
      .max(14, "O documento deve possuir no máximo 14 caracteres.")
      .matches(/^[0-9]+$/, "O documento deve conter apenas números.")
      .test(
        "valid-cpf-cnpj",
        "O documento deve ser um CPF ou CNPJ válido.",
        (value: any) => cpf.isValid(value) || cnpj.isValid(value)
      ),
  });

  export {
    createUserSchema,
  };
  
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
  