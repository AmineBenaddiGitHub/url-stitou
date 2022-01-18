import Header from "../components/header";

export default function NewShortener() {
    return (
        <>
            <Header />
            <div style={{
                width: "100%"
            }}>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80%',
                        margin: "auto"
                    }}
                    onSubmit={e => {
                        e.preventDefault();
                        console.log(e.target.url.value)
                    }}
                >
                    <label htmlFor="url">
                        Please Enter a valid URL
                    </label>
                    <input name="url" id="url" type="url"></input>
                    <button
                        style={{
                            width: '5em',
                            marginTop: '0.5em'
                        }}
                        type="submit"
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
        </>
    );
}