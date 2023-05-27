
import {useRouter} from "next/router";
import Home from "@/pages";

export default function Search(){
    const router = useRouter();
    const {query : {keyword},} = router;
    console.log("keyword", keyword);
    return(
        <>
            <Home keyword = {keyword}/>
        </>
    )
}