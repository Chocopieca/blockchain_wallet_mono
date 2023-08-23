import { defineComponent } from "vue";
import { useRoute } from "vue-router";

const initBaseScripts = {
  install(app) {
    app.mixin(
      defineComponent({
        data() {
          return {
            breakpointWidth: document.documentElement.offsetWidth,
          };
        },
        created() {
          window.addEventListener("resize", this.handleResize);
        },
        unmounted() {
          window.removeEventListener("resize", this.handleResize);
        },
        computed: {
          definePage() {
            const routeName = useRoute().name?.toString() ?? "";
            return routeName
              ? routeName[0].toUpperCase() + routeName.slice(1)
              : "Default Page";
          },
        },
        methods: {
          handleResize() {
            return (this.breakpointWidth =
              document.documentElement.offsetWidth);
          },
          getFontSize(weight, sizes) {
            if (sizes.length === 5) {
              if (this.breakpointWidth >= 1904) {
                return `size${sizes[0]}-weight${weight}`;
              } else if (
                this.breakpointWidth < 1904 &&
                this.breakpointWidth >= 1264
              ) {
                return `size${sizes[1]}-weight${weight}`;
              } else if (
                this.breakpointWidth < 1264 &&
                this.breakpointWidth >= 960
              ) {
                return `size${sizes[2]}-weight${weight}`;
              } else if (
                this.breakpointWidth < 960 &&
                this.breakpointWidth >= 600
              ) {
                return `size${sizes[3]}-weight${weight}`;
              } else if (this.breakpointWidth < 600) {
                return `size${sizes[4]}-weight${weight}`;
              }
            }
          },
        },
      })
    );
  },
};

export default initBaseScripts;
