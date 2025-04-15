import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeTasks = async tasks => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (e) {
    console.error('Saving error', e);
  }
};

export const getStoredTasks = async () => {
  try {
    const json = await AsyncStorage.getItem('tasks');
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.error('Reading error', e);
    return null;
  }
};
