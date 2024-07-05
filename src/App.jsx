import { useState, useCallback,useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) string += "1234567890";
    if (character) string += "~!@#$%^&*()|?<>,";

    for (let i = 0; i < length; i++) {
      let str = Math.floor(Math.random() * string.length);
      pass += string.charAt(str);
    }
    setPassword(pass);
  }, [length, number, character]);

  useEffect(() =>{
    passwordGenerator();
  },[length, number, character]);

  const handleCopy = () =>{
    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied to clipboard!");
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };
  return (
    <>
      <div className="container-div">
        <h1>Password Generator</h1>
        <div>
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
          ></input>
          <button onClick={handleCopy} className="btn-sm" >Copy</button>
        </div>
        <div className="checkbox-container">
          <div>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            ></input>
            <label>Length: {length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={number}
              id="numberInput"
              onChange={(e) => {
                setNumber((prev) => !prev);
              }}
            ></input>
            <label> Numbers </label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={character}
              id="numberInput"
              onChange={(e) => {
                setCharacter((prev) => !prev);
              }}
            ></input>
            <label> Characters </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
