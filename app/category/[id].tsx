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

const getCardText = (text: string) => {
    switch (text) {
        case 'AIRCONDITIONING':
            return 'AC Service & Repair';
        case 'HOMEAPPLIANCEREPAIR':
            return 'Appliance Repair & Service';
        case 'ELECTRICAL':
            return 'Electrician & Plumber';
        case 'HOMEIMPROVEMENT':
            return 'Full Home Makeover';
        case 'PESTCONTROL':
            return 'Pest Control';
        case 'CLEANING':
            return 'Cleaning & Gardening';
        case 'CARPENTRY':
            return 'Carpentry & Woodwork';
    }
}

const getCardImage = (text: string) => {
    switch (text) {
        case 'AIRCONDITIONING':
            return Icons.setting;
        case 'HOMEAPPLIANCEREPAIR':
            return Icons.mechanic;
        case 'ELECTRICAL':
            return Icons.bathtub;
        case 'HOMEIMPROVEMENT':
            return Icons.paintroller;
        case 'PESTCONTROL':
            return Icons.spiderweb;
        case 'CLEANING':
            return Icons.mechanic;
        case 'CARPENTRY':
            return Icons.drill;
    }
}

const categoryDescription = (text: string) => {
    switch (text) {
        case 'AIRCONDITIONING':
            return 'Professional air conditioning services including installation, repair, and maintenance for residential and commercial properties.';
        case 'HOMEAPPLIANCEREPAIR':
            return 'Expert appliance repair services for refrigerators, washing machines, ovens, and more to keep your home running smoothly.';
        case 'ELECTRICAL':
            return 'Certified electricians providing safe and reliable electrical services including wiring, lighting, and repairs.';
        case 'HOMEIMPROVEMENT':
            return 'Comprehensive home improvement solutions including remodeling, renovations, and custom projects to enhance your living space.';
        case 'PESTCONTROL':
            return 'Effective pest control services to protect your home from insects, rodents, and other unwanted guests.';
        case 'CLEANING':
            return 'Professional cleaning and gardening services to maintain a clean and beautiful home environment.';
        case 'CARPENTRY':
            return 'Skilled carpentry services for custom woodwork, furniture repair, and home improvements.';
    }
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

export default function CategoryDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

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
                                entering={FadeInDown.delay(100).duration(300)}
                                className='pb-6'
                            >
                                <View className='bg-gray-200 rounded-3xl w-28 h-28 items-center justify-center mb-4'>
                                    <Image source={getCardImage(id)} className='w-20 h-20' resizeMode='contain' />
                                </View>
                                <Text className='text-3xl font-bold mb-2'>{getCardText(id)}</Text>
                                <Text style={styles.description}>{categoryDescription(id)}</Text>
                            </Animated.View>
                            <View className='h-[0.5px] bg-gray-300 mb-6'></View>
                            {/* Description */}
                            <Animated.View
                                entering={FadeInDown.delay(200).duration(300)}
                                className='pb-6'
                            >
                                <Text className='text-2xl font-bold'>Technicians</Text>
                            </Animated.View>
                        </>
                    }
                />
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