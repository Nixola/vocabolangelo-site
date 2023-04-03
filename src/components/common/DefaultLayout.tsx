import Footer from "./Footer";
import Header from "./Header";
import React from "react";

interface DefaultLayoutProps {
    title: string
    subtitle?: string
    content: JSX.Element
}

export default function DefaultLayout(props: DefaultLayoutProps) {
    const {title, subtitle, content} = props
    return <>
        <Header/>
        <main id="wrapper" className="divided">
            <section className="wrapper style1 align-center">
                <div className="inner">
                    <header>
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                    </header>
                    <div className="index align-left"> {content} </div>
                </div>
            </section>
        </main>
        <Footer/>
    </>
}