<template>
  <div>
    <Head></Head>
    <h1>道场</h1>
    <Part5></Part5>
    <Part6></Part6>
    <Part7></Part7>
    <Foot></Foot>
  </div>
</template>

<script>
  import Head from '@/components/Head'
  import Foot from '@/components/Foot'
  import Part5 from '@/views/buddhist/Part5'
  import Part6 from '@/views/buddhist/Part6'
  import Part7 from '@/views/buddhist/Part7'
  export default {
    data(){
      return{
        
      }
    },
    methods:{
      
    },
    components:{
      Part5,
      Part6,
      Part7,
      Head,
      Foot
    }
  }
</script>

<style>
</style>
