
/*
 * JSON RPC Methods
 */
// 1. hedera_getNodeAddresses
async function hedera_getNodeAddresses(_: Event) {
    // return await dAppConnector!.getNodeAddresses()
  }
  
  document.getElementById('hedera_getNodeAddresses')!.onsubmit = (e: SubmitEvent) =>
    // showErrorOrSuccess(hedera_getNodeAddresses, e)
  
  // 2. hedera_executeTransaction
  async function hedera_executeTransaction(_: Event) {
    // const bodyBytes = Buffer.from(getState('execute-transaction-body'), 'base64')
    // const sigMap = base64StringToSignatureMap(getState('execute-transaction-signature-map'))
  
    // const bytes = proto.Transaction.encode({ bodyBytes, sigMap }).finish()
    // const transactionList = transactionToBase64String(Transaction.fromBytes(bytes))
  
    // const params: ExecuteTransactionParams = { transactionList }
  
    // return await dAppConnector!.executeTransaction(params)
  }
  document.getElementById('hedera_executeTransaction')!.onsubmit = (e: SubmitEvent) =>
    // showErrorOrSuccess(hedera_executeTransaction, e)
  
  // 3. hedera_signMessage
  async function hedera_signMessage(_: Event) {
    // const message = getState('sign-message')
    // const params: SignMessageParams = {
    //   signerAccountId: 'hedera:testnet:' + getState('sign-message-from'),
    //   message,
    // }
  
    // const { signatureMap } = await dAppConnector!.signMessage(params)
    // const accountPublicKey = PublicKey.fromString(getState('public-key'))
    // const verified = verifyMessageSignature(message, signatureMap, accountPublicKey)
  
    // document.getElementById('sign-message-result')!.innerHTML =
    //   `Message signed - ${verified}: ${message}`
    // return signatureMap
  }
  
  document.getElementById('hedera_signMessage')!.onsubmit = (e: SubmitEvent) =>
    // showErrorOrSuccess(hedera_signMessage, e)
  
  // 4. SignAndExecuteQuery
  async function hedera_signAndExecuteQuery(_: Event) {
    // const query = new AccountInfoQuery().setAccountId(getState('query-payment-account'))
    // const params: SignAndExecuteQueryParams = {
    //   signerAccountId: 'hedera:testnet:' + getState('query-payment-account'),
    //   query: queryToBase64String(query),
    // }
  
    // /*
    //  * We expect the response to be the bytes of the AccountInfo protobuf
    //  */
    // const { response } = await dAppConnector!.signAndExecuteQuery(params)
    // const bytes = Buffer.from(response, 'base64')
    // const accountInfo = AccountInfo.fromBytes(bytes)
    // console.log(accountInfo)
    // return accountInfo
  }
  
  document.getElementById('hedera_signAndExecuteQuery')!.onsubmit = (e: SubmitEvent) =>
    // showErrorOrSuccess(hedera_signAndExecuteQuery, e)
  
  // 5. hedera_signAndExecuteTransaction
  async function hedera_signAndExecuteTransaction(_: Event) {
    // const transaction = new TransferTransaction()
    //   .setTransactionId(TransactionId.generate(getState('sign-send-from')))
    //   .addHbarTransfer(getState('sign-send-from'), new Hbar(-getState('sign-send-amount')))
    //   .addHbarTransfer(getState('sign-send-to'), new Hbar(+getState('sign-send-amount')))
  
    // const params: SignAndExecuteTransactionParams = {
    //   transactionList: transactionToBase64String(transaction),
    //   signerAccountId: 'hedera:testnet:' + getState('sign-send-from'),
    // }
  
    // console.log(params)
  
    // return await dAppConnector!.signAndExecuteTransaction(params)
  }
  document.getElementById('hedera_signAndExecuteTransaction')!.onsubmit = (e: SubmitEvent) =>
    // showErrorOrSuccess(hedera_signAndExecuteTransaction, e)
  
  // 6. hedera_signTransaction
  async function hedera_signTransaction(_: Event) {
    // const transaction = new TransferTransaction()
    //   .setTransactionId(TransactionId.generate(getState('sign-from')))
    //   .setMaxTransactionFee(new Hbar(1))
    //   .addHbarTransfer(getState('sign-from'), new Hbar(-getState('sign-amount')))
    //   .addHbarTransfer(getState('sign-to'), new Hbar(+getState('sign-amount')))
  
    // const params: SignTransactionParams = {
    //   signerAccountId: 'hedera:testnet:' + getState('sign-from'),
    //   transactionBody: transactionBodyToBase64String(
    //     // must specify a node account id for the transaction body
    //     transactionToTransactionBody(transaction, AccountId.fromString('0.0.3')),
    //   ),
    }
  
  //   const { signatureMap } = await dAppConnector!.signTransaction(params)
  //   document.getElementById('sign-transaction-result')!.innerText = JSON.stringify(
  //     { params, signatureMap },
  //     null,
  //     2,
  //   )
  //   console.log({ params, signatureMap })
  // }
  // document.getElementById('hedera_signTransaction')!.onsubmit = (e: SubmitEvent) =>
    // showErrorOrSuccess(hedera_signTransaction, e)
  
  // /*
  //  * Error handling simulation
  //  */
  // async function simulateGossipNodeError(_: Event) {
  //   const sender = getState('sign-send-from') || getState('send-from')
  //   const recepient = getState('sign-send-to') || getState('send-to')
  
  //   const transaction = new TransferTransaction()
  //     .setNodeAccountIds([new AccountId(999)]) // this is invalid node id
  //     .setTransactionId(TransactionId.generate(sender))
  //     .addHbarTransfer(sender, new Hbar(-5))
  //     .addHbarTransfer(recepient, new Hbar(+5))
  
  //   const params: SignAndExecuteTransactionParams = {
  //     transactionList: transactionToBase64String(transaction),
  //     signerAccountId: 'hedera:testnet:' + getState('sign-send-from'),
  //   }
  
  //   return await dAppConnector!.signAndExecuteTransaction(params)
  // }
  
  // document.getElementById('error-gossip-node')!.onsubmit = (e: SubmitEvent) =>
    // showErrorOrSuccess(simulateGossipNodeError, e)
  
  // async function simulateTransactionExpiredError(_: Event) {
  //   const sender = 'hedera:testnet:' + (getState('sign-send-from') || getState('send-from'))
  //   const recepient = getState('sign-send-to') || getState('send-to')
  
  //   const transaction = new TransferTransaction()
  //     // set valid start to 15 seconds ago
  //     .setTransactionId(
  //       TransactionId.withValidStart(
  //         AccountId.fromString(sender),
  //         Timestamp.fromDate(Date.now() - 15000),
  //       ),
  //     )
  //     // 15 seconds is a minimum valid duration otherwise there's an INVALID_TRANSACTION_DURATION error
  //     .setTransactionValidDuration(15)
  //     .addHbarTransfer(sender, new Hbar(-5))
  //     .addHbarTransfer(recepient, new Hbar(+5))
  
  //   const params: SignAndExecuteTransactionParams = {
  //     transaction: transactionToBase64String(transaction),
  //     signerAccountId: sender,
  //   }
  
  //   return await dAppConnector!.signAndExecuteTransaction(params)
  // }
  
  // document.getElementById('error-transaction-expired')!.onsubmit = (e: SubmitEvent) =>
    // showErrorOrSuccess(simulateTransactionExpiredError, e)