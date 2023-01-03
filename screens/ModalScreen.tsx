import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import {useTailwind} from 'tailwind-rn';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  const tw = useTailwind();
  return (
    <View style={tw('flex-1 items-center justify-center')}>
      <Text style={tw('font-bold text-xl')}>Modal</Text>
      <View style={tw('h-[1] w-4/5 my-8')} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/ModalScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}


