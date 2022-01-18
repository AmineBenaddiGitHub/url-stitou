import Header from "../components/header";
import { useParams } from "react-router-dom";

export default function AccessShortener() {
    const { shortId } = useParams();
    return (
        <>
            <Header />
            <div>Will Access Shortly to {shortId}</div>
        </>
    );
}