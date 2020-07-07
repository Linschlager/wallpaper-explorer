import React, { useReducer } from "react";
import reducer from "./state/reducer";
import {
  defaultState,
  LOAD_NEW_ITEMS_REQUEST,
  LOAD_NEW_ITEMS_SUCCESS,
  LOAD_NEW_ITEMS_FAILURE
} from "./state/consts";
import ScrollingContainer from "./ui/ScrollingContainer";
import fetchNext from "./tools/fetch-tools";

const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handlePageLoad = async () => {
    if (state.loading) return;
    dispatch({ type: LOAD_NEW_ITEMS_REQUEST });

    try {
      const nextPage = await fetchNext();
      dispatch({ type: LOAD_NEW_ITEMS_SUCCESS, payload: nextPage });
    } catch (ex) {
      dispatch({ type: LOAD_NEW_ITEMS_FAILURE, payload: ex });
    }
  };

  return (
    <ScrollingContainer
      loading={state.loading}
      items={state.items}
      loadNext={handlePageLoad}
    />
  );
};

export default App;
