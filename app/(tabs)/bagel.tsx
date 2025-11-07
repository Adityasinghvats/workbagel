import TaskCard from '@/components/TaskCard';
import { Colors } from '@/constants/colors';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Closed';
    priority?: 'High' | 'Medium' | 'Low';
    dueDate?: string;
    assignee?: string;
}

const sampleTasks: Task[] = [
    {
        id: '1',
        title: 'Fix Leaky Faucet',
        description: 'The faucet in the main bathroom is leaking and needs immediate repair.',
        status: 'Open',
        priority: 'High',
        dueDate: 'Nov 8',
        assignee: 'John D.',
    },
    {
        id: '2',
        title: 'Install Ceiling Fan',
        description: 'Install a new ceiling fan in the living room to improve air circulation.',
        status: 'In Progress',
        priority: 'Medium',
        dueDate: 'Nov 10',
        assignee: 'Sarah M.',
    },
    {
        id: '3',
        title: 'Repair Kitchen Window',
        description: 'The kitchen window is broken and needs to be replaced for security.',
        status: 'Closed',
        priority: 'High',
        dueDate: 'Nov 5',
        assignee: 'Mike R.',
    },
    {
        id: '4',
        title: 'Paint Bedroom Walls',
        description: 'Repaint the bedroom walls with a fresh coat of neutral color.',
        status: 'Open',
        priority: 'Low',
        dueDate: 'Nov 15',
        assignee: 'Emma L.',
    },
    {
        id: '5',
        title: 'Fix Electrical Outlet',
        description: 'The electrical outlet in the office is not working properly.',
        status: 'Open',
        priority: 'Medium',
        dueDate: 'Nov 12',
        assignee: 'David K.',
    },
];



export default function HomeScreen() {
    const [selectedButton, setSelectedButton] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleButton = (index: number) => {
        setSelectedButton(prev =>
            prev === index ? 0 : index
        );
    };

    const getFilteredTasks = () => {
        let filtered = sampleTasks;

        // Filter by status
        if (selectedButton > 0) {
            const statusMap = ['Open', 'Closed', 'In Progress', 'Open']; // Map buttons to statuses
            const selectedStatus = statusMap[selectedButton - 1];
            filtered = filtered.filter(task => task.status === selectedStatus);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text className="text-4xl font-bold text-gray-900 pb-8"><Text className='text-primary'>Bagels</Text> For You</Text>
                    <TextInput
                        className='bg-gray-200 pl-8 rounded-full h-16 font-thin text-xl mb-4'
                        placeholder="Search bagels..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={Colors.text.primary}
                    />
                    <View style={styles.buttonContainer}>
                        {["All", "Open", "Closed", "Active"].map((label, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.button,
                                    selectedButton === index && styles.buttonSelected,
                                ]}
                                onPress={() => toggleButton(index)}
                            >
                                <Text style={[
                                    styles.buttonText,
                                    selectedButton === index && styles.buttonTextSelected
                                ]}>
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <FlatList
                    data={getFilteredTasks()}
                    renderItem={({ item }) => <TaskCard task={item} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No bagels found</Text>
                            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
                        </View>
                    }
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    list: {
        padding: 20,
        paddingBottom: 100, // Add extra padding to account for tab bar (84px height + 16px buffer)
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    button: {
        padding: 12,
        borderRadius: 20,
        backgroundColor: '#eee',
        flex: 1,
        alignItems: 'center',
    },
    buttonSelected: {
        backgroundColor: Colors.tertiary.light,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text.primary,
    },
    buttonTextSelected: {
        color: Colors.text.white,
        fontWeight: '700',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text.secondary,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: Colors.text.light,
    },
});
