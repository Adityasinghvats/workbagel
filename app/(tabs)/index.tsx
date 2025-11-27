import CategoryCard from '@/components/CategoryCard';
import { Colors } from '@/constants/colors';
import { Icons } from '@/constants/icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={styles.header}
        >
          <View className='flex flex-row ml-auto mr-auto justify-between w-full items-center'>
            <Text className="text-4xl font-bold text-primary pb-8">WorkBagel</Text>
            <TouchableOpacity className='pb-8' onPress={() => router.push('/profile')}>
              <Image source={{ uri: "https://res.cloudinary.com/dixnvhqxl/image/upload/v1760776218/ibmwys2avnjbfrtpozxi.png" }} className='w-12 h-12 border-2 border-primary rounded-full' />
            </TouchableOpacity>
          </View>
          <TextInput
            className='bg-gray-200 pl-8 rounded-full h-16 font-thin text-xl mb-4 border border-accent'
            placeholder="Search technicians..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.text.primary}
          />
        </View>
        <ScrollView
          className='flex-1 pt-6 ml-6'
          showsVerticalScrollIndicator={false}
        >
          <View className='bg-tertiary h-48 max-w-full mr-6 rounded-3xl overflow-hidden'>
            <View className='flex-row flex-1'>
              {/* Left side - Image (50%) */}
              <View className='w-1/3'>
                <Image
                  source={{ uri: "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg" }}
                  className='w-full h-full'
                  resizeMode="cover"
                />
              </View>

              {/* Right side - Text (50%) */}
              <View className='w-2/3 justify-center px-6'>
                <Text className='text-white text-xl font-medium'>Special Offer</Text>
                <Text className='text-white text-4xl font-bold mt-2'>30% OFF</Text>
                <Text className='text-white text-sm font-medium mt-1 mb-2'>Limited Time Offer</Text>
                <TouchableOpacity
                  className='bg-transparent border-2 border-white rounded-full px-8 py-3'
                  onPress={() => { }}
                  activeOpacity={0.7}
                >
                  <Text className='text-white font-bold text-base text-center'>
                    Book Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className='mt-8 pb-24'>
            <Text className='text-3xl font-bold'>Schedule your first</Text>
            <Text className='text-3xl font-bold mb-8'>appointment</Text>

            <View className='flex flex-row flex-wrap gap-6'>
              {/* Row 1 - 2 normal cards */}
              <CategoryCard
                image={Icons.setting}
                text="AC Service & Repair"
              />
              <CategoryCard
                image={Icons.mechanic}
                text="Appliance Repair & Service"
              />

              {/* Row 2 - 2 normal cards */}
              <CategoryCard
                image={Icons.drill}
                text="Electrician & Plumber"
              />
              <CategoryCard
                image={Icons.paintroller}
                text="Full Home Makeover"
              />

              {/* Row 3 - 3 small cards */}
              <CategoryCard
                image={Icons.washingmachine}
                text="Pest Control"
                size="small"
              />
              <CategoryCard
                image={Icons.mechanic}
                text="Gardening"
                size="small"
              />
              <CategoryCard
                image={Icons.drill}
                text="AC Repair"
                size="small"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: Colors.background.gray,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }
});
