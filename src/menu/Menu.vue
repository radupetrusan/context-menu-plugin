<template>
  <div
    id="optionsmenu"
    class="options-menu"
    v-if="visible"
    v-bind:style="style"
    v-on:wheel="wheel($event)"
    @optionsmenu.prevent
  >
    <div class="menu-title">Choose an option</div>
    <div class="menu-tabs">
      <div
        class="menu-tab"
        v-for="tab in categories"
        v-bind:key="tab"
        v-bind:class="{'active-tab': isActiveTab(tab)}"
        v-on:click="activeTab = tab"
      >{{tab}}</div>
    </div>
    <div class="menu-items">
      <Item v-for="item in filtered" :key="item.title" :item="item" :args="args"></Item>
    </div>
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
      items: [] as OptionItem[],
      categories: [] as string[],
      activeTab: ""
    };
  },
  computed: {
    style(): any {
      return {
        top: this.y + "px",
        left: this.x + "px"
      };
    },
    filtered(): OptionItem[] {
      return this.items.filter(i => i.category === this.activeTab);
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
      if (!!newItems) {
        this.items = newItems;
        this.categories = Array.from(new Set(newItems.map(i => i.category)));
        if (this.categories.length) {
          this.activeTab = this.categories[0];
        }
      } else {
        this.items = [];
      }
    },
    isActiveTab(tab: string): boolean {
      return this.activeTab === tab;
    },
    wheel(e: MouseEvent) {
      e.stopPropagation();
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

  .menu-tabs
    width: 100%
    display: flex

    .menu-tab
      flex-grow: 1
      flex-basis: 0
      opacity: 0.6
      cursor: pointer

      &.active-tab
        opacity: 1
        border-bottom: 1px solid white
</style>
