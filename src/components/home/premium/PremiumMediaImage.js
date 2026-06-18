import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'

const PremiumMediaImage = ({
    src,
    alt,
    sizes,
    priority = false,
    fallback = null,
    objectPosition = 'center',
}) => {
    const [failed, setFailed] = useState(false)

    useEffect(() => {
        setFailed(false)
    }, [src])

    if (!src || failed) {
        return fallback
    }

    return (
        <Box sx={{ position: 'absolute', inset: 0 }}>
            <Image
                fill
                src={src}
                alt={alt}
                sizes={sizes}
                quality={90}
                priority={priority}
                onError={() => setFailed(true)}
                style={{
                    objectFit: 'cover',
                    objectPosition,
                }}
            />
        </Box>
    )
}

export default PremiumMediaImage
