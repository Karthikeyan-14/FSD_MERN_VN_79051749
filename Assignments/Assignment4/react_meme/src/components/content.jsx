import { useState,useEffect } from 'react'
import earth2 from '../images/earth2.webp'


export default function Content(){
    let [meme,setmeme]=useState({
        top:'',
        bottom:'',
        image_url:''
    })
    let [stardata,setstar]=useState([])
    /*
    practiced code
    let [count,setcount]=useState(1)
    useEffect(()=>{
        fetch(`https://swapi.py4e.com/api/people/${count}/`)
        .then(res=>res.json())
        .then(data=>setstar(data))
        console.log("hey")
    },[count])*/

    useEffect(()=>{
        fetch('http://api.imgflip.com/get_memes')
        .then(res=>res.json())
        .then(data=>setstar(data.data.memes))
    
    },[])

   
    function handleclick(event){
        let {value,name}=event.currentTarget
        console.log(name)
        name==="topText"?
        setmeme(prev=>({
            ...prev,
            top:value
        })):setmeme(prev=>({
            ...prev,
            bottom:value
        }))
    }
    function get_meme(){
        console.log(stardata.length)
        let random_num=Math.floor(Math.random() * stardata.length)
        let new_meme=stardata[random_num].url
        setmeme(data=>({
            ...data,
            image_url:new_meme
        }))
    }
    
    
    return(
        <>
        <main>
        <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder='Enter Top Text'
                        name="topText"
                        className='top_text'
                        onChange={handleclick}
  
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Enter Bottom Text"
                        name="bottomText"
                        className='bottom_text'
                        onChange={handleclick}
  
                    />
                </label>
                <br></br>
                <button onClick={get_meme} >Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img className='image_meme' src={meme.image_url}/>
                <span className="top">{meme.top}</span>
                <span className="bottom">{meme.bottom}</span>
            </div>
           
            { /*<button onClick={()=>setcount(count+1)}>Get The Character</button>
            <button onClick={()=>setcount(count-1)}>Previous Character</button>
            <p>The Count is {count}</p>*/}

        </main>
        </>
    )
}