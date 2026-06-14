import { Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { noboPremium } from '@/theme/nobo-premium-tokens'
import PremiumRestaurantCard from './PremiumRestaurantCard'

const momentFallback = [
    { id: 'truffle', name: 'Truffle Chicken Tagliatelle', subtitle: 'Tatu Restaurant', delivery_time: '30-40 min', image_full_url: '/static/Menu/image 18.png' },
    { id: 'salmon-roll', name: 'Salmon Aburi Roll', subtitle: 'Zuka', delivery_time: '25-35 min', image_full_url: '/static/Menu/image 19.png' },
    { id: 'wagyu', name: 'Wagyu Cheeseburger', subtitle: 'Capital Burger', delivery_time: '20-30 min', image_full_url: '/static/Menu/image 20.png' },
    { id: 'mousse', name: '70% Chocolate Mousse', subtitle: 'Kesh Kesh Cafe', delivery_time: '20-30 min', image_full_url: '/static/Menu/image 21.png' },
]

const restaurantFallback = [
    { id: 'tatu', name: 'Tatu Restaurant', subtitle: 'Mediterranean - $$$', rating: '4.8', review_count: '1.2k', delivery_time: '30-40 min', image_full_url: '/static/Menu/resturant.png' },
    { id: 'artcaffe', name: 'Artcaffe Market', subtitle: 'International - $$', rating: '4.6', review_count: '980', delivery_time: '30-40 min', image_full_url: '/static/Menu/Rectangle 8256.png' },
    { id: 'carnivore', name: 'The Carnivore', subtitle: 'Steakhouse - $$$', rating: '4.7', review_count: '1.1k', delivery_time: '35-45 min', image_full_url: '/static/Menu/Rectangle 8262 (1).png' },
    { id: 'zuka', name: 'Zuka', subtitle: 'Asian - $$$', rating: '4.7', review_count: '815', delivery_time: '25-35 min', image_full_url: '/static/Menu/Rectangle 8262.png' },
]

const CuratedRail = ({ title, subtitle, items = [], variant = 'meal' }) => {
    const theme = useTheme()
    const router = useRouter()
    const isLight = theme.palette.mode === 'light'
    const fallback = variant === 'restaurant' ? restaurantFallback : momentFallback
    const visibleItems = items?.length > 0 ? items.slice(0, variant === 'restaurant' ? 4 : 4) : fallback

    return (
        <Box sx={{ maxWidth: 1248, mx: 'auto', px: 'clamp(14px, 4vw, 32px)', py: { xs: 1.6, md: 1.4 } }}>
            <Stack direction="row" alignItems="flex-end" justifyContent="space-between" spacing={2} sx={{ mb: 0.8, px: { xs: 0, md: 1 } }}>
                <Stack spacing={0.15}>
                    <Typography sx={{ color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory, fontFamily: 'var(--font-heading)', fontSize: { xs: '1.35rem', md: '1.55rem' }, fontWeight: 700, lineHeight: 1.08 }}>
                        {title}
                    </Typography>
                    <Typography sx={{ color: isLight ? '#746B5F' : noboPremium.color.textMutedDark, fontSize: '0.78rem' }}>
                        {subtitle}
                    </Typography>
                </Stack>
                <Button
                    onClick={() => router.push({ pathname: '/home', query: { query: title } })}
                    sx={{
                        minHeight: 44,
                        flex: '0 0 auto',
                        borderRadius: noboPremium.radius.pill,
                        color: noboPremium.color.gold500,
                        fontSize: '0.75rem',
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
                        gridAutoColumns: variant === 'restaurant'
                            ? { xs: '82%', sm: '48%', md: '24.2%' }
                            : { xs: '82%', sm: '46%', md: '24.2%' },
                        gap: { xs: 1.3, md: 1.6 },
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
                            variant={variant}
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
