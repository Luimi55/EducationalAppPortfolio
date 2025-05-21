import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { UUID } from '../utils'
import DeckModel from '../models/DeckModel'
import CardModel from '../models/CardModel'

// Define the initial state using that type
const initialState: DeckModel = {
  id: UUID(),
  title: "",
  cards: []
}

export const deckSlice = createSlice({
    name: 'deckSlice',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<CardModel>) => {
            state.cards.push(action.payload)
        },
        setTitle: (state, action: PayloadAction<string>) => {
          state.title = action.payload
        },
        resetDeckState: () => initialState
    },
  })
  
export const { addCard, setTitle, resetDeckState } = deckSlice.actions

export const selectCardOrder = (state: RootState) => state.deck.cards.length + 1

export const selectCards = (state: RootState) => state.deck.cards

export const selectTitle = (state: RootState) => state.deck.title

export const selectDeck = (state: RootState) => state.deck
    
export default deckSlice.reducer