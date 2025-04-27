import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState('');
  const [inputMessage,setInputMessage]=useState('');

  useEffect(()=>{
    const socket=new WebSocket('ws://localhost:8080')
    socket.onopen=()=>{
      console.log('Connected to server')
    
    }
    socket.onmessage=(event)=>{
      console.log('Message from server',event.data)
      setMessage(event.data)
    }
    socket.onclose=()=>{
      console.log('Connection closed')
    }
    socket.onerror=(error)=>{
      console.error('WebSocket error:',error)
    }
    setSocket(socket)

    return ()=>{
      socket.close()
    }
  },[])

  if(!socket){
    return <div>
     Connecting to socket server... 
    </div>
  }

  return (
    <>
    <input value={inputMessage} onChange={(e)=>setInputMessage(e.target.value)}></input>
    <button onClick={()=>{
      socket.send(inputMessage)
    }}>Send
    </button>
    {message}
     
    </>
  )
}

export default App
