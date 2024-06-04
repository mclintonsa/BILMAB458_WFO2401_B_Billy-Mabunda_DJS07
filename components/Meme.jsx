import React, {useId} from "react";

function Meme() {


    const [meme, memeFunction] = React.useState({       
        topText: "",
        bottomText: "",
        randomImage:"http://i.imgflip.com/1bij.jpg",
        })

    function handleMemeText(event){
        const {name, value} = event.target
        memeFunction(prevText => {
            return {
                ...prevText,
                [name]: value
            }
        })
    }

    const [allMemeImages, memeImagesFunc] = React.useState([])

    React.useEffect( () => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            memeImagesFunc(data.data.memes)
        }
       getMemes()
            
    }, [])

    // console.log(allMemeImages)
    
    function randomImageURL(event){
        event.preventDefault()
        const random = Math.floor(Math.random() * allMemeImages.length);
        const memeURL = allMemeImages[random].url
        memeFunction(prevMeme => ({
            ...prevMeme, 
            randomImage: memeURL}))
        // console.log(randomMeme.url)
    }

    const id = useId();


    return (
        <main className='main'>
            <div className='form'>
            <label className='form--label' htmlFor={id + '-topText'}>Top Text
                <input 
                className='form--input' 
                type="text" 
                placeholder="Top text" 
                onChange={handleMemeText}
                name="topText"
                value={meme.topText}
                />
            </label>
            <label className='form--label' htmlFor={id + '-bottomText'}>Bottom Text
                <input 
                className='form--input' 
                type="text" 
                placeholder="Bottom text"
                onChange={handleMemeText}
                name="bottomText"
                value={meme.bottomText}
                />
            </label>
                <button className='form--button'
                onClick={randomImageURL} >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme