import React from "react";
import Meme from "../images/1.png"
export default function Header() {
    return (
        <header className="header">
            <img
                src={Meme}
                alt="Meme Logo"
                className="header--image"
            />
            <h2 className="hed--title">Meme Generator</h2>
        </header>
    )
}