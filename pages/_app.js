import '../styles/globals.css'
import { StoreContextProvider } from '../utils/StoreContext/StoreContext'

function MyApp({ Component, pageProps }) {
  return (
  <StoreContextProvider>
    <Component {...pageProps} />
  </StoreContextProvider>
  )
}

export default MyApp
