//// filepath: d:\saas\workbagel\app\slot\add\addSlot.tsx
import SlotCard from '@/components/slot-card';
import { Colors, SECONDARY_COLOR } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const slots = [
    {
        date: '2025-11-16',
        startTime: '4:40 am',
        endTime: '4:40 pm',
        totalCost: 89,
    },
    {
        date: new Date(),
        startTime: '10:00 am',
        endTime: '12:00 pm',
        totalCost: '$120 ',
    },
    {
        date: '2025-11-18',
        startTime: '1:00 pm',
        endTime: '3:00 pm',
        totalCost: 75,
    },
    {
        date: '2025-11-20',
        startTime: '9:00 am',
        endTime: '11:00 am',
        totalCost: 95,
    }
];

export default function ManageSlots() {
    const router = useRouter();
    const [selectedButton, setSelectedButton] = useState<number>(0);
    const toggleButton = (index: number) => {
        setSelectedButton(prev =>
            prev === index ? 0 : index
        );
    };

    // const getFilteredTasks = () => {
    //     let filtered = [];

    //     // Filter by status
    //     if (selectedButton > 0) {
    //         const statusMap = ['Open', 'Closed', 'In Progress', 'Open']; // Map buttons to statuses
    //         const selectedStatus = statusMap[selectedButton - 1];
    //         filtered = filtered.filter(task => task.status === selectedStatus);
    //     }

    //     return filtered;
    // };


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className='p-2 bg-primary rounded-full'
                    >
                        <Ionicons name="arrow-back" size={24} color={SECONDARY_COLOR} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Manage Slots</Text>
                    <TouchableOpacity className='p-2 bg-accent rounded-full'>
                        <Ionicons name="ellipsis-horizontal" size={24} color={SECONDARY_COLOR} />
                    </TouchableOpacity>

                </View>
                <Animated.View entering={FadeInDown.delay(100).duration(400)} className='px-6 pb-4 rounded-b-3xl'>
                    <View className='flex flex-col items-center justify-center'>
                        <View className='flex flex-row px-4 mb-6'>
                            <View className='bg-primary/20 px-4 py-4 m-2 w-1/3 justify-center items-center rounded-2xl'>
                                <Text className='text-xl font-bold' numberOfLines={2}>{1120}</Text>
                                <Text className='text-primary-dark' numberOfLines={2}>Completed</Text>
                            </View>
                            <View className='bg-primary/20 px-4 py-4 m-2 w-1/3 justify-center items-center rounded-2xl'>
                                <Text className='text-xl font-bold' numberOfLines={2}>{4.5}</Text>
                                <Text className='text-primary-dark' numberOfLines={2}>Cancelled</Text>
                            </View>
                            <View className='bg-primary/20 px-4 py-4 m-2 w-1/3 justify-center items-center rounded-2xl'>
                                <Text className='text-xl font-bold' numberOfLines={2}>{2} Hrs</Text>
                                <Text className='text-primary-dark' numberOfLines={2}>Booked</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        {["All", "Available", "Booked"].map((label, index) => (
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
                </Animated.View>
                <View className='border border-gray-200'></View>
                <Animated.View
                    entering={FadeInDown.delay(100).duration(400)}
                >
                    <FlatList
                        data={slots}
                        renderItem={({ item }) => <SlotCard date={item.date} startTime={item.startTime} endTime={item.endTime} totalCost={item.totalCost} />}
                        keyExtractor={item => item.date.toString()}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No bagels found</Text>
                                <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
                            </View>
                        }
                    />
                </Animated.View>

                {/* End */}
                <Animated.View
                    entering={FadeInDown.delay(200).duration(400)}>

                </Animated.View>
                <View pointerEvents='box-none' className='absolute bg-transparent px-6 bottom-8'>
                    <Animated.View entering={FadeInDown.delay(300).duration(400)} className='flex flex-row justify-between bg-transparent w-full gap-2'>
                        <Pressable

                            onPress={() => router.push('/slot/add/addSlot')}
                            className={`mt-2 w-full rounded-full px-4 py-4 bg-tertiary-light
                                }`}
                        >
                            <Text className="text-center text-xl font-semibold text-white">Add Slot</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles: { container: ViewStyle; header: ViewStyle; headerTitle: TextStyle, buttonContainer: ViewStyle, button: ViewStyle, buttonSelected: ViewStyle, buttonText: TextStyle, buttonTextSelected: TextStyle, list: ViewStyle, emptyContainer: ViewStyle, emptyText: TextStyle, emptySubtext: TextStyle } = {
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
    list: {
        padding: 20,
        paddingBottom: 400, // Add extra padding to account for tab bar (84px height + 16px buffer)
        gap: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: SECONDARY_COLOR,
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
        borderWidth: 1,
        borderColor: Colors.tertiary.light,
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
}