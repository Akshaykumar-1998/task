import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function DetailScreen({ route, navigation }) {
  const { task: initialTask, onStatusChange } = route.params;
  const [task, setTask] = useState(initialTask);

  const toggleStatus = () => {
    const updatedTask = { ...task, completed: !task.completed };
    setTask(updatedTask);
    onStatusChange(updatedTask);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Details</Text>

      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.text}>User ID: {task.userId}</Text>
        <Text
          style={[
            styles.status,
            { color: task.completed ? '#28a745' : '#ff9800' },
          ]}
        >
          Status: {task.completed ? '✓ Completed' : '✗ Incomplete'}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={toggleStatus}>
        <Text style={styles.buttonText}>Toggle Status</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  heading: {
    fontSize: width * 0.06,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: height * 0.04,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: height * 0.04,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: '600',
    marginBottom: height * 0.01,
    color: '#222',
  },
  text: {
    fontSize: width * 0.04,
    marginBottom: height * 0.008,
    color: '#555',
  },
  status: {
    fontSize: width * 0.045,
    fontWeight: '500',
    marginTop: height * 0.01,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: height * 0.014,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
});
