import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { noboPremium } from '@/theme/nobo-premium-tokens'

const PremiumHomeShell = ({ children }) => {
    const theme = useTheme()
    const isLight = theme.palette.mode === 'light'

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: isLight
                    ? 'radial-gradient(circle at 15% 0%, rgba(232,200,120,0.22), transparent 26%), #FFFDF8'
                    : 'radial-gradient(circle at 15% 0%, rgba(214,162,58,0.12), transparent 28%), linear-gradient(180deg, #060B14 0%, #06101F 100%)',
                color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory,
                pb: { xs: 10, md: 6 },
                '& *': {
                    letterSpacing: 0,
                },
            }}
        >
            {children}
        </Box>
    )
}

export default PremiumHomeShell
