import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

type BookingModalProps = {
    visible: boolean;
    onClose: () => void;
    onConfirm: (additionalInfo: string) => void;
    slotDate: string;
    startTime: string;
    endTime: string;
    price: number;
    currency?: string;
};

export default function BookingModal({
    visible,
    onClose,
    onConfirm,
    slotDate,
    startTime,
    endTime,
    price,
    currency = '$',
}: BookingModalProps) {
    const [additionalInfo, setAdditionalInfo] = useState('');

    const handleConfirm = () => {
        onConfirm(additionalInfo);
        setAdditionalInfo(''); // Reset after confirm
    };

    const duration = `${startTime} - ${endTime}`;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 bg-black/50 justify-center items-center px-6">
                    <View className="bg-white rounded-3xl w-full max-w-md overflow-hidden">
                        {/* Header */}
                        <View className="bg-primary px-6 py-3 flex-row items-center justify-between">
                            <Text className="text-xl font-bold text-secondary">Confirm Booking</Text>
                            <TouchableOpacity onPress={onClose} className="p-1">
                                <Ionicons name="close" size={24} color={SECONDARY_COLOR} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView className="px-6 py-3" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                            {/* Slot Date */}
                            <View className="mb-4">
                                <Text className="text-md font-semibold text-gray-500 mb-1">Slot Date</Text>
                                <View className="flex-row items-center gap-2 bg-gray-200 rounded-xl px-4 py-3">
                                    <Ionicons name="calendar-outline" size={20} color={PRIMARY_COLOR} />
                                    <Text className="text-base text-gray-900 font-medium">{slotDate}</Text>
                                </View>
                            </View>

                            {/* Duration */}
                            <View className="mb-4">
                                <Text className="text-md font-semibold text-gray-500 mb-1">Duration</Text>
                                <View className="flex-row items-center gap-2 bg-gray-200 rounded-xl px-4 py-3">
                                    <Ionicons name="time-outline" size={20} color={PRIMARY_COLOR} />
                                    <Text className="text-base text-gray-900 font-medium">{duration}</Text>
                                </View>
                            </View>

                            {/* Price */}
                            <View className="mb-4">
                                <Text className="text-md font-semibold text-gray-500 mb-1">Total Price</Text>
                                <View className="flex-row items-center gap-2 bg-gray-200 rounded-xl px-4 py-3">
                                    <Ionicons name="cash-outline" size={20} color={PRIMARY_COLOR} />
                                    <Text className="text-lg text-gray-900 font-bold">
                                        {currency}{price}
                                    </Text>
                                </View>
                            </View>

                            {/* Additional Information */}
                            <View className="mb-4">
                                <Text className="text-md font-semibold text-gray-500 mb-1">
                                    Additional Information (Optional)
                                </Text>
                                <TextInput
                                    className="bg-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 min-h-[80px]"
                                    placeholder="Add any special requests or notes..."
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    value={additionalInfo}
                                    onChangeText={setAdditionalInfo}
                                />
                            </View>

                            {/* Action Buttons */}
                            <View className="flex-row gap-3">
                                <TouchableOpacity
                                    onPress={onClose}
                                    className="flex-1 bg-gray-200 rounded-full py-4"
                                    activeOpacity={0.8}
                                >
                                    <Text className="text-center font-semibold text-gray-700 text-base">
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleConfirm}
                                    className="flex-1 bg-tertiary-light rounded-full py-4"
                                    activeOpacity={0.8}
                                >
                                    <Text className="text-center font-bold text-gray-50 text-base">
                                        Confirm
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}