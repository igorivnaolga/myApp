import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../styles/globalStyles';

export const Input = ({
  placeholder,
  value,
  onChange,
  secure = false,
  outerStyles,
  icon,
  children,
  onBlurInput,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => setIsFocused(true);
  const onBlur = () => {
    onBlurInput && onBlurInput();
    setIsFocused(false);
  };

  return (
    <View styles={styles.wrapper}>
      <TextInput
        style={[styles.input, isFocused && styles.focused, outerStyles]}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={secure}
      >
        {children}
      </TextInput>
      <View style={styles.icon}>{icon}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    padding: 16,
    backgroundColor: colors.light_gray,
    borderColor: colors.gray,
    borderRadius: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
  },
  focused: {
    backgroundColor: colors.white,
    borderColor: colors.orange,
    color: colors.black,
  },
  icon: {
    position: 'absolute',
    left: 0,
    top: 10,
  },
});
