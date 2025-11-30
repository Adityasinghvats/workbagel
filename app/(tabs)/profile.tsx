import { Colors, PRIMARY_COLOR, SECONDARY_COLOR } from '@/constants/colors';
import { useAuth } from '@/hooks/use-auth';
import { User } from '@/interfaces/users/interface';
import { userService } from '@/services/userService';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [profileData] = useState({
    name: 'Aditya Kumar',
    address: '123 Main Street, New York, NY 10001',
    bagels: 24,
    profileImage: "https://res.cloudinary.com/dixnvhqxl/image/upload/v1760776218/ibmwys2avnjbfrtpozxi.png",
  });
  const { signOut, user: authUser, isLoading } = useAuth();
  const router = useRouter();
  // useEffect(() => {
  //   if (!user) {
  //     router.replace('/login/login');
  //   }
  // }, [user])
  const currentUserData = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => userService.getCurrentUser()
  });

  const user: User = currentUserData.data?.data?.user;
  console.log('Current User Data:', user);


  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => { signOut(); router.replace('/'); },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const ProfileMenuItem = ({
    icon,
    title,
    subtitle,
    onPress
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress: () => void
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon as any} size={24} color={PRIMARY_COLOR} style={styles.menuIcon} />
        <View>
          <Text style={styles.menuTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );

  return (
    <Animated.View
      entering={FadeIn.duration(100)}
      exiting={FadeOut.duration(100)}
      style={{ flex: 1 }}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: profileData.profileImage }}
                  style={styles.profileImage}
                />
                <TouchableOpacity
                  style={styles.editImageButton}
                  onPress={() => Alert.alert('Change Photo', 'Photo picker would open here')}
                >
                  <Ionicons name="camera" size={16} color={SECONDARY_COLOR} />
                </TouchableOpacity>
              </View>

              <Text style={styles.profileName}>{authUser?.name || "User Name"}</Text>
              <View style={styles.addressContainer}>
                <Ionicons name="mail-outline" size={16} color="#666" />
                <Text style={styles.profileAddress}>{authUser?.email || "No email provided"}</Text>
              </View>
              <View style={styles.addressContainer}>
                <Text style={styles.profileAddress} numberOfLines={4}>{user?.description || "No description provided"} </Text>
              </View>

              <View style={styles.addressContainer}>
                <Ionicons name="call-outline" size={16} color="#666" />
                <Text style={styles.profileAddress}>{user?.phoneNumber || "No phone number provided"}</Text>
              </View>
              <View style={styles.addressContainer}>
                <Ionicons name="mail-outline" size={16} color="#666" />
                <Text style={styles.profileAddress}>{authUser?.emailVerified ? 'Verified' : 'Not Verified'}</Text>
              </View>

            </View>



            {/* Bagels Stats Card */}
            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <Ionicons name="fast-food" size={32} color="#007AFF" />
                <Text style={styles.statNumber}>{user?._count?.slots}</Text>
                <Text style={styles.statLabel}>Total Bagels</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="calendar-outline" size={32} color="#34C759" />
                <Text style={styles.statNumber}>{user?.role === 'CLIENT' ? user?._count?.bookingsMade : user?._count?.bookingsReceived}</Text>
                <Text style={styles.statLabel}>This Month</Text>
              </View>
            </View>

            {/* Menu Section */}
            <View style={styles.menuSection}>
              <Text style={styles.sectionTitle}>Account</Text>

              <View style={styles.menuContainer}>
                <ProfileMenuItem
                  icon="person-outline"
                  title="Edit Profile"
                  subtitle="Update your personal information"
                  onPress={() => Alert.alert('Edit Profile', 'Edit profile screen would open')}
                />

                <View style={styles.menuDivider} />

                <ProfileMenuItem
                  icon="location-outline"
                  title="Address"
                  subtitle={user?.address || "Manage your addresses"}
                  onPress={() => Alert.alert('Address', 'Address management would open')}
                />
              </View>
            </View>

            <View style={styles.menuSection}>
              <Text style={styles.sectionTitle}>Activity</Text>

              <View style={styles.menuContainer}>
                <ProfileMenuItem
                  icon="fast-food-outline"
                  title="My Bagels"
                  subtitle="View all your bagel orders"
                  onPress={() => Alert.alert('My Bagels', 'Bagels list would open')}
                />

                <View style={styles.menuDivider} />

                <ProfileMenuItem
                  icon="time-outline"
                  title="History"
                  subtitle="View your order history"
                  onPress={() => Alert.alert('History', 'History screen would open')}
                />
              </View>
            </View>

            <View style={styles.menuSection}>
              <Text style={styles.sectionTitle}>Information</Text>

              <View style={styles.menuContainer}>
                <ProfileMenuItem
                  icon="information-circle-outline"
                  title="About Us"
                  subtitle="Learn more about WorkBagel"
                  onPress={() => Alert.alert('About Us', 'WorkBagel - Your favorite bagel delivery app!')}
                />
              </View>
            </View>

            {/* Only for provider */}
            <View style={styles.menuSection}>
              <Text style={styles.sectionTitle}>Manage Slots</Text>

              <View style={styles.menuContainer}>
                <ProfileMenuItem
                  icon="calendar-outline"
                  title="Manage Slots"
                  subtitle="Manage your available slots"
                  onPress={() => { router.push('/slot/slots') }}
                />
              </View>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Animated.View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    marginTop: 5,
  },
  header: {
    backgroundColor: Colors.background.gray,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.primary.DEFAULT,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary.DEFAULT,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.primary.light,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    marginHorizontal: 24,
    gap: 6,
  },
  profileAddress: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  statsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: Colors.accent
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.accent,
    marginVertical: 10,
  },
  menuSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.accent
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    marginLeft: 56,
    backgroundColor: Colors.accent
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    gap: 10
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
  bottomSpacer: {
    height: 100, // Increased to account for tab bar (84px height + 16px buffer)
  },
});
