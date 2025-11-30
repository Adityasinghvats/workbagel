import { SECONDARY_COLOR } from '@/constants/colors';
import { useAuth } from '@/hooks/use-auth';
import { Category } from '@/interfaces/users/interface';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
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
    address?: string;
    phoneNumber?: string;
    profileImage?: any;
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
            hourlyRate: '',
            address: '',
            phoneNumber: '',
            profileImage: null,
        },
    });
    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [file, setFile] = React.useState<any>(null);
    const { signUp } = useAuth();

    const password = watch('password');
    const role = watch('role');

    // Replace handleFileUpload with:
    const handleFileUpload = async () => {
        try {
            // Request permissions
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                Alert.alert("Permission Required", "You need to grant permission to access photos.");
                return;
            }

            // Pick image
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled) {
                setFile(result.assets[0]);
            }
        } catch (err) {
            console.error('ImagePicker Error: ', err);
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    // In your FormData:
    const onSubmit = async (data: FormValues) => {
        if (data.password !== data.confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        const formData = new FormData();
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('role', data.role);
        formData.append('address', data.address || '');
        formData.append('phoneNumber', data.phoneNumber || '');

        if (role === 'PROVIDER') {
            formData.append('category', data.category || '');
            formData.append('description', data.description || '');
            formData.append('hourlyRate', data.hourlyRate || '');
        }

        // Append image file
        if (file) {
            const imageFile = {
                uri: file.uri,
                type: file.mimeType || 'image/jpeg',
                name: file.fileName || `profile_${Date.now()}.jpg`,
            } as any;
            formData.append('profileImage', imageFile);
            console.log('Appended Image File:', imageFile);
        }

        try {
            setIsLoading(true);
            await signUp(formData);
            router.push('/');
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setIsLoading(false);
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

                            {error && <Text className="text-red-500 text-xs mb-2">{error}</Text>}

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

                            {/* Address */}
                            <Text className="text-md font-semibold text-gray-600 mt-5 mb-2">Address</Text>
                            <Controller
                                control={control}
                                name="address"
                                rules={{ required: 'Address required', minLength: { value: 2, message: 'Too short' } }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <TextInput
                                        className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                                        placeholder="123 Main St"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                            {errors.address && <Text className="text-red-500 text-xs mt-1">{errors.address.message}</Text>}

                            {/* Full Name */}
                            <Text className="text-md font-semibold text-gray-600 mt-5 mb-2">Phone Number</Text>
                            <Controller
                                control={control}
                                name="phoneNumber"
                                rules={{ required: 'Phone number required', minLength: { value: 2, message: 'Too short' } }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <TextInput
                                        className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                                        placeholder="123-456-7890"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        keyboardType="phone-pad"
                                    />
                                )}
                            />
                            {errors.phoneNumber && <Text className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</Text>}
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

                            <Text className="text-md font-semibold text-gray-600 mt-5 mb-2">Choose Profile Image</Text>
                            <TouchableOpacity
                                onPress={handleFileUpload}
                                className="border border-gray-300 rounded-xl px-4 py-3"
                            >
                                <Ionicons name="cloud-upload-outline" size={24} color="gray" className="mb-2 self-center" />
                                <Text className="text-center text-gray-600">
                                    {file ? `Selected: ${file.fileName || 'Image'}` : 'Upload Profile Image'}
                                </Text>
                            </TouchableOpacity>
                            {file && (
                                <Image
                                    source={{ uri: file.uri }}
                                    className="w-full h-52 rounded-lg self-center mt-2"
                                />
                            )}

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
                                                className="border border-gray-300 rounded-xl px-4 py-12 text-base"
                                                placeholder="I am a professional..."
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={onChange}

                                                autoCapitalize="none"
                                            />
                                        )}
                                    />
                                    {errors.description && <Text className="text-red-500 text-xs mt-1">{errors.description.message}</Text>}

                                    {/* Hourly Rate */}
                                    <Text className="text-md font-semibold text-gray-600 mt-5 mb-2">Hourly Rate ($)</Text>
                                    <Controller
                                        control={control}
                                        name="hourlyRate"
                                        rules={{
                                            required: 'Hourly rate is required',
                                        }}
                                        render={({ field: { value, onChange, onBlur } }) => (
                                            <TextInput
                                                className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                                                placeholder="99.99"
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={onChange}

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