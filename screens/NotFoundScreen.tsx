import { TouchableOpacity } from 'react-native';
import {useTailwind} from 'tailwind-rn';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  const tw = useTailwind();
  return (
    <View style={tw('flex-[1] items-center justify-center p-5')}>
      <Text style={tw('text-xl font-bold')}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={tw('mt-5')}>
        <Text style={tw('font-base text-blue-400')}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}
