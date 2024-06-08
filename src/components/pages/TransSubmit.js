import styles from "./TransSubmit.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TransSubmit({ translatedText }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!translatedText) {
      Swal.fire({
        text: "문장을 번역해 주세요",
        icon: "warning",
        confirmButtonText: "확인",
        customClass: {
          popup: "my-custom-class",
        },
      });
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
