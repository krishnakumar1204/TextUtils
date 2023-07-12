import React, {useState} from 'react';

const TextForm = (props) => {

    // To count no. of words in the text
    const countWords = (str) => {
        let words;
        if (text === "") {
    
          words = 0;
        } else {
          words = str.trim().split(/\s+/).length;
        }
        return words;
      };

    // To Upload file(.txt file Only)
    const readTxt = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function(event){
            setText(event.target.result);
        };
        reader.readAsText(file);
        props.showAlert("Your File Uploaded!", "success");
    }

    // to Convert to Uppercase
    const handleUpClick = () => {
        const newText = text.toUpperCase();
        setText(newText);
        text.length>0?props.showAlert("Converted to Uppercase!", "success"):props.showAlert("Enter Your Text to convert to Uppercase", "warning");
    }

    // To Convert Lowercase
    const handleLowClick = () => {
        const newText = text.toLowerCase();
        setText(newText);
        text.length>0?props.showAlert("Converted to Lowercase!", "success"):props.showAlert("Enter Your Text to convert to Uppercase", "warning");
    }

    // To Remove Extra Spaces
    const handleExtraSpaces =()=>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        text.length>0?props.showAlert("Extra spaces have been Removed!", "success"):props.showAlert("Enter Your Text First", "warning");
    }

    // For Text-To-Speech
    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        text.length>0?props.showAlert("Speech Started!", "success"):props.showAlert("Enter Your Text First", "warning");
    }

    // To Clear All Text
    const handleClearClick = () => {
        const newText = "";
        setText(newText);
        text.length>0?props.showAlert("Deleted All Text", "warning"):props.showAlert("Enter Your Text First", "warning");
    }

    // To Copy the text to clipboard
    const copyText = () => {
        navigator.clipboard.writeText(text);
        text.length>0?props.showAlert("Copied To clipboard!", "success"):props.showAlert("Enter Your Text First", "warning");
    }


    const handleOnChange = (event) => {
        setText(event.target.value);
    }
    const [text, setText] = useState("");

    return (
        <>
        <div className='container my-3' style={{color: props.mode==="dark"?"white":"black"}}>
            <h1>{props.heading}</h1>
            <div className="mb-3">
                <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==="dark"?"#29465B":"white", color: props.mode==="dark"?"white":"black"}} id="myBox" rows="8"></textarea>
            </div>
            <input type="file" className="btn btn-secondary mx-1 btn-sm" accept="text/plain" onChange = {readTxt}/>
            <button className="btn btn-primary mx-1 my-1 btn-sm" onClick={handleUpClick} >Convert to Uppercase</button>
            <button className="btn btn-primary mx-1 my-1 btn-sm" onClick={handleLowClick} >Convert to Lowercase</button>
            <button className="btn btn-primary mx-1 my-1 btn-sm" onClick={handleExtraSpaces} >Remove Extra Spaces</button>
            <button className="btn btn-warning mx-1 my-1 btn-sm" type="submit" onClick={speak} >Speak</button>
            <button className="btn btn-danger mx-1 my-1 btn-sm" onClick={handleClearClick} >Clear Text</button>
            <button className="btn btn-primary mx-1 my-1 btn-sm" onClick={copyText} >Copy Text</button>
        </div>
        <div className="container my-3" style={{color: props.mode==="dark"?"white":"black"}}>
            <h2>Your Text Summary</h2>
            <p><b>{countWords(text)}</b> Words and <b>{text.length}</b> Characters. </p>
            <p><b>{(0.008 * text.split(" ").length).toFixed(2)}</b> Minutes Read</p>
            <h3>Preview</h3>
            <p>{text.length>0?text:"Your Text Preview will appear here!"}</p>
        </div>
        </>
    )
}

export default TextForm;
