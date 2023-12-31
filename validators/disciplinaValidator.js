import * as Yup from 'yup';

const disciplinaValidator = Yup.object().shape({
    nome: Yup.string()
        .min(2, 'Valor muito curto')
        .max(200, 'Valor muito grande')
        .required('Campo obrigatório'),
    curso_id: Yup.string(),
})

export default disciplinaValidator