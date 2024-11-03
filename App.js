import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import FormPage from './FormPage';
import InfoPage from './InfoPage';
import SignUp from './SignUp';
import PostPage from './PostPage';

const Stack = createStackNavigator();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="SignUp" 
          options={{ headerShown: false }}
        >
          {() => <SignUp setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={({ navigation }) => ({
            title: 'Página Principal',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.editProfileButton}>Editar Perfil</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="FormPage" component={FormPage} />
        <Stack.Screen name="InfoPage" component={InfoPage} />
        <Stack.Screen name="PostPage" component={PostPage} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={[styles.section, styles.asphaltSection]}>
        <Text style={styles.header}>Asfalto</Text>
        <Text style={styles.sectionText}>Informações sobre o asfalto.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PostPage')}>
          <Text style={styles.link}>Clique aqui para ver as postagens</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.section, styles.lightingSection]}>
        <Text style={styles.header}>Iluminação</Text>
        <Text style={styles.sectionText}>Informações sobre a iluminação.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('InfoPage')}>
          <Text style={styles.link}>Clique aqui para ver mais informações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function EditProfile() {
  const [user, setUser] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSave = () => {
    Alert.alert('Perfil atualizado!', `Nome: ${user.nome}, Email: ${user.email}`);
  };

  return (
    <View style={styles.editContainer}>
      <Text style={styles.title}>Editar Perfil</Text>
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
          onChangeText={(value) => handleChange('email', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Senha:</Text>
        <TextInput
          style={styles.input}
          value={user.senha}
          secureTextEntry
          onChangeText={(value) => handleChange('senha', value)}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  asphaltSection: {
    backgroundColor: '#e0f7fa',
  },
  lightingSection: {
    backgroundColor: '#f1f8e9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  link: {
    color: '#1e88e5',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  editProfileButton: {
    color: '#1e88e5',
    fontSize: 16,
    paddingHorizontal: 15,
  },
  editContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: '#fafafa',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
