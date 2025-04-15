import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import TaskItem from '../components/TaskItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      const slicedData = data.slice(0, 50);
      setTasks(slicedData);
      await AsyncStorage.setItem('tasks', JSON.stringify(slicedData));
      setError(false);
    } catch (e) {
      setError(true);
      const localData = await AsyncStorage.getItem('tasks');
      if (localData) {
        setTasks(JSON.parse(localData));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTaskStatus = (updatedTask) => {
    const updatedTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(updatedTasks);
    AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const getFilteredTasks = () => {
    if (filter === 'Completed') return tasks.filter(task => task.completed);
    if (filter === 'Incomplete') return tasks.filter(task => !task.completed);
    return tasks;
  };

  const renderFilterButton = (title) => (
    <TouchableOpacity
      onPress={() => setFilter(title)}
      style={[
        styles.filterButton,
        filter === title && styles.activeFilterButton
      ]}
    >
      <Text
        style={[
          styles.filterButtonText,
          filter === title && styles.activeFilterButtonText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        {renderFilterButton('All')}
        {renderFilterButton('Completed')}
        {renderFilterButton('Incomplete')}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#333" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error fetching tasks</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchTasks}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={getFilteredTasks()}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onPress={() => navigation.navigate('Detail', {
                task: item,
                onStatusChange: updateTaskStatus
              })}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
    backgroundColor: '#f9f9f9',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  filterButton: {
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.06,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  filterButtonText: {
    fontSize: width * 0.04,
    color: '#555',
    textAlign: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#007bff',
  },
  activeFilterButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    paddingBottom: height * 0.05,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: height * 0.01,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.05,
  },
  errorText: {
    fontSize: width * 0.045,
    color: 'red',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.015,
    borderRadius: 25,
  },
  retryButtonText: {
    fontSize: width * 0.045,
    color: '#fff',
    textAlign: 'center',
  },
});
