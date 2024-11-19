import { createContext } from 'react';

type Props = {}
export const cartInit = {
  cartTrackList: []
}

export const cartReducer = (state, action) => {

  const cartTrackList = [...state.cartTrackList]
  console.log(state)
  console.log(action)
  switch (action.type) {
    case "ADD_TRACK":
      if (cartTrackList) {
        cartTrackList.push(action.track)
      }
      return {
        ...state, //包含預設狀態
        cartTrackList,
      };
    default: return state;
  }
}

export const CartContent = createContext({});