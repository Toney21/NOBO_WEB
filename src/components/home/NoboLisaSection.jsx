import CustomNextImage from '@/components/CustomNextImage'
import CustomContainer from '@/components/container'
import { Box, Grid, Stack, Typography } from '@mui/material'

const lisaFeatures = [
    'Predictive meal suggestions',
    'Handle my lunch life mode',
    'Smart meal bundles',
    'One-tap reorder',
    'Autopilot meal planning',
    'Corporate meal intelligence',
]

const NoboLisaSection = () => {
    return (
        <Box
            id="meet-lisa"
            sx={{
                position: 'relative',
                overflow: 'hidden',
                background:
                    'linear-gradient(180deg, #0B0B0B 0%, #111111 100%)',
                pb: { xs: 6, md: 9 },
            }}
        >
            <CustomContainer>
                <Box
                    sx={{
                        borderRadius: { xs: '26px', md: '34px' },
                        border: '1px solid rgba(245, 239, 230, 0.08)',
                        background:
                            'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)',
                        boxShadow: '0 28px 70px rgba(0,0,0,0.26)',
                        px: { xs: 2.25, md: 5 },
                        py: { xs: 3, md: 5 },
                    }}
                >
                    <Grid container spacing={{ xs: 4, md: 5 }} alignItems="center">
                        <Grid item xs={12} md={5}>
                            <Stack spacing={2.2}>
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
                                    Meet Lisa
                                </Typography>
                                <Typography
                                    component="h2"
                                    sx={{
                                        color: '#F5EFE6',
                                        fontSize: { xs: '2rem', md: '3rem' },
                                        fontWeight: 700,
                                        lineHeight: 1.08,
                                        maxWidth: '12ch',
                                    }}
                                >
                                    Your personal food intelligence assistant.
                                </Typography>
                                <Typography
                                    component="p"
                                    sx={{
                                        color: '#A8A29A',
                                        fontSize: { xs: '1rem', md: '1.08rem' },
                                        lineHeight: 1.85,
                                        maxWidth: '52ch',
                                    }}
                                >
                                    Lisa learns your routines, food habits,
                                    schedule, and preferences to quietly help you
                                    make better food decisions with less effort.
                                </Typography>
                                <Stack
                                    spacing={1.15}
                                    sx={{ pt: 1, maxWidth: 420 }}
                                >
                                    {lisaFeatures.map((feature) => (
                                        <Stack
                                            key={feature}
                                            direction="row"
                                            spacing={1.4}
                                            alignItems="center"
                                        >
                                            <Box
                                                sx={{
                                                    width: 9,
                                                    height: 9,
                                                    borderRadius: '50%',
                                                    flexShrink: 0,
                                                    background:
                                                        'linear-gradient(135deg, #D4A64A 0%, #8F6A27 100%)',
                                                    boxShadow:
                                                        '0 0 14px rgba(212,166,74,0.45)',
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    color: '#F5EFE6',
                                                    fontSize: '1rem',
                                                }}
                                            >
                                                {feature}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    maxWidth: 620,
                                    ml: { md: 'auto' },
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        right: '2%',
                                        top: '6%',
                                        width: '74%',
                                        height: '78%',
                                        borderRadius: '32px',
                                        background:
                                            'radial-gradient(circle, rgba(212,166,74,0.16) 0%, transparent 68%)',
                                        filter: 'blur(18px)',
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: { xs: '24px', md: '30px' },
                                        border:
                                            '1px solid rgba(212, 166, 74, 0.18)',
                                        backgroundColor: '#101010',
                                        boxShadow:
                                            '0 28px 70px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.04)',
                                    }}
                                >
                                    <CustomNextImage
                                        src="/static/nobo-home/img2.png"
                                        alt="Lisa interface preview"
                                        width={920}
                                        height={1600}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </CustomContainer>
        </Box>
    )
}

export default NoboLisaSection
