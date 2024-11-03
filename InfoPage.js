import React, { useState } from 'react';
import { View, Text, Image, TextInput, Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

function InfoPage() {
  const [info, setInfo] = useState([]);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleImageChange = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('Seleção de imagem cancelada');
      } else if (response.error) {
        Alert.alert('Erro:', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setImage(source);
      }
    });
  };

  const handleAddInfo = () => {
    if (image) {
      const newInfo = { id: Date.now(), image, caption };
      setInfo([...info, newInfo]);
      setImage(null);
      setCaption('');
    } else {
      Alert.alert('Por favor, selecione uma imagem.');
    }
  };

  return (
    <View style={styles.infoPage}>
      <Text style={styles.title}>Informações</Text>

      <View style={styles.infoForm}>
        <Text style={styles.subtitle}>Adicionar nova informação</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={handleImageChange}>
          <Text style={styles.imagePickerText}>{image ? "Imagem Selecionada" : "Selecionar Imagem"}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Escreva uma legenda (opcional)"
          value={caption}
          onChangeText={setCaption}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddInfo}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoFeed}>
        <Text style={styles.subtitle}>Informações enviadas</Text>
        {info.length === 0 && <Text style={styles.noInfoText}>Nenhuma informação ainda.</Text>}

        <FlatList
          data={info}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.infoItem}>
              <Image source={item.image} style={styles.infoImage} />
              {item.caption && <Text style={styles.infoText}>{item.caption}</Text>}
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoPage: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoForm: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 15,
  },
  imagePicker: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePickerText: {
    color: '#555',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fafafa',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoFeed: {
    flex: 1,
  },
  noInfoText: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 16,
    marginTop: 20,
  },
  infoItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  infoImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
});

export default InfoPage;

