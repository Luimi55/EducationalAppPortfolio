import { createSlice } from '@reduxjs/toolkit'
import DeckModel from '../models/DeckModel'
import { RootState } from './store'

const initialState: DeckModel = {
    id: "",
    title: "",
    cards: []
}

export const SelectedDeckSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setSelectedDeck: (state, action) =>{
            state.id = action.payload.id
            state.title = action.payload.title
            state.cards = action.payload.cards
        },
    }
})

export const {
    setSelectedDeck,
} = SelectedDeckSlice.actions

export const getCards = (state: RootState) => state.selectedDeck.cards

export default SelectedDeckSlice.reducer