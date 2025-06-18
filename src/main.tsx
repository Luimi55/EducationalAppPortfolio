import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google"
import './index.css'
import Home from './screens/Home.tsx'
import Login from './screens/Login.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import SelectFormat from './screens/Select-format.tsx'
import MultipleChoiceForm from './screens/Multiple-choice-form.tsx'
import { Provider } from 'react-redux'
import { Store } from './redux/store.ts'
import SelectAnswer from './screens/Select-answer.tsx'
import RequireAuth from './auth/RequireAuth.tsx'
import CardGame from './screens/Card-game.tsx'
import PreviewDeck from './screens/Preview-Deck.tsx'
import EndGame from './screens/End-game.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_AUTH_API_KEY}>
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" Component={Login}/>
            <Route element={<RequireAuth/>}>
              <Route path="/" Component={Home}/>
              <Route path="/select-format" Component={SelectFormat}/>
              <Route path="/multiple-choice-form" Component={MultipleChoiceForm}/>
              {/* TODO: Nested route */}
              <Route path="/select-answer" Component={SelectAnswer}/> 
              <Route path="/card-game/:cardOrder" Component={CardGame}/> 
              <Route path="/end-game" Component={EndGame}/> 
              <Route path="/preview-deck" Component={PreviewDeck}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
