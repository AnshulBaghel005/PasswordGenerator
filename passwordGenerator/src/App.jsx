import { useState,useCallback ,useEffect,useRef} from 'react'

function App() {
const [length, setLength] = useState(8)
const [numberAllowed, setNumberAllowed] = useState(false)
const [charAllowed, setCharAllowed] = useState(false)
const [password, setPassword] = useState("");
const passwordRef=useRef(null);
const passwordGenerator=useCallback(()=>{
  let pass=" ";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
  if(numberAllowed)
  {
    str+="01234556789";
  }
  if(charAllowed)
  {
    str+="<>&*^%$#@!+=";
  }
  for(let i=0;i<length;i++)
  {
    let ch=Math.floor(Math.random()*str.length+1)
    console.log(ch ,str[ch]);
    pass+=str.charAt(ch);
  }
  setPassword(pass);
 
},[length,numberAllowed,charAllowed,setPassword])

useEffect(() => {
  passwordGenerator()},

  [length,numberAllowed,charAllowed,passwordGenerator]
)
let copyPassword=useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,100)
  window.navigator.clipboard.writeText(password)
},[password])

  return (
    <>
       <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-3 ' >Password generator</h1>
        <div className='flex shadow-md rounded-lg overflow-hidden mb-4 '  >
          <input
          type='text'
          value={password}
          placeholder='password' 
          readOnly
          className='outline-none w-full py-1 px-3' 
           ref={passwordRef}   />
          <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-4 py-0.5 shrink-0'>copy</button>
        </div>

        <div className='flex text-sm gap-x-2 '>
          <div className='flex items-center gap-x-1'>
          <input 
          type='range'
          min={6}
          max={100} 
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{
            setLength(e.target.value)
          }}
          />
          <label>Length:{length}</label>
          </div>
          <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=>!prev)
          }}/>
          <label>Numbers</label>

          <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="charInput"
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }}/>
          <label>Character</label>

        </div>
        
       </div>
     
       
       
     
     
    
     
      
    
    </>
  )
}

export default App
