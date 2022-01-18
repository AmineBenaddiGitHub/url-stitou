import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header style={{
            margin: 0,
            padding: 0
        }}>
            <nav>
                <ul style={{
                    listStyleType: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: 0,
                    padding: '1em'
                }}>
                    <Link to="/">Home</Link>
                </ul>
            </nav>
        </header>
    );
}