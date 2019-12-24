<template>
  <div>
    <h2>加减法计算器</h2>
    <div>
      <input type="button" @click="subHandle()" value="-">
      <span>{{ num }}</span>
      <span>{{ num2 }}</span>
      <input type="button" @click="addHandle()" value="+">
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {

      }
    },
    //时时计算属性
    computed:{
      num(){
        return this.$store.state.num
      },
      num2(){
        return this.$store.getters.filterNum
      }
    },
    methods:{
      addHandle(){
        //mutations
       // this.$store.commit('addIncrement',{name:'stark',age:11})
        //actions
        this.$store.dispatch('addAction')
      },
      subHandle(){
        this.$store.commit('subIncrement')
      }
    }
  }
</script>

<style>
</style>
