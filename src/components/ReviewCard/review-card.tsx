import { Button, Container } from "@mui/material";
import { useState } from "react";
import styles from "./review-card.module.scss"

interface ReviewCardProps {
    author: string,
    content: string,
    date: string
}

export const ReviewCard: React.FC<ReviewCardProps> = (props) => {
    const { author, content, date } = props;
    const [showFullContent, setShowFull] = useState<boolean>(false);
    
    return(
        <article className={styles.reviewCard}>
            <div>
                <h3>Author: {author}</h3>
                <p>Written on {date}</p>
            </div>
            <p>
                {
                    !showFullContent ? content.slice(0, 56)+"..." : content
                }
            </p>
            <Container sx={{ display: 'flex', justifyContent: "flex-end" }}>
                <Button onClick={() => setShowFull(!showFullContent)}>
                    Show {!showFullContent ? "More" : "Less"}
                </Button>
            </Container>
        </article>
    )
}