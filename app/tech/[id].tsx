import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TaskDetailScreen() {
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
                <Text style={styles.headerTitle}>Task Details</Text>
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
                    <Text style={styles.title}>{`Technicians`}</Text>
                    <View style={styles.badges}>
                        <View style={[styles.badge, { backgroundColor: getStatusColor(task.status) + '20' }]}>
                            <Text style={[styles.badgeText, { color: getStatusColor(task.status) }]}>
                                {task.status}
                            </Text>
                        </View>
                        <View style={[styles.badge, { backgroundColor: getPriorityColor(task.priority) + '20' }]}>
                            <Ionicons
                                name="alert-circle"
                                size={14}
                                color={getPriorityColor(task.priority)}
                            />
                            <Text style={[styles.badgeText, { color: getPriorityColor(task.priority) }]}>
                                {task.priority}
                            </Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Description */}
                <Animated.View
                    entering={FadeInDown.delay(200).duration(400)}
                    style={styles.section}
                >
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{task.description}</Text>
                </Animated.View>

                {/* Details Grid */}
                <Animated.View
                    entering={FadeInDown.delay(300).duration(400)}
                    style={styles.section}
                >
                    <Text style={styles.sectionTitle}>Details</Text>
                    <View style={styles.detailsGrid}>
                        <View style={styles.detailItem}>
                            <View style={styles.detailIcon}>
                                <Ionicons name="calendar-outline" size={20} color={PRIMARY_COLOR} />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Due Date</Text>
                                <Text style={styles.detailValue}>{task.dueDate}</Text>
                            </View>
                        </View>

                        <View style={styles.detailItem}>
                            <View style={styles.detailIcon}>
                                <Ionicons name="person-outline" size={20} color={PRIMARY_COLOR} />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Assignee</Text>
                                <Text style={styles.detailValue}>{task.assignee}</Text>
                            </View>
                        </View>

                        <View style={styles.detailItem}>
                            <View style={styles.detailIcon}>
                                <Ionicons name="time-outline" size={20} color={PRIMARY_COLOR} />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Created</Text>
                                <Text style={styles.detailValue}>{task.createdDate}</Text>
                            </View>
                        </View>

                        <View style={styles.detailItem}>
                            <View style={styles.detailIcon}>
                                <Ionicons name="folder-outline" size={20} color={PRIMARY_COLOR} />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Category</Text>
                                <Text style={styles.detailValue}>{task.category}</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Action Buttons */}
                <Animated.View
                    entering={FadeInDown.delay(400).duration(400)}
                    style={styles.actions}
                >
                    <TouchableOpacity style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Edit Task</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton}>
                        <Ionicons name="trash-outline" size={20} color="#EF4444" />
                        <Text style={styles.secondaryButtonText}>Delete</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
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
});