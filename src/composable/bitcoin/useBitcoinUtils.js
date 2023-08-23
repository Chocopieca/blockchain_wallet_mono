import * as bitcoinjs from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import * as ecc from "tiny-secp256k1";
import * as bip39 from "bip39";
import {computed} from "vue";
import {useBtcStore} from "@/stores/useBtcStore";
import useBitcoinNetwork from "@/composable/bitcoin/useBitcoinNetwork";
import {useEtherJsStore} from "@/stores/useEtherJsStore";

function fromDecimals(amount, decimal) {
    return useEtherJsStore().fromDecimals(amount, decimal);
}
function toDecimals(amount, decimal) {
    return useEtherJsStore().toDecimals(amount, decimal);
}
export default function useBitcoinUtils() {
    const currentWallet = useBtcStore().getCurrentWallet;
    const selectedNetwork = useBitcoinNetwork().getSelectedNetwork.value;

    const getAddressLink = computed(() => {
        if (selectedNetwork && currentWallet) {
            return `https://live.blockcypher.com/${selectedNetwork.BScanNetwork}/address/${currentWallet.btcAddress}/`
        } else return ''
    })

    async function getBtcBalance() {
        const res = await (await fetch(
            `https://api.blockcypher.com/v1/btc/${selectedNetwork.BCNetwork}/addrs/${currentWallet.btcAddress}/balance`
        )).json();
        return res.final_balance === 0
            ? 0
            : fromDecimals(res.final_balance, 8);
    }
    function getNetwork() {
        return bitcoinjs.networks[selectedNetwork.BJSNetwork];
    }
    function getKeyPair(privateKey) {
        const ECPair = ECPairFactory(ecc);
        return ECPair.fromPrivateKey(
            Buffer.from(privateKey, "hex"),
            { network: currentWallet.network }
        );
    }
    function getP2PKH(publicKey) {
        return bitcoinjs.payments.p2pkh({ pubkey: publicKey, network: currentWallet.network } )
    }
    async function getLastTx() {
        return (await (await fetch(
            `https://api.blockcypher.com/v1/btc/${selectedNetwork.BCNetwork}/addrs/${currentWallet.btcAddress}`,
        )).json()).txrefs[1];
    }
    function getTxHex(lastTx, amountLeftValue, sendAmountValue, receiver) {
        const txb = new bitcoinjs.TransactionBuilder(currentWallet.network);
        txb.addInput(lastTx.tx_hash, lastTx.tx_output_n);
        txb.addOutput(currentWallet.btcAddress, amountLeftValue);
        txb.addOutput(receiver, sendAmountValue);
        txb.sign(0, currentWallet.keyPair);
        return txb.build().toHex();
    }
    async function txPush(txHash) {
        try {
            return await (await fetch(
                `https://api.blockcypher.com/v1/btc/${selectedNetwork.BCNetwork}/txs/push`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        tx: txHash,
                    })
                }
            )).json();
        } catch (e) {
            console.log("sendBtc error: ", e);
        }
    }
    async function generateMnemonic() {
        const path = "m/49'/1'/0'/0/0";
        const mnemonic = bip39.generateMnemonic(256);
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = await bitcoinjs.bip32.fromSeed(seed, currentWallet.network);
        const child = root.derivePath(path);
        const privateKey = child.privateKey.toString("hex");
        const publicKey = child.publicKey.toString("hex");
        return {
            mnemonic,
            privateKey,
            publicKey,
        }
    }
    function calculateSendAmount(payload) {
        const {fee, amount} = payload;
        const sendAmountValue = +toDecimals(amount, 8);
        const feeAmountValue = +toDecimals(fee, 8);
        const balance = +toDecimals(currentWallet.btcBalance, 8);
        const amountLeftValue = balance - sendAmountValue - feeAmountValue;
        return {sendAmountValue, amountLeftValue}
    }

    return {
        getBtcBalance, getNetwork, getKeyPair, getP2PKH,
        getLastTx, txPush, getTxHex, generateMnemonic,
        calculateSendAmount, getAddressLink };
}