import Header from "../components/header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AccessShortener() {
    const { shortId } = useParams();
    const [url, setUrl] = useState('');
    useEffect(() => {
        fetch(`https://tiny-url-functions.aminbe.workers.dev/access?shortId=${shortId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        }).then(res => {
            if (res.status === 200) return res.json();
            return { errored: true };
        }).then(data => {
            if (!data?.errored) window.location.replace(data?.url);
            else setUrl("Oops, didn't work ... ")
        }).catch(() => setUrl("Oops, didn't work ... "));
    }, [shortId]);
    return (
        <>
            <Header />
            <div>Will Access Shortly to the website</div>
            {url && <p>{url}</p>}
        </>
    );
}