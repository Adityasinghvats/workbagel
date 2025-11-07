import { CategoryCard } from '@/components/CategoryCard';
import { Colors } from '@/constants/colors';
import { Icons } from '@/constants/icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const [selectedButton, setSelectedButton] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={styles.header}
        >
          <View className='flex flex-row ml-auto mr-auto justify-between w-full items-center'>
            <Text className="text-4xl font-bold text-gray-900 pb-8">Work<Text className='text-primary'>Bagel</Text></Text>
            <TouchableOpacity className='pb-8' onPress={() => router.push('/profile')}>
              <Image source={{ uri: "https://res.cloudinary.com/dixnvhqxl/image/upload/v1760776218/ibmwys2avnjbfrtpozxi.png" }} className='w-12 h-12 border-2 border-primary rounded-full' />
            </TouchableOpacity>
          </View>
          <TextInput
            className='bg-gray-200 pl-8 rounded-full h-16 font-thin text-xl mb-4'
            placeholder="Search technicians..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.text.primary}
          />
        </View>
        <ScrollView
          className='flex-1 mt-5 ml-6'
          showsVerticalScrollIndicator={false}
        >
          <View className='bg-tertiary-light h-48 max-w-full mr-6 rounded-3xl overflow-hidden'>
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
                onPress={() => console.log('AC Service & Repair')}
              />
              <CategoryCard
                image={Icons.mechanic}
                text="Appliance Repair & Service"
                onPress={() => console.log('Electrical')}
              />

              {/* Row 2 - 2 normal cards */}
              <CategoryCard
                image={Icons.drill}
                text="Electrician & Plumber"
                onPress={() => console.log('Electrician & Plumber')}
              />
              <CategoryCard
                image={Icons.paintroller}
                text="Full Home Makeover"
                onPress={() => console.log('Full Home Makeover')}
              />

              {/* Row 3 - 3 small cards */}
              <CategoryCard
                image={Icons.washingmachine}
                text="Pest Control"
                size="small"
                onPress={() => console.log('Pest Control')}
              />
              <CategoryCard
                image={Icons.mechanic}
                text="Gardening"
                size="small"
                onPress={() => console.log('Gardening')}
              />
              <CategoryCard
                image={Icons.drill}
                text="AC Repair"
                size="small"
                onPress={() => console.log('AC Repair')}
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
  list: {
    padding: 20,
    paddingBottom: 100, // Add extra padding to account for tab bar (84px height + 16px buffer)
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    padding: 14,
    borderRadius: 20,
    backgroundColor: '#eee',
    flex: 1,
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: Colors.primary.DEFAULT,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  buttonTextSelected: {
    color: Colors.secondary.DEFAULT,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.text.light,
  },
});
