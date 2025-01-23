import { StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
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

  formContainer: {
    width: '100%',
    // height: '55%',
    paddingTop: 92,
    paddingBottom: 80,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
  },
  formContainerLoginScreen: {
    paddingTop: 24,
  },

  title: {
    marginBottom: 33,
    color: colors.black,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.3,
  },

  avatar: {
    position: 'absolute',
    alignSelf: 'center',
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
  },
  avatarButton: {
    position: 'absolute',
    right: -12,
    bottom: 12,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },

  formFields: {
    gap: 16,
    marginBottom: 43,
  },
  input: {
    backgroundColor: colors.light_gray,
    borderColor: colors.border_gray,
    borderRadius: 8,
    height: 50,
    paddingLeft: 16,
  },

  passwordField: {
    justifyContent: 'center',
  },

  passwordButton: {
    position: 'absolute',
    right: 16,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },

  passwordButtonText: {
    color: colors.blue,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
  },

  mainActionButton: {
    marginBottom: 16,
  },
  mainActionButtonText: {
    color: colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
  },

  secondaryActionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryActionButton: {
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  secondaryActionText: {
    color: colors.blue,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
  },
  secondaryActionButtonText: {
    color: colors.blue,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
  },
});
