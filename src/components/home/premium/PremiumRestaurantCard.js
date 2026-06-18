import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { noboPremium } from '@/theme/nobo-premium-tokens'
import PremiumMediaImage from './PremiumMediaImage'

export const getPremiumItemImage = (item) => {
    const candidates = [
        item?.image_full_url,
        item?.imageFullUrl,
        item?.cover_image_full_url,
        item?.cover_photo_full_url,
        item?.restaurant?.cover_photo_full_url,
        item?.logo_full_url,
        item?.restaurant?.logo_full_url,
        item?.image,
    ]

    return (
        candidates.find((candidate) => {
            if (typeof candidate !== 'string' || !candidate.trim()) return false
            return !/(^|\/)(def|default|placeholder)\.(png|jpe?g|webp)$/i.test(
                candidate.trim()
            )
        }) || ''
    )
}

export const getPremiumItemTitle = (item) =>
    item?.name || item?.title || item?.restaurant_name || item?.restaurant?.name || 'Curated meal'

const getArea = (item) =>
    item?.restaurant?.address ||
    item?.restaurant?.zone?.name ||
    item?.zone?.name ||
    item?.address ||
    'Nairobi'

const getCuisine = (item) => {
    const cuisine = item?.restaurant?.cuisine || item?.cuisine
    const cuisineLabel = Array.isArray(cuisine)
        ? cuisine.map((entry) => entry?.name || entry).filter(Boolean).join(', ')
        : cuisine

    return (
        item?.category_name ||
        cuisineLabel ||
        item?.restaurant?.name ||
        item?.restaurant_name ||
        'Selected for you'
    )
}

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

const PremiumRestaurantCard = ({ item, onClick, variant = 'meal' }) => {
    const theme = useTheme()
    const isLight = theme.palette.mode === 'light'
    const title = getPremiumItemTitle(item)
    const image = getPremiumItemImage(item)
    const rating = item?.avg_rating || item?.rating || item?.restaurant?.avg_rating || '4.8'
    const time = item?.restaurant?.delivery_time || item?.delivery_time || '28-35 min'
    const subtitle = item?.subtitle || getCuisine(item)
    const reviewCount = item?.review_count ?? item?.rating_count ?? 0

    if (variant === 'restaurant') {
        return (
            <Box
                component="button"
                type="button"
                onClick={onClick}
                sx={{
                    width: '100%',
                    minWidth: 0,
                    p: 0,
                    border: isLight ? '1px solid rgba(3,28,58,0.08)' : '1px solid rgba(232,200,120,0.10)',
                    borderRadius: 2.6,
                    overflow: 'hidden',
                    background: isLight ? '#FFFFFF' : 'rgba(16,26,43,0.78)',
                    boxShadow: isLight ? '0 10px 26px rgba(3,28,58,0.07)' : 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: `transform ${noboPremium.motion.base} ${noboPremium.motion.ease}, box-shadow ${noboPremium.motion.base} ${noboPremium.motion.ease}`,
                    '&:hover, &:focus-visible': {
                        outline: 'none',
                        transform: 'translateY(-2px)',
                        boxShadow: isLight ? '0 16px 34px rgba(3,28,58,0.1)' : '0 18px 48px rgba(0,0,0,0.24)',
                    },
                }}
            >
                <Box sx={{ width: '100%', aspectRatio: '2 / 1', overflow: 'hidden', position: 'relative' }}>
                    <PremiumMediaImage
                        src={image}
                        alt={title}
                        sizes="(max-width: 600px) 88vw, (max-width: 1200px) 58vw, 460px"
                        fallback={<PremiumImageSkeleton title={title} />}
                    />
                </Box>
                <Stack spacing={0.65} sx={{ minWidth: 0, p: 1.7 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <Typography noWrap sx={{ color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory, fontWeight: 800, fontSize: '1rem' }}>
                                {title}
                            </Typography>
                            <FavoriteBorderOutlinedIcon sx={{ color: isLight ? '#746B5F' : 'rgba(246,239,229,0.72)', fontSize: 18 }} />
                        </Stack>
                        <Typography noWrap sx={{ color: isLight ? '#746B5F' : noboPremium.color.textMutedDark, fontSize: '0.8rem' }}>
                            {subtitle}
                        </Typography>
                        <Stack direction="row" spacing={0.9} alignItems="center">
                            <Stack direction="row" spacing={0.25} alignItems="center">
                                <StarRoundedIcon sx={{ color: '#E5AE36', fontSize: 14 }} />
                                <Typography sx={{ color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory, fontSize: '0.72rem', fontWeight: 700 }}>
                                    {rating} ({reviewCount})
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={0.35} alignItems="center">
                            <AccessTimeOutlinedIcon sx={{ color: isLight ? '#746B5F' : noboPremium.color.textMutedDark, fontSize: 14 }} />
                            <Typography sx={{ color: isLight ? '#746B5F' : noboPremium.color.textMutedDark, fontSize: '0.72rem' }}>
                                {time}
                            </Typography>
                        </Stack>
                </Stack>
            </Box>
        )
    }

    return (
        <Box
            component="button"
            type="button"
            onClick={onClick}
            sx={{
                width: '100%',
                minWidth: 0,
                p: 0,
                border: isLight ? '1px solid rgba(3,28,58,0.08)' : '1px solid rgba(232,200,120,0.10)',
                borderRadius: 1.8,
                overflow: 'hidden',
                background: isLight ? '#FFFFFF' : 'rgba(16,26,43,0.78)',
                boxShadow: isLight ? '0 10px 26px rgba(3,28,58,0.08)' : 'none',
                textAlign: 'left',
                cursor: 'pointer',
                transition: `transform ${noboPremium.motion.base} ${noboPremium.motion.ease}, border-color ${noboPremium.motion.base} ${noboPremium.motion.ease}, box-shadow ${noboPremium.motion.base} ${noboPremium.motion.ease}`,
                '&:hover, &:focus-visible': {
                    outline: 'none',
                    transform: 'translateY(-3px)',
                    borderColor: 'rgba(232,200,120,0.28)',
                    boxShadow: isLight ? '0 18px 38px rgba(3,28,58,0.12)' : '0 20px 60px rgba(0,0,0,0.28)',
                },
            }}
        >
            <Box sx={{ aspectRatio: '2.18 / 1', overflow: 'hidden', position: 'relative' }}>
                <PremiumMediaImage
                    src={image}
                    alt={title}
                    sizes="(max-width: 600px) 82vw, (max-width: 900px) 46vw, 300px"
                    fallback={<PremiumImageSkeleton title={title} />}
                />
                <IconButton
                    aria-label={`Save ${title}`}
                    sx={{
                        position: 'absolute',
                        top: 7,
                        right: 7,
                        width: 28,
                        height: 28,
                        color: '#fff',
                        background: 'rgba(0,0,0,0.34)',
                        '&:hover': { background: 'rgba(0,0,0,0.48)' },
                    }}
                >
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: 18 }} />
                </IconButton>
            </Box>
            <Stack spacing={0.4} sx={{ p: 1.15 }}>
                <Typography noWrap sx={{ color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory, fontWeight: 800, fontSize: '0.8rem', lineHeight: 1.2 }}>
                    {title}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                    <Typography noWrap sx={{ color: isLight ? '#746B5F' : noboPremium.color.textMutedDark, fontSize: '0.72rem' }}>
                        {subtitle}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.35}>
                        <AccessTimeOutlinedIcon sx={{ color: isLight ? '#746B5F' : noboPremium.color.textMutedDark, fontSize: 14 }} />
                        <Typography sx={{ color: isLight ? '#746B5F' : noboPremium.color.textMutedDark, fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
                        {time}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default PremiumRestaurantCard
