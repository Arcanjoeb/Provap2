import * as Yup from 'yup';

const professorValidator = Yup.object().shape({
    turma: Yup.string()
        .min(5, 'Valor muito curto')
        .max(30, 'Valor muito grande')
        .required('Turma obrigatório'),

    alunos: Yup.string()
    .min(2, 'Valor muito curto')
    .required('Numero de alunos obrigatório'),

    turno: Yup.string()
    .required('Turno obrigatório'),

    modalidade: Yup.string()
    .required('Modalidade obrigatório'),
})

export default professorValidator