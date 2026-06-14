import { Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { noboPremium } from '@/theme/nobo-premium-tokens'
import PremiumRestaurantCard from './PremiumRestaurantCard'

const CuratedRail = ({ title, subtitle, items = [] }) => {
    const router = useRouter()
    const visibleItems = items?.slice?.(0, 10) || []

    return (
        <Box sx={{ maxWidth: 1240, mx: 'auto', px: 'clamp(16px, 4vw, 40px)', py: { xs: 3, md: 4 } }}>
            <Stack direction="row" alignItems="flex-end" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
                <Stack spacing={0.6}>
                    <Typography sx={{ color: noboPremium.color.ivory, fontFamily: 'var(--font-heading)', fontSize: { xs: '1.7rem', md: '2.25rem' }, fontWeight: 700 }}>
                        {title}
                    </Typography>
                    <Typography sx={{ color: noboPremium.color.textMutedDark, fontSize: { xs: '0.92rem', md: '1rem' } }}>
                        {subtitle}
                    </Typography>
                </Stack>
                <Button
                    onClick={() => router.push({ pathname: '/home', query: { query: title } })}
                    sx={{
                        minHeight: 44,
                        flex: '0 0 auto',
                        borderRadius: noboPremium.radius.pill,
                        color: noboPremium.color.gold400,
                    }}
                >
                    View all
                </Button>
            </Stack>

            {visibleItems.length > 0 ? (
                <Box
                    sx={{
                        display: 'grid',
                        gridAutoFlow: 'column',
                        gridAutoColumns: { xs: '82%', sm: '42%', md: '30%', lg: '23.5%' },
                        gap: 2,
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        pb: 1,
                        '& > *': { scrollSnapAlign: 'start' },
                        '&::-webkit-scrollbar': { height: 8 },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'rgba(232,200,120,0.24)',
                            borderRadius: 999,
                        },
                    }}
                >
                    {visibleItems.map((item, index) => (
                        <PremiumRestaurantCard
                            key={item?.id || item?.slug || `${title}-${index}`}
                            item={item}
                            onClick={() => item?.restaurant?.slug || item?.restaurant_id
                                ? router.push({
                                    pathname: `/restaurants/${item?.restaurant?.slug || item?.restaurant_id}`,
                                    query: {
                                        restaurant_zone_id:
                                            item?.restaurant?.zone_id || item?.zone_id,
                                    },
                                })
                                : router.push({ pathname: '/home', query: { query: item?.name || title } })}
                        />
                    ))}
                </Box>
            ) : (
                <Box sx={{ minHeight: 190, borderRadius: 4, border: '1px solid rgba(232,200,120,0.12)', background: 'rgba(255,255,255,0.04)', display: 'grid', placeItems: 'center', px: 2 }}>
                    <Typography sx={{ color: noboPremium.color.textMutedDark, textAlign: 'center' }}>
                        Lisa is preparing refined picks for your area.
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default CuratedRail
