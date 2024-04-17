"use client";
import { useDAppConnectorStore } from "@/lib/services/store/Zustand";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [x, setX] = useState('still nothing yet');
    const [y, setY] = useState('Joli mina');
    const [z, setZ] = useState('xxx');

    const d = useDAppConnectorStore(state => state.dAppConnector)

    const updateDapp = useDAppConnectorStore(state => state.update)
    const getCon = useDAppConnectorStore(state => state.getConnector)
  
  const handleClick = () => {
    setX(y);
    updateDapp(y)
  };
  useEffect(()=>{
    async function f(){
      let r= await getCon()
      setZ(r)
    }
    f()
  },[])

  
  return (
    <>
    <Link href="/test2">Test 2</Link>
    <h3>what is love? {z}</h3>
    <div>
        <h2>Daopp is: {d}</h2>
      <h1>{x}</h1>
      <input 
        type="text" 
        onChange={(e) => setY(e.target.value)}
      />      
    </div>
    <div>
    <button onClick={handleClick}>Change Title</button>
    </div>
    </>
    
  );
  }
  