import { useEffect, useState } from 'react'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { noboPremium } from '@/theme/nobo-premium-tokens'
import { openLisaExperience } from '@/utils/lisaBackend'
import PremiumSearchBar from './PremiumSearchBar'

const shortenLocation = (value) => {
    if (!value) return 'Karen'
    const [first] = value.split(',')
    return first?.trim() || 'Karen'
}

const PremiumHeader = ({ configData }) => {
    const router = useRouter()
    const { cartList } = useSelector((state) => state.cart)
    const [location, setLocation] = useState('')

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLocation(localStorage.getItem('location') || '')
        }
    }, [])

    const businessName = configData?.business_name || 'NOBO'
    const itemCount = cartList?.length || 0

    return (
        <Box
            component="header"
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                background: 'rgba(7,17,31,0.88)',
                backdropFilter: 'blur(18px)',
                borderBottom: '1px solid rgba(232,200,120,0.10)',
            }}
        >
            <Box
                sx={{
                    maxWidth: 1240,
                    mx: 'auto',
                    px: 'clamp(16px, 4vw, 40px)',
                    py: { xs: 1.25, md: 1.5 },
                }}
            >
                <Stack spacing={{ xs: 1.2, md: 0 }}>
                    <Stack direction="row" alignItems="center" spacing={1.2}>
                        <Typography
                            component="button"
                            onClick={() => router.push('/home')}
                            aria-label={`${businessName} home`}
                            sx={{
                                border: 0,
                                background: 'transparent',
                                color: noboPremium.color.ivory,
                                cursor: 'pointer',
                                fontFamily: 'var(--font-heading)',
                                fontSize: { xs: '1.45rem', md: '1.65rem' },
                                fontWeight: 700,
                                minHeight: 44,
                                p: 0,
                            }}
                        >
                            {businessName}
                        </Typography>

                        <Button
                            endIcon={<KeyboardArrowDownIcon />}
                            onClick={() => router.push({ pathname: '/home', query: { query: 'nearby restaurants' } })}
                            sx={{
                                minHeight: 44,
                                maxWidth: { xs: 150, sm: 220 },
                                px: 1.2,
                                borderRadius: noboPremium.radius.pill,
                                color: noboPremium.color.gold400,
                                border: '1px solid rgba(232,200,120,0.16)',
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

                        <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' }, maxWidth: 540, mx: 'auto' }}>
                            <PremiumSearchBar compact />
                        </Box>

                        <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
                            <Button
                                onClick={() => openLisaExperience('home')}
                                sx={{
                                    minHeight: 44,
                                    display: { xs: 'none', sm: 'inline-flex' },
                                    px: 2,
                                    borderRadius: noboPremium.radius.pill,
                                    color: noboPremium.color.navy900,
                                    background:
                                        'linear-gradient(135deg, #E8C878 0%, #D6A23A 48%, #A87521 100%)',
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
                                    width: 44,
                                    height: 44,
                                    color: noboPremium.color.ivory,
                                    border: '1px solid rgba(232,200,120,0.18)',
                                    position: 'relative',
                                }}
                            >
                                <LocalMallOutlinedIcon />
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
                            <IconButton
                                aria-label="Profile"
                                onClick={() => router.push({ pathname: '/info', query: { page: 'profile' } })}
                                sx={{
                                    width: 44,
                                    height: 44,
                                    display: { xs: 'none', md: 'inline-flex' },
                                    color: noboPremium.color.ivory,
                                    border: '1px solid rgba(232,200,120,0.18)',
                                }}
                            >
                                <PersonOutlineOutlinedIcon />
                            </IconButton>
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
                                    color: index === 0 ? noboPremium.color.navy900 : noboPremium.color.ivory,
                                    background:
                                        index === 0
                                            ? 'linear-gradient(135deg, #E8C878 0%, #D6A23A 48%, #A87521 100%)'
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
