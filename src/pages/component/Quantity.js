import styles from "@/styles/book.module.css";

export default function Quantity({quan, change, style}) {
    return <div className={styles.quantity} style={style}>
        <button
            className={styles.quantityButton}
            onClick={() => change(quan - 1)}
        >
            -
        </button>
        <input
            type="text"
            className={styles.input}
            value={quan}
        />
        <button
            className={styles.quantityButton}
            onClick={() => change(quan + 1)}
        >
            +
        </button>
    </div>;
}