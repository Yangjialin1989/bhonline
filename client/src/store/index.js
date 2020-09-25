 import Vue from 'vue'
import Vuex from 'vuex'

//use Vuex
Vue.use(Vuex)

//create Vuex
const store = new Vuex.Store({
  //状态
  state:{
    nickNameFlag:false,
    logoutFlag:false,
    nickName:'',
    num:100,
    headerImgData:'',
    commonName:'',
    _id:''
  },
  //getter,对state进行过滤,模块引入 this.$store.getters.filterNum
  getters:{
    filterNum(state){
      return state.num >=120 ? 120 : state.num
    }
  },


  //当触发下面函数，就会改变state状态 , mutation 必须是同步函数,处理同步事物
  mutations:{
    addIncrement(state,payload){
      //接收一个state作为参数，相当于上面的state
      state.num +=5

    },
    subIncrement(state){
      state.num -=5
    }
  },
  //action,异步提交函数 ,通过context对象来传递函数
  actions:{
    // addAction(context){
    //   console.log(context)
    //   setTimeout(()=>{
    //     context.commit('addIncrement',{n:5})

    //     //dispatch触发subAction,可以传递对象
    //     context.dispatch('subAction',{name:'yang',age:11})
    //   },2000)
    // },

    //结构赋值
    addAction({commit,dispatch}){
      setTimeout(()=>{
        commit('addIncrement',{n:5})
        dispatch('subAction',{name:'yang',age:11})
      })
    },


    //通过obj接收
    subAction(context,obj){
      console.log('hi sub !')
      console.log(obj)
    }
  }
})

//export store
export default store
