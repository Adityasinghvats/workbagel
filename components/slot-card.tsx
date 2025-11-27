import { PRIMARY_COLOR } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type SlotCardProps = {
    date: string | Date;
    startTime: string;
    endTime: string;
    totalCost: number | string;
    currency?: string;
    badge?: string;
    selected?: boolean;
    disabled?: boolean;
    onPress?: () => void;
};

function formatDate(d: string | Date) {
    const dt = typeof d === 'string' ? new Date(d) : d;
    if (!(dt instanceof Date) || Number.isNaN(dt.getTime())) return String(d);
    return dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

const user = 'PROVIDER';

export default function SlotCard({
    date,
    startTime,
    endTime,
    totalCost,
    currency = '$',
    badge = '1 Hrs',
    selected = false,
    disabled = false,
    onPress,
}: SlotCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled}
            onPress={onPress}
            className={[
                'relative w-full rounded-2xl border p-4 bg-white',
                'border-gray-200',
                'shadow-sm',
                selected ? 'border-primary bg-primary/5' : '',
                disabled ? 'opacity-60' : '',
            ].join(' ')}
        >
            {/* Top-right badge */}
            <View className="absolute right-3 top-3 rounded-full bg-tertiary-light px-3 py-1">
                <Text className="text-md text-gray-50">{badge}</Text>
            </View>

            {/* Slot Date */}
            <Text className="mb-2 text-base font-semibold text-gray-600">Slot Date</Text>
            <View className="mb-3 flex-row items-center gap-2">
                <View className='h-10 w-10 justify-center items-center rounded-full bg-primary/10'>
                    <Ionicons name="calendar-outline" size={20} color={PRIMARY_COLOR} />
                </View>
                <Text className="text-lg text-gray-900">{formatDate(date)}</Text>
            </View>

            {/* Time range */}
            <Text className="mb-2 text-base font-semibold text-gray-600">Start Time - End Time</Text>
            <View className="mb-3 flex-row items-center gap-6">
                <View className="flex-row items-center gap-2">
                    <View className='h-10 w-10 justify-center items-center rounded-full bg-primary/10'>
                        <Ionicons name="time-outline" size={20} color={PRIMARY_COLOR} />
                    </View>
                    <Text className="text-lg text-gray-900">{startTime}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                    <View className='h-10 w-10 justify-center items-center rounded-full bg-primary/10'>
                        <Ionicons name="time-outline" size={20} color={PRIMARY_COLOR} />
                    </View>
                    <Text className="text-lg text-gray-900">{endTime}</Text>
                </View>
            </View>

            {/* Total Cost */}
            <Text className="mb-1 text-base font-semibold text-gray-600">Total Cost</Text>
            <Text className="text-lg mb-4 font-semibold text-gray-900">
                {typeof totalCost === 'number' ? `${currency}${totalCost}` : totalCost} (incl. tax)
            </Text>
            {user === 'PROVIDER' && (
                <TouchableOpacity className='bg-red-500/20 flex flex-row justify-center items-center py-4 gap-2 border border-red-500/70 rounded-full'>
                    <Ionicons name="trash-outline" size={20} color="#FF0000" />
                    <Text className='text-red-500 text-lg font-bold'>Delete</Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
}