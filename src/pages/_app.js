import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Playfair_Display, Roboto } from 'next/font/google'
import Router, { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import nProgress from 'nprogress'
import { Provider } from 'react-redux'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box, NoSsr } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Toaster } from 'react-hot-toast'

import { store } from '@/redux/store'
import { WrapperForApp } from '@/App.style'
import createEmotionCache from '@/utils/create-emotion-cache'
import { createTheme } from '@/theme'
import { SettingsProvider, SettingsConsumer } from '@/contexts/settings-context'
import Navigation from '@/components/navbar'
import ScrollToTop from '@/components/scroll-top/ScrollToTop'
import DynamicFavicon from '@/components/favicon/DynamicFavicon'
import FloatingCardManagement from '@/components/floating-cart/FloatingCardManagement'

import '@/language/i18n'
import i18n, { t } from 'i18next'
import '@/styles/global.css'
import '@/styles/nprogress.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
})

const Footer = dynamic(() => import('@/components/footer/Footer'), { ssr: false })

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

const clientSideEmotionCache = createEmotionCache()
const queryClient = new QueryClient()

const safeJsonParse = (value) => {
  if (typeof value !== 'string' || !value) return undefined

  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

const App = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) => {
  const router = useRouter()
  const [zoneid, setZoneid] = useState(undefined)
  const [viewFooter, setViewFooter] = useState(false)
  const isPremiumHome = router.pathname === '/home'

  const getLayout = Component.getLayout ?? ((page) => page)
  // Language & zoneid logic
  useEffect(() => {
    const storedLang = localStorage.getItem('language')
    const browserLang = (i18n.language || 'en').toLowerCase()
    if (!storedLang) localStorage.setItem('language', browserLang)
    i18n.changeLanguage(storedLang || browserLang)

    localStorage.removeItem('guest_id')
    localStorage.removeItem('guest_token')

    const storedZoneId = localStorage.getItem('zoneid')
    if (storedZoneId) setZoneid(safeJsonParse(storedZoneId))

    const siteVersion = process.env.NEXT_PUBLIC_SITE_VERSION
    if (siteVersion) {
      const storedVersion = localStorage.getItem('appVersion')
      if (storedVersion !== siteVersion) {
        localStorage.clear()
        localStorage.setItem('appVersion', siteVersion)
      }
    }

    setViewFooter(true)
  }, [router.pathname])

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeProvider
                  theme={createTheme({
                    direction: settings.direction,
                    responsiveFontSizes: settings.responsiveFontSizes,
                    mode: settings.theme,
                  })}
                >
                  <CssBaseline />
                  <Toaster />
                  <Head>
                    <title>{t('Loading...')}</title>
                  </Head>

                  <WrapperForApp
                    pathname={router.pathname}
                    className={`${playfair.variable} ${roboto.variable}`}
                  >
                    <NoSsr>
                      <ScrollToTop />
                      {router.pathname !== '/maintenance' && (
                        <Box sx={{ display: isPremiumHome ? 'none' : 'block' }}>
                          <Navigation />
                        </Box>
                      )}
                      <DynamicFavicon />
                    </NoSsr>
                    <Box
                      sx={{
                        minHeight: '100vh',
                        mt: {
                          xs: isPremiumHome ? 0 : '3.5rem',
                          md: router.pathname === '/'
                            ? zoneid
                              ? '120px'
                              : '64px'
                            : isPremiumHome
                              ? 0
                              : '4rem',
                        },
                      }}
                    >
                      <NoSsr>
                        {['/', '/checkout', '/chat', '/home'].includes(router.pathname) ? null : (
                          <FloatingCardManagement zoneid={zoneid} />
                        )}
                      </NoSsr>
                      {getLayout(<Component {...pageProps} />)}
                    </Box>

                    {viewFooter && router.pathname !== '/maintenance' && !isPremiumHome && (
                      <Footer languageDirection={settings.direction} />
                    )}
                  </WrapperForApp>
                </ThemeProvider>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </CacheProvider>
  )
}

export default App
