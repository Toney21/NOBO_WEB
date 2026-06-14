import { Box } from '@mui/material'
import { noboPremium } from '@/theme/nobo-premium-tokens'

const PremiumHomeShell = ({ children }) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background:
                    'radial-gradient(circle at 20% 0%, rgba(214,162,58,0.12), transparent 34%), linear-gradient(135deg, #07111F 0%, #031C3A 100%)',
                color: noboPremium.color.ivory,
                pb: { xs: 10, md: 7 },
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
