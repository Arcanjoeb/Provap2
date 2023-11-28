import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import { Formik } from 'formik';
import { mask } from 'remask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Validacao from '../../components/Validacao';
import alunosValidator from '../../validators/alunosValidator';
import { Picker } from '@react-native-picker/picker';

const AlunosForm = ({ navigation }) => {
  const [id, setId] = useState(-1);
  const [dados, setDados] = useState({});
  const [cepData, setCepData] = useState({
    rua: '',
    bairro: '',
    cidade: '',
    uf: '',
    ibge: '',
  });
  const [cepEditable, setCepEditable] = useState(true);

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const storedFormData = await AsyncStorage.getItem('formData');
        if (storedFormData) {
          setDados(JSON.parse(storedFormData));
        }
      } catch (error) {
        console.error('Erro ao recuperar os dados:', error);
      }
    };

    fetchStoredData();
  }, []);

  function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');

    if (cep !== '') {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        axios
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          .then((response) => {
            if (!('erro' in response.data)) {
              setCepData({
                rua: response.data.logradouro,
                bairro: response.data.bairro,
                cidade: response.data.localidade,
                uf: response.data.uf,
              });
              setCepEditable(false);
            } else {
              Alert.alert('CEP não encontrado.');
            }
          })
          .catch((error) => {
            Alert.alert('Erro ao buscar CEP.');
          });
      }
    }
  }

  function salvar(dados) {
    AsyncStorage.getItem('Aluno').then((resultado) => {
      const Aluno = JSON.parse(resultado) || [];

      if (id >= 0) {
        Aluno.splice(id, 1, dados);
      } else {
        Aluno.push(dados);
      }

      AsyncStorage.setItem('Aluno', JSON.stringify(Aluno));

      navigation.goBack();
    });
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Formik
        initialValues={dados}
        validationSchema={alunosValidator}
        onSubmit={(values) => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
          <>
            <TextInput
              style={{ marginTop: 10 }}
              mode="outlined"
              label="Nome"
              value={values.nome}
              onChangeText={(valor) => setFieldValue('nome', valor)}
            />
            <Validacao errors={errors.nome} touched={touched.nome} />
            
            <Picker
              selectedValue={values.modalidade}
              onValueChange={handleChange('modalidade')}>
              <Picker.Item label="Modalidade" value="" />
              <Picker.Item label="Presencial" value="Presencial" />
              <Picker.Item label="EAD" value="EAD" />
              <Picker.Item label="Híbrido" value="Híbrido" />
            </Picker>
            <Validacao errors={errors.modalidade} touched={touched.modalidade} />

            <TextInput
              style={{ marginTop: 10 }}
              mode="outlined"
              label="CPF"
              keyboardType="decimal-pad"
              value={values.cpf}
              onChangeText={(value) => setFieldValue('cpf', mask(value, '999.999.999-99'))}
            />
            <Validacao errors={errors.cpf} touched={touched.cpf} />

            <TextInput
              style={{ marginTop: 10 }}
              mode="outlined"
              label="Matrícula"
              keyboardType="decimal-pad"
              value={values.matricula}
              onChangeText={(value) => setFieldValue('matricula', mask(value, '999999-99'))}
            />
            <Validacao errors={errors.matricula} touched={touched.matricula} />
            
            <TextInput
              style={{ marginTop: 10 }}
              mode="outlined"
              label="E-mail"
              keyboardType="email-address"
              value={values.email}
              onChangeText={(valor) => setFieldValue('email', valor)}
            />
            <Validacao errors={errors.email} touched={touched.email} />

            <TextInput
              style={{ marginTop: 10 }}
              mode="outlined"
              label="Telefone"
              keyboardType="number-pad"
              value={values.telefone}
              onChangeText={(value) => setFieldValue('telefone', mask(value, '(99) 99999-9999'))}
            />
            <Validacao errors={errors.telefone} touched={touched.telefone} />

            <TextInput
              style={{ backgroundColor: 'white' , marginTop: 10 }}
               mode="outlined"
              placeholder="CEP"
              value={values.cep}
              onChangeText={(value) => {
                setFieldValue('cep', mask (value, '99999-999'));
                pesquisacep(value);
              }}
            />
            <TextInput
              style={{ backgroundColor: 'white',marginTop: 10  }}
               mode="outlined"
              placeholder="Rua"
              value={cepData.rua}
              editable={cepEditable}
            />
            <TextInput
              style={{ backgroundColor: 'white',marginTop: 10  }}
               mode="outlined"
              placeholder="Bairro"
              value={cepData.bairro}
              editable={cepEditable}
            />
            <TextInput
              style={{ backgroundColor: 'white',marginTop: 10  }}
               mode="outlined"
              placeholder="Cidade"
              value={cepData.cidade}
              editable={cepEditable}
            />
            <TextInput
              style={{ backgroundColor: 'white',marginTop: 10  }}
               mode="outlined"
              placeholder="UF"
              value={cepData.uf}
              editable={cepEditable}
            />

            <Button onPress={handleSubmit}>Salvar</Button>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default AlunosForm;

