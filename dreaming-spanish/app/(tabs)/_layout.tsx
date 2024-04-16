import {View , Text} from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';

export default function Layout () {

  return (
    <Tabs>
      <Tabs.Screen name = 'index' /> 
      <Tabs.Screen name = 'profile' />
      <Tabs.Screen name = 'library' />
      <Tabs.Screen name = 'progress' />
      <Tabs.Screen name = 'videos' /> 

    </Tabs>
  ) } 