import * as Yup from 'yup';

const professorValidator = Yup.object().shape({
    nome: Yup.string()
        .min(5, 'Valor muito curto')
        .max(20, 'Valor muito grande')
        .required('Nome obrigatório'),

    cpf: Yup.string()
        .min(10, 'Valor muito curto')
        .required('CPF obrigatório'),

    matricula: Yup.string()
        .min(10 ,'Matricula inválido')
        .required('Matricula obrigatório'),

        
    modalidade: Yup.string()
        .required('Modalidade obrigatório'),
})

export default professorValidator