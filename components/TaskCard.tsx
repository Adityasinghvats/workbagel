import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task } from '@/interfaces/type';

interface TaskCardProps {
    task: Task;
    onPress?: () => void;
}

export default function TaskCard({ task, onPress }: TaskCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open':
                return Colors.status.info;
            case 'In Progress':
                return Colors.primary.DEFAULT;
            case 'Closed':
                return Colors.status.success;
            default:
                return Colors.text.light;
        }
    };

    const getPriorityIcon = (priority?: string) => {
        switch (priority) {
            case 'High':
                return 'alert-circle';
            case 'Medium':
                return 'warning';
            case 'Low':
                return 'information-circle';
            default:
                return null;
        }
    };

    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case 'High':
                return Colors.status.error;
            case 'Medium':
                return Colors.status.warning;
            case 'Low':
                return Colors.status.info;
            default:
                return Colors.text.light;
        }
    };

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            router.push(`/task/${task.id}`);
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
                    <Text style={styles.title} numberOfLines={1}>
                        {task.title}
                    </Text>
                    {task.priority && (
                        <View style={styles.priorityBadge}>
                            <Ionicons
                                name={getPriorityIcon(task.priority) as any}
                                size={12}
                                color={getPriorityColor(task.priority)}
                            />
                        </View>
                    )}
                </View>

                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(task.status) }]}>
                        {task.status}
                    </Text>
                </View>
            </View>

            {/* Description */}
            <Text style={styles.description} numberOfLines={2}>
                {task.description}
            </Text>

            {/* Bottom Section - Metadata */}
            <View style={styles.footer}>
                <View style={styles.metaContainer}>
                    {task.dueDate && (
                        <View style={styles.metaItem}>
                            <Ionicons name="calendar-outline" size={14} color={Colors.text.secondary} />
                            <Text style={styles.metaText}>{task.dueDate}</Text>
                        </View>
                    )}

                    {task.assignee && (
                        <View style={styles.metaItem}>
                            <Ionicons name="person-outline" size={14} color={Colors.text.secondary} />
                            <Text style={styles.metaText}>{task.assignee}</Text>
                        </View>
                    )}
                </View>

                <TouchableOpacity style={styles.actionButton} onPress={handlePress}>
                    <Ionicons name="chevron-forward" size={20} color={Colors.primary.DEFAULT} />
                </TouchableOpacity>
            </View>

            {/* Accent Border */}
            <View style={[styles.accentBorder, { backgroundColor: getStatusColor(task.status) }]} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: Colors.secondary.DEFAULT,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.border.DEFAULT,
        position: 'relative',
        overflow: 'hidden',
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
