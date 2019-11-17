<template>
  <div>
    <Head></Head>
    <h1>导师</h1>
    <Part1></Part1>
    <Part2></Part2>
    <Part3></Part3>
    <Part4></Part4>
    <Foot></Foot>
  </div>
</template>

<script>
  import Head from '@/components/Head'
  import Foot from '@/components/Foot'
  import Part1 from '@/views/hierophant/Part1'
  import Part2 from '@/views/hierophant/Part2'
  import Part3 from '@/views/hierophant/Part3'
  import Part4 from '@/views/hierophant/Part4'
  export default {
    data(){
      return{

      }
    },
    methods:{

    },
    components:{
      Part1,
      Part2,
      Part3,
      Part4,
      Head,
      Foot
    }
  }
</script>

<style>
</style>
