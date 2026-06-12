import React, { memo, useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import ImageNotFound from '../../../public/static/no-image-found.svg'
import { useTheme } from '@mui/material/styles'
import HeroLocationForm from './HeroLocationForm'
import CustomContainer from '../container'
import CustomNextImage from '@/components/CustomNextImage'
import { openLisaBackend } from '@/utils/lisaBackend'
import AuthModal from '@/components/auth'
import { useSelector } from 'react-redux'
import { getToken } from '@/utils/localStorage'

const HeroSection = ({ handleModalClose, banner_section_image }) => {
    const theme = useTheme()
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [modalFor, setModalFor] = useState('sign-up')
    const { token } = useSelector((state) => state.userToken)
    const heroTitle = 'Order smarter. Eat better. Every time.'
    const heroSubtitle =
        'NOBO brings the best meals around you into one place, or lets Lisa choose for you based on your taste, timing, and routine.'
    const hasToken = () =>
        token || getToken()

    const handleLisaProfileSetup = () => {
        if (hasToken()) {
            openLisaBackend('settings')
            return
        }

        setModalFor('sign-up')
        setAuthModalOpen(true)
    }

    return (
        <>
            <CustomContainer>
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        borderRadius: '10px',
                        overflow: 'hidden',
                        marginTop: { xs: '56px', md: '76px' },
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            zIndex: -1,
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.42)',
                            },
                            img: {
                                height: '100%',
                            },
                        }}
                    >
                        <CustomNextImage
                            src={banner_section_image}
                            altSrc={ImageNotFound}
                            width={1920}
                            height={370}
                            priority={true}
                        />
                    </Box>
                    <Stack
                        minHeight="320px"
                        width="100%"
                        paddingBottom="80px"
                        justifyContent="center"
                        alignItems="center"
                        paddingTop="30px"
                    >
                        <CustomContainer>
                            <Typography
                                fontSize={{ xs: '28px', sm: '45px' }}
                                fontWeight="700"
                                component="h1"
                                color={theme.palette.whiteText.main}
                                letterSpacing="0"
                                textAlign="center"
                                marginBottom="10px"
                            >
                                {heroTitle}
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                    maxWidth: 742,
                                    marginInline: 'auto',
                                    borderRadius: '8px',
                                    padding: { xs: '1.5rem 1rem', sm: '1.8rem' },
                                }}
                            >
                                <Typography
                                    fontSize={{ xs: '16px', sm: '20px' }}
                                    component="p"
                                    fontWeight={500}
                                    textAlign="center"
                                    color={theme.palette.text.primary}
                                >
                                    {heroSubtitle}
                                </Typography>

                                <HeroLocationForm
                                    fromHero="true"
                                    height="41px"
                                    mobileview="true"
                                    handleModalClose={handleModalClose}
                                    place_holder_search_text="Enter your location to see what's available near you"
                                    submitLabel="Find food near you"
                                />
                                <Stack alignItems="center" mt={1.5}>
                                    <Button
                                        onClick={handleLisaProfileSetup}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        Let Lisa choose for me
                                    </Button>
                                </Stack>
                            </Box>
                        </CustomContainer>
                    </Stack>
                </Box>
            </CustomContainer>
            {authModalOpen && (
                <AuthModal
                    open={authModalOpen}
                    modalFor={modalFor}
                    setModalFor={setModalFor}
                    handleClose={() => setAuthModalOpen(false)}
                    onAuthSuccess={() => openLisaBackend('settings')}
                />
            )}
        </>
    )
}

export default memo(HeroSection)
