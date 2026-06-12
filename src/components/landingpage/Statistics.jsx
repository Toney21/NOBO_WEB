import { alpha, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import GroupIcon from '@mui/icons-material/Group'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { useTheme } from '@mui/material/styles'
import CustomContainer from '@/components/container'

const Statistics = () => {
    const theme = useTheme()

    const stats = [
        {
            title: 'Trusted by 1,000+ customers in Nairobi',
            icon: <GroupIcon />,
        },
        {
            title: 'Average delivery in 30 minutes',
            icon: <DeliveryDiningIcon />,
        },
        {
            title: 'Curated meals from top local restaurants',
            icon: <RestaurantMenuIcon />,
        },
    ]

    return (
        <CustomContainer>
            <Stack
                maxWidth={900}
                sx={{
                    marginInline: 'auto',
                    marginTop: '-3rem',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Stack
                    direction="row"
                    gap={2}
                    pb={3}
                    sx={{
                        overflowX: 'auto',
                        '&::-webkit-scrollbar': { display: 'none' },
                    }}
                >
                    {stats.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                padding: { xs: '16px', sm: '20px' },
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: '8px',
                                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
                                flex: { xs: '1 0 240px', md: '1 0 260px' },
                                minWidth: { xs: '240px', sm: '260px' },
                            }}
                        >
                            <Stack direction="row" alignItems="center" gap={1.5}>
                                <Box
                                    sx={{
                                        width: 46,
                                        height: 46,
                                        borderRadius: '8px',
                                        border: `1px solid ${alpha(
                                            theme.palette.text.primary,
                                            0.1
                                        )}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: theme.palette.primary.main,
                                        minWidth: '46px',
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Typography
                                    fontSize="15px"
                                    fontWeight="600"
                                    color={theme.palette.text.primary}
                                >
                                    {item.title}
                                </Typography>
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </Stack>
        </CustomContainer>
    )
}

export default Statistics
