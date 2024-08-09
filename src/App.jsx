import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false); const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");


  // useRef hook
  const PasswordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*_-+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char)

    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClip = useCallback(() =>{
    PasswordRef.current?.select();
    PasswordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(Password)
  },[Password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-xl mx-auto shadow-lg px-8 my-24 py-10 text-orange-600 bg-blue-300 rounded-xl'>
        <h1 className='text-black text-center text-2xl my-3'>Password Generator</h1>
        <div className=' flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={Password}
            className='outline-none w-full py-2 px-3 rounded-xl'
            placeholder='Password'
            readOnly
            ref={PasswordRef}
          />
          <button 
          onClick = {copyPasswordToClip}
          className='outline-none bg-red-400 text-white pl-4 px-4 py-3 shrink-0 rounded-xl hover:bg-pink-300'> Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={16}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className='text-lg text-red-600'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1 '>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed(!numberAllowed)
              }} />

            <label className="text-lg text-red-600" htmlFor="numberInput">Numbers</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed(!charAllowed);
              }} />
            <label className="text-lg text-red-600" htmlFor="characterInput">Characters</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
