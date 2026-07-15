import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, Image, Pressable } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../../App';
import CustomButton from '../components/CustomButton';

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;


interface TodoItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const DEFAULT_PLACEHOLDER = 'https://picsum.photos/200';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [nameText, setNameText] = useState('');
  const [descText, setDescText] = useState('');
  const [imageText, setImageText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSaveTodo = () => {
    if (nameText.trim() === '' || descText.trim() === '') {
      Alert.alert('Error', 'Name and Description are required.');
      return;
    }

    const targetImage = imageText.trim() === '' ? DEFAULT_PLACEHOLDER : imageText.trim();

    if (editingId) {
      setTodos(prevTodos =>
        prevTodos.map(item => 
          item.id === editingId 
            ? { ...item, name: nameText, description: descText, imageUrl: targetImage } 
            : item
        )
      );
      setEditingId(null);
    } else {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        name: nameText,
        description: descText,
        imageUrl: targetImage,
      };
      setTodos(prevTodos => [...prevTodos, newTodo]);
    }

    setNameText('');
    setDescText('');
    setImageText('');
  };

  const startEditTodo = (item: TodoItem) => {
    setNameText(item.name);
    setDescText(item.description);
    setImageText(item.imageUrl === DEFAULT_PLACEHOLDER ? '' : item.imageUrl);
    setEditingId(item.id);
  };
  
  const deleteTodo = (id: string) => {
  const updatedTodos = todos.filter(item => item.id !== id);
  
  setTodos(updatedTodos);

  if (editingId === id) {
    setEditingId(null);
    setNameText('');
    setDescText('');
    setImageText('');
  }
};

  const renderTodoItem = ({ item }: { item: TodoItem }) => (
  <Pressable
    style={styles.cardContainer}
    onPress={() =>
      navigation.navigate('TaskDetailes', {
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
      })
    }
    
  >
    <Image 
      source={{ uri: item.imageUrl }} 
      style={styles.cardImage} 
      resizeMode="cover"
    />
    
    <View style={styles.cardContent}>
      <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
      
      <View style={styles.actionGroup}>
        <View style={styles.actionButtonWrapper}>
          <CustomButton 
            title="Edit" 
            onPress={() => startEditTodo(item)} 
            backgroundColor="#ffc507"
            textColor="#000"
          />
        </View>
        <View style={styles.actionButtonWrapper}>
          <CustomButton 
            title="Delete" 
            onPress={() => deleteTodo(item.id)} 
            backgroundColor="#DC3545"
            textColor="#FFF"
          />
        </View>
      </View>
    </View>
  </Pressable>
);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Todo List</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={nameText}
          onChangeText={setNameText}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={descText}
          onChangeText={setDescText}
          multiline
          numberOfLines={2}
        />
        <TextInput
          style={styles.input}
          placeholder="Image Link/URL"
          value={imageText}
          onChangeText={setImageText}
          keyboardType="url"
        />
        
        <CustomButton 
          title={editingId ? "Update Item" : "Create Item"} 
          onPress={handleSaveTodo}
          backgroundColor={editingId ? "#28A745" : "#008cff"} 
        />
        
        {editingId && (
          <CustomButton 
            title="Cancel Edit" 
            onPress={() => {
              setEditingId(null);
              setNameText('');
              setDescText('');
              setImageText('');
            }}
            backgroundColor="transparent"
            textColor="#000000"
          />
        )}
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderTodoItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items found. Create one above!</Text>
        }
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 5,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Yuyu',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 7,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 7,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0eded',
  },
  input: {
    height: 40,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 5,
    marginBottom: 15,
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 60,
    textAlignVertical: 'center',
  },
  listContent: {
    paddingBottom: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardImage: {
    width: 100,
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    fontFamily: 'Yuyu',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'Yuyu',
    color: '#4B5563',
    marginBottom: 8,
    lineHeight: 18,
  },
  actionGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButtonWrapper: {
    width: 70,
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 30,
    fontSize: 15,
  },
});

export default HomeScreen;