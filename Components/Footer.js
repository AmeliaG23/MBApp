// Footer.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RequestScreen from '../screens/RequestScreen';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

//Bottom Nav Bar Layout
const NavBar = () => {
  return (
    <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: '#388E3C',
        inactiveTintColor: '#B0BEC5',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Request"
        component={RequestScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Request',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default NavBar;