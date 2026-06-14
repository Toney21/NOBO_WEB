import { useState } from 'react'
import { Box, IconButton, InputBase, Paper, Stack, Typography } from '@mui/material'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { noboPremium } from '@/theme/nobo-premium-tokens'
import { openLisaExperience } from '@/utils/lisaBackend'

const quickActions = [
    'Ask Lisa to choose lunch',
    'Reorder my usual',
    'Find dinner for two',
    'Send lunch to the office',
]

const recentSearches = ['Grilled chicken', 'Sushi', 'Artcaffe']

const PremiumSearchBar = ({ compact = false }) => {
    const theme = useTheme()
    const router = useRouter()
    const [value, setValue] = useState('')
    const [focused, setFocused] = useState(false)
    const isLight = theme.palette.mode === 'light'

    const handleSubmit = (event) => {
        event.preventDefault()
        const query = value.trim()
        if (!query) return

        router.push({
            pathname: '/home',
            query: { query },
        })
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative', width: '100%' }}>
            <Paper
                elevation={0}
                sx={{
                    height: compact ? 46 : 52,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.2,
                    borderRadius: noboPremium.radius.pill,
                    background: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.055)',
                    border: isLight
                        ? '1px solid rgba(3,28,58,0.12)'
                        : '1px solid rgba(232,200,120,0.14)',
                    color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory,
                    transition: `box-shadow ${noboPremium.motion.base} ${noboPremium.motion.ease}, border-color ${noboPremium.motion.base} ${noboPremium.motion.ease}`,
                    boxShadow: focused ? noboPremium.shadow.goldGlow : 'none',
                    borderColor: focused ? 'rgba(214,162,58,0.42)' : undefined,
                }}
            >
                <SearchIcon sx={{ color: isLight ? '#A7A19A' : 'rgba(246,239,229,0.52)', ml: 0.5, fontSize: 20 }} />
                <InputBase
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => window.setTimeout(() => setFocused(false), 120)}
                    placeholder="Search meals, restaurants, cuisines, or ask Lisa..."
                    inputProps={{ 'aria-label': 'Search meals, restaurants, cuisines, or ask Lisa' }}
                    sx={{
                        flex: 1,
                        color: isLight ? noboPremium.color.navy900 : noboPremium.color.ivory,
                        fontSize: { xs: '0.82rem', md: '0.86rem' },
                        '& input::placeholder': {
                            color: isLight ? '#A7A19A' : 'rgba(246,239,229,0.48)',
                            opacity: 1,
                        },
                    }}
                />
                <IconButton
                    type="submit"
                    aria-label="Submit search"
                    sx={{
                        width: 40,
                        height: 40,
                        color: isLight ? '#8B8B8B' : 'rgba(246,239,229,0.72)',
                        background: 'transparent',
                        '&:hover': {
                            background: isLight ? 'rgba(214,162,58,0.08)' : 'rgba(232,200,120,0.08)',
                        },
                    }}
                >
                    <TuneOutlinedIcon fontSize="small" />
                </IconButton>
            </Paper>

            {focused && (
                <Paper
                    elevation={0}
                    sx={{
                        position: 'absolute',
                        top: 'calc(100% + 10px)',
                        left: 0,
                        right: 0,
                        zIndex: 20,
                        p: 2,
                        borderRadius: 4,
                        background: 'rgba(16,26,43,0.98)',
                        border: '1px solid rgba(232,200,120,0.18)',
                        boxShadow: noboPremium.shadow.cardDark,
                    }}
                >
                    <Stack spacing={1.5}>
                        <Typography sx={{ color: noboPremium.color.gold400, fontSize: '0.78rem', fontWeight: 700 }}>
                            Quick actions
                        </Typography>
                        {quickActions.map((action, index) => (
                            <Box
                                key={action}
                                component="button"
                                type="button"
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => index === 0 ? openLisaExperience('home') : setValue(action)}
                                sx={{
                                    minHeight: 44,
                                    width: '100%',
                                    border: 0,
                                    borderRadius: 2,
                                    px: 1.5,
                                    textAlign: 'left',
                                    background: 'transparent',
                                    color: noboPremium.color.ivory,
                                    cursor: 'pointer',
                                    '&:hover, &:focus-visible': {
                                        outline: 'none',
                                        background: 'rgba(232,200,120,0.08)',
                                    },
                                }}
                            >
                                {action}
                            </Box>
                        ))}
                        <Typography sx={{ color: noboPremium.color.textMutedDark, fontSize: '0.78rem', fontWeight: 700, pt: 0.5 }}>
                            Recent
                        </Typography>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                            {recentSearches.map((search) => (
                                <Box
                                    key={search}
                                    component="button"
                                    type="button"
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => setValue(search)}
                                    sx={{
                                        minHeight: 36,
                                        border: '1px solid rgba(232,200,120,0.18)',
                                        borderRadius: noboPremium.radius.pill,
                                        px: 1.4,
                                        background: 'rgba(255,255,255,0.04)',
                                        color: noboPremium.color.ivory,
                                        cursor: 'pointer',
                                    }}
                                >
                                    {search}
                                </Box>
                            ))}
                        </Stack>
                    </Stack>
                </Paper>
            )}
        </Box>
    )
}

export default PremiumSearchBar
