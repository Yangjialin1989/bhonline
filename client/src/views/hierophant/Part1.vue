<template>
  <div>
    <h1>part1</h1>
    
    
    
    
    
    <img v-if="btnFlag" @click="backTop" class="go-top right" style="width:30px;height:30px;" src="/static/img/backtop.png" alt="">
    
    
    
  </div>

 
</template>

<script>
  import axios from "axios"
  export default {
    data() {
      return {
        list: [],
        sortFlag: true,
        priceChecked: 'all',
        busy: true,
        page: 1,
        pagesize: 8,
        flag: false,
        priceFilter: [{
            startPrice: '0',
            endPrice: '100'
          },
          {
            startPrice: '100',
            endPrice: '500'
          },
          {
            startPrice: '500',
            endPrice: '1000'
          },
          {
            startPrice: '1000',
            endPrice: '5000'
          }
        ],
        btnFlag: false
      }

    },
    beforeMount: function() {
      if ($(window).width() < 700) {
        this.height = $(window).width() * 2 / 3 + 'px';
      } else {
        this.height = $(window).width() * 7 / 15 + 'px';
      }

    },
    methods: {
      backTop() {
        const that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
        // document.documentElement.scrollTop = document.body.scrollTop = 0
      },
      scrollToTop() {
        const that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if (that.scrollTop > 60) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }


      },

      getGoods(flag) {
        alert('hhhh')
        //http://localhost:8081/api/good
        //       传递参数 get('/goods/list',{params:{sort:1}})
        let sort = this.sortFlag ? 1 : -1
        let param = {
          sort: sort,
          priceLevel: this.priceChecked,
          page: this.page,
          pagesize: this.pagesize
        }
        axios.get('/api/goods/list', {
            params: param
          })
          .then(result => {

            // res = res.data.result
            // console.log(res)
            // this.list = res
            let res = result.data
            if (flag) {
              //第二次进入这里，分页的时候，数据追加到数据列表里面。
              this.list = this.list.concat(res.result)
              //判断当数据加载完，让数据截停


              if (res.result.length == 0) {
                this.busy = true;
              } else {
                this.busy = false
              }
            } else {
              //第一次进入这里
              this.list = res.result
              this.busy = false;
            }



          })
      }
    },

    created() {
      this.getGoods()
    }
  }
</script>

<style scoped>
  .go-top {
    position: fixed;
    bottom: 40px;
    right: 30px;

  }
</style>
