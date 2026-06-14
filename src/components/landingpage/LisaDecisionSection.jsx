import React, { useState } from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CustomContainer from '@/components/container'
import { openLisaExperience } from '@/utils/lisaBackend'
import AuthModal from '@/components/auth'
import { useSelector } from 'react-redux'
import { getToken } from '@/utils/localStorage'

const LisaDecisionSection = () => {
    const theme = useTheme()
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [modalFor, setModalFor] = useState('sign-up')
    const { token } = useSelector((state) => state.userToken)
    const hasToken = () =>
        token || getToken()

    const handleLisaProfileSetup = () => {
        if (hasToken()) {
            openLisaExperience('home')
            return
        }

        setModalFor('sign-up')
        setAuthModalOpen(true)
    }

    return (
        <>
            <CustomContainer>
                <Grid
                    container
                    alignItems="center"
                    spacing={3}
                    sx={{
                        py: { xs: 5, md: 7 },
                    }}
                >
                    <Grid item xs={12} md={8}>
                        <Stack spacing={1.5}>
                            <Typography
                                component="h2"
                                fontSize={{ xs: '1.5rem', md: '30px' }}
                                fontWeight="700"
                                color={theme.palette.neutral[1000]}
                            >
                                When you do not want to browse, Lisa decides for you
                            </Typography>
                            <Typography
                                component="p"
                                fontSize={{ xs: '14px', md: '16px' }}
                                color={theme.palette.neutral[500]}
                                maxWidth="760px"
                            >
                                Lisa learns how you eat, your timing, your preferences, and your habits, then recommends meals that fit your day without the guesswork.
                            </Typography>
                            <Stack
                                spacing={0.5}
                                sx={{
                                    maxWidth: 420,
                                    borderRadius: '14px',
                                    border: '1px solid',
                                    borderColor: theme.palette.neutral[200],
                                    backgroundColor: theme.palette.background.paper,
                                    px: 2,
                                    py: 1.5,
                                }}
                            >
                                <Typography fontSize="12px" fontWeight={700} color={theme.palette.neutral[500]}>
                                    Handle my lunch
                                </Typography>
                                <Typography fontSize="14px" color={theme.palette.neutral[700]}>
                                    Lisa can prepare your weekday lunch automatically.
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            variant="contained"
                            startIcon={<AutoAwesomeIcon />}
                            onClick={handleLisaProfileSetup}
                            sx={{
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 700,
                                px: 3,
                                py: 1.2,
                            }}
                        >
                            Try Lisa's recommendation
                        </Button>
                    </Grid>
                </Grid>
            </CustomContainer>
            {authModalOpen && (
                <AuthModal
                    open={authModalOpen}
                    modalFor={modalFor}
                    setModalFor={setModalFor}
                    handleClose={() => setAuthModalOpen(false)}
                    onAuthSuccess={() => openLisaExperience('home')}
                />
            )}
        </>
    )
}

export default LisaDecisionSection
