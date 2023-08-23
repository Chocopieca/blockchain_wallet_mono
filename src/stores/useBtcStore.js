import {defineStore} from "pinia";
import useBitcoinUtils from "@/composable/bitcoin/useBitcoinUtils";
import {computed} from "vue";


const bitcoinUtils = computed(() =>
    useBitcoinUtils());
export const useBtcStore = defineStore("btcToken", {
  state() {
    return {
      selectedIndex: 0,
      walletId: 0,
      wallets: [
        {
          selectedNetwork: "testnet",
          isConnected: false,
          keyPair: null,
          p2pkh: null,
          btcAddress: null,
          btcBalance: 0,
          network: null,
        }
      ],
    }
  },
  getters: {
    getCurrentWalletId: state => state.walletId,
    getSelectedIndex: state => state.selectedIndex,
    getWallets: state => state.wallets,
    getCurrentWallet: state => state.wallets[state.selectedIndex],
  },
  actions: {
    // async initBtcWalletCDN() {
    //   this.network = bitcoinjs.networks.testnet;
    //   const userPrivateKey = import.meta.env.VITE_BTC_PRIVATE_KEY;
    //   this.keyPair = bitcoinjs.ECPair.fromPrivateKey(
    //     bitcoinjs.Buffer.from(userPrivateKey, "hex"),
    //     { network: this.network }
    //     );
    //   this.p2pkh = bitcoinjs.payments.p2pkh({ pubkey: this.keyPair.publicKey, network: this.network} );
    //   this.btcAddress = this.p2pkh.address;
    //   await this.getBtcBalance();
    //   this.isConnected = true;
    // },
    initNetwork() {
      this.wallets[this.selectedIndex].network = bitcoinUtils.value.getNetwork();
    },
    async updateBtcBalance() {
      this.wallets[this.selectedIndex].btcBalance = await bitcoinUtils.value.getBtcBalance();
    },
    async initBtcWallet(userPrivateKey) {
      this.initNetwork();
      this.wallets[this.selectedIndex].keyPair = bitcoinUtils.value.getKeyPair(userPrivateKey);
      this.wallets[this.selectedIndex].p2pkh = bitcoinUtils.value.getP2PKH(this.getCurrentWallet.keyPair.publicKey);
      this.wallets[this.selectedIndex].btcAddress = this.getCurrentWallet.p2pkh.address;
      await this.updateBtcBalance();
      this.wallets[this.selectedIndex].isConnected = true;
    },
    async sendBtc(payload) {
      const { receiver, ...data } = payload;
      const { sendAmountValue, amountLeftValue} = bitcoinUtils.value.calculateSendAmount(data);
      const lastTx = await bitcoinUtils.value.getLastTx();
      const txHash = bitcoinUtils.value.getTxHex(lastTx, amountLeftValue, sendAmountValue, receiver);
      return await bitcoinUtils.value.txPush(txHash);
    },
    changeNetwork(network) {
      this.wallets[this.selectedIndex].selectedNetwork = network
    },
    async createNewBtcWallet() {
      return bitcoinUtils.value.generateMnemonic()
    },
    updateSelectedIndex(index) {
      this.selectedIndex = index;
    },
    createWallet() {
      ++this.walletId;
      this.wallets.push({
        selectedNetwork: "testnet",
        isConnected: false,
        keyPair: null,
        p2pkh: null,
        btcAddress: null,
        btcBalance: 0,
        network: null,
      })
    },
    deleteWallet() {
      if (this.wallets.length > 1) {
        this.wallets.splice(this.selectedIndex, 1);
      }
    }
  }
})