import axios from "axios";
import ENDPOINT from "./ENDPOINT";

const TRY_SIGN_IN = "redux/users/TRY_SIGN_IN";
const SET_USER = "redux/users/SET_USER";
const SIGN_OUT = "redux/users/SIGN_OUT";
const SET_DELIVERY_OPTIONS = "redux/users/SET_DELIVERY_OPTIONS";
const SET_SEARCH = "redux/users/SET_SEARCH";
const RESET_DELIVERY = "redux/users/RESET_DELIVERY";
const SET_STORE = "redux/users/SET_STORE";
const RESET_STORE = "redux/users/RESET_STORE";
const SET_SEARCH_RESULTS = "redux/users/SET_SEARCH_RESULTS";

const initialState = {
  username: "",
  token: "",
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case TRY_SIGN_IN: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_USER: {
      return {
        ...state,
        username: action.payload.username ? action.payload.username : null,
        token: action.payload.token ? action.payload.token : null,
      };
    }
    case SET_DELIVERY_OPTIONS: {
      return {
        ...state,
        address: action.payload.address ? action.payload.address : null,
        time: action.payload.time ? action.payload.time : null,
      };
    }
    case SET_SEARCH: {
      return {
        ...state,
        searchString: action.payload.string ? action.payload.string : null,
      };
    }
    case RESET_DELIVERY: {
      return {
        ...state,
        searchString: null,
        address: null,
        time: null,
      };
    }
    case SET_STORE: {
      return {
        ...state,
        store: action.payload.store ? action.payload.store : null,
      };
    }
    case SET_SEARCH_RESULTS: {
      return {
        ...state,
        searchResults: action.payload.results ? action.payload.results : null,
      };
    }
    case RESET_STORE: {
      return {
        ...state,
        store: null,
      };
    }
    case SIGN_OUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export default currentUser;

const setUser = (userObj) => ({
  type: SET_USER,
  payload: userObj,
});

const signIn = () => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: {
      username: "testusername",
      token: "testtoken",
    },
  });
};

// eslint-disable-next-line no-unused-vars
const trySignIn =
  ({ email, password }) =>
  (dispatch) => {
    const sendLogin = async () => {
      let query = await axios({
        method: "POST",
        url: `${ENDPOINT}/account/login`,
        data: {
          email,
          password,
        },
      });

      let response = await query.data;
      if (response) {
        if (response.success) {
          // Notify("Welcome, " + email);
          dispatch({
            type: TRY_SIGN_IN,
          });
          dispatch(
            setUser({
              email,
            })
          );
        }
        // } else Notify("Something went wrong");
      }
      console.log(response);
    };

    sendLogin();
  };

const signOut = () => ({
  type: SIGN_OUT,
});

const setDeliveryOptions =
  ({ address, time }) =>
  (dispatch) => {
    console.log(address);
    console.log(time);
    dispatch({
      type: SET_DELIVERY_OPTIONS,
      payload: { address, time },
    });
  };

const setSearch =
  ({ string }) =>
  (dispatch) => {
    dispatch({
      type: SET_SEARCH,
      payload: { string },
    });
  };

const resetDelivery = () => ({
  type: RESET_DELIVERY,
});

const setStore = (store) => (dispatch) => {
  dispatch({
    type: SET_STORE,
    payload: { store },
  });
};

const resetStore = () => ({
  type: RESET_STORE,
});

const setSearchResults = (results) => (dispatch) => {
  dispatch({
    type: SET_SEARCH_RESULTS,
    payload: { results },
  });
};

export const actions = {
  trySignIn,
  signOut,
  signIn,
  setDeliveryOptions,
  setSearch,
  resetDelivery,
  setStore,
  resetStore,
  setSearchResults,
};
