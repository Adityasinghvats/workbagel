import { SECONDARY_COLOR } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

export default function LoginScreen() {
    const { control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });
    const router = useRouter();

    const password = watch('password');

    const onSubmit = async (data: FormValues) => {
        if (data.password !== data.confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        try {
            // Placeholder: replace with API call
            await new Promise(res => setTimeout(res, 900));
            Alert.alert('Success', 'Account created');
        } catch (e) {
            Alert.alert('Error', 'Signup failed');
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1 bg-white' edges={['top']}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.push('/')}
                        className='p-2 bg-primary rounded-full'
                    >
                        <Ionicons name="arrow-back" size={24} color={SECONDARY_COLOR} />
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <ScrollView
                        className="flex-1 px-6"
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ paddingBottom: 40 }}
                    >
                        <View className="my-12">
                            <Text className="text-4xl font-bold mb-8">Login</Text>

                            {/* Email */}
                            <Text className="text-md font-semibold text-gray-600 mt-5 mb-2">Email</Text>
                            <Controller
                                control={control}
                                name="email"
                                rules={{
                                    required: 'Email required',
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                                }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <TextInput
                                        className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                                        placeholder="name@example.com"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                )}
                            />
                            {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email.message}</Text>}

                            {/* Password */}
                            <Text className="text-md font-semibold text-gray-600 mt-5 mb-2">Password</Text>
                            <Controller
                                control={control}
                                name="password"
                                rules={{
                                    required: 'Password required',
                                    minLength: { value: 6, message: 'Min 6 chars' },
                                }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <TextInput
                                        className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                                        placeholder="••••••••"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        secureTextEntry
                                        autoCapitalize="none"
                                    />
                                )}
                            />
                            {errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password.message}</Text>}

                            {/* Confirm Password */}
                            <Text className="text-md font-semibold text-gray-600 mt-5 mb-2">Confirm Password</Text>
                            <Controller
                                control={control}
                                name="confirmPassword"
                                rules={{
                                    required: 'Confirm password',
                                    validate: v => v === password || 'Passwords must match',
                                }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <TextInput
                                        className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                                        placeholder="Repeat password"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        secureTextEntry
                                        autoCapitalize="none"
                                    />
                                )}
                            />
                            {errors.confirmPassword && <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</Text>}

                            {/* Submit */}
                            <TouchableOpacity
                                className={`mt-8 rounded-full px-6 py-4 items-center justify-center ${isSubmitting ? 'bg-gray-300' : 'bg-tertiary-light'}`}
                                disabled={isSubmitting}
                                onPress={handleSubmit(onSubmit)}
                                activeOpacity={0.85}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color="#000" />
                                ) : (
                                    <Text className="text-gray-50 font-bold text-base">Login</Text>
                                )}
                            </TouchableOpacity>

                            {/* Footer */}
                            <View className="mt-6 flex-row justify-center">
                                <Text className="text-gray-600 text-md">Don&#39;t have an account? </Text>
                                <TouchableOpacity onPress={() => { router.push('/register/signup') }}>
                                    <Text className="text-primary font-semibold text-md">Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider >
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