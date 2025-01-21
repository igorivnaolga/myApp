import { StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    bottom: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: colors.orange,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 100,
  },
});
