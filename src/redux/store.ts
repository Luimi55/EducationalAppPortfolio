import { configureStore } from '@reduxjs/toolkit'
import { cardSlice } from './Card-slice'
import { deckSlice } from './Deck-slice'
import { SelectedDeckSlice } from './SelectedDeck'

export const Store = configureStore({
  reducer: {
    card: cardSlice.reducer,
    selectedDeck: SelectedDeckSlice.reducer,
    deck: deckSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch