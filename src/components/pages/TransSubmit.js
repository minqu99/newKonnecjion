import styles from "./TransSubmit.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function TransSubmit({ translatedText }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!translatedText) {
            alert("번역된 텍스트가 비어 있습니다.");
            return;
        }
        navigate("/answer");
    };

    return (
        <div className={styles.submitbox}>
            <div className={styles.transSubmit} onClick={handleClick}>
                <span>모범답안</span>
            </div>
        </div>
    );
}
