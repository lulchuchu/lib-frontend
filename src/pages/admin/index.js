import {useEffect, useState} from "react";
import axios from "axios";
import styles from "@/styles/admin.module.css";
import Heading from "@/pages/component/heading";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useRouter} from "next/router";

export default function AdminHome() {
    const [token, setToken] = useState(null);
    const [books, setBooks] = useState([]);
    const router = useRouter();

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));

    }, []);

    useEffect(() => {
        // if (token) {
            const fetch = async () => {
                const result = await axios.get("http://localhost:8080/api/book/allbooks",
                    // {
                    // headers: {
                    //     Authorization: `Bearer ${token.accessToken}`,
                    // },
                // }
                );
                console.log("books", result.data);
                setBooks(result.data);
            };
            fetch();
        // }
    }, [])

    console.log("token in admin", token)

    function handleViewClick(bookId) {
        router.push("/admin/book/"+bookId);
    }
    function handleAddButton() {
        router.push("/admin/book/0");
    }

    async function handleDeleteClick(bookId) {
        confirmAlert({
            title: "Delete book",
            message: "Are you sure to delete this book?",
            buttons: [
                {
                    label: 'Confirm',
                    onClick: async () => {
                        const result = await axios.post("http://localhost:8080/api/book/delete?bookId=" + bookId, {},
                            {headers: {Authorization: "Bearer " + token.accessToken}})
                        router.reload();
                    }
                },
                {
                    label: 'Cancel'
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    }



    return (<>
        <Heading isAdmin={true}/>
        {token && <button className={styles.button} onClick={handleAddButton}>Add</button>}

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
                    <td>{book.categories.map((cat) => <p>{cat.name}</p>)}</td>
                    <td>{book.releaseDate}</td>
                    <td>{book.pages}</td>
                    <td>{book.sold}</td>
                    {token && token.role === "ADMIN" &&
                        <td>
                            <button className={styles.button} onClick={() => handleViewClick(book.id)}>View</button>
                            <button className={styles.button} onClick={() => handleDeleteClick(book.id)}>Delete</button>
                        </td>}
                </tr>)}
                </tbody>
            </table>
        </div>
    </>)
}