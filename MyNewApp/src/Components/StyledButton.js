import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/globalStyles';

export const StyledButton = ({
  children,
  onPress,
  buttonStyles,
  disabled = false,
  text,
}) => {
  return (
    <TouchableOpacity
      onPress={!disabled && onPress}
      style={[styles.button, disabled && styles.disabledButton, buttonStyles]}
      disabled={disabled}
    >
      {children}
      {text && (
        <Text style={[styles.text, disabled && styles.disabledText]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.orange,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 100,
  },
  disabledButton: {
    backgroundColor: colors.light_gray,
  },
  text: {
    color: colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
  },
  disabledText: {
    color: colors.dark_gray,
  },
});
