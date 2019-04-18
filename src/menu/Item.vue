<template>
  <div class="item"
    @click="onClick($event)">
    <div class="item-title">{{item.title}}</div>
    <div class="item-subtitle">{{item.subtitle}}</div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { OptionItem } from './models/option-item';

export default Vue.extend({
  name: 'Item',
  props: { item: OptionItem, args: Object },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
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
</style>
