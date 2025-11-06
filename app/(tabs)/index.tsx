import { Colors } from '@/constants/colors';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
            <Text className="text-3xl font-bold text-gray-900 pb-8">Work<Text className='text-primary-light'>Bagel</Text></Text>
            <TouchableOpacity className='pb-8' onPress={() => router.push('/profile')}>
              <Image className='w-12 h-12 border-2 border-primary rounded-full' />
            </TouchableOpacity>
          </View>
          <TextInput
            className='bg-primary p-6 rounded-full h-16 font-normal text-xl mb-4'
            placeholder="Search technicians..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.text.primary}
          />
        </View>


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
