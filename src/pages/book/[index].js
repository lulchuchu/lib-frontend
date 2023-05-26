import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import StarRatings from "react-star-ratings";
import Link from "next/link";
import styles from "@/styles/book.module.css";
import BookCover from "@/pages/book/BookCover";
import BookDescription from "@/pages/book/BookDescription";
import BookAuthor from "@/pages/book/BookAuthor";
import BookReview from "@/pages/book/BookReview";
import BookSimilar from "@/pages/book/BookSimilar";




export default function Book() {
    const [token, setToken] = useState(null);
    const [book, setBook] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);


    const router = useRouter();
    const { index } = router.query;

    const img_url = "http://localhost:8080/api/file/getImage?path=";

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        setToken(token);
    }, []);

    useEffect(() => {
        if (index !== undefined) {
            const fetchBook = async () => {
                const result = await axios.get(
                    "http://localhost:8080/api/book/details",
                    {
                        params: { bookId: index },
                    }
                );
                console.log;
                setBook(result.data);
            };
            fetchBook();
        }
    }, [index]);

    return (
        book && (
            <div className={styles.bookDetailLayout}>
                <BookCover token = {token} book={book}  quantity={quantity} changeQuantity = {setQuantity} rating={rating} changeRating={setRating}/>

                <div className={styles.bookDetail}>
                    <div className={styles.title}>{book.title}</div>
                    <div className={styles.author}>{book.author?.name}</div>
                    <div className={styles.price}>{book.price * quantity}$</div>
                    <BookDescription book={book}/>
                    <BookAuthor book={book} imgUrl={img_url}/>
                    <BookReview token={token} book={book} rating={rating}/>
                    <BookSimilar book = {book} />


                </div>
            </div>
        )
    );
}
