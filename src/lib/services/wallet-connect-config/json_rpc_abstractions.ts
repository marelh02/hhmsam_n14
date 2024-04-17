// import { DAppConnector, SignAndExecuteQueryParams, queryToBase64String } from "@hashgraph/hedera-wallet-connect"
// import { AccountInfo, AccountInfoQuery, Query } from "@hashgraph/sdk"
import { Buffer } from 'buffer';
// https://docs.walletconnect.com/2.0/api/sign/dapp-usage
import { SignClientTypes } from '@walletconnect/types';
import {
	Transaction,
	TransferTransaction,
	Hbar,
	TransactionId,
	AccountInfoQuery,
	AccountId,
	Timestamp,
	LedgerId,
	PublicKey,
	AccountInfo,
	Query,
	AccountBalanceQuery,
	AccountBalance,
	AccountCreateTransaction,
	TransactionReceipt,
	KeyList,
	AccountUpdateTransaction,
} from '@hashgraph/sdk';
import { proto } from '@hashgraph/proto';
import {
	HederaSessionEvent,
	HederaJsonRpcMethod,
	transactionToBase64String,
	transactionToTransactionBody,
	transactionBodyToBase64String,
	base64StringToSignatureMap,
	queryToBase64String,
	ExecuteTransactionParams,
	SignMessageParams,
	SignAndExecuteQueryParams,
	SignAndExecuteTransactionParams,
	SignTransactionParams,
	DAppConnector,
	HederaChainId,
	verifyMessageSignature,
} from '@hashgraph/hedera-wallet-connect';

// ︵‿︵‿୨ JSON RPC Methods, KEEP OUT!!! ୧‿︵‿︵

export async function hedera_getNodeAddresses(dAppConnector: DAppConnector) {
	return await dAppConnector!.getNodeAddresses();
}



// const sigMap = base64StringToSignatureMap(x)
export async function hedera_executeTransaction(dAppConnector: DAppConnector,
	transactionBodyB64: string,
	sigMap: proto.SignatureMap
) {
	const bodyBytes = Buffer.from(transactionBodyB64, 'base64')
	const bytes = proto.Transaction.encode({ bodyBytes, sigMap }).finish()
	//@ts-ignore
	const transactionList = transactionToBase64String(Transaction.fromBytes(bytes))
	const params: ExecuteTransactionParams = { transactionList }
	//@ts-ignore
	const { transactionId } = await dAppConnector!.executeTransaction(params)
	return transactionId
}


// 4. SignAndExecuteQuery -> done
//returns bytes of the query result, must be a Hedera query
export async function hedera_signAndExecuteQuery(
	dAppConnector: DAppConnector,
	signerAccountId: string,
	query: any
) {
	const params: SignAndExecuteQueryParams = {
		signerAccountId: 'hedera:testnet:' + signerAccountId,
		// @ts-ignore
		query: queryToBase64String(query),
	};

	// @ts-ignore
	const { response } = await dAppConnector!.signAndExecuteQuery(params);
	const bytes = Buffer.from(response, 'base64');
	return bytes
}

// 5. hedera_signAndExecuteTransaction
export async function hedera_signAndExecuteTransaction(
	dAppConnector: DAppConnector,
	sender: string,
	receiver: string
) {
	try {
		const transaction = new TransferTransaction()
		.setTransactionId(TransactionId.generate(sender))
		.addHbarTransfer(sender, new Hbar(-1))
		.addHbarTransfer(receiver, new Hbar(+1))


	const params: SignAndExecuteTransactionParams = {
		// @ts-ignore
		transactionList: transactionToBase64String(transaction),
		signerAccountId: 'hedera:testnet:' + sender,
	};

	const ret = await dAppConnector!.signAndExecuteTransaction(params);
	console.log(ret);
	return ret;
	} catch (e) {
		console.error("Tx failed")
		console.error(e)
	}
}


// 6. hedera_signTransaction
// must specify a node account id for the transaction body, the transaction must have an id from the payer acc ID
export async function hedera_signTransaction(dAppConnector: DAppConnector,
	signerAccountId: string,
	txBody64: any) {

	const params: SignTransactionParams = {
		signerAccountId: 'hedera:testnet:' + signerAccountId,
		// @ts-ignore
		transactionBody: txBody64,
	}

	// @ts-ignore
	const { signatureMap } = await dAppConnector!.signTransaction(params)
	// @ts-ignore
	const sigMap = base64StringToSignatureMap(signatureMap)
	console.log("Generated sigMap is: ", sigMap);

	return { params, signatureMap }
}
