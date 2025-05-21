import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { UUID } from '../utils'
import CardModel from '../models/CardModel'
import CardOptionModel from '../models/CardOptionModel'

// Define the initial state using that type
const initialState: CardModel = {
  id: UUID(),
  order: 0,
  question: "",
  cardOptions: []
}

export const cardSlice = createSlice({
    name: 'cardSlice',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      addOption: (state, action: PayloadAction<CardOptionModel>) => {
        state.cardOptions.push(action.payload)
      },
      removeOption: (state, action: PayloadAction<string>) => {
        for (let i = 0; i < state.cardOptions.length; i++) {
          const option = state.cardOptions[i];
          if (option.id === action.payload) {
            state.cardOptions.splice(i, 1);
            break;
          }
        }
      },
      setRightChoice: (state, action: PayloadAction<string>) => {        
        for (let i = 0; i < state.cardOptions.length; i++) {
          const option = state.cardOptions[i];
          if (option.id === action.payload) {
            option.isCorrect = true;
          } else {
            option.isCorrect = false;
          }

          state.cardOptions[i] = option;
        }              
      },
      setQuestion: (state, action: PayloadAction<string>) => {
        state.question = action.payload;
      },
      setCardOrder: (state, action: PayloadAction<number>) => {
        state.order = action.payload
      },
      resetCardState: () => initialState  
    },
  })
  
export const { addOption, removeOption, setQuestion, setRightChoice, setCardOrder, resetCardState } = cardSlice.actions

export const selectCardOptions = (state: RootState) => state.card.cardOptions

export const selectQuestion = (state: RootState) => state.card.question

export const selectCard = (state: RootState) => state.card
    
export default cardSlice.reducer