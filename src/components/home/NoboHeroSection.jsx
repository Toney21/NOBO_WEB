import CustomNextImage from '@/components/CustomNextImage'
import CustomContainer from '@/components/container'
import { openLisaExperience } from '@/utils/lisaBackend'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'

const heroSignals = [
    'Learns your preferences',
    'Builds a smarter basket',
    'Helps you decide faster',
]

const NoboHeroSection = () => {
    const handleMeetLisaClick = () => {
        if (typeof window === 'undefined') {
            return
        }

        const target = document.getElementById('meet-lisa')
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                background:
                    'radial-gradient(circle at top left, rgba(212, 166, 74, 0.22), transparent 28%), radial-gradient(circle at 85% 20%, rgba(212, 166, 74, 0.12), transparent 22%), linear-gradient(180deg, #141414 0%, #0B0B0B 100%)',
                pt: { xs: '88px', md: '154px' },
                pb: { xs: 6, md: 10 },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 45%, rgba(212,166,74,0.04) 100%)',
                    pointerEvents: 'none',
                }}
            />
            <CustomContainer>
                <Grid container spacing={{ xs: 5, md: 6 }} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
                            <Stack spacing={1.5}>
                                <Typography
                                    component="span"
                                    sx={{
                                        color: '#D4A64A',
                                        fontSize: '0.82rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.28em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    AI-first food decisions
                                </Typography>
                                <Typography
                                    component="h1"
                                    sx={{
                                        color: '#F5EFE6',
                                        fontSize: { xs: '2.4rem', md: '4.4rem' },
                                        fontWeight: 700,
                                        lineHeight: 1.02,
                                        maxWidth: '10ch',
                                    }}
                                >
                                    Nairobi&apos;s AI-powered food intelligence platform.
                                </Typography>
                                <Typography
                                    component="p"
                                    sx={{
                                        color: '#A8A29A',
                                        fontSize: { xs: '1rem', md: '1.15rem' },
                                        lineHeight: 1.8,
                                        maxWidth: '60ch',
                                    }}
                                >
                                    NOBO uses AI to learn your food preferences,
                                    budget, schedule, and lifestyle helping you
                                    decide what to eat before you even open the app.
                                </Typography>
                            </Stack>

                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={1.5}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => openLisaExperience('home')}
                                    sx={{
                                        minHeight: 56,
                                        px: 3.5,
                                        borderRadius: '999px',
                                        backgroundColor: '#D4A64A',
                                        color: '#111111',
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        '&:hover': {
                                            backgroundColor: '#C89B47',
                                        },
                                    }}
                                >
                                    Open NOBO
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleMeetLisaClick}
                                    sx={{
                                        minHeight: 56,
                                        px: 3.5,
                                        borderRadius: '999px',
                                        borderColor: 'rgba(245, 239, 230, 0.18)',
                                        color: '#F5EFE6',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        backgroundColor: 'rgba(255,255,255,0.02)',
                                        '&:hover': {
                                            borderColor: '#D4A64A',
                                            backgroundColor: 'rgba(212, 166, 74, 0.08)',
                                        },
                                    }}
                                >
                                    Meet Lisa
                                </Button>
                            </Stack>

                            <Stack
                                direction="row"
                                spacing={1.25}
                                useFlexGap
                                flexWrap="wrap"
                            >
                                {heroSignals.map((signal) => (
                                    <Box
                                        key={signal}
                                        sx={{
                                            borderRadius: '999px',
                                            border: '1px solid rgba(212, 166, 74, 0.18)',
                                            backgroundColor:
                                                'rgba(255, 255, 255, 0.03)',
                                            px: 1.6,
                                            py: 0.9,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#F5EFE6',
                                                fontSize: '0.92rem',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {signal}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                maxWidth: 530,
                                ml: { md: 'auto' },
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: '8% 8% 4%',
                                    borderRadius: '40px',
                                    background:
                                        'radial-gradient(circle, rgba(212,166,74,0.22) 0%, rgba(212,166,74,0.05) 38%, transparent 72%)',
                                    filter: 'blur(18px)',
                                    transform: 'scale(1.08)',
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'relative',
                                    borderRadius: { xs: '28px', md: '36px' },
                                    overflow: 'hidden',
                                    border: '1px solid rgba(245, 239, 230, 0.08)',
                                    boxShadow:
                                        '0 36px 90px rgba(0,0,0,0.42), 0 0 0 1px rgba(212,166,74,0.08)',
                                    backgroundColor: '#101010',
                                }}
                            >
                                <CustomNextImage
                                    src="/static/nobo-home/img1.jpeg"
                                    alt="NOBO Lisa home screen"
                                    width={800}
                                    height={980}
                                    priority
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: { xs: 10, md: -18 },
                                    bottom: { xs: 22, md: 40 },
                                    borderRadius: '22px',
                                    backgroundColor: 'rgba(17, 17, 17, 0.9)',
                                    border: '1px solid rgba(212, 166, 74, 0.24)',
                                    backdropFilter: 'blur(12px)',
                                    px: 2,
                                    py: 1.5,
                                    boxShadow: '0 18px 48px rgba(0,0,0,0.32)',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#A8A29A',
                                        fontSize: '0.76rem',
                                        letterSpacing: '0.16em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Smart Basket
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#F5EFE6',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        mt: 0.4,
                                    }}
                                >
                                    Balanced meal, one tap.
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: { xs: 12, md: -10 },
                                    top: { xs: 20, md: 42 },
                                    width: 108,
                                    height: 108,
                                    borderRadius: '50%',
                                    display: 'grid',
                                    placeItems: 'center',
                                    background:
                                        'radial-gradient(circle at 30% 30%, rgba(212,166,74,0.28), rgba(11,11,11,0.96) 62%)',
                                    border: '1px solid rgba(212, 166, 74, 0.34)',
                                    boxShadow: '0 16px 40px rgba(0,0,0,0.38)',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: '50%',
                                        border: '6px solid #D4A64A',
                                        display: 'grid',
                                        placeItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#F5EFE6',
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                        }}
                                    >
                                        92%
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </CustomContainer>
        </Box>
    )
}

export default NoboHeroSection
