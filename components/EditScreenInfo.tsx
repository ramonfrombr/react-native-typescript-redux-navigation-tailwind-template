import * as WebBrowser from 'expo-web-browser';
import { TouchableOpacity } from 'react-native';
import {useTailwind} from 'tailwind-rn';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  const tw = useTailwind();
  return (
    <View>
      <View style={tw('items-center mx-12')}>
        <Text
          style={tw('text-center leading-6 text-lg')}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Open up the code for this screen:
        </Text>

        <View
          style={tw('my-3 px-1 rounded')}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <MonoText>{path}</MonoText>
        </View>

        <Text
          style={tw('text-center leading-6 text-lg')}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>

      <View style={tw('mt-4 mx-5 items-center')}>
        <TouchableOpacity onPress={handleHelpPress} style={tw('py-4')}>
          <Text style={tw('text-center')} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}
