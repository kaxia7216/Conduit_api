import '@/app/global.css'
import Header from './Header'
import Footer from './Footer'
// import { Html, Head } from 'next/head'
// import { Html, Head, Main, NextScript } from 'next/document';

export const metadata = {
  title: 'conduit',
}

// function getCsrfToken() {
//   return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
// }

const RootLayout = ({ children }) => {
  return (
    <html lang="ja">
      <head>
        <title>conduit</title>
        <link
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        {/* <meta name="csrf-token" content={getCsrfToken()} /> */}
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout

