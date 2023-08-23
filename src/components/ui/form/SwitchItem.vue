<template>
  <div class="d-inline-block">
    <label class="switch">
      <input type="checkbox" v-model="switchValue" />
      <span class="slider round"></span>
      <span v-if="title" class="title">{{ title }}</span>
    </label>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SwitchItem",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  computed: {
    switchValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
});
</script>

<style scoped lang="scss">
.switch {
  position: relative;
  display: inline-block;
  min-width: 40px;
  height: 24px;

  input {
    opacity: 0;
    width: 0 !important;
    height: 0 !important;

    &:checked + .slider {
      background-color: #E95420;
    }

    &:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }

    &:checked + .slider:before {
      -webkit-transform: translateX(16px);
      -ms-transform: translateX(16px);
      transform: translateX(16px);
    }

    &:checked + .slider + .title {
      color: #000;
    }
  }

  & .title {
    padding-left: 50px;
    color: #ccc;
  }
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  &.round {
    border-radius: 34px;
    max-width: 40px;
    &:before {
      border-radius: 50%;
    }
  }
}
</style>
