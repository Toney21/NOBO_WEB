import { Box, Button, Stack, Typography } from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { noboPremium } from '@/theme/nobo-premium-tokens'
import {
    fetchLisaControllerState,
    openLisaExperience,
} from '@/utils/lisaBackend'
import PremiumMediaImage from './PremiumMediaImage'

const ConciergeHero = ({ configData }) => {
    const theme = useTheme()
    const router = useRouter()
    const { userData } = useSelector((state) => state.user)
    const [lisaPick, setLisaPick] = useState(null)
    const isLight = theme.palette.mode === 'light'
    const lisaAvatar =
        configData?.lisa_profile_image_full_url ||
        configData?.lisa_avatar_full_url ||
        '/static/lisa/lisa-profile.png'
    const firstName = userData?.f_name || userData?.name?.split(' ')?.[0] || ''

    useEffect(() => {
        let isMounted = true

        fetchLisaControllerState()
            .then((state) => {
                const content = state?.homeContent || {}
                const title = content?.today_pick_title?.trim()

                if (!isMounted || !title) return

                setLisaPick({
                    title,
                    detail: content?.today_pick_detail?.trim() || '',
                    image: content?.today_pick_image_url?.trim() || '',
                    restaurant:
                        content?.today_pick_restaurant_name?.trim() || '',
                    price: Number(content?.today_pick_price || 0),
                    confidence:
                        content?.recommendation_confidence_label?.trim() || '',
                    eta: content?.recommendation_eta_label?.trim() || '',
                })
            })
            .catch(() => {})

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <Box sx={{ maxWidth: 1248, mx: 'auto', px: 'clamp(14px, 4vw, 32px)', pt: { xs: 1.5, md: 2 }, pb: { xs: 1, md: 0.5 } }}>
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
                                fontFamily: 'var(--font-body), Roboto, Public Sans, sans-serif',
                                fontSize: { xs: '2.6rem', md: '3.35rem' },
                                lineHeight: 1.02,
                                fontWeight: 700,
                            }}
                        >
                            An unbeatable <Box component="span" sx={{ color: noboPremium.color.gold500, fontStyle: 'italic' }}>dining experience.</Box>
                        </Typography>
                        <Typography sx={{ color: isLight ? '#716C66' : noboPremium.color.textMutedDark, fontSize: '0.98rem', lineHeight: 1.7, maxWidth: 440 }}>
                            Order from trusted restaurants, discover meals nearby, and choose at your own pace.
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
                                <Box sx={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#D7881F' }}>
                                    <PremiumMediaImage
                                        src={lisaAvatar}
                                        alt="Lisa profile"
                                        sizes="62px"
                                        priority
                                    />
                                </Box>
                            </Box>
                            <Box>
                                <Typography sx={{ color: noboPremium.color.gold500, fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em' }}>
                                    Good evening
                                </Typography>
                                <Typography sx={{ color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory, fontFamily: 'var(--font-body), Roboto, Public Sans, sans-serif', fontWeight: 700, fontSize: '1.55rem', lineHeight: 1.05 }}>
                                    {firstName ? (
                                        <>Hello, <Box component="span" sx={{ color: noboPremium.color.gold500, fontStyle: 'italic' }}>{firstName}</Box></>
                                    ) : (
                                        'Hello'
                                    )}
                                </Typography>
                                <Typography sx={{ color: isLight ? '#77716B' : noboPremium.color.textMutedDark, fontSize: '0.84rem' }}>
                                    Lisa can suggest a meal when you want a shortcut.
                                </Typography>
                            </Box>
                        </Stack>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: lisaPick?.image
                                    ? { xs: '88px 1fr', sm: '116px 1fr' }
                                    : '1fr',
                                gap: 1.6,
                                borderRadius: 2.4,
                                border: isLight ? '1px solid rgba(3,28,58,0.08)' : '1px solid rgba(232,200,120,0.12)',
                                background: isLight ? '#FFFFFF' : 'rgba(16,26,43,0.72)',
                                maxWidth: 520,
                                overflow: 'hidden',
                                p: lisaPick?.image ? 0 : 2.1,
                            }}
                        >
                            {lisaPick?.image && (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        minHeight: 142,
                                        position: 'relative',
                                    }}
                                >
                                    <PremiumMediaImage
                                        src={lisaPick.image}
                                        alt={lisaPick.title}
                                        sizes="116px"
                                        priority
                                    />
                                </Box>
                            )}
                            <Stack
                                spacing={0.6}
                                sx={{
                                    minWidth: 0,
                                    p: lisaPick?.image ? 1.8 : 0,
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography sx={{ color: noboPremium.color.gold500, fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase' }}>
                                    {lisaPick ? "Lisa's pick for you" : 'Optional shortcut'}
                                </Typography>
                                {lisaPick ? (
                                    <>
                                        <Typography noWrap sx={{ color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory, fontSize: '1rem', fontWeight: 800 }}>
                                            {lisaPick.title}
                                        </Typography>
                                        <Typography noWrap sx={{ color: isLight ? '#77716B' : noboPremium.color.textMutedDark, fontSize: '0.76rem' }}>
                                            {[lisaPick.restaurant, lisaPick.eta]
                                                .filter(Boolean)
                                                .join(' · ')}
                                        </Typography>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            {lisaPick.confidence && (
                                                <Typography sx={{ color: noboPremium.color.gold500, fontSize: '0.72rem', fontWeight: 800 }}>
                                                    {lisaPick.confidence}
                                                </Typography>
                                            )}
                                            {lisaPick.price > 0 && (
                                                <Typography sx={{ color: isLight ? '#77716B' : noboPremium.color.textMutedDark, fontSize: '0.72rem' }}>
                                                    KSh {lisaPick.price.toLocaleString()}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </>
                                ) : (
                                    <Typography sx={{ color: isLight ? '#77716B' : noboPremium.color.textMutedDark, fontSize: '0.76rem' }}>
                                        Keep browsing freely, or let Lisa open one curated suggestion.
                                    </Typography>
                                )}
                                <Box>
                                    <Button
                                        onClick={() =>
                                            openLisaExperience('home', {
                                                forceRefreshProfile: false,
                                            })
                                        }
                                        sx={{ mt: 0.5, minHeight: 34, px: 1.8, borderRadius: 1.3, background: '#E5AE36', color: noboPremium.color.navy900, fontSize: '0.76rem', fontWeight: 800 }}
                                    >
                                        View Lisa's pick
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default ConciergeHero
