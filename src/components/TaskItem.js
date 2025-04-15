import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const TaskItem = ({ task, onPress }) => {
  const statusColor = task.completed ? '#28a745' : '#ff9800'; 

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={[styles.status, { color: statusColor }]}>
          Status: {task.completed ? 'Completed' : 'Incomplete'}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Update Status</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    paddingRight: width * 0.04,
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: height * 0.005,
    color: '#333',
  },
  status: {
    fontSize: width * 0.04,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.035,
    fontWeight: '500',
  },
});

export default TaskItem;
