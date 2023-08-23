<template>
  <Transition mode="out-in">
    <div>
      <BaseLoading v-if="isLoading" />
      <form :class="transaction ? 'mb-2' : ''">
        <BaseInput
            v-model="form.fee"
            label="Fee"
            type="number"
            :error="errors.getError('fee')"
            @clearError="errors.clearError('fee')"
        />
        <div>Example: 0.0002</div>
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
      <div v-if="getBlockcypherLink" class="scan-link">
        <a
          :href="getBlockcypherLink"
          target="_blank"
          class="main-black-text"
        >
          Blockcypher: {{ transaction }}
        </a>
      </div>
    </div>
  </Transition>
</template>

<script>
import {defineComponent} from "vue";
import useValidateModule from "@/composable/useValidateModule";
import {useBtcStore} from "@/stores/useBtcStore";

export default defineComponent({
  name: "SendBtcForm",
  data() {
    return {
      isLoading: false,
      transaction: "",
      form: {
        fee: "",
        receiver: "",
        amount: "",
      },
      errors: this.validateModule.errorHandlerModule.value,
    }
  },
  setup() {
    const btcToken = useBtcStore();
    const validateModule = useValidateModule();

    async function sendBtc(payload) {
      return await btcToken.sendBtc(payload)
    }
    async function updateBtcBalance() {
      return await btcToken.updateBtcBalance()
    }
    return {
      btcToken, validateModule, sendBtc, updateBtcBalance
    }
  },
  methods: {
    async submitForm() {
      try {
        const payload = {
          fee: this.form.fee,
          receiver: this.form.receiver.trim(),
          amount: this.form.amount,
        }
        if (!this.validate(payload.fee, payload.receiver, payload.amount)) return
        this.isLoading = true;
        this.transaction = await this.sendBtc(payload)
            .then(res => {
              alert(res.tx.hash);
              return res.tx.hash;
            })
        await this.updateBtcBalance();
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
    validate(fee, receiver, amount) {
      return this.validateModule.validateForm([
        { key: "address", value: receiver, method: "isNotEmpty" },
        { key: "amount", value: amount, method: "isNotEmpty" },
        { key: "fee", value: fee, method: "isNotEmpty" },
        { key: "address", value: receiver, method: "isBtcAddressValid" },
        { key: "amount", value: amount, method: "isValueOverZero" },
        { key: "fee", value: fee, method: "isValueOverZero" },
        { key: "amount", value: amount, method: "isAmountNoOverBtcBalance" },
      ])
    }
  },
  computed: {
    getBlockcypherLink() {
      return this.transaction ? `https://live.blockcypher.com/btc-testnet/tx/${this.transaction}` : null;
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
