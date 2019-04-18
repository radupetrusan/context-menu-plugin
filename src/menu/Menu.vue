<template>
  <div
    class="options-menu"
    v-if="visible"
    v-bind:style="style"
    @optionsmenu.prevent="">
    <Item
      v-for="item in items"
      :key="item.title"
      :item="item"
      :args="args">
    </Item>
  </div>
</template>


<script lang="ts">
import Item from "./Item.vue";
import { fitViewport } from "../utils";
import Vue from "vue";
import { OptionItem } from "./models/option-item";

export default Vue.extend({
  props: { searchBar: Boolean, searchKeep: Function },
  data() {
    return {
      x: 0,
      y: 0,
      visible: false,
      args: {},
      filter: "",
      items: [] as OptionItem[]
    };
  },
  computed: {
    style(): any {
      return {
        top: this.y + "px",
        left: this.x + "px"
      };
    }
  },
  methods: {
    show(x: number, y: number, args = {}) {
      this.visible = true;
      this.x = x + 50;
      this.y = y;
      this.args = args;
    },
    hide() {
      this.visible = false;
    },
    additem(title: string, subtitle: string, onClick: Function) {
      let items = this.items;
      const item = new OptionItem({
        title: title,
        subtitle: subtitle,
        onclick: onClick
        });
      items.push(item);
    },
    setitems(newItems: OptionItem[]) {
      this.items = newItems;
    }
  },
  updated() {
    if (this.$refs.menu) {
      [this.x, this.y] = fitViewport([this.x, this.y], this.$refs.menu);
    }
  },
  mounted() {
    this.$root.$on("show", this.show);
    this.$root.$on("hide", this.hide);
    this.$root.$on("additem", this.additem);
    this.$root.$on("setitems", this.setitems);
  },
  components: {
    Item
  }
});
</script>

<style lang="sass" scoped>
@import '../vars.sass'
@import '../common.sass'

.options-menu
  left: 0
  top: 0
  position: fixed
  padding: 10px
  width: $width
  margin-top: -20px
</style>
