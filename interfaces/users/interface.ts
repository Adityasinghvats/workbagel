export interface User {
    id: string;
    name: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
    hourlyRate?: string;
    role?: 'PROVIDER' | 'CLIENT';
    image?: string;
    category?: Category;
    description?: string;
    emailVerified?: boolean;
    rating?: number;
    _count?: { slots: number, bookingsMade: number, bookingsReceived: number };
}

export interface SignUpData {
    email: string;
    password: string;
    name: string;
    role?: 'PROVIDER' | 'CLIENT';
    hourlyRate?: string;
    category?: Category;
    description?: string;
    address: string;
    phoneNumber: string;
    profileImage?: File;
}

export interface SignInData {
    email: string;
    password: string;
}

export enum Category {
    PLUMBING = 'PLUMBING',
    ELECTRICAL = 'ELECTRICAL',
    CARPENTRY = 'CARPENTRY',
    CLEANING = 'CLEANING',
    TUTORING = 'TUTORING',
    CONSULTING = 'CONSULTING',
    HEALTHCARE = 'HEALTHCARE',
    LEGAL = 'LEGAL',
    AIRCONDITIONING = 'AIRCONDITIONING',
    BEAUTY = 'BEAUTY',
    HOMEIMPROVEMENT = 'HOMEIMPROVEMENT',
    PESTCONTROL = 'PESTCONTROL',
    FITNESS = 'FITNESS',
    HOMEAPPLIANCEREPAIR = 'HOMEAPPLIANCEREPAIR',
    EVENTPLANNING = 'EVENTPLANNING',
    OTHER = 'OTHER',
}