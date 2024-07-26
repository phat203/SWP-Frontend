

import { api } from "../../config/api";
import { FETCH_COMPONENTS_FAILURE, FETCH_COMPONENTS_REQUEST, FETCH_COMPONENTS_SUCCESS } from "./ActionType";

const jwt = localStorage.getItem("jwt");

export const fetchComponents = (ids) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COMPONENTS_REQUEST });
    try {
      const response = await api.get("/api/component/ids", {
        params: { ids },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: FETCH_COMPONENTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_COMPONENTS_FAILURE, payload: error.message });
    }
  };
};
