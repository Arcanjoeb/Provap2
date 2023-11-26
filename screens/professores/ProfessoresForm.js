import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import ProfessorValidator from '../../validators/professorValidator'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'
import Validacao from '../../components/Validacao'

const ProfessoresForm = ({ navigation, route }) => {

  let Professor = {
    nome: '',
    cpf: '',
    modalidade: ''
  }

  const [selectedLanguage, setSelectedLanguage] = useState();

  const id = route.params?.id

  if (id >= 0) {
    Professor = route.params?.Professor
  }

  function salvar(dados) {

    AsyncStorage.getItem('Professores').then(resultado => {

      const Professores = JSON.parse(resultado) || []

      if (id >= 0) {
        Professores.splice(id, 1, dados)
      } else {
        Professores.push(dados)
      }

      AsyncStorage.setItem('Professores', JSON.stringify(Professores))

      navigation.goBack()
    })
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de Professor</Text>

      <Formik
        initialValues={Professor}
        validationSchema={ProfessorValidator}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
          <View>

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Nome'
              value={values.nome}
              onChangeText={handleChange('nome')}
            />
            <Validacao errors={errors.nome} touched={touched.nome} />

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Cpf'
              keyboardType='decimal-pad'
              value={values.cpf}
              onChangeText={(value) => {setFieldValue('cpf', mask(value, '999.999.999-99'))}}
            />
            <Validacao errors={errors.cpf} touched={touched.cpf} />

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Matricula'
              keyboardType='decimal-pad'
              value={values.matricula}
              onChangeText={(value) => {setFieldValue('matricula', mask(value, '9999999-99'))}}
              
            />
            <Validacao errors={errors.matricula} touched={touched.matricula} />

            <Picker
              selectedValue={values.modalidade}
              onValueChange={handleChange('modalidade')}>
              <Picker.Item label="Modalidade" value="" />
              <Picker.Item label="Presencial" value="Presencial" />
              <Picker.Item label="EAD" value="EAD" />
              <Picker.Item label="Híbrido" value="Híbrido" />
            </Picker>
            <Validacao errors={errors.modalidade} touched={touched.modalidade} />          

            <Button onPress={handleSubmit}>Salvar</Button>
          </View>
        )}

      </Formik>



    </ScrollView>
  )
}

export default ProfessoresForm