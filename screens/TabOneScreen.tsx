import {useTailwind} from 'tailwind-rn';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const tw = useTailwind();
  return (
    <View style={tw('items-center justify-center flex-[1]')}>
      <Text style={tw('font-bold text-xl')}>Tab One</Text>
      <View style={tw('w-4/5 h-[1] my-8')} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}
