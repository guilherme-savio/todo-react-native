import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

const TaskItem = ({ task, onToggle }) => {
    return (
        <View style={styles.taskItem}>
            <Checkbox
                status={task.done ? 'checked' : 'unchecked'}
                onPress={() => onToggle(task.id, !task.done)}
            />
            <Text style={[styles.taskTitle, task.done && styles.taskDone]}>
                {task.title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    taskTitle: {
        fontSize: 18,
    },
    taskDone: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
});

export default TaskItem;
