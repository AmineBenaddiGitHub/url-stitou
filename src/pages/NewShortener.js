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
        setUrl(data?.url);
        setShort("Loading ...");
        fetch('https://tiny-url-functions.aminbe.workers.dev/shorten', {
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
                else setShort("Oops, didn't work ... ")
            }).catch(() => setShort("Oops, didn't work ... "));

    };
    const [url, setUrl] = useState('');
    const [short, setShort] = useState('');

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
                    <input name="url" id="url" {...register('url')} ></input>
                    {errors?.url && errors.url?.message}
                    <div style={{ margin: 'auto' }}>
                        <button
                            style={{
                                marginTop: '0.5em',
                                width: '10em',
                                height: '4em',
                                backgroundColor: '#1ed760',
                                border: '1px solid #1ed760',
                                borderRadius: '1em'
                            }}
                            type="submit"
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
                {url && (<div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <p style={{ margin: '0.1em' }}>Shortened URL : {short === 'Loading ...' ? 'Loading' : `https://url-stitou.pages.dev/${short}`}</p>
                </div>)}
            </div>
        </>
    );
}