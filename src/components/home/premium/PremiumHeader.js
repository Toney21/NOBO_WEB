import { useEffect, useState } from 'react'
import { Box, Button, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { noboPremium } from '@/theme/nobo-premium-tokens'
import { openLisaExperience } from '@/utils/lisaBackend'
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
    const [location, setLocation] = useState('')
    const [locationOpen, setLocationOpen] = useState(false)
    const [locationDraft, setLocationDraft] = useState('')

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLocation(localStorage.getItem('location') || '')
            setLocationDraft(localStorage.getItem('location') || '')
        }
    }, [])

    const businessName = configData?.business_name || 'NOBO'
    const logo = configData?.logo_full_url
    const itemCount = cartList?.length || 0
    const isLight = theme.palette.mode === 'light'
    const handleLocationSubmit = (event) => {
        event.preventDefault()
        const nextLocation = locationDraft.trim()
        if (!nextLocation) return

        localStorage.setItem('location', nextLocation)
        setLocation(nextLocation)
        setLocationOpen(false)
    }

    return (
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

                        <Box sx={{ position: 'relative' }}>
                            <Button
                                startIcon={<LocationOnOutlinedIcon sx={{ fontSize: 16 }} />}
                                endIcon={<KeyboardArrowDownIcon />}
                                onClick={() => setLocationOpen((value) => !value)}
                                sx={{
                                    minHeight: 44,
                                    maxWidth: { xs: 150, sm: 220 },
                                    px: 1.4,
                                    borderRadius: 2,
                                    color: noboPremium.color.gold400,
                                    border: isLight
                                        ? '1px solid rgba(214,162,58,0.16)'
                                        : '1px solid rgba(232,200,120,0.12)',
                                    background: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.035)',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    '&:hover': {
                                        borderColor: 'rgba(232,200,120,0.34)',
                                        background: 'rgba(232,200,120,0.08)',
                                    },
                                }}
                            >
                                {shortenLocation(location)}
                            </Button>
                            {locationOpen && (
                                <Paper
                                    component="form"
                                    onSubmit={handleLocationSubmit}
                                    elevation={0}
                                    sx={{
                                        position: 'absolute',
                                        top: 'calc(100% + 10px)',
                                        left: 0,
                                        zIndex: 30,
                                        width: { xs: 280, sm: 340 },
                                        p: 1.4,
                                        borderRadius: 2,
                                        border: isLight
                                            ? '1px solid rgba(214,162,58,0.22)'
                                            : '1px solid rgba(232,200,120,0.18)',
                                        background: isLight ? '#FFFFFF' : 'rgba(16,26,43,0.98)',
                                        boxShadow: isLight
                                            ? '0 18px 44px rgba(3,28,58,0.12)'
                                            : '0 24px 80px rgba(0,0,0,0.32)',
                                    }}
                                >
                                    <Stack spacing={1.1}>
                                        <Typography sx={{ color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory, fontSize: '0.84rem', fontWeight: 800 }}>
                                            Enter your delivery location
                                        </Typography>
                                        <TextField
                                            autoFocus
                                            size="small"
                                            value={locationDraft}
                                            onChange={(event) => setLocationDraft(event.target.value)}
                                            placeholder="Estate, building, or street"
                                            inputProps={{ 'aria-label': 'Delivery location' }}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={!locationDraft.trim()}
                                            sx={{
                                                minHeight: 40,
                                                borderRadius: 1.5,
                                                background: '#E5AE36',
                                                color: noboPremium.color.navy900,
                                                fontWeight: 800,
                                            }}
                                        >
                                            Use this location
                                        </Button>
                                    </Stack>
                                </Paper>
                            )}
                        </Box>

                        <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' }, maxWidth: 560, mx: 'auto' }}>
                            <PremiumSearchBar compact />
                        </Box>

                        <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
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
                                <Typography sx={{ fontSize: '0.86rem', fontWeight: 700 }}>Tony</Typography>
                                <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                            </Button>
                        </Stack>
                    </Stack>

                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <PremiumSearchBar compact />
                    </Box>

                    <Stack direction="row" spacing={1} useFlexGap sx={{ display: { xs: 'flex', md: 'none' }, overflowX: 'auto', pb: 0.2 }}>
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
                                }}
                            >
                                {label}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default PremiumHeader
