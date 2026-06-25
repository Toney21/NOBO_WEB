import { useEffect, useState } from 'react'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { noboPremium } from '@/theme/nobo-premium-tokens'
import { openLisaExperience } from '@/utils/lisaBackend'
import { getToken } from '@/utils/localStorage'
import AuthModal from '@/components/auth'
import MapModal from '@/components/landingpage/google-map/MapModal'
import PremiumSearchBar from './PremiumSearchBar'

const shortenLocation = (value) => {
    if (!value) return 'Set location'
    const [first] = value.split(',')
    return first?.trim() || 'Set location'
}

const PremiumHeader = ({ configData }) => {
    const theme = useTheme()
    const router = useRouter()
    const { cartList } = useSelector((state) => state.cart)
    const { userData } = useSelector((state) => state.user)
    const [location, setLocation] = useState('')
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [modalFor, setModalFor] = useState('sign-in')
    const [mapModalOpen, setMapModalOpen] = useState(false)
    const [token, setToken] = useState(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLocation(localStorage.getItem('location') || '')
            setToken(getToken())
        }
    }, [])

    useEffect(() => {
        const handleAuthRequired = () => {
            setModalFor('sign-in')
            setAuthModalOpen(true)
        }

        if (typeof window === 'undefined') return

        window.addEventListener('nobo:auth-required', handleAuthRequired)

        return () => {
            window.removeEventListener('nobo:auth-required', handleAuthRequired)
        }
    }, [])

    const businessName = configData?.business_name || 'NOBO'
    const logo = configData?.logo_full_url
    const itemCount = cartList?.length || 0
    const isLight = theme.palette.mode === 'light'
    const handleCloseAuthModal = () => {
        setAuthModalOpen(false)
        setModalFor('sign-in')
        setToken(getToken())
    }
    const handleAuthSuccess = () => {
        setToken(getToken())
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('nobo:auth-changed'))
        }
    }
    const handleCloseMapModal = () => {
        setMapModalOpen(false)
        if (typeof window !== 'undefined') {
            setLocation(localStorage.getItem('location') || '')
        }
    }
    const displayName = userData?.f_name || userData?.name?.split(' ')?.[0] || 'Profile'

    return (
        <>
            <Box
                component="header"
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    background: isLight ? 'rgba(255,253,248,0.88)' : 'rgba(6,11,20,0.88)',
                    backdropFilter: 'blur(18px)',
                    borderBottom: isLight
                        ? '1px solid rgba(214,162,58,0.14)'
                        : '1px solid rgba(232,200,120,0.10)',
                }}
            >
            <Box
                sx={{
                    maxWidth: 1248,
                    mx: 'auto',
                    px: 'clamp(14px, 4vw, 32px)',
                    py: { xs: 1, md: 1.1 },
                }}
            >
                <Stack spacing={{ xs: 1.2, md: 0 }}>
                    <Stack direction="row" alignItems="center" spacing={1.2}>
                        <Box
                            component="button"
                            onClick={() => router.push('/home')}
                            aria-label={`${businessName} home`}
                            sx={{
                                border: 0,
                                background: 'transparent',
                                color: noboPremium.color.gold400,
                                cursor: 'pointer',
                                width: { xs: 84, md: 102 },
                                minHeight: 44,
                                p: 0,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {logo ? (
                                <Box
                                    component="img"
                                    src={logo}
                                    alt={businessName}
                                    sx={{
                                        maxWidth: '100%',
                                        maxHeight: 36,
                                        objectFit: 'contain',
                                    }}
                                />
                            ) : (
                                <Typography sx={{ fontFamily: 'var(--font-heading)', fontSize: { xs: '1.45rem', md: '1.7rem' }, fontWeight: 700 }}>
                                    NOBO
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' }, maxWidth: 560, mx: 'auto' }}>
                            <PremiumSearchBar compact />
                        </Box>

                        <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
                            <Button
                                startIcon={<LocationOnOutlinedIcon sx={{ fontSize: 16 }} />}
                                onClick={() => setMapModalOpen(true)}
                                sx={{
                                    minHeight: 44,
                                    display: 'inline-flex',
                                    minWidth: 44,
                                    px: { xs: 1, sm: 1.4 },
                                    borderRadius: 2,
                                    color: noboPremium.color.gold400,
                                    border: '1px solid rgba(214,162,58,0.42)',
                                    background: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.035)',
                                }}
                            >
                                <Typography sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: { sm: 130, lg: 180 }, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '0.78rem', fontWeight: 800 }}>
                                    {shortenLocation(location)}
                                </Typography>
                            </Button>
                            <Button
                                startIcon={<AutoAwesomeOutlinedIcon sx={{ fontSize: 16 }} />}
                                onClick={() => openLisaExperience('home')}
                                sx={{
                                    minHeight: 44,
                                    display: { xs: 'none', sm: 'inline-flex' },
                                    px: 2.2,
                                    borderRadius: noboPremium.radius.pill,
                                    color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory,
                                    background: 'transparent',
                                    border: '1px solid rgba(214,162,58,0.42)',
                                    fontWeight: 700,
                                    '&:hover': {
                                        boxShadow: noboPremium.shadow.goldGlow,
                                    },
                                }}
                            >
                                Ask Lisa
                            </Button>
                            <IconButton
                                aria-label={`Basket with ${itemCount} items`}
                                onClick={() => router.push({ pathname: '/checkout', query: { page: 'cart' } })}
                                sx={{
                                    width: { xs: 44, md: 'auto' },
                                    height: 44,
                                    px: { xs: 0, md: 1.3 },
                                    gap: 0.7,
                                    color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory,
                                    border: 0,
                                    position: 'relative',
                                }}
                            >
                                <LocalMallOutlinedIcon />
                                <Typography sx={{ display: { xs: 'none', md: 'block' }, fontSize: '0.86rem', fontWeight: 700 }}>
                                    Basket
                                </Typography>
                                {itemCount > 0 && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 4,
                                            right: 3,
                                            minWidth: 18,
                                            height: 18,
                                            borderRadius: 9,
                                            background: noboPremium.color.orangeLegacy,
                                            color: '#fff',
                                            fontSize: 11,
                                            display: 'grid',
                                            placeItems: 'center',
                                        }}
                                    >
                                        {itemCount}
                                    </Box>
                                )}
                            </IconButton>
                            {token ? (
                                <Button
                                    aria-label="Profile menu"
                                    onClick={() => router.push({ pathname: '/info', query: { page: 'profile' } })}
                                    sx={{
                                        minWidth: 0,
                                        height: 44,
                                        display: { xs: 'none', md: 'inline-flex' },
                                        gap: 0.8,
                                        color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory,
                                    }}
                                >
                                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid rgba(214,162,58,0.55)', background: 'linear-gradient(135deg,#b66b2f,#f2c56a)' }} />
                                    <Typography sx={{ fontSize: '0.86rem', fontWeight: 700 }}>{displayName}</Typography>
                                    <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        setModalFor('sign-in')
                                        setAuthModalOpen(true)
                                    }}
                                    sx={{
                                        minHeight: 44,
                                        px: 2.2,
                                        borderRadius: noboPremium.radius.pill,
                                        color: `${noboPremium.color.navy900} !important`,
                                        background: '#E5AE36',
                                        fontWeight: 800,
                                    }}
                                >
                                    Login
                                </Button>
                            )}
                        </Stack>
                    </Stack>

                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <PremiumSearchBar compact />
                    </Box>

                    <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexWrap: 'wrap',
                            overflowX: 'visible',
                            pb: 0.2,
                        }}
                    >
                        {['Ask Lisa', 'Usual order', 'Nearby', 'Quick lunch'].map((label, index) => (
                            <Button
                                key={label}
                                onClick={() => index === 0 ? openLisaExperience('home') : router.push({ pathname: '/home', query: { query: label } })}
                                sx={{
                                    minHeight: 40,
                                    flex: '0 0 auto',
                                    px: 1.7,
                                    borderRadius: noboPremium.radius.pill,
                                    color: index === 0
                                        ? noboPremium.color.navy900
                                        : isLight
                                            ? noboPremium.color.navy900
                                            : noboPremium.color.ivory,
                                    background:
                                        index === 0
                                            ? 'linear-gradient(135deg, #E8C878 0%, #D6A23A 48%, #A87521 100%)'
                                            : isLight
                                                ? '#FFFFFF'
                                                : 'rgba(255,255,255,0.06)',
                                    border: index === 0 ? 0 : '1px solid rgba(232,200,120,0.14)',
                                    fontWeight: 700,
                                    '&, &:hover': {
                                        color: index === 0
                                            ? `${noboPremium.color.navy900} !important`
                                            : undefined,
                                    },
                                }}
                            >
                                {label}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            </Box>
            </Box>
            <AuthModal
                open={authModalOpen}
                modalFor={modalFor}
                setModalFor={setModalFor}
                handleClose={handleCloseAuthModal}
                onAuthSuccess={handleAuthSuccess}
            />
            <MapModal open={mapModalOpen} handleClose={handleCloseMapModal} />
        </>
    )
}

export default PremiumHeader
