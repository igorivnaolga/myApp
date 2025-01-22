import { TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';

export const StyledButton = ({ children, onPress, buttonStyles }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyles]}>
      {children}
    </TouchableOpacity>
  );
};
