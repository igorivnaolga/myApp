import { View, Text } from 'react-native';
import { StatusBar } from 'react-native-web';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Hello World</Text>
      <StatusBar style="auto" />
    </View>
  );
}
