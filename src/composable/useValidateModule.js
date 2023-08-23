import {ethers} from "ethers";
import * as bitcoinjs from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import {ref} from "vue";
import {useErc20TokenStore} from "@/stores/useErc20TokenStore";
import ErrorHandler from "@/entities/ErrorHandler";
import {useEtherJsStore} from "@/stores/useEtherJsStore";
import {useBtcStore} from "@/stores/useBtcStore";
import * as ecc from "tiny-secp256k1";

export default function useValidateModule() {
  const erc20Token = useErc20TokenStore();
  const btcToken = useBtcStore();
  const etherJs = useEtherJsStore();
  const errorHandlerModule = ref(new ErrorHandler());

  const erc20balance = ref(erc20Token.getCurrentBalance);
  const ethBalance = ref(etherJs.userEtherBalance);
  const btcBalance = ref(btcToken.getCurrentWallet.btcBalance);
  const network = ref(btcToken.getCurrentWallet.network);

  function isValueZero(val) {
    return typeof val === "number" && +val === 0
  }

  function isNotEmpty(key, val) {
    if (!isValueZero(val) && !val) {
      errorHandlerModule.value.setError(key,
        `${key[0].toUpperCase()}${key.slice(1)} is required.`
      );
      return false;
    } else {
      return true;
    }
  }
  function isEthAddressValid(key, address) {
    if (!ethers.utils.isAddress(address)) {
      errorHandlerModule.value.setError(key,
        "Address not valid."
      );
      return false;
    } else {
      return true;
    }
  }
  function isBtcAddressValid(key, address) {
    if (!bitcoinjs.address.toOutputScript(address, network.value)) {
      errorHandlerModule.value.setError(key,
        "Address not valid."
      );
      return false;
    } else {
      return true;
    }
  }
  function isValueOverZero(key, amount) {
    if (amount <= 0) {
      errorHandlerModule.value.setError(key,
        "Amount must be more than 0."
      );
      return false;
    } else {
      return true;
    }
  }
  function isAmountNoOverERC20Balance(key, amount) {
    if (amount > +erc20balance.value) {
      errorHandlerModule.value.setError(key,
        "Amount over your balance."
      );
      return false;
    } else {
      return true;
    }
  }
  function isAmountNoOverEtherBalance(key, amount) {
    if (amount > +ethBalance.value) {
      errorHandlerModule.value.setError(key,
        "Amount over your balance."
      );
      return false;
    } else {
      return true;
    }
  }
  function isAmountNoOverBtcBalance(key, amount) {
    if (amount > +btcBalance.value) {
      errorHandlerModule.value.setError(key,
        "Amount over your balance."
      );
      return false;
    } else {
      return true;
    }
  }
  function isPrivateKey(key, privateKey) {
    if (!validateBitcoinPrivateKey(privateKey)) {
      errorHandlerModule.value.setError(key,
        "Incorrect private key."
      );
      return false;
    } else {
      return true;
    }
  }

  function validateBitcoinPublicKey(publicKey) {
    try {
      const network = bitcoinjs.networks.testnet;
      const ECPair = ECPairFactory(ecc);
      const publicKeyBuffer = Buffer.from(publicKey, 'hex');
      const keyPair = ECPair.fromPublicKey(publicKeyBuffer, { network });
      const address = keyPair.getAddress();
      return true;
    } catch (error) {
      return false;
    }
  }

  function validateBitcoinPrivateKey(privateKey) {
    try {
      const network = bitcoinjs.networks.testnet;
      const ECPair = ECPairFactory(ecc);
      const keyPair = ECPair.fromPrivateKey(
        Buffer.from(privateKey, "hex"),
        { network }
      );
      return true;
    } catch (error) {
      console.log('err', error);
      return false;
    }
  }

  // arr example {key: "address", value: form.address, method: "isNotEmpty}
  function validateForm(arr) {
    return !arr.map(item => {
      return this[item.method](item.key, item.value)
    }).includes(false);
  }

  return {
    isAmountNoOverERC20Balance, isAmountNoOverEtherBalance, isValueOverZero, isEthAddressValid, isNotEmpty,
    isAmountNoOverBtcBalance, isBtcAddressValid, isPrivateKey,
    validateForm, errorHandlerModule
  }
}
