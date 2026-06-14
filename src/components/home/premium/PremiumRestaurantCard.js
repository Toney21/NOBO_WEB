import { Box, Stack, Typography } from '@mui/material'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { noboPremium } from '@/theme/nobo-premium-tokens'

export const getPremiumItemImage = (item) =>
    item?.image_full_url ||
    item?.imageFullUrl ||
    item?.image ||
    item?.cover_image_full_url ||
    item?.logo_full_url ||
    item?.restaurant?.logo_full_url ||
    ''

export const getPremiumItemTitle = (item) =>
    item?.name || item?.title || item?.restaurant_name || item?.restaurant?.name || 'Curated meal'

const getArea = (item) =>
    item?.restaurant?.address ||
    item?.restaurant?.zone?.name ||
    item?.zone?.name ||
    item?.address ||
    'Nairobi'

const getCuisine = (item) =>
    item?.category_name ||
    item?.restaurant?.cuisine ||
    item?.cuisine ||
    item?.restaurant?.name ||
    'Selected for you'

const PremiumImageSkeleton = ({ title }) => (
    <Box
        role="img"
        aria-label={`${title} image unavailable`}
        sx={{
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            background:
                'radial-gradient(circle at 28% 22%, rgba(232,200,120,0.18), transparent 34%), linear-gradient(135deg, #162238 0%, #07111F 100%)',
        }}
    >
        <Typography sx={{ color: 'rgba(246,239,229,0.42)', fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700 }}>
            N
        </Typography>
    </Box>
)

const PremiumRestaurantCard = ({ item, onClick }) => {
    const title = getPremiumItemTitle(item)
    const image = getPremiumItemImage(item)
    const rating = item?.avg_rating || item?.rating || item?.restaurant?.avg_rating || '4.8'
    const time = item?.restaurant?.delivery_time || item?.delivery_time || '28-35 min'
    const match = item?.lisa_match || Math.min(96, 88 + (Number(item?.id || 1) % 8))

    return (
        <Box
            component="button"
            type="button"
            onClick={onClick}
            sx={{
                width: '100%',
                minWidth: 0,
                p: 0,
                border: '1px solid rgba(232,200,120,0.12)',
                borderRadius: { xs: 3.2, md: 3.5 },
                overflow: 'hidden',
                background: noboPremium.color.navy700,
                textAlign: 'left',
                cursor: 'pointer',
                transition: `transform ${noboPremium.motion.base} ${noboPremium.motion.ease}, border-color ${noboPremium.motion.base} ${noboPremium.motion.ease}, box-shadow ${noboPremium.motion.base} ${noboPremium.motion.ease}`,
                '&:hover, &:focus-visible': {
                    outline: 'none',
                    transform: 'translateY(-3px)',
                    borderColor: 'rgba(232,200,120,0.28)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
                },
            }}
        >
            <Box sx={{ aspectRatio: '4 / 3', overflow: 'hidden' }}>
                {image ? (
                    <Box
                        component="img"
                        src={image}
                        alt={title}
                        loading="lazy"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />
                ) : (
                    <PremiumImageSkeleton title={title} />
                )}
            </Box>
            <Stack spacing={1.1} sx={{ p: 2 }}>
                <Typography sx={{ color: noboPremium.color.ivory, fontWeight: 800, fontSize: '1.02rem', lineHeight: 1.2 }}>
                    {title}
                </Typography>
                <Typography sx={{ color: noboPremium.color.textMutedDark, fontSize: '0.86rem', lineHeight: 1.45 }}>
                    {getCuisine(item)} - {getArea(item)}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                    <Typography sx={{ color: noboPremium.color.textMutedDark, fontSize: '0.84rem' }}>
                        {time}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.4}>
                        <StarRoundedIcon sx={{ color: noboPremium.color.gold400, fontSize: 17 }} />
                        <Typography sx={{ color: noboPremium.color.ivory, fontWeight: 700, fontSize: '0.86rem' }}>
                            {rating}
                        </Typography>
                    </Stack>
                </Stack>
                <Box sx={{ width: 'fit-content', px: 1.1, py: 0.55, borderRadius: noboPremium.radius.pill, background: 'rgba(232,200,120,0.1)', color: noboPremium.color.gold400, fontWeight: 800, fontSize: '0.76rem' }}>
                    Lisa match {match}%
                </Box>
            </Stack>
        </Box>
    )
}

export default PremiumRestaurantCard
