import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import TurmasValidator from '../../validators/turmasValidator'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'
import Validacao from '../../components/Validacao'

const TurmasForm = ({ navigation, route }) => {

  let Turmas = {
    turma: '',
    alunos: '',
    turno:'',
    modalidade: ''
  }

  const [selectedLanguage, setSelectedLanguage] = useState();

  const id = route.params?.id

  if (id >= 0) {
    Turmas = route.params?.Turmas
  }

  function salvar(dados) {

    AsyncStorage.getItem('Turmas').then(resultado => {

      const Turmas = JSON.parse(resultado) || []

      if (id >= 0) {
        Turmas.splice(id, 1, dados)
      } else {
        Turmas.push(dados)
      }

      AsyncStorage.setItem('Turmas', JSON.stringify(Turmas))

      navigation.goBack()
    })
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de Turmas</Text>

      <Formik
        initialValues={Turmas}
        validationSchema={TurmasValidator}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
          <View>

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Turma'
              value={values.turma}
              onChangeText={handleChange('turma')}
            />
            <Validacao errors={errors.turma} touched={touched.turma} />

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='N° Alunos'
              keyboardType='decimal-pad'
              value={values.alunos}
              onChangeText={handleChange('alunos')}
            />
            <Validacao errors={errors.alunos} touched={touched.alunos} />

            <Picker
              selectedValue={values.turno}
              onValueChange={handleChange('turno')}>
              <Picker.Item label="Turno" value="" />
              <Picker.Item label="Manha" value="Manha" />
              <Picker.Item label="Tarde" value="Tarde" />
              <Picker.Item label="Noite" value="Noite" />
              <Picker.Item label="Integral" value="Integral" />
            </Picker>
            <Validacao errors={errors.turno} touched={touched.turno} />          

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

export default TurmasForm