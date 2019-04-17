<template lang="pug">
.item(
  @click="onClick($event)"
  @mouseover="showSubitems()"
  @mouseleave="timeoutHide()"
) {{item.title}} - {{item.subtitle}}
</template>

<script lang="ts">
import Vue from 'vue';
import hideMixin from "./debounceHide";
import { OptionItem } from './models/option-item';

export default Vue.extend({
  name: 'Item',
  mixins: [hideMixin('hideSubitems')],
  props: { item: OptionItem, args: Object },
  data() {
    return {
      visibleSubitems: false, 
    }
  },
  computed: {
    
  },
  methods: {
    showSubitems() {
      this.visibleSubitems = true;
      // this.cancelHide();
    },
    hideSubitems() {
      this.visibleSubitems = false;
    },
    onClick(e: any) {
      e.stopPropagation();
      
      if(this.item.onclick)
        this.item.onclick(this.args);
      this.$root.$emit('hide');
    }
  }
})
</script>

<style lang="sass" scoped>
@import '../vars.sass'
@import '../common.sass'

.item
  @extend .item
  &.hasSubitems:after
    content: '►'
    position: absolute
    opacity: 0.6
    right: 5px
    top: 5px
  .subitems
    position: absolute
    top: 0
    left: 100%
    width: $width
    .subitem
      @extend .item
</style>
