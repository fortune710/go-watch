import { Search } from "@mui/icons-material"
import { InputBase } from "@mui/material"
import styles from "./searchbar.module.scss";

interface SearchbarProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}
export const Searchbar: React.FC<SearchbarProps> = ({ onChange }) => {
    return(
        <div className={styles.searchbar}>
            <Search />
            <input
                onChange={onChange}
                type="search"
                placeholder="Search for movie, tv show or actor"
            />
        </div>
    )
}