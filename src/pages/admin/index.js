import {useEffect, useState} from "react";
import axios from "axios";
import styles from "@/styles/admin.module.css";
import Heading from "@/pages/component/heading";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function AdminHome() {
    const [token, setToken] = useState(null);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));

    }, []);

    useEffect(() => {
        if (token) {
            const fetch = async () => {
                const result = await axios.get("http://localhost:8080/api/book/allbooks", {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                    },
                });
                console.log("books", result.data);
                setBooks(result.data);
            };
            fetch();
        }
    }, [token])

    console.log("token in admin", token)

    function handleViewClick() {

    }

    async function handleDeleteClick(bookId) {
        const result = await axios.post("http://localhost:8080/api/book/delete?bookId="+bookId,{},
            {headers: {Authorization: "Bearer " + token.accessToken}})
            confirmAlert({
                title: "Delete book",
                message: result.data,
                buttons: [
                    {
                        label: 'OK'
                    },
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
            });
    }

    return (<>
        <Heading isAdmin={true}/>
        <div className={styles.layout}>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
                crossOrigin="anonymous"
            />
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Category</th>
                    <th scope="col">Release Date</th>
                    <th scope="col">Pages</th>
                    <th scope="col">Sold</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => <tr>
                    <td>{book.title}</td>
                    <td>{book.authorName}</td>
                    <td>{book.categories.map((cat) => <p>{cat}</p>)}</td>
                    <td>{book.releaseDate}</td>
                    <td>{book.pages}</td>
                    <td>{book.sold}</td>
                    <td>
                        <button className={styles.button} onClick={() => handleViewClick(book.id)}>View</button>
                        <button className={styles.button} onClick={() => handleDeleteClick(book.id)}>Delete</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
    </>)
}