import TechnicianCard from '@/components/techniciancard';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/constants/colors';
import { Icons } from '@/constants/icons';
import { Task } from '@/interfaces/type';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export default function CategoryDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    // Mock task data - replace with actual data fetching
    const task = {
        id: id,
        title: 'Complete Project Documentation',
        description: 'Create comprehensive documentation for the new feature including API endpoints, user guides, and technical specifications.',
        status: 'Open',
        priority: 'High',
        dueDate: '2024-03-15',
        assignee: 'John Doe',
        createdDate: '2024-03-01',
        category: 'Documentation',
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open': return '#3B82F6';
            case 'In Progress': return PRIMARY_COLOR;
            case 'Closed': return '#10B981';
            default: return '#6B7280';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return '#EF4444';
            case 'Medium': return '#F59E0B';
            case 'Low': return '#3B82F6';
            default: return '#6B7280';
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className='p-2 bg-primary rounded-full'
                >
                    <Ionicons name="arrow-back" size={24} color={SECONDARY_COLOR} />
                </TouchableOpacity>
            </View>



            {/* Details Grid */}
            <Animated.View
                entering={FadeInDown.delay(300).duration(400)}
                className='p-6 flex-1'
            >
                <FlatList
                    data={sampleTasks}
                    renderItem={({ item }) => <TechnicianCard task={item} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View >
                            <Text >No technicians found</Text>
                            <Text >Try adjusting your filters</Text>
                        </View>
                    }
                    ListHeaderComponent={
                        <>
                            {/* Title Section */}
                            <Animated.View
                                entering={FadeInDown.delay(100).duration(400)}
                                className='pb-6'
                            >
                                <View className='bg-gray-200 rounded-3xl w-28 h-28 items-center justify-center mb-4'>
                                    <Image source={Icons.setting} className='w-20 h-20' resizeMode='contain' />
                                </View>
                                <Text className='text-3xl font-bold mb-4'>{id}</Text>
                                <View className='flex-row items-center gap-2'>
                                    <Ionicons name="location-outline" size={20} color={PRIMARY_COLOR} />
                                    {/* <Star color={PRIMARY_COLOR} size={20} />
                        <Text className='text-lg'>{4.9}</Text>
                        <Text className='text-lg'>{`(10,000+ bookings)`}</Text> */}
                                    <Text className='text-md text-gray-600'>{`New York, NY, USA`}</Text>
                                </View>
                            </Animated.View>
                            <View className='h-[0.5px] bg-gray-300 mb-6'></View>
                            {/* Description */}
                            <Animated.View
                                entering={FadeInDown.delay(200).duration(400)}
                                className='pb-6'
                            >
                                <Text className='text-2xl font-bold mb-2'>Technicians</Text>
                                <Text style={styles.description}>{task.description}</Text>
                            </Animated.View>
                        </>
                    }
                />
            </Animated.View>

            {/* Action Buttons */}
            <Animated.View
                entering={FadeInDown.delay(400).duration(400)}
                style={styles.actions}
            >

            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: SECONDARY_COLOR,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    badges: {
        flexDirection: 'row',
        gap: 8,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 4,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: SECONDARY_COLOR,
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#6B7280',
    },
    detailsGrid: {
        gap: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    detailIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: PRIMARY_COLOR + '20',
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailContent: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        color: '#9CA3AF',
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 15,
        fontWeight: '500',
        color: SECONDARY_COLOR,
    },
    actions: {
        gap: 12,
        marginTop: 8,
    },
    primaryButton: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: SECONDARY_COLOR,
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FEE2E2',
        backgroundColor: '#FEF2F2',
        gap: 8,
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EF4444',
    },
});