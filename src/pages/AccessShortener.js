import Header from "../components/header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AccessShortener() {
    const { shortId } = useParams();
    const [link, setLink] = useState('');
    const [nbAccess, setNbAccess] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(`https://url-stitou-functions.aminbe.workers.dev/access?shortId=${shortId}`, {
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
            setLoading(false);
            const { url, times, errored } = data;
            if (!errored && url !== '') {
                setNbAccess(times);
                setLink(url)
                setTimeout(() => {
                    window.location.replace(url);
                }, 1000);
            } else {
                setError(true);
            }
        }).catch(() => {
            setLoading(false);
            setError(true);
        });
    }, [shortId]);
    return (
        <>
            <Header />
            {loading && <div>Will Access Shortly to the website</div>}
            {error && <div>Sorry, url-stitou didn't work this time</div>}
            {!error && !loading && (<>
                <p>Number of access times : {nbAccess}</p>
                <p>You will access to this URL : {link}</p>
                <p>You will be redirected in 1 second</p>
            </>)}
        </>
    );
}