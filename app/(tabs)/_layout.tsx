import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Text, View } from 'react-native';

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <View
        className='flex flex-col w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden bg-primary-dark shadow-lg'
      >
        <IconSymbol size={28} name={icon} color={Colors.text.primary} />
        <Text className='text-xs'>{title}</Text>
      </View>
    )
  }
  return (
    <View
      className='size-full justify-center items-center mt-5 rounded-full'>
      <IconSymbol size={28} name={icon} color={Colors.text.primary} />
      <Text className='text-xs'>{title}</Text>
    </View>
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabBarStyle: {
          backgroundColor: Colors.accent,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          elevation: 5,
          paddingTop: 12,
          height: 82,
          position: 'absolute',
          overflow: 'hidden',
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (<TabIcon focused={focused} icon="house.fill" title="Home" />)
        }}
      />
      <Tabs.Screen
        name="bagel"
        options={{
          title: 'Bagel',

          tabBarIcon: ({ focused }) => (<TabIcon focused={focused} icon="bag.fill" title="Bagel" />)
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (<TabIcon focused={focused} icon="person.fill" title="Profile" />)
        }}
      />
    </Tabs>
  );
}
