import { Box, Button, Stack, Typography } from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined'
import { useRouter } from 'next/router'
import { noboPremium } from '@/theme/nobo-premium-tokens'
import { openLisaExperience } from '@/utils/lisaBackend'

const neighborhoods = ['Karen', 'Lavington', 'Runda', 'Muthaiga', 'Use current location']

const ConciergeHero = () => {
    const router = useRouter()

    return (
        <Box sx={{ maxWidth: 1240, mx: 'auto', px: 'clamp(16px, 4vw, 40px)', pt: { xs: 3, md: 6 }, pb: { xs: 3, md: 4 } }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1.04fr 0.96fr' },
                    gap: { xs: 3, md: 5 },
                    alignItems: 'center',
                    minHeight: { md: 520 },
                }}
            >
                <Stack spacing={3}>
                    <Stack spacing={1.5}>
                        <Typography sx={{ color: noboPremium.color.gold400, fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
                            NOBO Concierge
                        </Typography>
                        <Typography
                            component="h1"
                            sx={{
                                color: noboPremium.color.ivory,
                                fontFamily: 'var(--font-heading)',
                                fontSize: { xs: '3.15rem', sm: '4rem', md: '5.6rem' },
                                lineHeight: 0.94,
                                fontWeight: 700,
                                maxWidth: 640,
                            }}
                        >
                            Your food, handled.
                        </Typography>
                        <Typography sx={{ color: noboPremium.color.textMutedDark, fontSize: { xs: '1rem', md: '1.12rem' }, lineHeight: 1.8, maxWidth: 620 }}>
                            Lisa learns your taste, timing, and routine, then quietly arranges the right meal from Nairobi's best restaurants.
                        </Typography>
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                        <Button
                            startIcon={<AutoAwesomeOutlinedIcon />}
                            onClick={() => openLisaExperience('home')}
                            sx={{
                                minHeight: 52,
                                px: 3.5,
                                borderRadius: noboPremium.radius.pill,
                                background:
                                    'linear-gradient(135deg, #E8C878 0%, #D6A23A 48%, #A87521 100%)',
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
                            startIcon={<RestaurantMenuOutlinedIcon />}
                            onClick={() => router.push({ pathname: '/home', query: { page: 'restaurant' } })}
                            sx={{
                                minHeight: 52,
                                px: 3.5,
                                borderRadius: noboPremium.radius.pill,
                                color: noboPremium.color.ivory,
                                border: '1px solid rgba(232,200,120,0.22)',
                                '&:hover': {
                                    borderColor: 'rgba(232,200,120,0.42)',
                                    background: 'rgba(232,200,120,0.08)',
                                },
                            }}
                        >
                            Browse restaurants
                        </Button>
                    </Stack>

                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {neighborhoods.map((item) => (
                            <Button
                                key={item}
                                onClick={() => item === 'Use current location' ? router.push({ pathname: '/home', query: { query: 'nearby restaurants' } }) : router.push({ pathname: '/home', query: { query: item } })}
                                sx={{
                                    minHeight: 40,
                                    px: 1.7,
                                    borderRadius: noboPremium.radius.pill,
                                    color: noboPremium.color.ivory,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(232,200,120,0.14)',
                                }}
                            >
                                {item}
                            </Button>
                        ))}
                    </Stack>
                </Stack>

                <Box
                    sx={{
                        position: 'relative',
                        minHeight: { xs: 330, md: 470 },
                        borderRadius: { xs: 4, md: 5 },
                        border: '1px solid rgba(232,200,120,0.18)',
                        background:
                            'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                        boxShadow: noboPremium.shadow.cardDark,
                        overflow: 'hidden',
                        p: { xs: 2, md: 3 },
                    }}
                >
                    <Box sx={{ position: 'absolute', inset: '10% 4% auto auto', width: '58%', height: '58%', borderRadius: '50%', background: 'rgba(214,162,58,0.14)', filter: 'blur(42px)' }} />
                    <Stack spacing={2.2} sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography sx={{ color: noboPremium.color.textMutedDark, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                            Private meal intelligence
                        </Typography>
                        <Box sx={{ borderRadius: 4, p: 2.2, background: 'rgba(7,17,31,0.72)', border: '1px solid rgba(232,200,120,0.14)' }}>
                            <Typography sx={{ color: noboPremium.color.gold400, fontWeight: 800, mb: 0.8 }}>
                                Today at 12:40
                            </Typography>
                            <Typography sx={{ color: noboPremium.color.ivory, fontFamily: 'var(--font-heading)', fontSize: { xs: '1.9rem', md: '2.35rem' }, lineHeight: 1.05 }}>
                                Balanced lunch, close by, no back-and-forth.
                            </Typography>
                        </Box>
                        {[
                            ['Taste', 'Light, high protein'],
                            ['Timing', 'Arrives in 28 min'],
                            ['Area', 'Karen and Lavington ready'],
                        ].map(([label, value]) => (
                            <Stack key={label} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 58, borderRadius: 3, px: 2, background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(232,200,120,0.1)' }}>
                                <Typography sx={{ color: noboPremium.color.textMutedDark }}>{label}</Typography>
                                <Typography sx={{ color: noboPremium.color.ivory, fontWeight: 700 }}>{value}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default ConciergeHero
