import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import styles from "@/styles/home.module.css";
import { useRouter } from "next/router";
import DisplayBook from "@/pages/component/DisplayBook";
import Heading from "@/pages/component/heading";
export default function Home({ categoryId, authorId, keyword }) {
    const [books, setBooks] = useState([]);

    const [filter, setFilter] = useState({
        sort: null,
        categoryId: categoryId? categoryId : null,
        authorId: authorId?authorId : null,
        keyword: keyword?keyword : null,
    });

    console.log("filter", filter);

    const router = useRouter();

    console.log("categoryId", categoryId);
    console.log("authorId", authorId);

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
        const fetch = async () => {
            const data = {...filter};
            data.sort==null && delete data.sort;
            data.authorId==null && delete data.authorId;
            data.categoryId==null && delete data.categoryId;
            data.keyword==null && delete data.keyword;
            console.log("filter", data)
            const result = await axios.get("http://localhost:8080/api/book/all", {params: filter});
            handleRow(result);
        }
        fetch();
    }, [filter]);

    async function handleBestSellerClick() {
        // const result = await axios.get("http://localhost:8080/api/book/all/bestseller");
        // handleRow(result)
        setFilter({...filter, sort: "bestseller"})
    }

    async function handleNewReleaseCLick() {
        // const result = await axios.get("http://localhost:8080/api/book/all/new");
        // handleRow(result)
        setFilter({...filter, sort: "new"})

    }

    async function handleIncPriceClick() {
        // const result = await axios.get("http://localhost:8080/api/book/all/priceIncrease");
        // handleRow(result);
        setFilter({...filter, sort: "priceIncrease"})
    }

    async function handleDecPriceClick() {
        // const result = await axios.get("http://localhost:8080/api/book/all/priceDecrease");
        // handleRow(result);
        setFilter({...filter, sort: "priceDecrease"})
    }

    return (
        <>
            <Heading filter={filter} setFilter={setFilter}/>
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
