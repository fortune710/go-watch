import './App.css'
import { Route, Routes } from 'react-router-dom';

import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/Home';
import { MovieDetailPage } from './pages/Movie';
import { SearchPage } from './pages/SearchPage';
import { TVShowPage } from './pages/TvShow';
import { BottomNavbar } from './components';
import { Container } from '@mui/material';

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
  const API_KEY = "e77b613c447296755dab014d1426012a";
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchPage/>} />
      <Route path="/movie/:id" element={<MovieDetailPage/>} />
      <Route path="/show/:id" element={<TVShowPage/>} />
      <Route path="/favourites" element={<ComingSoon/>}/>
      <Route path="/profile" element={<ComingSoon/>}/>
    </Routes>
  )
}

export default App
