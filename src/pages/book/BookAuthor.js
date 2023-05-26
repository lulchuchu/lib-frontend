import styles from "@/styles/book.module.css";
import Link from "next/link";

export default function BookAuthor({book, imgUrl}) {
    return <div className={styles.block}>
        <div className={styles.blockTitle}>
            About the author
        </div>
        <div className={styles.authorDetail}>
            <Link href={"/book/author/" + book.author?.id}>

                <div className={styles.authorInfo}>
                    <img
                        src={imgUrl + book.author?.picture}
                        alt={book.author?.name}
                        className={styles.authorAvatar}
                    />
                    <div className={styles.authorName}>
                        {book.author?.name}
                    </div>
                </div>
            </Link>
            <div className={styles.description}>
                {book.author?.description}
            </div>
        </div>
    </div>;
}
