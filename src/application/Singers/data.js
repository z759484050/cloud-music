import React,{createContext,useReducer}from 'react'
import {fromJS} from 'immutable'


export const SingerListContext=createContext({})

export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY';
export const CHANGE_AREA='singers/CHANG_AREA';
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA';



const reducer =(state,action)=>{
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.set('category',action.data)
    case CHANGE_AREA:
      return state.set('area',action.data)
    case CHANGE_ALPHA:
      return state.set('alpha',action.data)
    default:
      return state
  }
}

export const Data=props=>{
  const [data,dispatch]=useReducer(reducer,fromJS({
    category:'',
    area:'',
    alpha:''
  }));
  return(
    <SingerListContext.Provider value={{data,dispatch}}>
      {props.children}
    </SingerListContext.Provider>
  )
}