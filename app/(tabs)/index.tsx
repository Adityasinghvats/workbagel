import React from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';

interface Task  {
  id: string;
  title: string;
  description: string;
  status: string;
}

const tasks = [
  { id: '1', title: 'Task 1', description: 'Fix the leaky faucet in the main bathroom.', status: 'Open' },
  { id: '2', title: 'Task 2', description: 'Install a new ceiling fan in the living room.', status: 'In Progress' },
  { id: '3', title: 'Task 3', description: 'Repair the broken window in the kitchen.', status: 'Closed' },
  { id: '4', title: 'Task 4', description: 'Paint the bedroom walls.', status: 'Open' },
  { id: '5', title: 'Task 5', description: 'Fix the electrical outlet in the office.', status: 'Open' },
];

const TaskCard = ({ task }: { task: Task }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{task.title}</Text>
    <Text style={styles.cardDescription}>{task.description}</Text>
    <Text style={styles.cardStatus}>{task.status}</Text>
  </View>
);

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskCard task={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  cardStatus: {
    fontSize: 12,
    color: 'blue',
    marginTop: 10,
  },
});
