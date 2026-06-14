import React, { memo, useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import ImageNotFound from '../../../public/static/no-image-found.svg'
import { useTheme } from '@mui/material/styles'
import HeroLocationForm from './HeroLocationForm'
import CustomContainer from '../container'
import CustomNextImage from '@/components/CustomNextImage'
import { openLisaExperience } from '@/utils/lisaBackend'
import AuthModal from '@/components/auth'
import { useSelector } from 'react-redux'
import { getToken } from '@/utils/localStorage'

const HeroSection = ({ handleModalClose, banner_section_image }) => {
    const theme = useTheme()
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [modalFor, setModalFor] = useState('sign-up')
    const { token } = useSelector((state) => state.userToken)
    const isLight = theme.palette.mode === 'light'
    const heroTitle = 'Welcome to NOBO'
    const heroSubtitle =
        'A premium food experience for Nairobi. Find restaurants near you, order with less effort, or let Lisa guide your next meal.'
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
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        borderRadius: { xs: '20px', md: '28px' },
                        overflow: 'hidden',
                        marginTop: { xs: '56px', md: '76px' },
                        border: isLight
                            ? '1px solid rgba(214,162,58,0.18)'
                            : '1px solid rgba(232,200,120,0.14)',
                        background: isLight
                            ? 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF8 100%)'
                            : 'linear-gradient(145deg, rgba(7,17,31,0.96), rgba(3,28,58,0.98))',
                        boxShadow: isLight
                            ? '0 18px 56px rgba(3,28,58,0.08)'
                            : '0 24px 80px rgba(0,0,0,0.28)',
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
                                background: isLight
                                    ? 'linear-gradient(90deg, rgba(255,253,248,0.96) 0%, rgba(255,253,248,0.82) 48%, rgba(255,253,248,0.38) 100%)'
                                    : 'linear-gradient(90deg, rgba(6,11,20,0.94) 0%, rgba(6,11,20,0.82) 48%, rgba(6,11,20,0.38) 100%)',
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
                        alignItems={{ xs: 'center', md: 'flex-start' }}
                        paddingTop="30px"
                    >
                        <CustomContainer>
                            <Typography
                                fontSize={{ xs: '34px', sm: '56px' }}
                                fontWeight="700"
                                component="h1"
                                color={isLight ? theme.palette.secondary.main : theme.palette.whiteText.main}
                                letterSpacing="0"
                                textAlign={{ xs: 'center', md: 'left' }}
                                marginBottom="10px"
                                fontFamily="var(--font-heading)"
                            >
                                {heroTitle}
                            </Typography>
                            <Box
                                sx={{
                                    maxWidth: 742,
                                    marginInline: { xs: 'auto', md: 0 },
                                }}
                            >
                                <Typography
                                    fontSize={{ xs: '16px', sm: '20px' }}
                                    component="p"
                                    fontWeight={500}
                                    textAlign={{ xs: 'center', md: 'left' }}
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
                                    submitLabel="Start ordering"
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
                                        Ask Lisa
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
                    onAuthSuccess={() => openLisaExperience('home')}
                />
            )}
        </>
    )
}

export default memo(HeroSection)
