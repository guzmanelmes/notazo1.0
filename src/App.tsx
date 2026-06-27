import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Loader } from '@/components/ui/Loader'

const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })))
const CalculadoraNotas = lazy(() =>
  import('@/pages/CalculadoraNotas').then((m) => ({ default: m.CalculadoraNotas }))
)
const QueNotaNecesito = lazy(() =>
  import('@/pages/QueNotaNecesito').then((m) => ({ default: m.QueNotaNecesito }))
)
const CalculadoraExamenFinal = lazy(() =>
  import('@/pages/CalculadoraExamenFinal').then((m) => ({ default: m.CalculadoraExamenFinal }))
)
const SimuladorEximicion = lazy(() =>
  import('@/pages/SimuladorEximicion').then((m) => ({ default: m.SimuladorEximicion }))
)
const Historial = lazy(() => import('@/pages/Historial').then((m) => ({ default: m.Historial })))
const PuntajeANota = lazy(() =>
  import('@/pages/PuntajeANota').then((m) => ({ default: m.PuntajeANota }))
)
const Nem = lazy(() => import('@/pages/Nem').then((m) => ({ default: m.Nem })))
const EscalaNotas = lazy(() =>
  import('@/pages/EscalaNotas').then((m) => ({ default: m.EscalaNotas }))
)
const Dashboard = lazy(() =>
  import('@/pages/Dashboard').then((m) => ({ default: m.Dashboard }))
)
const Blog = lazy(() => import('@/pages/Blog').then((m) => ({ default: m.Blog })))
const BlogPost = lazy(() =>
  import('@/pages/BlogPost').then((m) => ({ default: m.BlogPost }))
)
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))

function PageFallback() {
  return <Loader fullScreen />
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageFallback />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/calculadora-de-notas"
          element={
            <Suspense fallback={<PageFallback />}>
              <CalculadoraNotas />
            </Suspense>
          }
        />
        <Route
          path="/que-nota-necesito"
          element={
            <Suspense fallback={<PageFallback />}>
              <QueNotaNecesito />
            </Suspense>
          }
        />
        <Route
          path="/calculadora-examen-final"
          element={
            <Suspense fallback={<PageFallback />}>
              <CalculadoraExamenFinal />
            </Suspense>
          }
        />
        <Route
          path="/simulador-eximicion"
          element={
            <Suspense fallback={<PageFallback />}>
              <SimuladorEximicion />
            </Suspense>
          }
        />
        <Route
          path="/puntaje-a-nota"
          element={
            <Suspense fallback={<PageFallback />}>
              <PuntajeANota />
            </Suspense>
          }
        />
        <Route
          path="/nem"
          element={
            <Suspense fallback={<PageFallback />}>
              <Nem />
            </Suspense>
          }
        />
        <Route
          path="/escala-de-notas"
          element={
            <Suspense fallback={<PageFallback />}>
              <EscalaNotas />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<PageFallback />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<PageFallback />}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<PageFallback />}>
              <BlogPost />
            </Suspense>
          }
        />
        <Route
          path="/historial"
          element={
            <Suspense fallback={<PageFallback />}>
              <Historial />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
