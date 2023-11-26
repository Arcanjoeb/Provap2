import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import alunosValidator from '../../validators/alunosValidator'
import { mask } from 'remask'
import Validacao from '../../components/Validacao'
import AsyncStorage from '@react-native-async-storage/async-storage'


const AlunosForm = () => {
    const [id, setId] = useState(-1);
    const [dados, setDados] = useState({})

    let aluno = {
        nome: '',
        cpf: '',
        matricula: '',
        email: '',
        telefone: '',
        cep: '',
        logradouro: '',
        Bairro:'',
        numero:'',
      }

    async function handleChange(value, field) {
        try {
            if (field === 'cep' && value.length === 8) {
                const endereco = await getEndereco(value);
                setFormValues({ ...formValues, ...endereco });
            } else {
                setFormValues({ ...formValues, [field]: value });
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            // Handle error appropriately, e.g., show an error message to the user
        }
    }

    async function getEndereco(cep) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching address:', error);
            throw error; // Rethrow the error to be caught by the handleChange function
        }
    }

    function salvar(dados) {
        AsyncStorage.getItem('Aluno').then(resultado => {

            const Aluno = JSON.parse(resultado) || []
      
            if (id >= 0) {
              Aluno.splice(id, 1, dados)
            } else {
              Aluno.push(dados)
            }
      
            AsyncStorage.setItem('Aluno', JSON.stringify(Aluno))
      
            navigation.goBack()
          })
        }

    return (
        <ScrollView style={{ margin: 15 }}>

            <Formik
                initialValues={aluno}
                validationSchema={alunosValidator}
                onSubmit={values => salvar(values)}
                    >
                    {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                    <>

                        
                        <TextInput
                            style={{ marginTop: 10 }}
                            mode='outlined'
                            label='Nome'
                            value={dados.nome}
                            onChangeText={(valor) => handleChange(valor, 'nome')}
                        />
                        <Validacao errors={errors.nome} touched={touched.nome} />

                        <TextInput
                            style={{ marginTop: 10 }}
                            mode='outlined'
                            label='CPF'
                            keyboardType='decimal-pad'
                            value={dados.cpf}
                            onChangeText={(value) => {setFieldValue('cpf', mask(value,'999.999.999-99'))}}
                        />
                        <Validacao errors={errors.cpf} touched={touched.cpf} />

                        <TextInput
                            style={{ marginTop: 10 }}
                            mode='outlined'
                            label='Matrícula'
                            keyboardType='decimal-pad'
                            value={dados.matricula}
                            onChangeText={(value) => {setFieldValue('matricula', mask(value, '999999-99'))}}
                        />
                        <Validacao errors={errors.matricula} touched={touched.matricula} />

                        <TextInput
                            style={{ marginTop: 10 }}
                            mode='outlined'
                            label='E-mail'
                            keyboardType='email-address'
                            value={dados.email}
                            onChangeText={(valor) => handleChange(valor, 'email')}
                        />
                        <Validacao errors={errors.email} touched={touched.email} />

                        <TextInput
                            style={{ marginTop: 10 }}
                            mode='outlined'
                            label='Telefone'
                            keyboardType='number-pad'
                            value={dados.telefone}
                            onChangeText={(valor) => handleChange(valor, 'telefone')}
                        />
                        <Validacao errors={errors.telefone} touched={touched.telefone} />

                        <TextInput
                            style={{ marginTop: 10 }}
                            mode='outlined'
                            label='CEP'
                            value={dados.cep}
                            keyboardType='number-pad'
                            onChangeText={(valor) => handleChange(valor, 'cep')}
                        />
                        <Validacao errors={errors.cep} touched={touched.cep} />

                        <TextInput
                            style={{ marginTop: 10 }}
                            mode='outlined'
                            label='Logradouro'
                            value={dados.logradouro}
                            onChangeText={(valor) => handleChange(valor, 'logradouro')}
                        />
                        <Validacao errors={errors.logradouro} touched={touched.logradouro} />

                        <TextInput
                            style={{ marginTop: 10 }}
                            mode='outlined'
                            label='Bairro'
                            value={dados.bairro}
                            onChangeText={(valor) => handleChange(valor, 'bairro')}
                        />
                        <Validacao errors={errors.bairro} touched={touched.bairro} />

                        <TextInput
                            style={{ marginTop: 10 }}
                            mode='outlined'
                            label='Número'
                            value={dados.numero}
                            keyboardType='number-pad'
                            onChangeText={(valor) => handleChange(valor, 'numero')}
                        />
                        <Validacao errors={errors.numero} touched={touched.numero} />

                        <TextInput
                            style={{ marginTop: 10 }}
                            mode='outlined'
                            label='Complemento'
                            value={dados.complemento}
                            onChangeText={(valor) => handleChange(valor, 'complemento')}
                        />
                        <Validacao errors={errors.complemento} touched={touched.complemento} />

                        <Button onPress={handleSubmit}>Salvar</Button>
                    </>
                )}

            </Formik>
        </ScrollView>
    )
}

export default AlunosForm