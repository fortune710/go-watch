import './App.css'
import { Route, Routes } from 'react-router-dom';

import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/Home';
import { MovieDetailPage } from './pages/Movie';
import { SearchPage } from './pages/SearchPage';
import { TVShowPage } from './pages/TvShow';
import { BottomNavbar } from './components';
import { Suspense, lazy, useEffect } from 'react';
import { Container } from '@mui/material';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { app } from './utils';
import { LoginPage } from './pages/Login';
import { ProfilePage } from './pages/Profile';
import { FavouritesPage } from './pages/FavourtitesPage';
import { TVShowSeasonPage } from './pages/TvShowSeasons';

const SignUpPage = lazy(() => import('./pages/SignUp').then(m=> ({ default: m.SignUpPage })))
const PersonPage = lazy(() => import('./pages/Person').then(m=> ({ default: m.Person })))

const ComingSoon: React.FC = () => {
  return(
    <>
      <Container sx={{ display:'flex', alignItems: 'center', justifyContent:"center", height: '100vh' }}>
        <h3>Coming Soon</h3>
      </Container>
      <BottomNavbar/>
    </>
  )
}

function App() {
  const auth = getAuth(app);
  const API_KEY = "e77b613c447296755dab014d1426012a";
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        <Route path="/"  element={<LandingPage/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/movie/:id" element={<MovieDetailPage/>} />
        <Route path="/show/:id" element={<TVShowPage/>} />
        <Route path="/favourites" element={<FavouritesPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/show/:id/season/:season_num" element={<TVShowSeasonPage/>}/>
        <Route path="/person/:id" element={<PersonPage/>}/>
      </Routes>
    </Suspense>
  )
}

export default App
