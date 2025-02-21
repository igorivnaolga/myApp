export const REGISTER_INITIAL_STATE = {
  login: '',
  email: '',
  password: '',
  photo: '',
  isPasswordHidden: true,
  isFormFilled: false,
};

export const LOGIN_INITIAL_STATE = {
  email: '',
  password: '',
  isPasswordHidden: true,
  isFormFilled: false,
};

export const POST_INITIAL_STATE = {
  userId: '',
  image: '',
  title: '',
  location: '',
  coords: {
    latitude: 0,
    longitude: 0,
  },
  comments: [],
  likes: 0,
  isEmptyPost: true,
};
