import { Box, Button, Skeleton, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { noboPremium } from '@/theme/nobo-premium-tokens'
import { openLisaExperience } from '@/utils/lisaBackend'
import { getPremiumItemImage, getPremiumItemTitle } from './PremiumRestaurantCard'

const formatPrice = (item, configData) => {
    const currency = configData?.currency_symbol || 'KES'
    const price = item?.price || item?.unit_price || item?.totalPrice
    return price ? `${currency} ${price}` : `${currency} 850`
}

const LisaRecommendationPanel = ({ popularFood = [], bestReviewedFoods = [], configData }) => {
    const router = useRouter()
    const item = popularFood?.[0] || bestReviewedFoods?.[0]
    const image = getPremiumItemImage(item)
    const title = item ? getPremiumItemTitle(item) : ''
    const restaurantName = item?.restaurant?.name || item?.restaurant_name || 'NOBO partner'

    return (
        <Box sx={{ maxWidth: 1240, mx: 'auto', px: 'clamp(16px, 4vw, 40px)', py: { xs: 2, md: 4 } }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' },
                    gap: { xs: 2.5, md: 4 },
                    alignItems: 'center',
                    borderRadius: { xs: 3.2, md: 4 },
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(232,200,120,0.18)',
                    boxShadow: noboPremium.shadow.cardDark,
                    overflow: 'hidden',
                    p: { xs: 2, md: 3 },
                }}
            >
                <Box sx={{ aspectRatio: { xs: '4 / 3', md: '16 / 10' }, borderRadius: 3, overflow: 'hidden', background: 'rgba(255,255,255,0.04)' }}>
                    {item ? (
                        image ? (
                            <Box component="img" src={image} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        ) : (
                            <Box sx={{ height: '100%', display: 'grid', placeItems: 'center', background: 'radial-gradient(circle at 30% 20%, rgba(232,200,120,0.18), transparent 36%), linear-gradient(135deg, #162238, #07111F)' }}>
                                <Typography sx={{ color: 'rgba(246,239,229,0.5)', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700 }}>NOBO</Typography>
                            </Box>
                        )
                    ) : (
                        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ transform: 'none' }} />
                    )}
                </Box>

                <Stack spacing={2.2}>
                    <Stack spacing={0.8}>
                        <Typography sx={{ color: noboPremium.color.gold400, fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase' }}>
                            Lisa's pick for now
                        </Typography>
                        {item ? (
                            <>
                                <Typography sx={{ color: noboPremium.color.ivory, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: { xs: '2rem', md: '2.8rem' }, lineHeight: 1.05 }}>
                                    {title}
                                </Typography>
                                <Typography sx={{ color: noboPremium.color.textMutedDark, fontSize: '1rem' }}>
                                    {restaurantName} - Arrives in 28 min - {formatPrice(item, configData)}
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Skeleton width="74%" height={48} />
                                <Skeleton width="54%" height={24} />
                            </>
                        )}
                    </Stack>

                    <Box sx={{ p: 2, borderRadius: 3, background: 'rgba(7,17,31,0.54)', border: '1px solid rgba(232,200,120,0.12)' }}>
                        <Typography sx={{ color: noboPremium.color.ivory, fontWeight: 800, mb: 0.7 }}>
                            Why Lisa chose this:
                        </Typography>
                        <Typography sx={{ color: noboPremium.color.textMutedDark, lineHeight: 1.7 }}>
                            Light, high-protein, and close to your weekday lunch pattern.
                        </Typography>
                    </Box>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
                        <Button
                            onClick={() => item?.restaurant?.slug || item?.restaurant_id
                                ? router.push({
                                    pathname: `/restaurants/${item?.restaurant?.slug || item?.restaurant_id}`,
                                    query: {
                                        restaurant_zone_id:
                                            item?.restaurant?.zone_id || item?.zone_id,
                                    },
                                })
                                : openLisaExperience('home')}
                            sx={{
                                minHeight: 48,
                                px: 2.4,
                                borderRadius: noboPremium.radius.pill,
                                color: noboPremium.color.navy900,
                                background: 'linear-gradient(135deg, #E8C878 0%, #D6A23A 48%, #A87521 100%)',
                                fontWeight: 800,
                            }}
                        >
                            Order now
                        </Button>
                        <Button onClick={() => router.push({ pathname: '/home', query: { query: 'Lisa alternatives' } })} sx={{ minHeight: 48, px: 2.4, borderRadius: noboPremium.radius.pill, color: noboPremium.color.ivory, border: '1px solid rgba(232,200,120,0.2)' }}>
                            View alternatives
                        </Button>
                        <Button onClick={() => openLisaExperience('settings')} sx={{ minHeight: 48, px: 2.4, borderRadius: noboPremium.radius.pill, color: noboPremium.color.gold400 }}>
                            Adjust preferences
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default LisaRecommendationPanel
