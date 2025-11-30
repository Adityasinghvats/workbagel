import { Colors, PRIMARY_COLOR } from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryCardProps {
    image?: ImageSourcePropType;
    text: string;
    onPress?: () => void;
    size?: 'normal' | 'small';
}

const getCardText = (text: string) => {
    switch (text) {
        case 'AIRCONDITIONING':
            return 'AC Service & Repair';
        case 'HOMEAPPLIANCEREPAIR':
            return 'Appliance Repair & Service';
        case 'ELECTRICAL':
            return 'Electrician & Plumber';
        case 'HOMEIMPROVEMENT':
            return 'Full Home Makeover';
        case 'PESTCONTROL':
            return 'Pest Control';
        case 'CLEANING':
            return 'Cleaning & Gardening';
        case 'CARPENTRY':
            return 'Carpentry & Woodwork';
    }
}

export default function CategoryCard({ image, text, onPress, size = 'normal' }: CategoryCardProps) {
    const router = useRouter();
    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            //send an id which can find out if its category and icon
            router.push(`/category/${text}`);
        }
    };
    const screenWidth = Dimensions.get('window').width;
    const horizontalPadding = 48; // ml-6 + mr-6
    const gap = 16; // gap-4

    // Calculate width based on size
    const cardWidth = size === 'small'
        ? (screenWidth - horizontalPadding - gap * 2) / 3  // 3 cards per row
        : (screenWidth - horizontalPadding - gap) / 2;      // 2 cards per row
    const iconSize = size === 'small' ? 42 : 52;
    return (
        <TouchableOpacity
            style={[styles.card, { width: cardWidth }]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={[size === 'small' && styles.iconCircleSmall]}>
                <Image source={image} style={{ width: iconSize, height: iconSize }} resizeMode='contain' />
            </View>
            <Text style={[styles.text, size === 'small' && styles.textSmall]} numberOfLines={2}>
                {getCardText(text) || text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        aspectRatio: 1,
        backgroundColor: '#eee',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconCircleSmall: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.text.primary,
        textAlign: 'center',
        lineHeight: 18,
    },
    textSmall: {
        fontSize: 11,
        lineHeight: 14,
    },
});