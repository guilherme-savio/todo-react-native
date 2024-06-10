import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import TaskItem from '../components/TaskItem';
import { createTable, fetchTasks, updateTaskStatus } from '../db/database';

const TaskListScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        createTable();
        loadTasks();

        const unsubscribe = navigation.addListener('focus', () => {
            loadTasks();
        });

        return unsubscribe;
    }, [navigation]);

    const loadTasks = async () => {
        try {
            const tasks = await fetchTasks();
            setTasks(tasks);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
        }
    };

    const handleToggleTask = async (id, done) => {
        try {
            await updateTaskStatus(id, done);
            loadTasks();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TaskItem task={item} onToggle={handleToggleTask} />
                )}
                keyExtractor={item => item.id.toString()}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('AddTask')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default TaskListScreen;
