import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PokemonListPage } from '@/pages/PokemonListPage'
import { PokemonDetailPage } from '@/pages/PokemonDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonListPage />} />
        <Route path="/pokemon/:identifier" element={<PokemonDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
