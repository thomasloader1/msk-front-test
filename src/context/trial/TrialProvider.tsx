import React, { useReducer, useState } from "react";
import { TrialContext } from "./TrialContext";
import { trialReducer } from "./TrialReducer";

interface Props {
  children: React.ReactNode;
}

export const TrialProvider: React.FC<Props> = ({ children }) => {
  const [loadingProduct, setLoadingProduct] = useState(true);

  const trialInitialState = {
   product: {},
   showModal: false,
   paymentCorrect: null
  };

  const [state, dispatch] = useReducer(trialReducer, trialInitialState);

  return (
    <TrialContext.Provider
      value={{
        loadingProduct,
        state,
        dispatch,
      }}
    >
      {children}
    </TrialContext.Provider>
  );
};

export default TrialProvider;
