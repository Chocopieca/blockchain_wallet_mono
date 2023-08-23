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
            :error="errors.getError('amount')"
            @clearError="errors.clearError('amount')"
          />
        </div>
        <BaseButton buttonColor="#E95420" @click="submitForm">
          SEND
        </BaseButton>
      </form>
      <div
        v-if="getEtherscanLink"
        class="scan-link main-black-text"
      >
        <a
          :href="getEtherscanLink"
          target="_blank"
        >
          Etherscan: {{ transaction }}
        </a>
      </div>
    </div>
  </Transition>
</template>

<script>
import {defineComponent} from "vue";
import {useEtherJsStore} from "@/stores/useEtherJsStore";
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
    const useEtherJs = useEtherJsStore();
    const validateModule = useValidateModule();

    async function onSendEth(payload) {
      return await useEtherJs.onSendEth(payload);
    }
    async function getUserData() {
      return await useEtherJs.getUserData();
    }

    return {useEtherJs, validateModule, onSendEth, getUserData};
  },
  methods: {
    async submitForm() {
      try {
        const payload = {
          receiver: this.form.receiver,
          amount: this.form.amount,
        }
        if (!this.validate(payload.receiver, payload.amount)) return
        this.isLoading = true;
        this.transaction = await this.onSendEth(payload).then(res => {
          alert(res.hash);
          return res.hash;
        });
        await this.getUserData();
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
        { key: "amount", value: amount, method: "isAmountNoOverEtherBalance" },
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
