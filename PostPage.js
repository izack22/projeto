import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

function PostPage() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
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

  const handlePost = () => {
    if (image) {
      const newPost = { image, caption };
      setPosts([newPost, ...posts]);
      setImage(null);
      setCaption('');
    } else {
      Alert.alert('Por favor, selecione uma imagem.');
    }
  };

  return (
    <View style={styles.postPage}>
      <Text style={styles.title}>Postagens de Fotos</Text>

      <View style={styles.postForm}>
        <Text style={styles.subtitle}>Postar uma nova foto</Text>
        
        <TouchableOpacity style={styles.imagePicker} onPress={handleImageChange}>
          <Text style={styles.imagePickerText}>{image ? "Imagem Selecionada" : "Selecionar Imagem"}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Escreva uma legenda (opcional)"
          value={caption}
          onChangeText={(text) => setCaption(text)}
        />

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Postar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.postFeed}>
        <Text style={styles.subtitle}>Postagens recentes</Text>
        {posts.length === 0 && <Text style={styles.noPosts}>Nenhuma postagem ainda.</Text>}
        
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Image source={item.image} style={styles.postImage} />
              {item.caption && <Text style={styles.postCaption}>{item.caption}</Text>}
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postPage: {
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
  postForm: {
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
  postButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  postFeed: {
    flex: 1,
  },
  noPosts: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 16,
    marginTop: 20,
  },
  post: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  postCaption: {
    fontSize: 16,
    color: '#333',
  },
});

export default PostPage;
