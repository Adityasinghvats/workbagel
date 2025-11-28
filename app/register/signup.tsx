import { SECONDARY_COLOR } from '@/constants/colors';
import { Category } from '@/interfaces/users/interface';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type FormValues = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "CLIENT" | "PROVIDER";
    category?: string;
    description?: string;
    hourlyRate?: string;
};

export default function SignupScreen() {
    const { control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'CLIENT',
            category: Category.OTHER,
            description: '',
            hourlyRate: '0.00',
        },
    });
    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    // const { signUp } = useAuth();

    const password = watch('password');
    const role = watch('role');

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
                            <Text className="text-4xl font-bold mb-8">Create Account</Text>

                            {/* Full Name */}
                            <Text className="text-md font-semibold text-gray-600 mb-2">Full Name</Text>
                            <Controller
                                control={control}
                                name="fullName"
                                rules={{ required: 'Full name required', minLength: { value: 2, message: 'Too short' } }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <TextInput
                                        className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                                        placeholder="John Doe"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        autoCapitalize="words"
                                    />
                                )}
                            />
                            {errors.fullName && <Text className="text-red-500 text-xs mt-1">{errors.fullName.message}</Text>}

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
                            <Text className="text-md font-semibold text-gray-600 mt-5 mb-2">Choose Role</Text>
                            <Controller
                                control={control}
                                name="role"
                                rules={{
                                    required: 'Role required',
                                }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <View className="border border-gray-300 px-1 py-0.5 rounded-xl">
                                        <Picker
                                            selectedValue={value}
                                            onValueChange={(itemValue) => onChange(itemValue)}
                                            onBlur={onBlur}
                                            className="text-base"
                                        >
                                            <Picker.Item label="Client - Book appointments" value="CLIENT" />
                                            <Picker.Item label="Provider - Offer services" value="PROVIDER" />
                                        </Picker>
                                    </View>
                                )}
                            />
                            {errors.role && <Text className="text-red-500 text-xs mt-1">{errors.role.message}</Text>}

                            {role === 'PROVIDER' && (
                                <>
                                    <Text className="text-md font-semibold text-gray-600 mt-5 mb-2">Choose Category</Text>
                                    <Controller
                                        control={control}
                                        name="category"
                                        rules={{
                                            required: 'Category required',
                                        }}
                                        render={({ field: { value, onChange, onBlur } }) => (
                                            <View className="border border-gray-300 px-1 py-0.5 rounded-xl">
                                                <Picker
                                                    selectedValue={value}
                                                    onValueChange={(itemValue) => onChange(itemValue)}
                                                    onBlur={onBlur}
                                                    className="text-base"
                                                >
                                                    {Object.values(Category).map((cat) => (
                                                        <Picker.Item key={cat} label={cat.replace('_', ' ')} value={cat} />
                                                    ))}

                                                </Picker>
                                            </View>
                                        )}
                                    />
                                    {errors.category && <Text className="text-red-500 text-xs mt-1">{errors.category.message}</Text>}

                                    {/* Description */}
                                    <Text className="text-md font-semibold text-gray-600 mt-5 mb-2">Description</Text>
                                    <Controller
                                        control={control}
                                        name="description"
                                        rules={{
                                            required: 'Description is required',
                                        }}
                                        render={({ field: { value, onChange, onBlur } }) => (
                                            <TextInput
                                                className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                                                placeholder="Description"
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                secureTextEntry
                                                autoCapitalize="none"
                                            />
                                        )}
                                    />
                                    {errors.description && <Text className="text-red-500 text-xs mt-1">{errors.description.message}</Text>}

                                    {/* Hourly Rate */}
                                    <Text className="text-md font-semibold text-gray-600 mt-5 mb-2">Hourly Rate</Text>
                                    <Controller
                                        control={control}
                                        name="hourlyRate"
                                        rules={{
                                            required: 'Hourly rate is required',
                                        }}
                                        render={({ field: { value, onChange, onBlur } }) => (
                                            <TextInput
                                                className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                                                placeholder="Hourly rate"
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                secureTextEntry
                                                autoCapitalize="none"
                                            />
                                        )}
                                    />
                                    {errors.hourlyRate && <Text className="text-red-500 text-xs mt-1">{errors.hourlyRate.message}</Text>}
                                </>
                            )}

                            {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}

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
                                    <Text className="text-gray-50 font-bold text-base">Sign Up</Text>
                                )}
                            </TouchableOpacity>

                            {/* Footer */}
                            <View className="mt-6 flex-row justify-center">
                                <Text className="text-gray-600 text-md">Already have an account? </Text>
                                <TouchableOpacity onPress={() => { router.push('/login/login') }}>
                                    <Text className="text-primary font-semibold text-md">Log In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                </KeyboardAvoidingView>
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