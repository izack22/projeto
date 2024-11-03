import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SignUp({ setIsAuthenticated }) {
  const [user, setUser] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    endereco: '',
    bairro: '',
  });

  const navigation = useNavigation(); // Hook para navegação

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (user.nome && user.email && user.senha && user.cpf && user.endereco && user.bairro) {
      Alert.alert('Usuário cadastrado com sucesso!');
      setIsAuthenticated(true); 
      navigation.navigate('Home'); 
    } else {
      Alert.alert('Por favor, preencha todos os campos.');
    }
  };

  const handleContinueWithoutLogin = () => {
    setIsAuthenticated(true); 
    navigation.navigate('Home'); 
  };

  return (
    <View style={styles.signupContainer}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={user.nome}
          onChangeText={(value) => handleChange('nome', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          keyboardType="email-address"
          onChangeText={(value) => handleChange('email', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          value={user.senha}
          secureTextEntry={true}
          onChangeText={(value) => handleChange('senha', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>CPF:</Text>
        <TextInput
          style={styles.input}
          value={user.cpf}
          keyboardType="numeric"
          onChangeText={(value) => handleChange('cpf', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Endereço:</Text>
        <TextInput
          style={styles.input}
          value={user.endereco}
          onChangeText={(value) => handleChange('endereco', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bairro:</Text>
        <TextInput
          style={styles.input}
          value={user.bairro}
          onChangeText={(value) => handleChange('bairro', value)}
        />
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
        <Text style={styles.signupButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleContinueWithoutLogin} style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continuar sem login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  signupButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#1e88e5',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default SignUp;



