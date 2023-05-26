import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import StarRatings from "react-star-ratings";
import Link from "next/link";
import styles from "@/styles/book.module.css";

export default function Book() {
    const [token, setToken] = useState(null);
    const [book, setBook] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

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

    async function handleSendReview() {
        const data = {
            content: review,
            bookId: index,
            score: rating,
        };

        const result = await axios.post(
            "http://localhost:8080/api/review/add",
            data,
            { headers: { Authorization: "Bearer " + token.accessToken } }
        );
        console.log(result.data);
    }

    return (
        book && (
            <div className={styles.bookDetailLayout}>
                <div className={styles.bookCover}>
                    <img
                        src={img_url + book.cover}
                        alt=""
                        className={styles.cover}
                    />
                    <div className={styles.quantity}>
                        <button
                            className={styles.quantityButton}
                            onClick={() => setQuantity(quantity - 1)}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            className={styles.input}
                            value={quantity}
                        />
                        <button
                            className={styles.quantityButton}
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <div>
                        <button className={styles.addToCartButton}>
                            Add to cart
                        </button>
                    </div>
                    <div className={styles.rating}>
                        <StarRatings
                            rating={rating}
                            starRatedColor="green"
                            changeRating={setRating}
                            numberOfStars={5}
                            starDimension="36px"
                            name="rating"
                        />
                    </div>
                </div>
                <div className={styles.bookDetail}>
                    <div className={styles.title}>{book.title}</div>
                    <div className={styles.author}>{book.author?.name}</div>
                    <div className={styles.price}>{book.price * quantity}$</div>
                    <div className={styles.block}>
                        <div className={styles.blockTitle}>
                            Book Description
                        </div>
                        <div className={styles.description}>
                            {book.description}
                        </div>
                        <div className={styles.genre}>
                            Genre:
                            {book.categories?.map((category) => (
                                <Link
                                    key={category.id}
                                    href={"/book/category" + category.id}
                                >
                                    <div className={styles.category}>
                                        {category.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className={styles.subInfo}>
                            <div>{book.pages} pages</div>
                            <div>First released: {book.releaseDate}</div>
                        </div>
                    </div>

                    <div className={styles.block}>
                        <div className={styles.blockTitle}>
                            About the author
                        </div>
                        <div className={styles.authorDetail}>
                            <Link href = {"/book/author/" + book.author?.id}>
                            
                                <div className={styles.authorInfo}>
                                    <img
                                        src={img_url + book.author?.picture}
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
                    </div>

                    <div className={styles.block}>
                        <div className={styles.blockTitle}>Review</div>
                        <div className={styles.review}>
                            {token && (
                                <div>
                                    <div>{token.name} write your reviews!</div>
                                    <div className={styles.writeReview}>
                                        <textarea
                                            type="text"
                                            className={styles.reviewText}
                                            onChange={(e) =>
                                                setReview(e.target.value)
                                            }
                                        />
                                        <div>
                                            <button
                                                className={styles.sendButton}
                                                onClick={handleSendReview}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {book.reviews?.map((review) => (
                                <div
                                    key={review.id}
                                    className={styles.reviewItem}
                                >
                                    <div className={styles.reviewUser}>
                                        {review.user.name}
                                    </div>
                                    <div className={styles.reviewScore}>
                                        {" "}
                                        <StarRatings
                                            rating={review.score}
                                            starDimension="16px"
                                            starSpacing="0px"
                                        />
                                    </div>
                                    <div className={styles.reviewContent}>
                                        {review.content}
                                    </div>
                                    <div className={styles.reviewDate}>
                                        {review.date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.block}>
                        <div className={styles.blockTitle}>Similar books</div>
                    </div>
                </div>
            </div>
        )
    );
}
