import styles from './slides.module.scss';

interface SliderProps {
    className?: string,
    children: React.ReactNode
}

export const Slides: React.FC<SliderProps> = (props) => {
    return(
        <div className={`${styles.slider} ${props.className}`}>
            { props.children }
        </div>
    )
}