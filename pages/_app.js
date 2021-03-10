import '../styles/globals.css'
import Navigation from "../components/common/navigation";

function MyApp({ Component, pageProps }) {
  return (
      <div>
        <Navigation />
        <Component {...pageProps} />
      </div>
  )
}

export default MyApp
