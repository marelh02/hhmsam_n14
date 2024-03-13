import { DAppConnector } from '@hashgraph/hedera-wallet-connect';
import { create } from 'zustand'

type DAppStore = {
    dAppConnector: string,
    update: (value: string) => void,
    remove: () => void,
}

export const useDAppConnectorStore = create<DAppStore>((set) => ({
    dAppConnector: "mi pa zuzuzu",
    update: (value: string) => set({ dAppConnector: value  }),
    remove: () => set({ dAppConnector: "" }),
}));