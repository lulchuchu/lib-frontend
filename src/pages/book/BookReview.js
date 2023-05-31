import styles from "@/styles/book.module.css";

import axios from "axios";
import {useState} from "react";
import StarRatings from "react-star-ratings";
import {confirmAlert} from "react-confirm-alert";
import {useRouter} from "next/router";

export default function BookReview({token,bookId, reviews, avg, rating}) {
    const [review, setReview] = useState("");
    const router = useRouter();
    // const [avgRating, setAvgRating] = useState(0);

    async function handleSendReview() {
        if(!token) {
            confirmAlert({
                title: "You haven't login yet",
                message: 'You need to login to add book to cart',
                buttons: [
                    {
                        label: 'Go to login page',
                        onClick: () => {
                            router.push(("/login"))}
                    },
                    {
                        label: 'Cancel',
                    }
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
            });
        }
        else{
            const data = {
                content: review, bookId: bookId, score: rating,
            };

            const result = await axios.post("http://localhost:8080/api/review/add", data, {headers: {Authorization: "Bearer " + token.accessToken}});
            confirmAlert({
                title: "Review sent",
                message: 'Your review has been sent',
                 buttons: [
                     {
                         label: 'Ok',
                         onClick: () => {}
                     },
                 ],
                closeOnEscape: true,
                closeOnClickOutside: true,
            });
            console.log(result.data);
        }

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

            <div className={styles.blockTitle}>Community reviews</div>
            <div className={styles.communityReview}>
                {/*<StarRatings rating = {avg} starDimension="16px" starSpacing="0px"/>*/}
                <StarRatings
                    rating={avg}
                    starRatedColor="green"
                    numberOfStars={5}
                    starDimension="36px"
                    // changeRating={true}
                    // name="rating"
                />
                <div className={styles.avgRating}>
                    {avg}
                </div>
                <div className={styles.numberOfReview}>
                    {reviews.length} reviews
                </div>
            </div>

            {reviews.map((review) => (<div
                    key={review.id}
                    className={styles.reviewItem}
                >
                    <div className={styles.reviewUser}>
                        {review.userName}
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
