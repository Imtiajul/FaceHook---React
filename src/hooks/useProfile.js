import { useContext, useDebugValue } from "react";
import { ProfileContext } from "../context";

export const useProfile = () => {
   const {state} = useContext(ProfileContext);

   useDebugValue(state, (state)=> state?.user ?  `Current user email ${state?.user?.email} ` : 'user email not found');

   return useContext(ProfileContext)
}
