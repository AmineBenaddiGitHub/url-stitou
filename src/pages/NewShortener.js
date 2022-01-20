import Header from "../components/header";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';

export default function NewShortener() {
    const validationSchema = Yup
        .object()
        .required('URL required')
        .shape({
            url: Yup.string().url('Please enter a valid URL')
        });
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });
    const onSubmit = data => {
        setShort("Loading ...");
        fetch('https://url-stitou-functions.aminbe.workers.dev/shorten', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({ url: data?.url })
        })
            .then(res => {
                if (res.status === 200) return res.json();
                return { errored: true };
            })
            .then(data => {
                if (!data?.errored) setShort(data?.shortId);
                else setShort("ERROR")
            }).catch(() => setShort("ERROR"));

    };
    const [short, setShort] = useState('');
    const [copy, setCopy] = useState('Copy to clipboard');
    return (
        <>
            <Header />
            <div style={{
                width: "100%"
            }}>
                <h1 style={{ textAlign: "center" }}>Welcome to the URL Shortener</h1>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80%',
                        margin: "auto"
                    }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label htmlFor="url">
                        Please enter a valid URL
                    </label>
                    <input
                        name="url"
                        id="url"
                        {...register('url')}
                        onChange={() => {
                            setCopy('Copy to clipboard');
                        }}></input>
                    {errors?.url && errors.url?.message}
                    <div style={{ margin: 'auto' }}>
                        <button
                            style={{
                                marginTop: '0.5em',
                                width: '10em',
                                height: '4em',
                                backgroundColor: '#1ed760',
                                border: '1px solid #1ed760',
                                borderRadius: '1em',
                            }}
                            type="submit"
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#1db954';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#1ed760';
                            }}
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
                {short && short !== 'ERROR' && (<div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <p style={{ margin: '0.1em' }}>Shortened URL : {short === 'Loading ...' ? 'Loading' : `https://url-stitou.pages.dev/${short}`}</p>
                    {short !== 'Loading ...' && (
                        <button
                            style={{
                                marginTop: '0.5em',
                                width: '5em',
                                height: '3em',
                                backgroundColor: '#eaa9af',
                                border: '1px solid #eaa9af',
                                borderRadius: '1em',
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(`https://url-stitou.pages.dev/${short}`)
                                    .then(() => {
                                        setCopy('Copied !');
                                        setTimeout(() => {
                                            setCopy('Copy to clipboard');
                                        }, 3000);
                                    });
                            }}>{copy}
                        </button>
                    )}
                </div>)}
                {short === "ERROR" && (<p style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>Error, please try later</p>)}
            </div>
        </>
    );
}