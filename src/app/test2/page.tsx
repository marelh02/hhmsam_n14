"use client";
import { useDAppConnectorStore } from "@/lib/services/store/Zustand";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const d = useDAppConnectorStore(state => state.dAppConnector)
  return (
    <>
    <Link href="/test">Test </Link>
    <div>
        <h2>Daopp is: {d}</h2>
    </div>
    </>    
  );
  }
  