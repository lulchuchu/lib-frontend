import styles from "@/styles/home.module.css";
import Link from "next/link";

export default function DisplayBook({book}){
    return(
        <Link
            href={"/book/" + book.id}
            key={book.id}
            className={styles.book}
        >
            <img
                src={
                    "http://localhost:8080/api/file/getImage?path=" +
                    book.cover
                }
                alt={book.id}
                className={styles.bookCover}
            />
            <div
                className={styles.bookTitle}
            >
                {book.title}
            </div>
            <div
                className={
                    styles.bookAuthor
                }
            >
                {book.authorName}
            </div>
            <div
                className={styles.bookPrice}
            >
                {book.price} $
            </div>
        </Link>
    )
}