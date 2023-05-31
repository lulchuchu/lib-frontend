import styles from "@/styles/admin.module.css";

export default function Input({label, type = "text", error, value, onChange, disabled}){

    return (
        <div className={styles.formInput}>
            <div className={styles.label}>
                <div>{label}</div>
                {error && <div className={styles.error}>{error}</div>}
            </div>
            <input type={type} className={styles.input} value={value} disabled={disabled}
                   onChange={onChange}/>
        </div>
    )
}