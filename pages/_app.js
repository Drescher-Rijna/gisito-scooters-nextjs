import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AuthProvider, { useAuth } from '../global/AuthContext'
import CartContextProvider from '../global/CartContext'
import ProductsContextProvider from '../global/ProductsContext'
import '../styles/globals.css'
import layoutStyle from '../styles/layout.css'

function MyApp({ Component, pageProps }) {
  return (
          <AuthProvider>
            <ProductsContextProvider>
              <CartContextProvider>
                <Navbar />
                <Component {...pageProps} />
                <Footer />
              </CartContextProvider>
            </ProductsContextProvider>
          </AuthProvider>
          )
}

export default MyApp
