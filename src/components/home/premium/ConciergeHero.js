import { Box, Button, Stack, Typography } from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { noboPremium } from '@/theme/nobo-premium-tokens'
import { openLisaExperience } from '@/utils/lisaBackend'

const ConciergeHero = ({ configData }) => {
    const theme = useTheme()
    const router = useRouter()
    const isLight = theme.palette.mode === 'light'
    const heroFoodImage = '/static/Menu/Rectangle 8262.png'
    const lisaAvatar =
        configData?.lisa_profile_image_full_url ||
        configData?.lisa_avatar_full_url ||
        '/static/nobo-home/img2.png'

    return (
        <Box sx={{ maxWidth: 1248, mx: 'auto', px: 'clamp(14px, 4vw, 32px)', pt: { xs: 1.5, md: 2 }, pb: { xs: 1.5, md: 1 } }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1.18fr' },
                    gap: { xs: 3, md: 4 },
                    alignItems: 'center',
                    minHeight: { md: 256 },
                    borderRadius: 3,
                    px: { xs: 2.2, md: 7 },
                    py: { xs: 3, md: 3.1 },
                    border: isLight
                        ? '1px solid rgba(214,162,58,0.18)'
                        : '1px solid rgba(232,200,120,0.14)',
                    background: isLight
                        ? 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF8 100%)'
                        : 'linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018))',
                    boxShadow: isLight
                        ? '0 16px 48px rgba(86,57,18,0.08)'
                        : '0 24px 80px rgba(0,0,0,0.28)',
                }}
            >
                <Stack spacing={2.7}>
                    <Stack spacing={1.4}>
                        <Typography sx={{ color: noboPremium.color.gold500, fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.22em' }}>
                            Welcome to NOBO
                        </Typography>
                        <Typography
                            component="h1"
                            sx={{
                                color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory,
                                fontFamily: 'var(--font-heading)',
                                fontSize: { xs: '2.6rem', md: '3.35rem' },
                                lineHeight: 1.02,
                                fontWeight: 700,
                            }}
                        >
                            An unbeatable <Box component="span" sx={{ color: noboPremium.color.gold500, fontStyle: 'italic' }}>dining experience.</Box>
                        </Typography>
                        <Typography sx={{ color: isLight ? '#716C66' : noboPremium.color.textMutedDark, fontSize: '0.98rem', lineHeight: 1.7, maxWidth: 440 }}>
                            Order from trusted restaurants, discover better meals, and let Lisa help when you want an easier choice.
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1.4} useFlexGap flexWrap="wrap">
                        <Button
                            startIcon={<AutoAwesomeOutlinedIcon />}
                            onClick={() => openLisaExperience('home')}
                            sx={{
                                minHeight: 42,
                                px: 3.2,
                                borderRadius: 1.5,
                                background: '#E5AE36',
                                color: noboPremium.color.navy900,
                                fontWeight: 800,
                                '&:hover': {
                                    boxShadow: noboPremium.shadow.goldGlow,
                                },
                            }}
                        >
                            Ask Lisa
                        </Button>
                        <Button
                            onClick={() => router.push({ pathname: '/home', query: { page: 'restaurant' } })}
                            sx={{
                                minHeight: 42,
                                px: 3.2,
                                borderRadius: 1.5,
                                color: isLight ? noboPremium.color.gold700 : noboPremium.color.gold400,
                                border: '1px solid rgba(214,162,58,0.42)',
                                '&:hover': {
                                    borderColor: 'rgba(232,200,120,0.42)',
                                    background: 'rgba(232,200,120,0.08)',
                                },
                            }}
                        >
                            Browse restaurants
                        </Button>
                    </Stack>
                </Stack>

                <Box
                    sx={{
                        borderLeft: { md: '1px solid rgba(214,162,58,0.44)' },
                        pl: { md: 4 },
                    }}
                >
                    <Stack spacing={1.5}>
                        <Stack direction="row" alignItems="center" spacing={1.6}>
                            <Box sx={{ width: 62, height: 62, borderRadius: '50%', p: '3px', background: '#E5AE36' }}>
                                <Box
                                    component="img"
                                    src={lisaAvatar}
                                    alt="Lisa profile"
                                    onError={(event) => {
                                        event.currentTarget.style.display = 'none'
                                    }}
                                    sx={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block', background: '#D7881F' }}
                                />
                            </Box>
                            <Box>
                                <Typography sx={{ color: noboPremium.color.gold500, fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em' }}>
                                    Good evening
                                </Typography>
                                <Typography sx={{ color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.55rem', lineHeight: 1.05 }}>
                                    Hello, <Box component="span" sx={{ color: noboPremium.color.gold500, fontStyle: 'italic' }}>Tony</Box>
                                </Typography>
                                <Typography sx={{ color: isLight ? '#77716B' : noboPremium.color.textMutedDark, fontSize: '0.84rem' }}>
                                    Lisa has a meal suggestion ready for you.
                                </Typography>
                            </Box>
                        </Stack>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                alignItems: 'center',
                                borderRadius: 2.4,
                                border: isLight ? '1px solid rgba(3,28,58,0.08)' : '1px solid rgba(232,200,120,0.12)',
                                background: isLight ? '#FFFFFF' : 'rgba(16,26,43,0.72)',
                                overflow: 'hidden',
                                maxWidth: 520,
                            }}
                        >
                            <Box component="img" src={heroFoodImage} alt="Lisa pick" sx={{ width: '100%', height: 138, objectFit: 'cover' }} />
                            <Stack spacing={0.5} sx={{ p: 2.1 }}>
                                <Typography sx={{ color: noboPremium.color.gold500, fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase' }}>
                                    Lisa's pick
                                </Typography>
                                <Typography sx={{ color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory, fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>
                                    Seared Salmon Bowl
                                </Typography>
                                <Typography sx={{ color: isLight ? '#5F5A54' : noboPremium.color.textMutedDark, fontSize: '0.78rem' }}>
                                    Artcaffe Market
                                </Typography>
                                <Typography sx={{ color: isLight ? '#77716B' : noboPremium.color.textMutedDark, fontSize: '0.76rem' }}>
                                    30-40 min - 1.8 km away
                                </Typography>
                                <Button onClick={() => openLisaExperience('home')} sx={{ mt: 1, minHeight: 36, borderRadius: 1.3, background: '#E5AE36', color: noboPremium.color.navy900, fontSize: '0.78rem', fontWeight: 800 }}>
                                    View Lisa Basket
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default ConciergeHero
