import { useState,useCallback ,useEffect,useRef} from 'react'

import './App.css'

function App() {
  const [length,setlength]=useState(8);
  const [numberallowed,setnumberallowed]=useState(false);
  const [charallowed,setcharallowed]=useState(false);
  const [password,setpassword]=useState("");

  //ref hoooke
  const passwordref=useRef(null)

  const passwordgenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberallowed) str+="0123456789";
    if(charallowed) str+="!@#$%^&*(){}[]";

    for(let i=1;i<=length;i++){
      let char= Math.floor((Math.random() * str.length+1));
      pass+=str.charAt(char)
    }
    setpassword(pass);

  }
  ,[length,numberallowed,charallowed,setpassword]);

  const copyPasswordToCliboard = useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);
  },[password]);


  useEffect(()=>{
    passwordgenerator()
  },[length,numberallowed,charallowed,passwordgenerator]);

  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg
      px-4 my-8 tet-orange-500 bg-gray-700'>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordref} />
        <button 
        onClick={copyPasswordToCliboard}
        className='outline-none, px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{
            setlength(e.target.value)
          }} />
          <label>length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input type="checkbox"
          defaultChecked={numberallowed}
          id="numberinput"
          onChange={(e)=>{
            setnumberallowed((prev)=>!prev);
          }} />          
          <label htmlFor='numberinput'>:numbers</label>

          <input type="checkbox"
          defaultChecked={charallowed}
          id="charallowed"
          onChange={(e)=>{
            setcharallowed((prev)=>!prev);
          }} />
          <label htmlFor='charallowed'>:characters</label>

        </div>
      </div>
      </div>
    </>
  )
}

export default App
