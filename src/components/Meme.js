import React from "react";
import memesData from "../memesData.js";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        imageUrl: "http://i.imgflip.com/1bij.jpg" // Default meme image
    });

    const [allMemeImages] = React.useState(memesData);

    function getMemeImage(event) {
        event.preventDefault(); // Prevent page refresh
        const memesArray = allMemeImages.data.memes;
        const randomNumber = Math.floor(Math.random() * memesArray.length);
        const url = memesArray[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: url // Update meme image
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target; // Fix event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value // Dynamically update topText or bottomText
        }));
    }

    return (
        <main>
            <form className="form" onSubmit={getMemeImage}>
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange} // Handle input change
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange} // Handle input change
                />
                <button className="form--button">
                    Get a new meme image 🖼
                </button>
            </form>
            <div className="meme">
                <img src={meme.imageUrl} className="meme--image" alt="Meme" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    );
}
