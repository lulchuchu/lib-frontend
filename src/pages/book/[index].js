import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "@/styles/book.module.css";
import BookCover from "@/pages/book/BookCover";
import BookDescription from "@/pages/book/BookDescription";
import BookAuthor from "@/pages/book/BookAuthor";
import BookReview from "@/pages/book/BookReview";
import BookSimilar from "@/pages/book/BookSimilar";
import Heading from "@/pages/component/heading";

export default function Book() {
    const [token, setToken] = useState(null);
    const [book, setBook] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
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
                console.log(result.data);
                setBook(result.data);
            };
            fetchBook();
        }
    }, [index]);

    useEffect(() => {
        if(index){
            const fetchReview = async() => {
                const result = await axios.get(
                    "http://localhost:8080/api/review/book",
                    {params: {bookId: index}});

                setReviews(result.data);

                let total = 0;
                for (const review of result.data) {
                    console.log("review", review)
                    total += review.score;
                }
                const rs = total === 0 ? 0 : Number((total / result.data.length).toFixed(2));
                setAvgRating(rs);
            }
            fetchReview();
        }
    }, [index])

    useEffect(() => {
        if (token && reviews !== []) {
            let rs = 0;
            for(const review of reviews) {
                if (review.userId === token.id) {
                    rs = review.score;
                    break;
                }
            }
            setRating(rs);
        }
    }, [token,reviews])

    console.log("avgRating", avgRating)

    return (
        <>
            <Heading />
                <div className={styles.bookDetailLayout}>
                    <div className={styles.main}>
                        <BookCover token = {token} book={book} quantity={quantity} changeQuantity = {setQuantity}  rating={rating} changeRating={setRating}/>
                        <div className={styles.bookDetail}>
                            <div className={styles.title}>{book.title}</div>
                            <div className={styles.author}>{book.author?.name}</div>
                            <div className={styles.price}>{book.price * quantity}$</div>
                            <div>{book.quantity} left in stock</div>
                            <BookDescription book={book}/>
                            <BookAuthor book={book} imgUrl={img_url}/>
                            <BookReview token={token} bookId = {book.id} reviews={reviews} avg = {avgRating} rating={rating}/>
                        </div>

                    </div>
                </div>
            )

        </>
    );
}
