import troll_face from '../images/troll-face.png'



export default function Header(){
    return(
        <>
        <header className='nav'>
            <img className='img_meme' src={troll_face}></img>

         <h3>Meme Generator</h3>
        </header>
        
        </>
    )
}