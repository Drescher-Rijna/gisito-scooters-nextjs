import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AuthProvider from '../global/AuthContext'
import CartContextProvider from '../global/CartContext'
import '../styles/globals.css'
import layoutStyle from '../styles/layout.css'

function MyApp({ Component, pageProps }) {
  return (
          <AuthProvider>
            <CartContextProvider>
              <Navbar />
              <Component {...pageProps} />
              <Footer />
            </CartContextProvider>
          </AuthProvider>
          )
}

export default MyApp
