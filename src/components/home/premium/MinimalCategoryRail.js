import { Box, Button, Stack, Typography } from '@mui/material'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import WineBarOutlinedIcon from '@mui/icons-material/WineBarOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { noboPremium } from '@/theme/nobo-premium-tokens'

const categories = [
    ['Quick Lunch', BoltOutlinedIcon],
    ['Healthy', SpaOutlinedIcon],
    ['Dinner for Two', WineBarOutlinedIcon],
    ['Office Meals', WorkOutlineOutlinedIcon],
    ['Dessert', BakeryDiningOutlinedIcon],
]

const MinimalCategoryRail = () => {
    const theme = useTheme()
    const router = useRouter()
    const isLight = theme.palette.mode === 'light'

    return (
        <Box sx={{ maxWidth: 1248, mx: 'auto', px: 'clamp(14px, 4vw, 32px)', py: { xs: 1, md: 1.1 } }}>
            <Stack direction="row" spacing={1.5} useFlexGap sx={{ overflowX: 'auto', pb: 0.3, justifyContent: { md: 'center' } }}>
                {categories.map(([category, Icon], index) => (
                    <Button
                        key={category}
                        onClick={() => router.push({ pathname: '/home', query: { query: category } })}
                        sx={{
                            minHeight: 32,
                            minWidth: { xs: 150, md: 168 },
                            flex: '0 0 auto',
                            px: 2.3,
                            borderRadius: noboPremium.radius.pill,
                            background: isLight ? '#FFFDF8' : 'rgba(255,255,255,0.05)',
                            border: isLight ? '1px solid rgba(214,162,58,0.18)' : '1px solid rgba(232,200,120,0.14)',
                            color: isLight ? '#5D5650' : noboPremium.color.ivory,
                            boxShadow: isLight ? '0 8px 20px rgba(86,57,18,0.05)' : 'none',
                            fontWeight: 700,
                        }}
                    >
                        <Icon sx={{ color: noboPremium.color.gold500, fontSize: index === 0 ? 19 : 18, mr: 1 }} />
                        <Typography component="span" sx={{ fontSize: '0.78rem', fontWeight: 700 }}>
                            {category}
                        </Typography>
                    </Button>
                ))}
            </Stack>
        </Box>
    )
}

export default MinimalCategoryRail
