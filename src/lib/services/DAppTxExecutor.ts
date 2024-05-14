import { AccountId, PrivateKey, PublicKey, Client, TransferTransaction, Hbar, Transaction, Signer, Provider, Wallet, LocalProvider } from "@hashgraph/sdk";
import { proto } from '@hashgraph/proto';


const production = process.env.NEXT_PUBLIC_IS_PRODUCTION === "true"


interface Node {
    node_account_id: string;
}

interface ApiResponse {
    nodes: Node[];
}

async function getNodeAccountIds(): Promise<string[]> {    
    const ep = production == false ?
        "https://testnet.mirrornode.hedera.com/api/v1/network/nodes" :
        "https://mainnet-public.mirrornode.hedera.com/api/v1/network/nodes"
    return await fetch(ep)
        .then(res => res.json())
        .then((response: ApiResponse) => {
            return response.nodes.map(node => node.node_account_id);
        });

}


const DAppTxExecutor = {
    async getRandomNodeAccountId() {
        let l = await getNodeAccountIds()
        const randomIndex = Math.floor(Math.random() * l.length);
        return AccountId.fromString(l[randomIndex]);
    },
    async dapp_executor(transactionBodyB64: string,
        sigMap: any) {        
        const myAccountId = AccountId.fromString(process.env.DAPP_CLIENT_ACCOUNT_ID!);
        const myPrivateKey = PrivateKey.fromStringECDSA(process.env.DAPP_CLIENT_PRIVATE_KEY!);
        
        const client = production == false ? Client.forTestnet() : Client.forMainnet()
        // client.setOperator(myAccountId, myPrivateKey);
        const pro = new LocalProvider()
        const nabu = new Wallet(myAccountId,myPrivateKey,pro)
        
        
        
        try {
            console.log("We try a provider");
            
            const bodyBytes = Buffer.from(transactionBodyB64, 'base64')
            const bytes = proto.Transaction.encode({ bodyBytes, sigMap }).finish()
            //@ts-ignore	
            const signedTransaction = Transaction.fromBytes(bytes)
            const xx = await pro.call(signedTransaction)
            console.log(xx);
            
            // const submitTx = await signedTransaction.execute(client)
            // //Get the transaction ID
            // const txId = submitTx.transactionId.toString();                        
            // return txId;
        } catch (e: any) {
            console.error(e);
        }
    }

}
export default DAppTxExecutor;