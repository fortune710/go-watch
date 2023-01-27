import { Avatar, Container, SxProps } from "@mui/material"

interface ActorCardProps {
    character: string,
    actorName: string,
    image: string,
    onClickCard?: React.MouseEventHandler
}

export const ActorCard: React.FC<ActorCardProps> = (props) => {
    
    const styles: SxProps = {
        padding: '10px 8px',
        width: '250px',
        backgroundColor: 'var(--background-tint)',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',

        ':hover': {
            filter: 'brightness(1.2)'
        }
    }
    return(
        <Container sx={styles} onClick={props.onClickCard}>
            <Avatar sx={{ width: 70, height: 70 }} src={props.image}/>

            <div>
                <h3>{props.actorName}</h3>
                <h4>{props.character}</h4>
            </div>
        </Container>
    )
}