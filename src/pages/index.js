import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import styles from "@/styles/home.module.css";
import { useRouter } from "next/router";
import DisplayBook from "@/pages/component/DisplayBook";
import Heading from "@/pages/component/heading";
export default function Home({ categoryId, authorId, keyword }) {
    const [token, setToken] = useState(null);
    const [books, setBooks] = useState([]);
    const [sold, setSold] = useState(false);


    const router = useRouter();

    console.log("categoryId", categoryId);
    console.log("authorId", authorId);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        setToken(token);
    }, []);

    function handleRow(result){
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
    }

    useEffect(() => {
        const fetchBook = async () => {
            let result;
            if (categoryId == null && authorId == null && keyword == null) {
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
            else if (keyword != null) {
                result = await axios.get(
                    "http://localhost:8080/api/book/search",
                    {
                        params: { keyword: keyword },
                    }
                );
                console.log("keyword", result);
            }
            handleRow(result);
        };
        fetchBook();
    }, [categoryId, authorId, keyword]);

    console.log("books", books);

    async function handleBestSellerClick() {
        const result = await axios.get("http://localhost:8080/api/book/all/bestseller");
        handleRow(result)
    }

    async function handleNewReleaseCLick() {
        const result = await axios.get("http://localhost:8080/api/book/all/new");
        handleRow(result)

    }

    async function handleIncPriceClick() {
        const result = await axios.get("http://localhost:8080/api/book/all/priceIncrease");
        handleRow(result);
    }

    async function handleDecPriceClick() {
        const result = await axios.get("http://localhost:8080/api/book/all/priceDecrease");
        handleRow(result);
    }

    return (
        <>
            <Heading />
            <div className={styles.layout}>
                <div className={styles.main}>
                    <div className={styles.filterBar}>
                        <button className={styles.filterButton} onClick={() => router.reload()}>All</button>
                        <button className={styles.filterButton} onClick={handleBestSellerClick}>Best seller</button>
                        <button className={styles.filterButton} onClick = {handleNewReleaseCLick}>New release</button>
                        <button className={styles.filterButton} onClick={handleIncPriceClick}>Sort by price increment</button>
                        <button className={styles.filterButton} onClick={handleDecPriceClick}>Sort by price decrement</button>
                    </div>
                    <div className={styles.bookLayout}>
                        {books.map((bookRow) => {
                            return (
                                <div className={styles.bookRow}>
                                    {bookRow.map((book) => {
                                        return (
                                            <DisplayBook book={book} />
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
