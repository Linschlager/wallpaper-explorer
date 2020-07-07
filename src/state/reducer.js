import {
  LOAD_NEW_ITEMS_ABORT,
  LOAD_NEW_ITEMS_REQUEST,
  LOAD_NEW_ITEMS_SUCCESS,
  LOAD_NEW_ITEMS_FAILURE
} from "./consts";

const reducer = (state, action) => {
  switch (action.type) {
    case LOAD_NEW_ITEMS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOAD_NEW_ITEMS_ABORT:
      return {
        ...state,
        loading: false
      };
    case LOAD_NEW_ITEMS_SUCCESS:
      const newItems = action.payload.data.children.reduce((map, next) => {
        if (state.items[next.data.id] !== undefined) return map;
        return {
          ...map,
          [next.data.id]: {
            title: next.data.title,
            url: next.data.url
          }
        };
      }, state.items);
      return {
        ...state,
        loading: false,
        items: newItems
      };
    case LOAD_NEW_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
