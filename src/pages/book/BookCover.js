import styles from "@/styles/book.module.css";
import StarRatings from "react-star-ratings";
import axios from "axios";
import Quantity from "@/pages/component/Quantity";



export default function BookCover({token, book, quantity, changeQuantity, rating, changeRating}) {
    const img_url = "http://localhost:8080/api/file/getImage?path=";

    async function handleAddToCart() {
        const data = {
            "quantity": quantity,
            "bookId": book.id
        }

        const result = await axios.post("http://localhost:8080/api/bill/addtocart", data, {
            headers: {Authorization: "Bearer " + token.accessToken}
        });

        console.log("Add to cart: ", result.data)
    }

    return (<div className={styles.bookCover}>
        <img
            src={img_url + book.cover}
            alt=""
            className={styles.cover}
        />
        <Quantity quan={quantity} change = {changeQuantity}/>
        <div>
            <button className={styles.addToCartButton} onClick={handleAddToCart}>
                Add to cart
            </button>
        </div>
        <div className={styles.rating}>
            <StarRatings
                rating={rating}
                starRatedColor="green"
                changeRating={changeRating}
                numberOfStars={5}
                starDimension="36px"
                name="rating"
            />
        </div>
    </div>);
}