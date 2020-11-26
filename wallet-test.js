#!/usr/bin/env node

const { Wallet, kaspaSetup } = require('kaspa-wallet');
const {RPC} = require('kaspa-wallet-grpc-node');

kaspaSetup();

const rpc = new RPC({
    clientConfig:{
        host:"127.0.0.1:16210"
    }
});
//rpc.client.verbose = true;

Wallet.setRPC(rpc)



let dump = (label, text, deco1="-", deco2="=")=>{
    console.log(`\n${label}:\n${deco1.repeat(100)}\n${text}\n${deco2.repeat(100)}\n`)
}

const run = async ()=>{
    let wallet = Wallet.fromMnemonic("live excuse stone acquire remain later core enjoy visual advice body play");
    dump("mnemonic created", wallet.mnemonic)
    await wallet.addressDiscovery();

    let response = await wallet.sendTx({
        toAddr: "kaspatest:qrhefqj5c80m59d9cdx4ssxw96vguvn9fgy6yc0qtd",
        amount: 1  
    }).catch(error=>{
        console.log("error", error)
    })

    console.log("response", response)
}

run();
