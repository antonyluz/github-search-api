import { Box, Heading } from '@dracula/dracula-ui'

function Badge({ badgeTitle }) {
    return(
        <div className='d-flex mx-2' style={{maxWidth: 30}}>
            <Box color="blackSecondary" rounded="sm">
                <Heading size="xs" px='xs' color='black'>{badgeTitle}</Heading>
            </Box>
        </div>
    )
}

export default Badge;