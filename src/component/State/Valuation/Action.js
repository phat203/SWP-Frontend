import { api } from '../../config/api';
import { CALCULATE_BUYBACK_PRICE_FAILURE, CALCULATE_BUYBACK_PRICE_OUT_FAILURE, CALCULATE_BUYBACK_PRICE_OUT_REQUEST, CALCULATE_BUYBACK_PRICE_OUT_SUCCESS, CALCULATE_BUYBACK_PRICE_REQUEST, CALCULATE_BUYBACK_PRICE_SUCCESS } from './Actiontype';

  
  export const calculateBuybackPrice = ({jewelry, jwt}) => {
    return async (dispatch) => {
      dispatch({ type: CALCULATE_BUYBACK_PRICE_REQUEST });
      try {
        const response = await api.post('http://localhost:8090/api/jewelry/calculateBuybackPrice', jewelry, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          }
        });
        dispatch({ type: CALCULATE_BUYBACK_PRICE_SUCCESS, payload: response.data });
      } catch (error) {
        console.log("error",error)
        dispatch({ type: CALCULATE_BUYBACK_PRICE_FAILURE, payload: error.message });
        throw error;
      }
    };
  };
  export const calculateBuybackPriceOut = (goldWeight, diamondWeight, componentsName, token) => {
    return async (dispatch) => {
      dispatch({ type: CALCULATE_BUYBACK_PRICE_OUT_REQUEST });
      try {

        const response = await api.post(`/api/jewelry/calculateBuybackPriceOut?goldWeight=${goldWeight}&diamondWeight=${diamondWeight}`, 
          JSON.stringify(componentsName),
         {
          headers: {

            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: CALCULATE_BUYBACK_PRICE_OUT_SUCCESS, payload: response.data });
      } catch (error) {
        console.log("componentsName",componentsName)
        console.log("error",error)
        dispatch({ type: CALCULATE_BUYBACK_PRICE_OUT_FAILURE, payload: error.message });
        throw error;
      }
    };
  };