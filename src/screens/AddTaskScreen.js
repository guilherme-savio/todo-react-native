import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { insertTask } from '../db/database';

const AddTaskScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');

    const handleAddTask = async () => {
        if (title.trim().length === 0) {
            Alert.alert('Erro', 'O título da tarefa não pode estar vazio.');
            return;
        }

        try {
            await insertTask(title);
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível adicionar a tarefa.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Título da tarefa"
                value={title}
                onChangeText={setTitle}
            />
            <Button title="Adicionar Tarefa" onPress={handleAddTask} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default AddTaskScreen;
