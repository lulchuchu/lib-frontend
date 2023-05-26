import styles from "@/styles/book.module.css";

import axios from "axios";
import {useState} from "react";
import StarRatings from "react-star-ratings";

export default function BookReview({token, book, rating}) {
    const [review, setReview] = useState("");

    async function handleSendReview() {
        const data = {
            content: review, bookId: index, score: rating,
        };

        const result = await axios.post("http://localhost:8080/api/review/add", data, {headers: {Authorization: "Bearer " + token.accessToken}});
        console.log(result.data);
    }

    return <div className={styles.block}>
        <div className={styles.blockTitle}>Review</div>
        <div className={styles.review}>
            {token && (<div>
                <div>{token.name} write your reviews!</div>
                <div className={styles.writeReview}>
                        <textarea
                            type="text"
                            className={styles.reviewText}
                            onChange={(e) => setReview(e.target.value)}
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
            </div>)}

            {book.reviews?.map((review) => (<div
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
                </div>))}
        </div>
    </div>;
}
