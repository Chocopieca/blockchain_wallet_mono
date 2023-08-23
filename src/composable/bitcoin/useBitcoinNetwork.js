import {computed} from "vue";
import {useBtcStore} from "@/stores/useBtcStore";

export default function useBitcoinNetwork() {
    const btcStore = useBtcStore();
    const networks = {
        mainnet: {
            name: "Mainnet",
            BCNetwork: "main",
            BJSNetwork: "bitcoin",
            BScanNetwork: "btc",
        },
        testnet: {
            name: "Testnet",
            BCNetwork: "test3",
            BJSNetwork: "testnet",
            BScanNetwork: "btc-testnet",
        },
    };

    const getSelectedNetwork = computed(() => {
        return networks[btcStore.getCurrentWallet.selectedNetwork]
    })
    const isTestnetNetwork = computed(() => {
        return getSelectedNetwork.value
            ? getSelectedNetwork.value.name === "Testnet"
            : true;
    })

    function setCurrentNetwork(network) {
        return btcStore.changeNetwork(network);
    }

    return {
        getSelectedNetwork, isTestnetNetwork, setCurrentNetwork
    }
}