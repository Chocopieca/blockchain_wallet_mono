<template>
  <button
    :class="getClasses"
    class="button main-white-text flex-center text-uppercase"
    :type="type"
    :style="{
      width: width,
      height: height,
    }"
    @click="buttonClick"
  >
    <slot></slot>
  </button>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "BaseButton",
  props: {
    buttonColor: {
      type: String,
      default: '#ffffff',
    },
    buttonColorClass: {
      type: String,
      default: 'default',
      validate(val) {
        return ["transparent", "border", "icon", "default",].includes(val);
      },
    },
    type: {
      type: String,
      default: 'button',
      validate(val) {
        return ["button", "submit"].includes(val);
      },
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '50px',
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    getButtonColor() {
      switch (this.buttonColorClass) {
        case 'transparent':
          return 'button-transparent';
        case 'border':
          return 'button-border';
        case 'chips':
          return 'button-chips';
        default:
          return 'button-default';
      }
    },
    getClasses() {
      let classString = '';
      classString += !this.disabled ? this.getButtonColor : 'button-disabled';
      return classString;
    }
  },
  methods: {
    buttonClick() {
      if(!this.disabled) {
        this.$emit('buttonClick')
      }
    }
  }
}
)
</script>

<style scoped lang="scss">
.button {
  cursor: pointer;
  white-space: nowrap;
  transition: 0.5s;
  border: 0;

  &:focus {
    font-weight: 700;
  }

  &-transparent {
    background: transparent;
    color: black;

    &:hover {
      color: grey;
    }
    &:active {
      color: #5d5d5d;
    }
  }

  &-border {
    background: linear-gradient(135deg, #989898 7%, #393939 89%);
    box-shadow:  #9a9a9a 0 5px 20px 0;
    border: 2px solid #777777;

    &:hover {
      border: 2px solid #7e7e7e;
      box-shadow:  #535353 0 5px 20px 0;
    }
    &:active {
      color: #cbcbcb;
    }
  }

  &-default {
    background: v-bind(buttonColor);
    color: var(--color-white);
    font-size: 20px;
    font-weight: bold;

    &:hover {
      box-shadow:  #535353 0 5px 20px 0;
    }
    &:active {
      color: #212121;
    }
  }

  &-disabled {
    background: v-bind(buttonColor);
    color: #000000;
    cursor: default;
  }
}
</style>
