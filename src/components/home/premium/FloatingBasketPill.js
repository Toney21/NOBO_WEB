import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
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
                    background: 'rgba(16,26,43,0.92)',
                    border: '1px solid rgba(232,200,120,0.22)',
                    backdropFilter: 'blur(16px)',
                    color: noboPremium.color.ivory,
                    boxShadow: noboPremium.shadow.cardDark,
                    '&:hover': {
                        background: 'rgba(22,34,56,0.96)',
                        borderColor: 'rgba(232,200,120,0.34)',
                    },
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} sx={{ width: '100%' }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <LocalMallOutlinedIcon />
                        <Typography sx={{ fontWeight: 800 }}>
                            {itemCount} {itemCount === 1 ? 'item' : 'items'} - {currency} {total}
                        </Typography>
                    </Stack>
                    {isMobile && (
                        <Typography sx={{ color: noboPremium.color.gold400, fontWeight: 900 }}>
                            Checkout
                        </Typography>
                    )}
                </Stack>
            </Button>
        </Box>
    )
}

export default FloatingBasketPill
