import { DAppConnector } from '@hashgraph/hedera-wallet-connect';
import { create } from 'zustand'

type DAppStore = {
    dAppConnector: string,
    getConnector:()=>Promise<string>,
    update: (value: string) => void,
    remove: () => void,
}

export const useDAppConnectorStore = create<DAppStore>((set,get) => ({
    dAppConnector: "",
    getConnector: async () => {
        let { dAppConnector } = get()
        console.log("$$$ con is : ",dAppConnector);
        
        if(dAppConnector == ""){
            console.log("about to change");
            
            dAppConnector= "avahi ssh"
        }else{
            dAppConnector= "sshd"
        }
        set({ dAppConnector: dAppConnector})

        return dAppConnector
    },
    update: (value: string) => set({ dAppConnector: value  }),
    remove: () => set({ dAppConnector: "" }),
}));