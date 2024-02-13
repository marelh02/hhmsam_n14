"use client";
import { connect, newConnector, init } from "@/lib/services/wallet-connect-config/main";
import { useEffect, useState } from "react";

export default function Page() {
  const [dAppConnector,setDAppConnector]=useState(newConnector());
  
  useEffect(()=>{
    const f= async ()=>{await init(dAppConnector)}
    f()
  },[])
  const clickHandler=async ()=>{
    try {
      console.log("We try to connect");      
      let r=await connect(dAppConnector)
      console.log(r)      
    } catch (error) {
      console.error("Failed to open connector")
      console.error(error);      
    }
  }
  return (
    <>
    <button onClick={clickHandler}>wallet connect</button>
    </>
  );
}
