import { Colors } from '@/constants/colors';
import { Task } from '@/interfaces/type';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TechnicianCardProps {
    task: Task;
    onPress?: () => void;
}

export default function TechnicianCard({ task, onPress }: TechnicianCardProps) {
    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            router.push(`/tech/${task.id}`);
        }
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            {/* Top Section - Title and Status */}
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Image source={{ uri: "https://res.cloudinary.com/dixnvhqxl/image/upload/v1760776218/ibmwys2avnjbfrtpozxi.png" }} className='w-12 h-12 border-2 border-primary rounded-full' />
                    <View className='flex flex-col ml-4'>
                        <Text className='text-lg font-bold' numberOfLines={2}>
                            Aditya Kumar
                        </Text>
                        <Text className='text-md font-thin gap-4' numberOfLines={2}>
                            {`${4.8} ★    ${150} Bookings Till Date`}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Description */}
            <Text style={styles.description} numberOfLines={2}>
                {task.description}
            </Text>

            {/* Bottom Section - Metadata */}
            <View style={styles.footer}>
                <View>
                    <Text className='text-md font-bold'>{`Starting at ₹549 · 45 mins`}</Text>
                </View>
                <TouchableOpacity className='bg-tertiary-light pl-4 pr-4 py-2 rounded-3xl' onPress={handlePress}>
                    <Text className='text-white text-md font-bold'>Book</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        // backgroundColor: PRIMARY_COLOR + '50',
        backgroundColor: Colors.background.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.accent,
        position: 'relative',
        overflow: 'hidden',
        shadowColor: Colors.accent,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.secondary.DEFAULT,
        flex: 1,
    },
    priorityBadge: {
        marginLeft: 8,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.background.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    description: {
        fontSize: 14,
        color: Colors.text.secondary,
        lineHeight: 20,
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flex: 1,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 12,
        color: Colors.text.secondary,
        fontWeight: '500',
    },
    actionButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.primary.DEFAULT + '15',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accentBorder: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
    },
});
