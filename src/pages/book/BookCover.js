import styles from "@/styles/book.module.css";
import StarRatings from "react-star-ratings";
import axios from "axios";
import Quantity from "@/pages/component/Quantity";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useRouter} from "next/router"; // Import css


export default function BookCover({token, book,yourRating, quantity, changeQuantity, rating, changeRating}) {
    const router = useRouter();

    const img_url = "http://localhost:8080/api/file/getImage?path=";

    async function handleAddToCart() {
        if(!token){
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
                "quantity": quantity,
                "bookId": book.id
            }
            try{
                const result = await axios.post("http://localhost:8080/api/bill/addtocart", data, {
                    headers: {Authorization: "Bearer " + token.accessToken}
                });
                console.log("Add to cart: ", result.data)
            }catch (e){
                confirmAlert({
                    title: "Add to cart failed",
                    message: e.response.data.message,
                    buttons: [
                        {
                            label: 'Ok',
                            onClick:() => {}
                        },
                    ],
                    closeOnEscape: true,
                    closeOnClickOutside: true,
                })
            }
        }

    }

    function handleChangeRating(rating){
        if (!token) {
            confirmAlert({
                title: "You haven't login yet",
                message: 'You need to login to change rating',
                buttons: [
                    {
                        label: 'Go to login page',
                        onClick: () => {
                            router.push(("/login"))
                        }
                    },
                    {
                        label: 'Cancel',
                    }
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
            });
        } else {
            changeRating(rating);

        }
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
                changeRating={(rating) => handleChangeRating(rating)}
                numberOfStars={5}
                starDimension="36px"
                // name="rating"
            />
        </div>
    </div>);
}