import { Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { noboPremium } from '@/theme/nobo-premium-tokens'
import PremiumRestaurantCard from './PremiumRestaurantCard'

const CuratedRail = ({
    title,
    subtitle,
    items = [],
    variant = 'meal',
    hasLocation = false,
}) => {
    const theme = useTheme()
    const router = useRouter()
    const isLight = theme.palette.mode === 'light'
    const visibleItems = items?.length > 0
        ? items.slice(0, variant === 'restaurant' ? 6 : 4)
        : []
    const getItemRoute = (item) => {
        const restaurantId =
            item?.restaurant?.slug ||
            item?.restaurant_id ||
            (variant === 'restaurant' ? item?.slug || item?.id : null)

        if (!restaurantId) {
            return null
        }

        return {
            pathname: `/restaurants/${restaurantId}`,
            query: {
                restaurant_zone_id:
                    item?.restaurant?.zone_id || item?.zone_id,
            },
        }
    }

    return (
        <Box sx={{ maxWidth: 1248, mx: 'auto', px: 'clamp(14px, 4vw, 32px)', py: { xs: 1.8, md: 2.2 } }}>
            <Stack direction="row" alignItems="flex-end" justifyContent="space-between" spacing={2} sx={{ mb: 1.5, px: { xs: 0, md: 0.5 } }}>
                <Stack spacing={0.15}>
                    <Typography sx={{ color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory, fontFamily: 'var(--font-body), Roboto, Public Sans, sans-serif', fontSize: { xs: '1.35rem', md: '1.55rem' }, fontWeight: 700, lineHeight: 1.08 }}>
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
                            ? { xs: '88%', sm: '58%', md: '38%' }
                            : { xs: '82%', sm: '46%', md: '24.2%' },
                        gap: { xs: 1.6, md: 2.2 },
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
                            onClick={() => {
                                const route = getItemRoute(item)
                                if (route) {
                                    router.push(route)
                                    return
                                }

                                router.push({ pathname: '/home', query: { query: item?.name || title } })
                            }}
                        />
                    ))}
                </Box>
            ) : (
                <Box sx={{ minHeight: 190, borderRadius: 4, border: '1px solid rgba(232,200,120,0.12)', background: 'rgba(255,255,255,0.04)', display: 'grid', placeItems: 'center', px: 2 }}>
                    <Typography sx={{ color: noboPremium.color.textMutedDark, textAlign: 'center' }}>
                        {hasLocation
                            ? `No ${variant === 'restaurant' ? 'restaurants' : 'meals'} are available for this location right now.`
                            : `Set your location to see available ${variant === 'restaurant' ? 'restaurants' : 'meals'} from NOBO.`}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default CuratedRail
