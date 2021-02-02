const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3');

import ABI from '../Layerx.json';

class Exchanger{

    abi:any;
    rpc_node: string;
    web3:any;
    sc:any;
    sc_address:any;
    privateKey:any;
    address:any
    
    constructor(){
        this.abi = ABI;
        this.rpc_node = process.env.BC_RPC;
        this.sc_address = process.env.SC_ADDRESS;
        this.web3 = new Web3(this.rpc_node);
        this.sc = new this.web3.eth.Contract(this.parseAbi(), this.sc_address);
        /*
        console.log("listening for events on ", this.sc_address)
        // watch for changes
        this.sc.events.allEvents(function(error, result){ //This is where events can trigger changes in UI
          if (!error)
            console.log(result);
        });
        */
    }
    parseAbi(){     
        let parsed = JSON.parse(JSON.stringify(this.abi));
        let abi = parsed.abi;
        return abi
    }
    getSc(){
        return this.sc;
    }
    async getReward(address){
        return this.sc.methods.rewards(address).call();
    }
    async getBalance(){
        const balance  = await this.sc.methods.balanceOf(this.address).call();
        const decimals = await this.getDecimals()
        let balanceObj:any = {}
        balanceObj.token_amount = balance/(10**decimals)
        return balanceObj;
    }
    async getDecimals(){
        return this.sc.methods.decimals().call();
    }
    async getStake(index){
        return this.sc.methods.stakes(index).call();
    }
    async sendAmount(recipient: string, amount:number){
    
        const privateKey = Buffer.from(this.privateKey.substring(2),'hex');
        const decimals = await this.sc.methods.decimals().call();
        let upiAmount = amount * (10**decimals);
        const data = this.sc.methods.transfer(recipient, this.web3.utils.toBN(upiAmount)).encodeABI();
        //const gasPrice = await this.web3.eth.getGasPrice();
        //const gas = await this.web3.eth.estimateGas({to:this.address, data});
        let nonce = await this.web3.eth.getTransactionCount(this.address);
        
        var rawTx = {
            from: this.address,
            nonce: nonce,
            to: this.sc_address,
            gas: '0x81B320', // to do mainnet add to estimated gas
            gasPrice: '0x4A817C800', // to do mainnet add to estimated
            value: '0x0',
            chainId: 4,
            data: data
        }
        // Initiate an sign transaction
        let tx = new Tx(rawTx, { chain: 'rinkeby', hardfork: 'istanbul' });
        tx.sign(privateKey);
        let serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex')
        
        // Broadcast the transaction
        const receipt = await this.web3.eth.sendSignedTransaction(raw);
        return receipt;
    }

}                                          
export default Exchanger;
