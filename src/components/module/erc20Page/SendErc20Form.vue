<template>
  <Transition mode="out-in">
    <div>
      <BaseLoading v-if="isLoading" />
      <form :class="transaction ? 'mb-2' : ''">
        <div class="flex-center mb-5">
          <BaseInput
            v-model="form.receiver"
            label="Receiver"
            class="mr-2"
            :error="errors.getError('address')"
            @clearError="errors.clearError('address')"
          />
          <BaseInput
            v-model="form.amount"
            label="Amount"
            class="ml-2"
            type="number"
            :error="errors.getError('amount')"
            @clearError="errors.clearError('amount')"
          />
        </div>
        <BaseButton buttonColor="#E95420" @click="submitForm">
          SEND
        </BaseButton>
      </form>
      <div v-if="getEtherscanLink" class="scan-link">
        <a
          :href="getEtherscanLink"
          target="_blank"
          class="main-black-text"
        >
          Etherscan: {{ transaction }}
        </a>
      </div>
    </div>
  </Transition>
</template>

<script>
import {defineComponent} from "vue";
import {useErc20TokenStore} from "@/stores/useErc20TokenStore";
import useValidateModule from "@/composable/useValidateModule";

export default defineComponent({
  name: "SendEtherForm",
  data() {
    return {
      isLoading: false,
      transaction: "",
      form: {
        receiver: "",
        amount: "",
      },
      errors: this.validateModule.errorHandlerModule.value,
    }
  },
  setup() {
    const erc20Token = useErc20TokenStore();
    const validateModule = useValidateModule();

    async function sendCurrency(payload) {
      return await erc20Token.sendCurrency(payload)
    }
    return {
      erc20Token, validateModule, sendCurrency
    }
  },
  methods: {
    async submitForm() {
      try {
        const payload = {
          receiver: this.form.receiver.trim(),
          amount: this.form.amount,
        }
        if (!this.validate(payload.receiver, payload.amount)) return
        this.isLoading = true;
        this.transaction = await this.sendCurrency(payload).then(res => {
          alert(res.hash);
          return res.hash;
        });
        this.form = {
          receiver: "",
          amount: "",
        };
      } catch (e) {
        console.log("SubmitForm error: ", e);
      } finally {
        this.isLoading = false;
      }
    },
    validate(receiver, amount) {
      return this.validateModule.validateForm([
        { key: "address", value: receiver, method: "isNotEmpty" },
        { key: "amount", value: amount, method: "isNotEmpty" },
        { key: "address", value: receiver, method: "isEthAddressValid" },
        { key: "amount", value: amount, method: "isValueOverZero" },
        { key: "amount", value: amount, method: "isAmountNoOverERC20Balance" },
      ])
    }
  },
  computed: {
    getEtherscanLink() {
      return this.transaction ? `https://sepolia.etherscan.io/tx/${this.transaction}` : null;
    }
  }
})
</script>

<style scoped>
.scan-link {
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 400px;
  overflow: hidden;
  cursor: pointer;
}
</style>
