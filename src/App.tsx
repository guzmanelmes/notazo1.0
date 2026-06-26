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
