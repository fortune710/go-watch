type SkeletonProps = {
    customClassName: string,
    isVisible: boolean,
}

export const Skeleton: React.FC<SkeletonProps> = ({ isVisible, customClassName }) => {
    if(!isVisible) return null
    return(
        <div className={`skeleton ${customClassName}`}/>
    )
}