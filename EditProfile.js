import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function EditProfile({ route }) {
  const navigation = useNavigation();
  
  // Dados do usuário, podendo vir como parâmetros ou de um estado global
  const { userData } = route.params;
  
  const [user, setUser] = useState({
    nome: userData.nome || '',
    email: userData.email || '',
    senha: userData.senha || ''
  });

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSave = () => {
    // Aqui você pode implementar a lógica para salvar os dados editados, como uma chamada à API ou atualização de estado global
    Alert.alert('Dados salvos com sucesso!');
    navigation.goBack(); // Volta para a tela anterior após salvar
  };

  return (
    <View style={styles.editProfileContainer}>
      <Text style={styles.title}>Editar Cadastro</Text>
      
      <View style={styles.inputContainer}>
        <Text>Nome:</Text>
        <TextInput
          style={styles.input}
          value={user.nome}
          onChangeText={(value) => handleChange('nome', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          keyboardType="email-address"
          onChangeText={(value) => handleChange('email', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Senha:</Text>
        <TextInput
          style={styles.input}
          value={user.senha}
          secureTextEntry={true}
          onChangeText={(value) => handleChange('senha', value)}
        />
      </View>

      <Button title="Salvar Alterações" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  editProfileContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default EditProfile;
