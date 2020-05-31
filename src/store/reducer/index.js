export const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  environment: process.env.REACT_APP_ENVIRONMENT,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  proxy_url: process.env.REACT_APP_PROXY_URL,
  authorize_url: process.env.REACT_APP_AUTHORIZE_URL,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      localStorage.setItem('isLoggedIn', JSON.stringify(action.payload.isLoggedIn));
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      console.log(action.payload.isLoggedIn);
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    }
    case 'LOGOUT': {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    default:
      return state;
  }
};
