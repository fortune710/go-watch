import styles from './similar-movie.module.scss'

interface SimilarMovieProps {
    image: string,
    name: string,
    rating: number,
    onClick?: React.MouseEventHandler<HTMLDivElement>
}
export const SimilarMovie: React.FC<SimilarMovieProps> = (props) => {
    const { image, name, rating } = props;

    return(
        <div onClick={props.onClick} className={styles.movie}>
            <img src={`https://image.tmdb.org/t/p/w500${image}`} alt="Poster"/>
            <div className={styles.details}>
                <p>{name}</p>
                <p>{rating}</p>
            </div>
        </div>
    )
}