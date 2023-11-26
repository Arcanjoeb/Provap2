import * as Yup from 'yup';

const alunosValidator = Yup.object().shape({
    nome: Yup.string()
        .min(5, 'Valor muito curto'),

    cpf: Yup.string()
    .min(10, 'Valor muito curto')
    .required('CPF obrigatório'),

    matricula: Yup.string()
    .min(6,'Matricula inválido')
    .required('Matricula obrigatório'),

    email: Yup.string()
    .email('E-mail inválido')
    .min(5, 'E-mail muito curto'),
    
    telefone: Yup.string()
    .min(10, 'Valor muito curto'),

    
})

export default alunosValidator