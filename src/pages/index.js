import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import styles from "@/styles/home.module.css";
import { useRouter } from "next/router";
export default function Home({ categoryId, authorId }) {
    const [token, setToken] = useState(null);
    const [books, setBooks] = useState([]);

    const router = useRouter();

    console.log("categoryId", categoryId);
    console.log("authorId", authorId);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        setToken(token);
    }, []);

    useEffect(() => {
        const fetchBook = async () => {
            let result;
            if (categoryId == null && authorId == null) {
                result = await axios.get("http://localhost:8080/api/book/all");
            }
            else if (categoryId != null) {
                result = await axios.get(
                    "http://localhost:8080/api/book/category",
                    {
                        params: { categoryId: categoryId },
                    }
                );

                console.log("category", result);
            }
            else if (authorId != null) {
                result = await axios.get(
                    "http://localhost:8080/api/book/author",
                    {
                        params: { authorId: authorId },
                    }
                );
                console.log("author", result);
            }
            let tmp = [];
            let rs = [];
            for (const book of result.data) {
                if (tmp.length == 5) {
                    rs = [...rs, tmp];
                    tmp = [];
                }
                tmp = [...tmp, book];
                console.log("tmp", tmp);
            }
            if (tmp.length > 0) {
                rs = [...rs, tmp];
            }
            console.log("rs", rs);
            setBooks(rs);
        };
        fetchBook();
    }, []);

    console.log("books", books);
    return (
        <>
            <div className={styles.layout}>
                <div className={styles.left}></div>
                <div className={styles.main}>
                    <div className={styles.filterBar}></div>
                    <div className={styles.bookLayout}>
                        {books.map((bookRow) => {
                            return (
                                <div className={styles.bookRow}>
                                    {bookRow.map((book) => {
                                        return (
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
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
