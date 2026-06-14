import { Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { noboPremium } from '@/theme/nobo-premium-tokens'

const categories = ['Quietly curated', 'Quick favourites', 'Dinner arranged', 'Office lunch', 'Healthy balance', 'Your regulars']

const MinimalCategoryRail = () => {
    const router = useRouter()

    return (
        <Box sx={{ maxWidth: 1240, mx: 'auto', px: 'clamp(16px, 4vw, 40px)', py: { xs: 1, md: 2 } }}>
            <Stack direction="row" spacing={1.2} useFlexGap sx={{ overflowX: 'auto', pb: 1 }}>
                {categories.map((category) => (
                    <Button
                        key={category}
                        onClick={() => router.push({ pathname: '/home', query: { query: category } })}
                        sx={{
                            minHeight: 44,
                            flex: '0 0 auto',
                            px: 2,
                            borderRadius: noboPremium.radius.pill,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(232,200,120,0.14)',
                            color: noboPremium.color.ivory,
                            fontWeight: 700,
                        }}
                    >
                        <Typography component="span" sx={{ fontSize: '0.9rem', fontWeight: 700 }}>
                            {category}
                        </Typography>
                    </Button>
                ))}
            </Stack>
        </Box>
    )
}

export default MinimalCategoryRail
