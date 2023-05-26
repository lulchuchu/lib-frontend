import styles from "@/styles/book.module.css";
import Link from "next/link";

export default function BookDescription({book}) {
    return <div className={styles.block}>
        <div className={styles.blockTitle}>
            Book Description
        </div>
        <div className={styles.description}>
            {book.description}
        </div>
        <div className={styles.genre}>
            Genre:
            {book.categories?.map((category) => {
                return <Link href={"/book/category/" + category.id} className={styles.category}>
                    {category.name}
                </Link>;
            })}
        </div>
        <div className={styles.subInfo}>
            <div>{book.pages} pages</div>
            <div>First released: {book.releaseDate}</div>
        </div>
    </div>;
}