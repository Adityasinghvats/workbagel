//// filepath: d:\saas\workbagel\app\slot\add\addSlot.tsx
import { Colors, SECONDARY_COLOR } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, Pressable, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type FormValues = {
    start: Date;
    end: Date;
};

// Add simple validation + styled container + buttons
export default function AddSlotForm() {
    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            start: new Date(),
            end: new Date(Date.now() + 60 * 60 * 1000),
        },
    });
    const router = useRouter();

    const start = watch('start');
    const end = watch('end');
    const invalidRange = end <= start;

    const [showStartDate, setShowStartDate] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);

    const onChangeStartDate = (_: DateTimePickerEvent, date?: Date) => {
        setShowStartDate(false);
        if (date) {
            // preserve existing time
            const updated = new Date(date);
            updated.setHours(start.getHours(), start.getMinutes());
            setValue('start', updated);
        }
    };

    const onChangeStartTime = (_: DateTimePickerEvent, date?: Date) => {
        setShowStartTime(false);
        if (date) {
            const updated = new Date(start);
            updated.setHours(date.getHours(), date.getMinutes());
            setValue('start', updated);
        }
    };

    const onChangeEndDate = (_: DateTimePickerEvent, date?: Date) => {
        setShowEndDate(false);
        if (date) {
            const updated = new Date(date);
            updated.setHours(end.getHours(), end.getMinutes());
            setValue('end', updated);
        }
    };

    const onChangeEndTime = (_: DateTimePickerEvent, date?: Date) => {
        setShowEndTime(false);
        if (date) {
            const updated = new Date(end);
            updated.setHours(date.getHours(), date.getMinutes());
            setValue('end', updated);
        }
    };

    const onSubmit = (data: FormValues) => {
        if (invalidRange) return;
        console.log('Submitted:', data);
    };

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
                    <Text style={styles.headerTitle}>Add Slot</Text>
                </View>
                <View className="p-6 gap-8">
                    <Animated.View
                        entering={FadeInDown.delay(100).duration(400)}
                    >
                        <View className="gap-4">
                            <Text className="text-3xl font-medium text-gray-700">Start Date & Time</Text>
                            <Controller
                                control={control}
                                name="start"
                                rules={{ required: 'Start required' }}
                                render={() => (
                                    <View className="gap-3">
                                        <Text className="text-gray-900">{start.toLocaleString()}</Text>
                                        {Platform.OS === 'ios' ? (
                                            <>
                                                <Pressable
                                                    onPress={() => setShowStartDate(true)}
                                                    className="bg-tertiary-light rounded-lg px-4 py-3"
                                                >
                                                    <Text className="text-white text-center">Pick Start</Text>
                                                </Pressable>
                                                {showStartDate && (
                                                    <DateTimePicker
                                                        value={start}
                                                        mode="datetime"
                                                        display="inline"
                                                        onChange={(_, date) => {
                                                            setShowStartDate(false);
                                                            if (date) setValue('start', date);
                                                        }}
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            <View className="flex-col gap-4">
                                                <Pressable
                                                    onPress={() => setShowStartDate(true)}
                                                    className=" bg-primary-light/30 flex flex-row items-center justify-center gap-4 rounded-full px-4 py-8"
                                                >
                                                    <Ionicons name="calendar-outline" size={24} color={Colors.primary.dark} />
                                                    <Text className="text-primary-dark text-lg text-center">Date</Text>
                                                </Pressable>
                                                <Pressable
                                                    onPress={() => setShowStartTime(true)}
                                                    className=" bg-primary-dark/30 flex flex-row items-center justify-center gap-4 rounded-full px-4 py-8"
                                                >
                                                    <Ionicons name="time-outline" size={24} color={Colors.primary.dark} />
                                                    <Text className="text-primary-dark text-lg text-center">Time</Text>
                                                </Pressable>
                                                {showStartDate && (
                                                    <DateTimePicker
                                                        value={start}
                                                        mode="date"
                                                        display="calendar"
                                                        onChange={onChangeStartDate}
                                                    />
                                                )}
                                                {showStartTime && (
                                                    <DateTimePicker
                                                        value={start}
                                                        mode="time"
                                                        display="clock"
                                                        onChange={onChangeStartTime}
                                                    />
                                                )}
                                            </View>
                                        )}
                                    </View>
                                )}
                            />
                            {errors.start && <Text className="text-red-500 text-xs">{errors.start.message}</Text>}
                        </View>
                    </Animated.View>

                    {/* End */}
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(400)}>
                        <View className="gap-4">
                            <Text className="text-3xl font-medium text-gray-700">End Date & Time</Text>
                            <Controller
                                control={control}
                                name="end"
                                rules={{ required: 'End required' }}
                                render={() => (
                                    <View className="gap-3">
                                        <Text className="text-gray-900">{end.toLocaleString()}</Text>
                                        {Platform.OS === 'ios' ? (
                                            <>
                                                <Pressable
                                                    onPress={() => setShowEndDate(true)}
                                                    className="bg-tertiary-light rounded-lg px-4 py-3"
                                                >
                                                    <Text className="text-white text-center">Pick End</Text>
                                                </Pressable>
                                                {showEndDate && (
                                                    <DateTimePicker
                                                        value={end}
                                                        mode="datetime"
                                                        display="inline"
                                                        onChange={(_, date) => {
                                                            setShowEndDate(false);
                                                            if (date) setValue('end', date);
                                                        }}
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            <View className="flex-col gap-4">
                                                <Pressable
                                                    onPress={() => setShowEndDate(true)}
                                                    className=" bg-primary-light/30 flex flex-row items-center justify-center gap-4 rounded-full px-4 py-8"
                                                >
                                                    <Ionicons name="calendar-outline" size={24} color={Colors.primary.dark} />
                                                    <Text className="text-primary-dark text-lg text-center">Date</Text>
                                                </Pressable>
                                                <Pressable
                                                    onPress={() => setShowEndTime(true)}
                                                    className=" bg-primary-dark/30 flex flex-row items-center justify-center gap-4 rounded-full px-4 py-8"
                                                >
                                                    <Ionicons name="time-outline" size={24} color={Colors.primary.dark} />
                                                    <Text className="text-primary-dark text-lg text-center">Time</Text>
                                                </Pressable>
                                                {showEndDate && (
                                                    <DateTimePicker
                                                        value={end}
                                                        mode="date"
                                                        display="calendar"
                                                        onChange={onChangeEndDate}
                                                    />
                                                )}
                                                {showEndTime && (
                                                    <DateTimePicker
                                                        value={end}
                                                        mode="time"
                                                        display="clock"
                                                        onChange={onChangeEndTime}
                                                    />
                                                )}
                                            </View>
                                        )}
                                    </View>
                                )}
                            />
                            {errors.end && <Text className="text-red-500 text-xs">{errors.end.message}</Text>}
                        </View>
                    </Animated.View>

                    {invalidRange && (
                        <Text className="text-red-600 text-lg">End must be after start.</Text>
                    )}

                </View>
                <View pointerEvents='box-none' className='absolute bg-transparent px-6 bottom-8'>
                    <Animated.View entering={FadeInDown.delay(300).duration(400)} className='flex flex-row justify-between bg-transparent w-full gap-2'>
                        <Pressable
                            disabled={invalidRange}
                            onPress={handleSubmit(onSubmit)}
                            className={`mt-2 w-full rounded-full px-4 py-4 ${invalidRange ? 'bg-gray-300' : 'bg-tertiary-light'
                                }`}
                        >
                            <Text className="text-center text-xl font-semibold text-white">Submit</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles: { container: ViewStyle; header: ViewStyle; headerTitle: TextStyle } = {
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    headerTitle: {
        fontSize: 18,
        marginLeft: 106,
        fontWeight: '600',
        color: SECONDARY_COLOR,
    },
}