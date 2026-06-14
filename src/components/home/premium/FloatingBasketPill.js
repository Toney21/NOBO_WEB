import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { noboPremium } from '@/theme/nobo-premium-tokens'

const getCartTotal = (cartList = []) =>
    cartList.reduce((total, item) => total + Number(item?.totalPrice || 0), 0)

const FloatingBasketPill = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const router = useRouter()
    const { cartList } = useSelector((state) => state.cart)
    const { global } = useSelector((state) => state.globalSettings)
    const itemCount = cartList?.length || 0

    if (!itemCount) return null

    const currency = global?.currency_symbol || 'KES'
    const total = getCartTotal(cartList)
    const isLight = theme.palette.mode === 'light'

    return (
        <Box
            sx={{
                position: 'fixed',
                right: isMobile ? 12 : 24,
                left: isMobile ? 12 : 'auto',
                bottom: isMobile ? 12 : 24,
                zIndex: 1200,
            }}
        >
            <Button
                onClick={() => router.push({ pathname: '/checkout', query: { page: 'cart' } })}
                sx={{
                    width: isMobile ? '100%' : 'auto',
                    minHeight: isMobile ? 56 : 54,
                    px: 2.2,
                    borderRadius: noboPremium.radius.pill,
                    background: '#E5AE36',
                    border: '1px solid rgba(111,72,14,0.28)',
                    backdropFilter: 'blur(16px)',
                    color: noboPremium.color.navy900,
                    boxShadow: isLight ? '0 14px 34px rgba(111,72,14,0.18)' : noboPremium.shadow.cardDark,
                    '&:hover': {
                        background: '#F0BC45',
                    },
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} sx={{ width: '100%' }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <LocalMallOutlinedIcon />
                        <Typography sx={{ fontWeight: 800 }}>
                            Basket - {itemCount} {itemCount === 1 ? 'item' : 'items'}
                        </Typography>
                        <Typography sx={{ fontSize: '0.72rem', fontWeight: 700 }}>
                            {currency} {total}
                        </Typography>
                    </Stack>
                    <ChevronRightOutlinedIcon />
                </Stack>
            </Button>
        </Box>
    )
}

export default FloatingBasketPill
