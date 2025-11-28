import BookingModal from '@/components/booking-modal';
import SlotCard from '@/components/slot-card';
import { Colors, PRIMARY_COLOR, SECONDARY_COLOR } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TaskDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [selectedSlot, setSelectedSlot] = React.useState<number | null>(null);
    const [modalVisible, setModalVisible] = React.useState(false);

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
    const slots = [
        {
            date: '2025-11-16',
            startTime: '4:40 am',
            endTime: '4:40 pm',
            totalCost: 89,
        },
        {
            date: '2025-11-17',
            startTime: '10:00 am',
            endTime: '12:00 pm',
            totalCost: 120,
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
    const handleBooking = () => {
        console.log('Booking confirmed for slot:', selectedSlot);
        if (selectedSlot !== null) {
            setModalVisible(true);
        }
    }
    const handleConfirmBooking = (additionalInfo: string) => {
        console.log('Booking confirmed with additional info:', additionalInfo);
        setModalVisible(false);
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
                <TouchableOpacity className='p-2 bg-accent rounded-full'>
                    <Ionicons name="ellipsis-horizontal" size={24} color={SECONDARY_COLOR} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Title Section */}
                <Animated.View
                    entering={FadeInDown.delay(100).duration(400)}
                    style={styles.section}
                >
                    <View className='flex flex-col items-center justify-center'>
                        <Image source={{ uri: "https://res.cloudinary.com/dixnvhqxl/image/upload/v1760776218/ibmwys2avnjbfrtpozxi.png" }} className='w-32 h-32 border-2 border-primary rounded-full' />
                        <Text className='text-3xl font-semibold pt-4'>{`Aditya Kumar`}</Text>
                        <Text className='text-lg text-gray-600'>{task.category}</Text>
                        <View className='flex flex-row px-4 mt-4'>
                            <View className='bg-primary/20 px-4 py-4 m-2 w-1/3 justify-center items-center rounded-2xl'>
                                <Text className='text-xl font-bold' numberOfLines={2}>{1120}</Text>
                                <Text className='text-primary-dark' numberOfLines={2}>Bookings</Text>
                            </View>
                            <View className='bg-primary/20 px-4 py-4 m-2 w-1/3 justify-center items-center rounded-2xl'>
                                <Text className='text-xl font-bold' numberOfLines={2}>{4.5}</Text>
                                <Text className='text-primary-dark' numberOfLines={2}>Total Rating</Text>
                            </View>
                            <View className='bg-primary/20 px-4 py-4 m-2 w-1/3 justify-center items-center rounded-2xl'>
                                <Text className='text-xl font-bold' numberOfLines={2}>{2} Hrs</Text>
                                <Text className='text-primary-dark' numberOfLines={2}>Avg. Job</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Description */}
                <Animated.View
                    entering={FadeInDown.delay(200).duration(400)}
                    style={styles.section}
                >
                    <Text className='text-2xl font-bold py-2'>Description</Text>
                    <Text style={styles.description}>{task.description}</Text>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.delay(300).duration(400)}
                    style={styles.section}
                >
                    <Text className='text-xl font-bold py-2'>Available Slots</Text>

                    <View className="mt-4 gap-4">
                        {slots.map((slot, index) => (
                            <SlotCard
                                key={index}
                                date={slot.date}
                                startTime={slot.startTime}
                                endTime={slot.endTime}
                                totalCost={slot.totalCost}
                                onPress={() => setSelectedSlot(index)}
                                selected={selectedSlot === index}
                            />

                        ))}
                    </View>
                </Animated.View>
                <Animated.View
                    entering={FadeInDown.delay(300).duration(400)}
                    style={styles.section}
                >
                    <Text className='text-xl font-bold py-2'>Customer Reviews</Text>
                    <Text className='text-lg text-center font-thin py-2'>Coming Soon ...</Text>

                </Animated.View>
                <View style={styles.bottomSpacer} />
            </ScrollView>

            {/* FAB */}
            <View pointerEvents='box-none' className='absolute bg-transparent px-6 bottom-8'>
                <View className='flex flex-row justify-between bg-transparent w-full gap-2'>
                    <TouchableOpacity
                        className={`flex flex-row w-5/6 gap-2 px-8 py-4 rounded-full items-center justify-center shadow-lg
  ${selectedSlot !== null ? 'bg-tertiary-light border-tertiary-dark' : 'bg-neutral-200 border-secondary'}`}
                        activeOpacity={0.85}
                        onPress={handleBooking}
                    >
                        <Text className={`${selectedSlot !== null ? 'text-white' : 'text-gray-900'} text-2xl`}>
                            {selectedSlot !== null ? 'Book Now' : 'Select Slot'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className='flex flex-row w-1/6 rounded-full bg-tertiary-light items-center justify-center shadow-lg border border-tertiary-light/90'
                        activeOpacity={0.85}
                        onPress={() => { }}
                    >
                        <Ionicons name="chatbubble-ellipses-outline" color={Colors.background.DEFAULT} size={24} />
                    </TouchableOpacity>
                </View>
            </View>
            <BookingModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={handleConfirmBooking}
                slotDate={selectedSlot !== null ? slots[selectedSlot].date : ''}
                startTime={selectedSlot !== null ? slots[selectedSlot].startTime : ''}
                endTime={selectedSlot !== null ? slots[selectedSlot].endTime : ''}
                price={selectedSlot !== null ? slots[selectedSlot].totalCost : 0}
            />
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
    section: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: SECONDARY_COLOR,
        marginBottom: 12,
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
    bottomSpacer: {
        height: 100, // Increased to account for tab bar (84px height + 16px buffer)
    },
});