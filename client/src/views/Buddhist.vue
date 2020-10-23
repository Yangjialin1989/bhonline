<template>
  <div>
    <Head v-if="flagHead"></Head>
    <div class="bg">
      <el-row :gutter="24">
        <el-col :span="navSpans" :offset="navOffsets">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item><img width="35" height="35" src="../assets/img/brand.png" alt=""></el-menu-item>
            <el-menu-item index="1" @click="showDataIndex">数据首页</el-menu-item>
            <el-menu-item index="2" @click="showSearch">列表</el-menu-item>
            <el-menu-item index="3">排行榜</el-menu-item>
            <el-menu-item index="4">地图</el-menu-item>
            <el-menu-item>
              <div>
                <el-input v-if="show2" @input="change($event)" placeholder="姓名查找数据" v-model="search" class="input-search">

                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </el-menu-item>
            <el-menu-item>
              <el-button :show="show3" type="danger" :disabled="disabled" @click="addDatas()">入场登记</el-button>
              <el-button  type="danger" :disabled="disabled" @click="leave()">离场登记</el-button>
         
            </el-menu-item>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>


      <!-- 列表 -->
      <el-row :gutter="24">
        <el-col :span="20" :offset="2" v-if="show00">

        </el-col>
        <el-col :span="20" :offset="2" v-if="show00">
          <el-table
           :data="infoAllList.filter(data => !search || data.commonName.toLowerCase().includes(search.toLowerCase()))"
           ref="filterTable"
           show-summary
        
           stripe
           style="width: 100%">
               <el-table-column fixed label="序号"
                  type="index"
                 :index="indexMethod">
               </el-table-column>
              
               <el-table-column fixed width="70"
                prop="commonName" label="姓名" >
               </el-table-column>
               <el-table-column width="50"
                prop="dharmaName" label="法名" >
               </el-table-column>
               <el-table-column width="50"
                prop="gender" label="性别" >
               </el-table-column>
               <el-table-column width="210"
                prop="source" label="来源地" >
               </el-table-column>
               <el-table-column width="100" column-key="arrivalDate1" 
                :filters="[{text: '2020-09-26', value: '2020-09-26'},{text: '2020-09-27', value: '2020-09-27'},{text: '2020-09-28', value: '2020-09-28'},{text: '2020-09-29', value: '2020-09-29'},{text: '2020-09-30', value: '2020-09-30'}, {text: '2020-10-01', value: '2020-10-01'}, {text: '2020-10-02', value: '2020-10-02'}, {text: '2020-10-03', value: '2020-10-03'},{text: '2020-10-04', value: '2020-10-04'},{text: '2020-10-05', value: '2020-10-05'},{text: '2020-10-06', value: '2020-10-06'}]"
                 :filter-method="filterHandler"
                prop="arrivalDate1" label="到达日期" >
               </el-table-column>
                <el-table-column  width="100" column-key="departureDate1"
                :filters="[{text: '2020-10-01', value: '2020-10-01'},{text: '2020-10-02', value: '2020-10-02'},{text: '2020-10-03', value: '2020-10-03'},{text: '2020-10-04', value: '2020-10-04'},{text: '2020-10-05', value: '2020-10-05'}, {text: '2020-10-06', value: '2020-10-06'}, {text: '2020-10-07', value: '2020-10-07'}, {text: '2020-10-08', value: '2020-10-08'},{text: '2020-10-09', value: '2020-10-09'},{text: '2020-10-10', value: '2020-10-10'},{text: '2020-10-11', value: '2020-10-11'}]"
                 :filter-method="filterHandler"
                prop="departureDate1" label="预离日期" >
               </el-table-column>
               <el-table-column
                prop="departureDate3" label="实离日期" >
               </el-table-column>
                <el-table-column
                prop="days" label="登记天数" >
               </el-table-column>  
               <el-table-column
                prop="day2" label="差异天数" >
               </el-table-column>  

               <el-table-column
                prop="moneyFunc" label="押还方式" >
               
               </el-table-column>     
                <el-table-column
                prop="causalMoney" label="预交因果" width="80">
               </el-table-column>          
               <el-table-column
                prop="phoneNumber" label="电话" >
               </el-table-column>
               <el-table-column
                prop="emergencyPhone" label="紧急电话" >
               </el-table-column>
               <el-table-column
                prop="references" label="介绍人">
               </el-table-column>
               <el-table-column
                prop="guarantor" label="担保人" >
               </el-table-column>
                
                <el-table-column
                prop="agent" label="经办人">
            
              
               </el-table-column>
                <el-table-column  width="50"
                prop="isOK" label="状态" > </el-table-column> 
         </el-table>







        </el-col>
      </el-row>



      <!-- 数据首页 -->
      <el-row :gutter="24">
        <el-col :span="navSpans" :offset="navOffsets" v-if="show1">
          <van-notice-bar mode="closeable" left-icon="volume-o" :text="textNote1">
            <marquee width="260%;" behavior="" direction="">
请如实填写！若有不明处，请联系管理员！谢谢配合！  </marquee>
          </van-notice-bar>

          <el-image style="width:100%; height: 100%" :src="url"></el-image>

        </el-col>
      </el-row>
      <!-- 离场登记页面 -->
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form style="margin-top:20px;" v-if="show0" :model="ruleForm0" :rules="rules0" ref="ruleForm0" class="demo-ruleForm"
            label-width="100px" label-position="right">
            <el-form-item label="姓名" prop="commonName">
              <el-col :span="8">
                <el-input v-model="ruleForm0.commonName" @change="getInfo()"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="法名" prop="dharmaName">
              <el-col :span="8">
                <el-input  :disabled="edit" v-model="ruleForm0.dharmaName"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="预离时间" class="i" required>
              <el-col :span="10">
                <el-form-item prop="departureDate1">
                  <el-date-picker  :disabled="edit" :editable="false" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期"
                    v-model="ruleForm0.departureDate1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="7">
                <el-form-item prop="departureDate2">
                  <el-time-picker  :disabled="edit" placeholder="选择时间" v-model="ruleForm0.departureDate2" style="width: 100%;"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="登记天数" prop="days">
              <el-col :span="7">
                <el-input  :disabled="edit" v-model="ruleForm0.days"></el-input>
              </el-col>
            </el-form-item>
           <el-form-item label="实离时间" class="i" required>
              <el-col :span="10">
                <el-form-item prop="departureDate3">
                  <el-date-picker @change="Days1" :editable="false" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期"
                    v-model="ruleForm0.departureDate3" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="7">
                <el-form-item prop="departureDate4">
                  <el-time-picker placeholder="选择时间" v-model="ruleForm0.departureDate4" style="width: 100%;"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="实住天数" prop="day2">
              <el-col :span="8">
                <el-input v-model="ruleForm0.day2"></el-input>
              </el-col>
            </el-form-item>
           
            <el-form-item label="差异天数" prop="">
              <el-col :span="8">
                <el-input v-model="daysNote1"></el-input>
              </el-col>
            </el-form-item> 
            <el-form-item label="预交因果钱" prop="causalMoney">
              <el-col :span="8">
                <el-input  :disabled="edit" v-model="ruleForm0.causalMoney"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="押金去向" prop="moneyFunc">
              <el-col :span="18">
                <el-radio-group @change="moneyF()" v-model="ruleForm0.moneyFunc">
                     <el-radio-button label="返还本人"></el-radio-button>
                    <el-radio-button label="转为因果"></el-radio-button>
                        <el-radio-button label="转为供养"></el-radio-button>
                 </el-radio-group>    </el-col>
            </el-form-item>
            <el-form-item label="应返" prop="">
              <el-col :span="8">
                <el-input v-model="money"></el-input>
                <el-tag type="warning">返还金额自动计算，如有差异请告知！负数为应补交，正数为应返还！</el-tag>
              </el-col>

            </el-form-item>
            <el-form-item label="登记人" prop="agent1">
              <el-col :span="8">
                <el-input v-model="ruleForm0.agent1"></el-input>
              </el-col>
            </el-form-item>
           <el-form-item>
           <el-col :span="20" offset="2">
            <el-button :disabled="edit1" type="primary" @click="submitForm('ruleForm0')">提交</el-button>
            <el-button @click="resetForm('ruleForm0')">重置</el-button></el-col>
           </el-form-item>

          </el-form>
        </el-col>
      </el-row> 
      <!-- 入场登记页面 -->
      <el-row>

        <el-col span="24" offset="0" v-if="show3">
          <van-notice-bar mode="closeable" left-icon="volume-o" :text="textNote2">
            <marquee width="300%;" behavior="" direction="">{{ textNote2 }}</marquee>
          </van-notice-bar>

          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="基本信息填写"></el-step>
            <el-step title="物品领用"></el-step>
            <el-step title="路径登记"></el-step>
          </el-steps>

          <!-- 表单 -->
          <el-row>
            <el-col :span="20" offset="2" style="margin-top:10px;">
              <el-divider v-if="showForm1" style="width:10rem;" content-position="left"><i style="font-weight:700;font-size:14px;color:#DAA520;">基本信息填写：</i></el-divider>
            </el-col>
          </el-row>
          <el-form style="margin-top:10px;" v-if="showForm1" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm"
            label-width="100px" label-position="right">

            <el-form-item label="姓名" prop="commonName">

              <el-col :span="8">
                <el-input v-model="ruleForm.commonName" class="i" @change="commonNameChange"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="法名" prop="dharmaName">
              <el-col :span="8">
                <el-input v-model="ruleForm.dharmaName" class="i"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="性别" prop="gender">
              <el-col :span="6">
                <el-radio-group v-model="ruleForm.gender" class="i">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-col>
            </el-form-item>

            <el-form-item label="来源地" prop="source">
              <el-col :span="8">
                <el-cascader style="width:4.2rem;" ref="myCascader2" v-model="ruleForm.source" placeholder="请选择"
                  :options="options2" clearable @change="areaHandleChange2"></el-cascader>

              </el-col>
            </el-form-item>

            <el-form-item label="联系电话" prop="phoneNumber">
              <el-col :span="8">
                <el-input v-model="ruleForm.phoneNumber" class="i"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="身份证号码" prop="IdNumber">
              <el-col :span="14">
                <el-input v-model="ruleForm.IdNumber" class="i"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="到达时间" class="i" required>
              <el-col :span="8">
                <el-form-item prop="arrivalDate1">
                  <el-date-picker :editable="false" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期"
                    v-model="ruleForm.arrivalDate1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="8">
                <el-form-item prop="arrivalDate2">
                  <el-time-picker placeholder="选择时间" v-model="ruleForm.arrivalDate2" style="width: 100%;"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="预离时间" class="i" required>
              <el-col :span="8">
                <el-form-item prop="departureDate1">
                  <el-date-picker @change="Days" :editable="false" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期"
                    v-model="ruleForm.departureDate1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="8">
                <el-form-item prop="departureDate2">
                  <el-time-picker placeholder="选择时间" v-model="ruleForm.departureDate2" style="width: 100%;"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="介绍人" prop="references">
              <el-col :span="8">
                <el-input v-model="ruleForm.references" class="i" placeholder="新人需填写"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="担保人" prop="guarantor">
              <el-col :span="8">
                <el-input v-model="ruleForm.guarantor" class="i" placeholder="新人需填写"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="应急电话" prop="emergencyPhone">
              <el-col :span="8">
                <el-input v-model="ruleForm.emergencyPhone" class="i"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="因果钱" prop="causalMoney" class="i">
              <el-col :span="3">
                <el-input v-model="ruleForm.causalMoney"></el-input>
              </el-col>
              <el-col class="line" :span="1">=</el-col>
              <el-col :span="10">

                <el-input v-model="ruleForm.days" :placeholder="daysNote">
                  <template slot="append">50元/天</template>
                </el-input>
              </el-col>
              <el-col class="line" :span="5">+100元押金</el-col>


            </el-form-item>
            <el-col :span="17" :offset="5">
              <el-alert show-icon center title="自动计算金额，如有差错手动填写。" type="warning">
              </el-alert>
              <p class="text2"></p>
            </el-col>





            <el-form-item label="经办人" prop="agent">
              <el-col :span="8">
                <el-input v-model="ruleForm.agent" class="i"></el-input>
              </el-col>

            </el-form-item>

            <el-form-item>
              <el-col :span="17" :offset="0">
                <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-col>
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="20" offset="2" style="margin-top:10px;">
              <el-divider v-if="showForm1" style="width:10rem;" content-position="left"></el-divider>
            </el-col>
          </el-row>








          <!-- 物品领用-->
          <el-col :span="20" offset="2" style="margin-top:10px;">
              <el-divider v-if="showForm2" style="width:10rem;" content-position="left"><i style="font-weight:700;font-size:14px;color:#DAA520;">物品领用：</i></el-divider>
            </el-col>
         <el-col :span="20" offset="2" >
         <tree-transfer  v-if="showForm2" :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}"      
                    @addBtn='add' @removeBtn='remove' :mode='mode' height='540px' filter openAll>
                  </tree-transfer>
          </el-col>

        <el-col :span="20" offset="2" >
         <el-button type="primary" @click.native="submitForm2" v-if="showForm2">下一步 </el-button>
        </el-col>
        <el-col :span="20" offset="2" style="margin-top:10px;">
              <el-divider v-if="showForm2" style="width:10rem;" content-position="left"></el-divider>
        </el-col>




        

          <!-- 路径登记-->
          <el-col :span='24' v-if="show100">
            <el-col :span="20" offset="2" style="margin-bottom:10px;">
              <el-divider style="width:10rem;" content-position="left"><i style="font-weight:700;font-size:14px;color:#DAA520;">来时路径登记：</i></el-divider>
            </el-col>
            <p style="margin-top:50px;font-size:18px;color:red;">请先选择出行方式：</p>
            

            <!--
            <el-radio-group   @change = "showForm"  v-model="func" >
                     <el-radio-button label="1">直达</el-radio-button>
                    <el-radio-button  label="2">中转1次</el-radio-button>
                  <el-radio-button label="3">中转2次</el-radio-button>
             </el-radio-group>
             -->

             <el-button @click="showForm33" type="primary" plain>直达</el-button>
             <el-button @click="showForm44" type="primary" plain>中转1次</el-button>
             <el-button @click="showForm55" type="primary" plain>中转2次</el-button>
 
            
            <!--直达表单-->
            <el-form style="margin-top:10px;" v-if="showForm3" :model="ruleForm3" :rules="rules3" ref="ruleForm3" class="demo-ruleForm"
              label-width="100px" label-position="right">
              

              <el-form-item label="出发时间" prop="toDates">
                <el-col :span="10">
                 <el-date-picker v-model="ruleForm3.toDates" style="width:5rem;margin-top:10px;" type="datetime" placeholder="出发日期时间" align="right"
                  :picker-options="pickerOptions" >
                  </el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item label="出发地" prop="toPlace">
                <el-col :span="10">
                <el-cascader style="width:5rem;margin-top:5px;" ref="myCascader" v-model="ruleForm3.toPlace" placeholder="请选择出发地" :options="options4"
                clearable @change="areaHandleChange" ></el-cascader>
                </el-col>
              </el-form-item>
             <!--
              <el-form-item label="交通工具" prop="toTrafficTools">
                <el-col :span="10">
                  <el-select style="width:5rem;margin-top:5px;" v-model="ruleForm3.toTrafficTools" placeholder="请选择交通工具" >
                  <el-option v-for="item in trafficOptions" :key="item.value" :label="item.label" :value="item.value">
                 </el-option>
                  </el-select>
                </el-col>
        

              </el-form-item>
              -->
              <el-form-item label="交通工具" prop="toTrafficTools">
              <el-col :span="15">
                  <el-radio-group v-model="ruleForm3.toTrafficTools" >
                   <el-radio :label="1">火车</el-radio>
                   <el-radio :label="2">飞机</el-radio>
                   <el-radio :label="3">汽车</el-radio>
           
                  </el-radio-group>
                </el-col>
                  <el-col :span="15">
                  <el-radio-group v-model="ruleForm3.toTrafficTools"  >
                  <el-radio :label="4">轮船</el-radio>
                   <el-radio :label="5">租车</el-radio>
                   <el-radio :label="6">私车</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>

              <el-form-item label="车次" prop="trafficNumber" >
                <el-col :span="10">
                 <el-input v-model="ruleForm3.trafficNumber"  style="width:5rem;margin-top:5px;" placeholder="请输入车/班次,私家车及出租车可以不填" >
                 </el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="到达时间" prop="arriveDates">
                <el-col :span="10">
                  <el-date-picker v-model="ruleForm3.arriveDates" style="width:5rem;margin-top:10px;" type="datetime" placeholder="到达时日期时间" align="right"
                  :picker-options="pickerOptions" >
                  </el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item label="目的地" prop="arrivePlace">
                <el-col :span="10">
                  <el-cascader style="width:5rem;margin-top:5px;" ref="myCascader1" v-model="ruleForm3.arrivePlace" placeholder="请选择目的地" :options="options5"
                  clearable @change="areaHandleChange1"></el-cascader>

                </el-col>
              </el-form-item>
              




           

              
              <el-form-item>
               <el-col :span="17" :offset="0">
             
                     <el-button type="primary" @click="submitForm('ruleForm3')" plain :disabled="disabledRuleForm3">下一步</el-button>
                   <el-button @click="resetForm('ruleForm3')" >重置</el-button>
                </el-col>
              </el-form-item>
              
            </el-form>


             <!--中转1次表单-->
              <el-form style="margin-top:10px;" v-if="showForm4" :model="ruleForm4" :rules="rules4" ref="ruleForm4" class="demo-ruleForm"
              label-width="100px" label-position="right">
              
              
              <el-form-item label="出发时间" prop="toDates">
                <el-col :span="10">
                 <el-date-picker v-model="ruleForm4.toDates" style="width:5rem;margin-top:10px;" type="datetime" placeholder="出发日期时间" align="right"
                  :picker-options="pickerOptions" >
                  </el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item label="出发地" prop="toPlace">
                <el-col :span="10">
                <el-cascader style="width:5rem;margin-top:5px;" ref="myCascader3" v-model="ruleForm4.toPlace" placeholder="请选择出发地" :options="options6"
                clearable @change="areaHandleChange3" ></el-cascader>
                </el-col>
              </el-form-item>    

              <el-form-item label="到中转工具" prop="toTrafficTools1">
              <el-col :span="15">
                  <el-radio-group v-model="ruleForm4.toTrafficTools1" >
                   <el-radio :label="1">火车</el-radio>
                   <el-radio :label="2">飞机</el-radio>
                   <el-radio :label="3">汽车</el-radio>
           
                  </el-radio-group>
                </el-col>
                  <el-col :span="15">
                  <el-radio-group v-model="ruleForm4.toTrafficTools1"  >
                      <el-radio :label="4">轮船</el-radio>
                   <el-radio :label="5">租车</el-radio>
                   <el-radio :label="6">私车</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>

              <el-form-item label="到中转车次" prop="trafficNumber1" >
                <el-col :span="10">
                 <el-input v-model="ruleForm4.trafficNumber1"  style="width:5rem;margin-top:5px;" placeholder="请输入车/班次,私家车及出租车可以不填" >
                 </el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="中转地" prop="toPlace1">
                <el-col :span="10">
                <el-cascader style="width:5rem;margin-top:5px;" ref="myCascader4" v-model="ruleForm4.toPlace1" placeholder="请选择出发地" :options="options7"
                clearable @change="areaHandleChange4" ></el-cascader>
                </el-col>
              </el-form-item>

              <el-form-item label="到目的地工具" prop="toTrafficTools2">
              <el-col :span="15">
                  <el-radio-group v-model="ruleForm4.toTrafficTools2" >
                   <el-radio :label="1">火车</el-radio>
                   <el-radio :label="2">飞机</el-radio>
                   <el-radio :label="3">汽车</el-radio>
           
                  </el-radio-group>
                </el-col>
                  <el-col :span="15">
                  <el-radio-group v-model="ruleForm4.toTrafficTools2"  >
                      <el-radio :label="4">轮船</el-radio>
                   <el-radio :label="5">租车</el-radio>
                   <el-radio :label="6">私车</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>

              <el-form-item label="到目的地车次" prop="trafficNumber2" >
                <el-col :span="10">
                 <el-input v-model="ruleForm4.trafficNumber"  style="width:5rem;margin-top:5px;" placeholder="请输入车/班次,私家车及出租车可以不填" >
                 </el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="到达时间" prop="arriveDates">
                <el-col :span="10">
                  <el-date-picker v-model="ruleForm4.arriveDates" style="width:5rem;margin-top:10px;" type="datetime" placeholder="到达时日期时间" align="right"
                  :picker-options="pickerOptions" >
                  </el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item label="目的地" prop="arrivePlace">
                <el-col :span="10">
                  <el-cascader style="width:5rem;margin-top:5px;" ref="myCascader5" v-model="ruleForm4.arrivePlace" placeholder="请选择目的地" :options="options8"
                  clearable @change="areaHandleChange5"></el-cascader>

                </el-col>
              </el-form-item>

              <el-form-item>
               <el-col :span="17" :offset="0">
             
                   <el-button type="primary" @click="submitForm('ruleForm4')" plain :disabled="disabledRuleForm4">提交</el-button>
                   <el-button @click="resetForm('ruleForm4')"  >重置</el-button>
                </el-col>
              </el-form-item>

            </el-form> 
            


            <!--中转2次表单-->
              <el-form style="margin-top:10px;" v-if="showForm5" :model="ruleForm5" :rules="rules5" ref="ruleForm5" class="demo-ruleForm"
              label-width="100px" label-position="right">
              
              
              <el-form-item label="出发时间" prop="toDates">
                <el-col :span="10">
                 <el-date-picker v-model="ruleForm5.toDates" style="width:5rem;margin-top:10px;" type="datetime" placeholder="出发日期时间" align="right"
                  :picker-options="pickerOptions" >
                  </el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item label="出发地" prop="toPlace">
                <el-col :span="10">
                <el-cascader style="width:5rem;margin-top:5px;" ref="myCascader6" v-model="ruleForm5.toPlace" placeholder="请选择出发地" :options="options9"
                clearable @change="areaHandleChange6" ></el-cascader>
                </el-col>
              </el-form-item>

              <el-form-item label="到中转1工具" prop="toTrafficTools1">
              <el-col :span="15">
                  <el-radio-group v-model="ruleForm5.toTrafficTools1" >
                   <el-radio :label="1">火车</el-radio>
                   <el-radio :label="2">飞机</el-radio>
                   <el-radio :label="3">汽车</el-radio>
           
                  </el-radio-group>
                </el-col>
                  <el-col :span="15">
                  <el-radio-group v-model="ruleForm5.toTrafficTools1"  >
                      <el-radio :label="4">轮船</el-radio>
                   <el-radio :label="5">租车</el-radio>
                   <el-radio :label="6">私车</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>

              <el-form-item label="到中转1车次" prop="trafficNumber1" >
                <el-col :span="10">
                 <el-input v-model="ruleForm5.trafficNumber1"  style="width:5rem;margin-top:5px;" placeholder="请输入车/班次,私家车及出租车可以不填" >
                 </el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="中转地1" prop="toPlace1">
                <el-col :span="10">
                <el-cascader style="width:5rem;margin-top:5px;" ref="myCascader7" v-model="ruleForm5.toPlace1" placeholder="请选择出发地" :options="options10"
                clearable @change="areaHandleChange7" ></el-cascader>
                </el-col>
              </el-form-item>

              <el-form-item label="到中转2工具" prop="toTrafficTools2">
              <el-col :span="15">
                  <el-radio-group v-model="ruleForm5.toTrafficTools2" >
                   <el-radio :label="1">火车</el-radio>
                   <el-radio :label="2">飞机</el-radio>
                   <el-radio :label="3">汽车</el-radio>
           
                  </el-radio-group>
                </el-col>
                  <el-col :span="15">
                  <el-radio-group v-model="ruleForm5.toTrafficTools2"  >
                      <el-radio :label="4">轮船</el-radio>
                   <el-radio :label="5">租车</el-radio>
                   <el-radio :label="6">私车</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>

              <el-form-item label="到中转2车次" prop="trafficNumber2" >
                <el-col :span="10">
                 <el-input v-model="ruleForm5.trafficNumber2"  style="width:5rem;margin-top:5px;" placeholder="请输入车/班次,私家车及出租车可以不填" >
                 </el-input>
                </el-col>
              </el-form-item>

               <el-form-item label="中转地2" prop="toPlace20">
                <el-col :span="10">
                <el-cascader style="width:5rem;margin-top:5px;" ref="myCascader8" v-model="ruleForm5.toPlace20" placeholder="请选择出发地" :options="options12"
                clearable @change="areaHandleChange8" ></el-cascader>
                </el-col>
              </el-form-item>

            

              <el-form-item label="到目的地工具" prop="toTrafficTools3">
              <el-col :span="15">
                  <el-radio-group v-model="ruleForm5.toTrafficTools3" >
                   <el-radio :label="1">火车</el-radio>
                   <el-radio :label="2">飞机</el-radio>
                   <el-radio :label="3">汽车</el-radio>
           
                  </el-radio-group>
                </el-col>
                  <el-col :span="15">
                  <el-radio-group v-model="ruleForm5.toTrafficTools3"  >
                      <el-radio :label="4">轮船</el-radio>
                   <el-radio :label="5">租车</el-radio>
                   <el-radio :label="6">私车</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>

              <el-form-item label="到达时间" prop="arriveDates">
                <el-col :span="10">
                  <el-date-picker v-model="ruleForm5.arriveDates" style="width:5rem;margin-top:10px;" type="datetime" placeholder="到达时日期时间" align="right"
                  :picker-options="pickerOptions" >
                  </el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item label="目的地" prop="arrivePlace">
                <el-col :span="10">
                  <el-cascader style="width:5rem;margin-top:5px;" ref="myCascader9" v-model="ruleForm5.arrivePlace" placeholder="请选择目的地" :options="options11"
                  clearable @change="areaHandleChange9"></el-cascader>

                </el-col>
              </el-form-item>
              <el-form-item>
               <el-col :span="17" :offset="0">
             
                   <el-button type="primary" @click="submitForm('ruleForm5')" plain :disabled="disabledRuleForm5">提交</el-button>
                   <el-button @click="resetForm('ruleForm5')"  >重置</el-button>
                </el-col>
              </el-form-item>
            </el-form> 

            


          
           
             <el-col :span="20" offset="2" style="margin-top:10px;">
              <el-divider v-if="showForm3" style="width:10rem;" content-position="left"></el-divider>
              <el-divider v-if="showForm4" style="width:10rem;" content-position="left"></el-divider>
              <el-divider v-if="showForm5" style="width:10rem;" content-position="left"></el-divider>
            </el-col>
            






            <el-row :gutter="0">
              <!--直达卡片-->
              <el-col :span="20" offset="2" v-if="showCard1">
                <el-card shadow="hover" style="border-radius:10px;height:130px;padding-right:5px;padding-left:5px; background:#F0E687;margin-top:100px;">
                  <p class="left" style="font-size:16px;"><a>{{this.ruleForm3.toPlace}}</a><i class="el-icon-location-outline"></i></p>
                  <i class="center" >&nbsp;{{this.ruleForm3.trafficNumber}}</i>
               
                  <p class="right" style="font-size:16px;"><i class="el-icon-location-outline"></i><a>{{this.ruleForm3.arrivePlace}}</a>
                  </p>
                  <el-col :span="24">
                    <p class="left" style="font-weight:800;line-height:50px;margin-left:10px;">{{this.ruleForm3.toTime}}</p>
                    <p class="right" style="font-weight:800;line-height:50px;margin-right:10px;">{{this.ruleForm3.arriveTime}}</p>
                  </el-col>

                  <p class="center" style="margin-top:4px;">

                    <el-image style="margin-top:-100px;" :src="fonticonSrc" fit="contain"></el-image>

                  </p>
                  <el-col :span="24">
                    <p class="left" style="font-weight:200;line-height:20px;margin-left:10px;">{{this.ruleForm3.toDate}}</p>
                    <p class="right" style="font-weight:200;line-height:20px;margin-right:10px;">{{this.ruleForm3.arriveDate}}</p>
                  </el-col>

                </el-card>
              </el-col>

              <!--中转1次卡片-->
              <el-col :span="20" offset="2" v-if="showCard2">
                <el-card shadow="hover" style="border-radius:10px;height:130px;padding-right:5px;padding-left:5px; background:#F0E687;margin-top:100px;">
                  <p class="left" style="font-size:16px;"><a>{{this.ruleForm4.toPlace}}</a><i class="el-icon-location-outline"></i></p>
                  <i class="center">&nbsp;{{this.ruleForm4.trafficNumber1}}</i>
                  <p class="right" style="font-size:16px;"><i class="el-icon-location-outline"></i><a>{{this.ruleForm4.toPlace1}}</a>
                  </p>
                  <el-col :span="24">
                    <p class="left" style="font-weight:800;line-height:50px;margin-left:10px;">{{this.ruleForm4.toTime}}</p>
                    <p class="right" style="font-weight:800;line-height:50px;margin-right:10px;"></p>
                  </el-col>

                  <p class="center" style="margin-top:4px;">

                    <el-image style="margin-top:-100px;" :src="fonticonSrc1" fit="contain"></el-image>

                  </p>
                  <el-col :span="24">
                    <p class="left" style="font-weight:200;line-height:20px;margin-left:10px;">{{this.ruleForm4.toDate}}</p>
                    <p class="right" style="font-weight:200;line-height:20px;margin-right:10px;"></p>
                  </el-col>

                </el-card>
              </el-col>

              <el-col :span="24" v-if="showCard2">
                <p class="center" style="margin-top:4px;">

                  <el-image style="" src="/static/img/fonticon (9).png" fit="contain"></el-image>

                </p>
              </el-col>
              <el-col :span="20" offset="2" v-if="showCard2">
                <el-card shadow="hover" style="border-radius:10px;height:130px;padding-right:5px;padding-left:5px; background:#F0E687;margin-top:10px;">
                  <p class="left" style="font-size:16px;"><a>{{this.ruleForm4.toPlace1}}</a><i class="el-icon-location-outline"></i></p>
                  <i class="center">&nbsp;{{this.ruleForm4.trafficNumber2}}</i>
                  <p class="right" style="font-size:16px;"><i class="el-icon-location-outline"></i><a>{{this.ruleForm4.arrivePlace}}</a>
                  </p>
                  <el-col :span="24">
                    <p class="left" style="font-weight:800;line-height:50px;margin-left:10px;"></p>
                    <p class="right" style="font-weight:800;line-height:50px;margin-right:10px;">{{this.ruleForm4.arriveTime}}</p>
                  </el-col>

                  <p class="center" style="margin-top:4px;">

                    <el-image style="margin-top:-100px;" :src="fonticonSrc2" fit="contain"></el-image>

                  </p>
                  <el-col :span="24">
                    <p class="left" style="font-weight:200;line-height:20px;margin-left:10px;"></p>
                    <p class="right" style="font-weight:200;line-height:20px;margin-right:10px;">{{this.ruleForm4.arriveDate}}</p>
                  </el-col>

                </el-card>
              </el-col>
              <!--中转2次卡片-->
              <el-col :span="20" offset="2" v-if="showCard3">
                <el-card shadow="hover" style="border-radius:10px;height:130px;padding-right:5px;padding-left:5px; background:#F0E687;margin-top:100px;">
                  <p class="left" style="font-size:16px;"><a>{{this.ruleForm5.toPlace}}</a><i class="el-icon-location-outline"></i></p>
                  <i class="center">&nbsp;{{this.ruleForm5.trafficNumber1}}</i>
                  <p class="right" style="font-size:16px;"><i class="el-icon-location-outline"></i><a>{{this.ruleForm5.toPlace1}}</a>
                  </p>
                  <el-col :span="24">
                    <p class="left" style="font-weight:800;line-height:50px;margin-left:10px;">{{this.ruleForm5.toTime}}</p>
                    <p class="right" style="font-weight:800;line-height:50px;margin-right:10px;"></p>
                  </el-col>

                  <p class="center" style="margin-top:4px;">

                    <el-image style="margin-top:-100px;" :src="fonticonSrc3" fit="contain"></el-image>

                  </p>
                  <el-col :span="24">
                    <p class="left" style="font-weight:200;line-height:20px;margin-left:10px;">{{this.ruleForm5.toDate}}</p>
                    <p class="right" style="font-weight:200;line-height:20px;margin-right:10px;"></p>
                  </el-col>

                </el-card>
              </el-col>

              <el-col :span="24" v-if="showCard3">
                <p class="center" style="margin-top:4px;">

                  <el-image style="" src="/static/img/fonticon (9).png" fit="contain"></el-image>

                </p>
              </el-col>
              <el-col :span="20" offset="2" v-if="showCard3">
                <el-card shadow="hover" style="border-radius:10px;height:130px;padding-right:5px;padding-left:5px; background:#F0E687;margin-top:10px;">
                  <p class="left" style="font-size:16px;"><a>{{this.ruleForm5.toPlace1}}</a><i class="el-icon-location-outline"></i></p>
                  <i class="center">&nbsp;{{this.ruleForm5.trafficNumber2}}</i>
                  <p class="right" style="font-size:16px;"><i class="el-icon-location-outline"></i><a>{{this.ruleForm5.toPlace20}}</a>
                  </p>
                  <el-col :span="24">
                    <p class="left" style="font-weight:800;line-height:50px;margin-left:10px;"></p>
                    <p class="right" style="font-weight:800;line-height:50px;margin-right:10px;"></p>
                  </el-col>

                  <p class="center" style="margin-top:4px;">

                    <el-image style="margin-top:0px;" :src="fonticonSrc4" fit="contain"></el-image>

                  </p>
                  <el-col :span="24">
                    <p class="left" style="font-weight:200;line-height:20px;margin-left:10px;"></p>
                    <p class="right" style="font-weight:200;line-height:20px;margin-right:10px;"></p>
                  </el-col>

                </el-card>
              </el-col>
              <el-col :span="24" v-if="showCard3">
                <p class="center" style="margin-top:4px;">

                  <el-image style="" src="/static/img/fonticon (9).png" fit="contain"></el-image>

                </p>
              </el-col>
              <el-col :span="20" offset="2" v-if="showCard3">
                <el-card shadow="hover" style="border-radius:10px;height:130px;padding-right:5px;padding-left:5px; background:#F0E687;margin-top:10px;">
                  <p class="left" style="font-size:16px;"><a>{{this.ruleForm5.toPlace20}}</a><i class="el-icon-location-outline"></i></p>
                  <i class="center">&nbsp;{{this.ruleForm5.trafficNumber3}}</i>
                  <p class="right" style="font-size:16px;"><i class="el-icon-location-outline"></i><a>{{this.ruleForm5.arrivePlace}}</a>
                  </p>
                  <el-col :span="24">
                    <p class="left" style="font-weight:800;line-height:50px;margin-left:10px;"></p>
                    <p class="right" style="font-weight:800;line-height:50px;margin-right:10px;">{{this.ruleForm5.arriveTime}}</p>
                  </el-col>

                  <p class="center" style="margin-top:4px;">

                    <el-image style="margin-top:-100px;" :src="fonticonSrc5" fit="contain"></el-image>

                  </p>
                  <el-col :span="24">
                    <p class="left" style="font-weight:200;line-height:20px;margin-left:10px;"></p>
                    <p class="right" style="font-weight:200;line-height:20px;margin-right:10px;">{{this.ruleForm5.arriveDate}}</p>
                  </el-col>

                </el-card>
              </el-col>

            </el-row>
             <el-col :span="24" :offset="0" style="margin-top:10px;">
             
                   <el-button type="primary" @click="submitEnd1" v-if="submitEndBtn"  :disabled="disabledEnd">完成</el-button>
                </el-col>



                 


          </el-col>





          <!--页面打印预览**************************************************************************************************-->
           <div ref="print">
        
          <el-dialog title="登记信息预览" :visible.sync="dialogTableVisible1" width="10rem" >
          

               <el-col :span="23" :offset="1"  style="margin-bottom:10px;">
              <el-divider style="width:9.5rem;" content-position="left"><i style="font-weight:400;font-size:13px;color:#DAA020;">1.基本信息表：</i></el-divider>
            </el-col>

             <van-notice-bar mode="closeable" left-icon="volume-o" :text="textNote1">
            <marquee width="260%;" behavior="" direction="">
              请核对信息，你已登记完，PC端打印表单，然后领取物品！谢谢配合！  </marquee>
          </van-notice-bar>

             <el-table :data="infoList" border >
                <el-table-column
                prop="arrivalDate1" label="到达日期" width="80px">
               </el-table-column>
                <el-table-column
                prop="departureDate1" label="预离日期" width="80">
               </el-table-column>
                <el-table-column
                prop="days" label="入住天数" width="50px">
               </el-table-column>
               <el-table-column
                prop="commonName" label="姓名" width="55px">
               </el-table-column>
               <el-table-column
                prop="dharmaName" label="法名" width="45px">
               </el-table-column>
               <el-table-column
                prop="gender" label="性别" width="35px">
               </el-table-column>
                <el-table-column
                prop="source" label="来源地" width="100px;">
               </el-table-column>
               <el-table-column
                prop="phoneNumber" label="电话" width="90">
               </el-table-column>
               <el-table-column
                prop="emergencyPhone" label="紧急电话" width="90">
               </el-table-column>
               <el-table-column
                prop="IdNumber" label="身份证" width="77">
               </el-table-column>
               <el-table-column
                prop="references" label="介绍人" width="55px">
               </el-table-column>
               <el-table-column
                prop="guarantor" label="担保人" width="45px">
               </el-table-column>
                <el-table-column
                prop="causalMoney" label="金额" width="45px">
               </el-table-column>
                <el-table-column
                prop="agent" label="经办人" width="45px">
               </el-table-column>
            </el-table>
           
           <el-col :span="23" :offset="1"  style="margin-bottom:10px;">
              <el-divider style="width:9.5rem;" content-position="left"><i style="font-weight:400;font-size:13px;color:#DAA020;">2.物品申领表：</i></el-divider>
            </el-col>
            
            <table class="_table">
              <tr>
                <td class="thead">序号</td>
                <td class="td" v-for="(item,i) in goodsList">{{i+1}}</td>
              </tr>
              <tr>
                <td class="thead">品相</td>
                <td class="td" v-for="(item,i) in goodsList">{{item.name}}</td>
              </tr>
              <tr>
                <td class="thead">数量</td>
                <td class="td" v-for="(item,i) in goodsList">{{item.num}}</td>
              </tr>
              
            </table>

            <!--
            <el-table :data="goodsList"   stripe height="700" 
                                   >
              <el-table-column label="No." prop="index" width="50">
              </el-table-column> 
              <el-table-column label="品项" prop="name">
              </el-table-column> 
              <el-table-column label="数量" prop="num">
              </el-table-column> 
              <el-table-column label="归还" >
              </el-table-column>
              <el-table-column label="备注" >
              </el-table-column>  
            </el-table>-->
             <el-col :span="23" :offset="1"  style="margin-bottom:10px;">
              <el-divider style="width:100%;" content-position="left"><i style="font-weight:400;font-size:13px;color:#DAA020;">3.来时路径表：</i></el-divider>
            </el-col>
           <el-table :data="trafficList" v-if="table1" height="240">
              <el-table-column label="出行方式" prop="func" width="70px;" >
              </el-table-column> 
              <el-table-column label="出发日期" prop="toDate" width="70px;">
              </el-table-column> 
              <el-table-column label="出发时间" prop="toTime" width="77px">
              </el-table-column> 
              <el-table-column label="出发地" prop="toPlace">
              </el-table-column> 
              <el-table-column label="交通工具" prop="toTrafficTools">
              </el-table-column> 
              <el-table-column label="车班次" prop="trafficNumber">
              </el-table-column> 
              <el-table-column label="目的地" prop="arrivePlace">
              </el-table-column> 
              <el-table-column label="到达日期" prop="arriveDate">
              </el-table-column> 
              <el-table-column label="到达时间" prop="arriveTime" width="100%;">
              </el-table-column> 
            </el-table>
            <el-table :data="trafficList" v-if="table2" height="80">
              <el-table-column label="出行方式" prop="func" width="70px;">
              </el-table-column> 
              <el-table-column label="出发日期" prop="toDate" width="70px;">
              </el-table-column> 
              <el-table-column label="出发时间" prop="toTime" width="77px;">
              </el-table-column> 
              <el-table-column label="出发地" prop="toPlace">
              </el-table-column> 
              <el-table-column label="交通工具" prop="toTrafficTools1">
              </el-table-column> 
              <el-table-column label="车/班次" prop="trafficNumber1">
              </el-table-column> 
              <el-table-column label="中转地" prop="toPlace1">
              </el-table-column> 
              <el-table-column >
              </el-table-column> 
              <el-table-column >
              </el-table-column> 
            </el-table>
             <el-table :data="trafficList" v-if="table2" height="160">
              <el-table-column width="70px;" >
              </el-table-column> 
              <el-table-column  width="70px;">
              </el-table-column> 
              <el-table-column  width="77px;">
              </el-table-column> 
              <el-table-column label="中转地" prop="toPlace1">
              </el-table-column> 
              <el-table-column label="交通工具" prop="toTrafficTools2">
              </el-table-column> 
              <el-table-column label="车/班次" prop="trafficNumber2">
              </el-table-column> 
              <el-table-column label="目的地" prop="arrivePlace">
              </el-table-column> 
              <el-table-column label="到达日期" prop="arriveDate">
              </el-table-column> 
              <el-table-column label="到达时间" prop="arriveTime" width="100%;">
              </el-table-column> 
            </el-table>
            <el-table :data="trafficList" v-if="table3" height="80">
              <el-table-column label="出行方式" prop="func" width="70px;">
              </el-table-column> 
              <el-table-column label="出发日期" prop="toDate" width="70px;">
              </el-table-column> 
              <el-table-column label="出发时间" prop="toTime" width="77px;">
              </el-table-column> 
              <el-table-column label="出发地" prop="toPlace">
              </el-table-column> 
              <el-table-column label="交通工具" prop="toTrafficTools1">
              </el-table-column> 
              <el-table-column label="车/班次" prop="trafficNumber1">
              </el-table-column> 
              <el-table-column label="中转地1" prop="toPlace1">
              </el-table-column> 
              <el-table-column >
              </el-table-column> 
              <el-table-column >
              </el-table-column> 
            </el-table>
             <el-table :data="trafficList" v-if="table3"  height="80">
              <el-table-column width="70px;" >
              </el-table-column> 
              <el-table-column  width="70px;">
              </el-table-column> 
              <el-table-column  width="77px;">
              </el-table-column> 
              <el-table-column label="中转地1" prop="toPlace1">
              </el-table-column> 
              <el-table-column label="交通工具" prop="toTrafficTools2">
              </el-table-column> 
              <el-table-column label="车/班次" prop="trafficNumber2">
              </el-table-column> 
              <el-table-column label="中转地2" prop="toPlace20">
              </el-table-column> 
              <el-table-column >
              </el-table-column> 
              <el-table-column>
              </el-table-column> 
            </el-table>
            <el-table :data="trafficList" v-if="table3" height="80">
              <el-table-column width="70px;" >
              </el-table-column> 
              <el-table-column  width="70px;">
              </el-table-column> 
              <el-table-column  width="77px;">
              </el-table-column> 
              <el-table-column label="中转地2" prop="toPlace20">
              </el-table-column> 
              <el-table-column label="交通工具" prop="toTrafficTools3">
              </el-table-column> 
              <el-table-column label="车/班次" prop="trafficNumber3">
              </el-table-column> 
              <el-table-column label="目的地" prop="arrivePlace">
              </el-table-column> 
              <el-table-column label="到达日期" prop="arriveDate">
              </el-table-column> 
              <el-table-column label="到达时间" prop="arriveTime" >
              </el-table-column> 
            </el-table>
             <el-col :span="23" :offset="1"  style="margin-bottom:10px;">
              <el-divider style="width:100%;" content-position="left"><i style="font-weight:400;font-size:13px;color:#DAA020;">4.离场登记表：</i></el-divider>
            </el-col>
            
            
             <el-table :data="infoList" border style="width:893px;">
                <el-table-column
                prop="arrivalDate1" label="到达日期" width="80px">
               </el-table-column>
                <el-table-column
                prop="departureDate1" label="预离日期" width="80">
               </el-table-column>
                <el-table-column
                prop="days" label="入住天数" width="50px">
               </el-table-column>
               <el-table-column
                prop="commonName" label="姓名" width="55px">
               </el-table-column>
               <el-table-column
                prop="dharmaName" label="法名" width="45px">
               </el-table-column>
               <el-table-column
                prop="gender" label="性别" width="35px">
               </el-table-column>
                <el-table-column
                prop="source" label="来源地" width="100px;">
               </el-table-column>
               <el-table-column
                prop="phoneNumber" label="电话" width="90">
               </el-table-column>
               <el-table-column
                prop="emergencyPhone" label="紧急电话" width="90">
               </el-table-column>
               <el-table-column
                prop="IdNumber" label="身份证" width="77">
               </el-table-column>
               <el-table-column
                prop="references" label="介绍人" width="55px">
               </el-table-column>
               <el-table-column
                prop="guarantor" label="担保人" width="45px">
               </el-table-column>
                <el-table-column
                prop="causalMoney" label="金额" width="45px">
               </el-table-column>
                <el-table-column
                prop="agent" label="经办人" width="45px">
               </el-table-column>
            </el-table>



            <!--<el-table :data="gridData">
             <el-table-column property="date" label="日期" width="150"></el-table-column>
             <el-table-column property="name" label="姓名" width="200"></el-table-column>
             <el-table-column property="address" label="地址"></el-table-column>
            </el-table>-->
           
            <button @click="printInfo">跳转到打印组件</button>
        
         </el-dialog>  
      </div>

          


          <!--打印
          <el-dialog title="提示" :visible.sync="dialogVisible" width="10rem" :before-close="handleClose">

            <el-dialog title="登记信息预览" :visible.sync="dialogTableVisible" width="20rem">
          

               <el-col :span="23" :offset="1"  style="margin-bottom:10px;">
              <el-divider style="width:9.5rem;" content-position="left"><i style="font-weight:400;font-size:13px;color:#DAA020;">1.基本信息表：</i></el-divider>
            </el-col>




             <el-table :data="infoList" style="width:100%; ">
                <el-table-column
                prop="arrivalDate1" label="到达日期" width="">
               </el-table-column>
                <el-table-column
                prop="departureDate1" label="预离日期" width="">
               </el-table-column>
                <el-table-column
                prop="days" label="入住天数" width="">
               </el-table-column>
               <el-table-column
                prop="commonName" label="姓名" width="">
               </el-table-column>
               <el-table-column
                prop="dharmaName" label="法名" width="">
               </el-table-column>
               <el-table-column
                prop="gender" label="性别" width="">
               </el-table-column>
                <el-table-column
                prop="source" label="来源地" width="100px;">
               </el-table-column>
               <el-table-column
                prop="phoneNumber" label="电话" width="100px;">
               </el-table-column>
               <el-table-column
                prop="emergencyPhone" label="紧急电话" width="100px;">
               </el-table-column>
               <el-table-column
                prop="IdNumber" label="身份证" width="">
               </el-table-column>
               <el-table-column
                prop="references" label="介绍人" width="">
               </el-table-column>
               <el-table-column
                prop="guarantor" label="担保人" width="">
               </el-table-column>
                <el-table-column
                prop="causalMoney" label="金额" width="">
               </el-table-column>
                <el-table-column
                prop="agent" label="经办人" width="">
               </el-table-column>
            </el-table>
           
           <el-col :span="23" :offset="1"  style="margin-bottom:10px;">
              <el-divider style="width:9.5rem;" content-position="left"><i style="font-weight:400;font-size:13px;color:#DAA020;">2.物品申领表：</i></el-divider>
            </el-col>
          
            <el-table :data="goodsList"  height="200" 
                                   >
              <el-table-column label="No." prop="index" width="50">
              </el-table-column> 
              <el-table-column label="品项" prop="name">
              </el-table-column> 
              <el-table-column label="数量" prop="num">
              </el-table-column> 
              <el-table-column label="归还" >
              </el-table-column>
              <el-table-column label="备注" >
              </el-table-column>  
            </el-table>
             <el-col :span="23" :offset="1"  style="margin-bottom:10px;">
              <el-divider style="width:9.5rem;" content-position="left"><i style="font-weight:400;font-size:13px;color:#DAA020;">3.来时路径表：</i></el-divider>
            </el-col>
           <el-table :data="trafficList" v-if="table1">
              <el-table-column label="出行方式" prop="func" width="60px;" >
              </el-table-column> 
              <el-table-column label="出发日期" prop="toDate" width="70px;">
              </el-table-column> 
              <el-table-column label="出发时间" prop="toTime" width="77px">
              </el-table-column> 
              <el-table-column label="出发地" prop="toPlace">
              </el-table-column> 
              <el-table-column label="交通工具" prop="toTrafficTools">
              </el-table-column> 
              <el-table-column label="车班次" prop="trafficNumber">
              </el-table-column> 
              <el-table-column label="目的地" prop="arrivePlace">
              </el-table-column> 
              <el-table-column label="到达日期" prop="arriveDate">
              </el-table-column> 
              <el-table-column label="到达时间" prop="arriveTime" width="100%;">
              </el-table-column> 
            </el-table>
            <el-table :data="trafficList" v-if="table2">
              <el-table-column label="出行方式" prop="func" width="60px;">
              </el-table-column> 
              <el-table-column label="出发日期" prop="toDate" width="70px;">
              </el-table-column> 
              <el-table-column label="出发时间" prop="toTime" width="77px;">
              </el-table-column> 
              <el-table-column label="出发地" prop="toPlace">
              </el-table-column> 
              <el-table-column label="交通工具" prop="toTrafficTools1">
              </el-table-column> 
              <el-table-column label="车/班次" prop="trafficNumber1">
              </el-table-column> 
              <el-table-column label="中转地" prop="toPlace1">
              </el-table-column> 
              <el-table-column >
              </el-table-column> 
              <el-table-column >
              </el-table-column> 
            </el-table>
             <el-table :data="trafficList" v-if="table2">
              <el-table-column width="60px;" >
              </el-table-column> 
              <el-table-column  width="70px;">
              </el-table-column> 
              <el-table-column  width="77px;">
              </el-table-column> 
              <el-table-column label="中转地" prop="toPlace1">
              </el-table-column> 
              <el-table-column label="交通工具" prop="toTrafficTools2">
              </el-table-column> 
              <el-table-column label="车/班次" prop="trafficNumber2">
              </el-table-column> 
              <el-table-column label="目的地" prop="arrivePlace">
              </el-table-column> 
              <el-table-column label="到达日期" prop="arriveDate">
              </el-table-column> 
              <el-table-column label="到达时间" prop="arriveTime" width="100%;">
              </el-table-column> 
            </el-table>
            <el-table :data="trafficList" v-if="table3">
              <el-table-column label="出行方式" prop="func" width="60px;">
              </el-table-column> 
              <el-table-column label="出发日期" prop="toDate" width="70px;">
              </el-table-column> 
              <el-table-column label="出发时间" prop="toTime" width="77px;">
              </el-table-column> 
              <el-table-column label="出发地" prop="toPlace">
              </el-table-column> 
              <el-table-column label="交通工具" prop="toTrafficTools1">
              </el-table-column> 
              <el-table-column label="车/班次" prop="trafficNumber1">
              </el-table-column> 
              <el-table-column label="中转地1" prop="toPlace1">
              </el-table-column> 
              <el-table-column >
              </el-table-column> 
              <el-table-column >
              </el-table-column> 
            </el-table>
             <el-table :data="trafficList" v-if="table3">
              <el-table-column width="60px;" >
              </el-table-column> 
              <el-table-column  width="70px;">
              </el-table-column> 
              <el-table-column  width="77px;">
              </el-table-column> 
              <el-table-column label="中转地1" prop="toPlace1">
              </el-table-column> 
              <el-table-column label="交通工具" prop="toTrafficTools2">
              </el-table-column> 
              <el-table-column label="车/班次" prop="trafficNumber2">
              </el-table-column> 
              <el-table-column label="中转地2" prop="toPlace20">
              </el-table-column> 
              <el-table-column >
              </el-table-column> 
              <el-table-column>
              </el-table-column> 
            </el-table>
            <el-table :data="trafficList" v-if="table3">
              <el-table-column width="60px;" >
              </el-table-column> 
              <el-table-column  width="70px;">
              </el-table-column> 
              <el-table-column  width="77px;">
              </el-table-column> 
              <el-table-column label="中转地2" prop="toPlace20">
              </el-table-column> 
              <el-table-column label="交通工具" prop="toTrafficTools3">
              </el-table-column> 
              <el-table-column label="车/班次" prop="trafficNumber3">
              </el-table-column> 
              <el-table-column label="目的地" prop="arrivePlace">
              </el-table-column> 
              <el-table-column label="到达日期" prop="arriveDate">
              </el-table-column> 
              <el-table-column label="到达时间" prop="arriveTime" width="100%;">
              </el-table-column> 
            </el-table>
            <el-table :data="gridData">
             <el-table-column property="date" label="日期" width="150"></el-table-column>
             <el-table-column property="name" label="姓名" width="200"></el-table-column>
             <el-table-column property="address" label="地址"></el-table-column>
            </el-table>
               </el-dialog>  
        </el-dialog>
         









-->

        </el-col>

      <!--打印功能
         <div ref="print">
          <div class="printArea">

            <el-col>
              <span style="font-size:30px;font-weight: 700;">2020国庆来寺人员登记信息表</span>
            </el-col>
            <el-col :span="23" :offset="1"  style="margin-bottom:10px;">
              <el-divider style="width:9.5rem;" content-position="left"><i style="font-weight:400;font-size:13px;color:#DAA020;">1.基本信息表：</i></el-divider>
            </el-col>
            <el-table :data="infoList" width="100%"height="100%" border >
                <el-table-column
                prop="arrivalDate1" label="到达日期" width="80px">
               </el-table-column>
                <el-table-column
                prop="departureDate1" label="预离日期" width="80px">
               </el-table-column>
                <el-table-column
                prop="days" label="入住天数" width="50px;">
               </el-table-column>
               <el-table-column
                prop="commonName" label="姓名" width="55px">
               </el-table-column>
               <el-table-column
                prop="dharmaName" label="法名" width="40px">
               </el-table-column>
               <el-table-column
                prop="gender" label="性别" width="40px;">
               </el-table-column>
                <el-table-column
                prop="source" label="来源地" width="100px;">
               </el-table-column>
               <el-table-column
                prop="phoneNumber" label="电话" width="90px;">
               </el-table-column>
               <el-table-column
                prop="emergencyPhone" label="紧急电话" width="90px;">
               </el-table-column>
               <el-table-column
                prop="IdNumber" label="身份证" width="100px">
               </el-table-column>
               <el-table-column
                prop="references" label="介绍人" width="55px">
               </el-table-column>
               <el-table-column
                prop="guarantor" label="担保人" width="55px">
               </el-table-column>
                <el-table-column
                prop="causalMoney" label="金额" width="55px">
               </el-table-column>
                <el-table-column
                prop="agent" label="经办人" width="55px">
               </el-table-column>
            </el-table>



















        </div>










           
         </div>
    


    打印功能-->

      </el-row>



    </div>
    <img v-if="btnFlag" @click="backTop" class="go-top right" style="width:30px;height:30px;" src="/static/img/backtop.png"
      alt="">
         <el-button type="text" @click="open1"></el-button>
    <el-button plain @click="openMessage" v-if="btns">

    </el-button>
    <el-button type="text" @click="showMessage(obj)" v-if="btns"></el-button>
    <el-button plain @click="openMessage" v-if="btns"></el-button>

    <Foot></Foot>

    

 
  </div>
</template>






<script>
  import Head from '@/components/Head'
  import Foot from '@/components/Foot'
  import treeTransfer from 'el-tree-transfer'
  import AreaJson from '@/components/area.json'
  import axios from 'axios'
  export default {
    data() {
      let AreaJson = require('@/components/area.json')
      //物品领用
      const generateData = _ => {
        const data = [{
            key: '1',
            label: '床架（上）'
          }, {
            key: '2',
            label: '床架（下）'
          }, {
            key: '3',
            label: '床板'
          }, {
            key: '4',
            label: '床扶梯'
          }, {
            key: '5',
            label: '草席'
          },
          {
            key: '6',
            label: '垫背'
          }, {
            key: '7',
            label: '被子（上）'
          }, {
            key: '8',
            label: '被子（下）'
          }, {
            key: '9',
            label: '被套'
          }, {
            key: '10',
            label: '床单'
          },
          {
            key: '11',
            label: '枕头'
          }, {
            key: '12',
            label: '枕套'
          }, {
            key: '13',
            label: '脸盆'
          }, {
            key: '14',
            label: '桶'
          }, {
            key: '15',
            label: '餐盘'
          }, {
            key: '16',
            label: '筷子'
          },
          {
            key: '17',
            label: '羹匙（调羹）'
          }, {
            key: '18',
            label: '碗'
          }
        ];

        return data;
      };

      


      //身份证验证
      const idCardValidity = (rule, code, callback) => {
        var city = {
          11: "北京",
          12: "天津",
          13: "河北",
          14: "山西",
          15: "内蒙古",
          21: "辽宁",
          22: "吉林",
          23: "黑龙江 ",
          31: "上海",
          32: "江苏",
          33: "浙江",
          34: "安徽",
          35: "福建",
          36: "江西",
          37: "山东",
          41: "河南",
          42: "湖北 ",
          43: "湖南",
          44: "广东",
          45: "广西",
          46: "海南",
          50: "重庆",
          51: "四川",
          52: "贵州",
          53: "云南",
          54: "西藏 ",
          61: "陕西",
          62: "甘肃",
          63: "青海",
          64: "宁夏",
          65: "新疆",
          71: "台湾",
          81: "香港",
          82: "澳门",
          91: "国外 "
        };
        var tip = ""
        var pass = true
        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
          tip = "身份证号格式错误"
          pass = false;
        } else if (!city[code.substr(0, 2)]) {
          // tip = "地址编码错误"
          tip = "身份证输入错误"
          pass = false
        } else {
          // 18位身份证需要验证最后一位校验位
          if (code.length === 18) {
            code = code.split('')
            // ∑(ai×Wi)(mod 11)
            // 加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
            // 校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
            var sum = 0
            var ai = 0
            var wi = 0
            for (var i = 0; i < 17; i++) {
              ai = code[i]
              wi = factor[i]
              sum += ai * wi
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
              // tip = "校验位错误"
              tip = "身份证输入错误"
              pass = false
            }
          }
        }
        if (!pass) {
          callback(new Error(tip))
        } else {
          callback()
        }
      }




      //电话号码验证规则
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
        if (!value) {
          return callback(new Error('电话号码不能为空'))
        }
        setTimeout(() => {
          // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
          // 所以在前面加了一个+实现隐式转换

          if (!Number.isInteger(+value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error('电话号码格式不正确'))
            }
          }
        }, 100)
      }

      return {
        search1:"",
        func:"",
        rules1:{
          toDates:[
            {
            required: true,
            message: '请选择到达日期'
            }
          ],
          toDate1s: [{
              required: true,
              message: '请输入姓名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 5,
              message: '长度在2到5个字符',
              trigger: 'blur'
            }
          ]
        },
        infoAllList:[],
        daysNote:"",
        daysNote1:"",
        table1:false,
        table2:false,
        table3:false,
        btns:false,
        dialogVisible: false,
        showCard1: false,
        showCard2: false,
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        show00:false,
        disabled2:true,
        label: [],
        tableData2:[],
        show0:false,
        options: [],
        options2: [],
        options:[],
        toDate1: '',
        toDate2: '',
        returnDate1: '',
        returnDate2: '',
        showBtn100:false,
        showCard3:false,
        mode: "transfer",
        fonticonSrc2:"",
        gridDatas:[],
        edit:false,
        fromData: [{
            id: "1",
            pid: 0,
            label: "卧具",
            children: [{
                id: "1-1",
                pid: "1",
                label: "床架（上）"
              }, {
                id: "1-2",
                pid: "1",
                label: "床架（下）"
              },
              {
                id: "1-3",
                pid: "1",
                label: "床板"
              }, {
                id: "1-4",
                pid: "1",
                label: "床扶梯"
              },
              {
                id: "1-5",
                pid: "1",
                label: "草席"
              },  {
                id: "1-6",
                pid: "1",
                label: "被子（上）"
              },
              {
                id: "1-7",
                pid: "1",
                label: "被子（下）"
              }, {
                id: "1-8",
                pid: "1",
                label: "被套"
              }, {
                id: "1-9",
                pid: "1",
                label: "床单"
              },
              {
                id: "1-10",
                pid: "1",
                label: "枕头"
              }, {
                id: "1-11",
                pid: "1",
                label: "枕套"
              }
            ]
          },
          {
            id: "2",
            pid: "0",
            label: "餐具",
            children: [{
              id: "2-1",
              pid: "2",
              label: "餐盘"
            }, {
              id: "2-2",
              pid: "2",
              label: "筷子"
            }, {
              id: "2-3",
              pid: "2",
              label: "羹匙（调羹）"
            }, {
              id: "2-4",
              pid: "2",
              label: "碗"
            }]
          },
          {
            id: "3",
            pid: "0",
            label: "洁具",
            children: [{
              id: "3-1",
              pid: "3",
              label: "脸盆"
            }, {
              id: "3-2",
              pid: "3",
              label: "桶"
            }]
          }
        ],
        imgSrcs:["0","/static/img/fonticon (3).png","/static/img/fonticon (4).png","/static/img/fonticon (2).png","/static/img/fonticon (5).png","/static/img/fonticon (6).png","/static/img/fonticon (1).png"],
        tools:["0","火车","飞机","汽车","轮船","租车","私车"],
        trafficOptions: [{
            value: '选项1',
            label: '火车'
          },
          {
            value: '选项2',
            label: '飞机'
          },
          {
            value: '选项3',
            label: '汽车'
          },
          {
            value: '选项4',
            label: '轮船'
          },
          {
            value: '选项5',
            label: '出租车',
          },
          {
            value: '选项6',
            label: '私家车'
          }


        ],
        dialogTableVisible1:false,
        trafficOptions1: [{
            value: '火车',
            label: '火车'
          },
          {
            value: '飞机',
            label: '飞机'
          },
          {
            value: '汽车',
            label: '汽车'
          },
          {
            value: '轮船',
            label: '轮船'
          },
          {
            value: '出租车',
            label: '出租车',
          },
          {
            value: '私家车',
            label: '私家车'
          }


        ],
        trafficOptions2: [{
            value: '火车',
            label: '火车'
          },
          {
            value: '飞机',
            label: '飞机'
          },
          {
            value: '汽车',
            label: '汽车'
          },
          {
            value: '轮船',
            label: '轮船'
          },
          {
            value: '出租车',
            label: '出租车',
          },
          {
            value: '私家车',
            label: '私家车'
          }


        ],
        trafficOptions3: [{
            value: '火车',
            label: '火车'
          },
          {
            value: '飞机',
            label: '飞机'
          },
          {
            value: '汽车',
            label: '汽车'
          },
          {
            value: '轮船',
            label: '轮船'
          },
          {
            value: '出租车',
            label: '出租车',
          },
          {
            value: '私家车',
            label: '私家车'
          }


        ],
        money:"",
        disabledRuleForm3:false,
        disabledRuleForm4:false,
        disabledRuleForm5:false,
        disabledEnd:false,
        toDates: '',
        toPlace: "",
        arriveDates: '',
        arrivePlace: "",
        toDate: '',
        toTime: '',
        arriveTime: '',
        arriveDate: '',
        trafficNumber: '',
        toData: [],
        goodsList: [],
        InfoList:[],
        data: generateData(),
        value: [1, 4],
        flagHead:true,
        isOK:'ok',
        ruleForm: {
          commonName: '',
          dharmaName: '',
          gender: '',
          source: '',
          phoneNumber: '',
          IdNumber: '',
          arrivalDate1: '',
          arrivalDate2: '',
          departureDate1: '',
          departureDate2: '',
          references: '',
          guarantor: '',
          emergencyPhone: '',
          agent: '',
          causalMoney: '',
          data1: [],
          content: ''

        },
        ruleForm3:{
          toDates:'',
          toPlace:'',
          toTrafficTools:'',
          trafficNumber:'',
          arriveDates:'',
          arrivePlace:[12,0,7],
          func:''

        },
        ruleForm4:{
          toDates:'',
          toPlace:'',
          toPlace1:'',
          toTrafficTools1:'',
          trafficNumber1:'',
          toTrafficTools2:'',
          trafficNumber2:'',
          arriveDates:'',
          arrivePlace:[12,0,7],
          func:''

        },
         ruleForm5:{
          toDates:'',
          toPlace:'',
          toPlace1:'',
          toPlace1:'',
          toTrafficTools1:'',
          trafficNumber1:'',
          toTrafficTools2:'',
          trafficNumber2:'',
          toTrafficTools3:'',
          trafficNumber3:'',
          arriveDates:'',
          arrivePlace:[12,0,7],
          func:''

        },
        ruleForm0:{
          commonName:'',
          dharmaName:'',
          departureDate1:'',
          departureDate2:'',
          departureDate3:'',
          departureDate4:'',
          days:'',
          arrival2:'',
          day2:'',
          day:'0',
          causalMoney:'',
          moneyFunc:'返还本人',
          money:'',
          agent1:''
        },
        rules0:{
          commonName:[{
            required:true,
            message:"姓名不能为空！",
            trigger:'blur'
          }],
          dharmaName:[{
            required:true,
            message:"法名不能为空,没有写无！",
            trigger:'blur'
          }],
          departureDate1:[{
            required:true,
            message:"日期不能为空！",
            trigger:'blur'
          }],
          departureDate3:[{
            required:true,
            message:"日期不能为空！",
            trigger:'blur'
          }],
          arrival2:[{
            required:true,
            message:"日期不能为空！",
            trigger:'blur'
          }],
          days:[{
            required:true,
            message:"天数不能为空！",
            trigger:'blur'
          }],
          day2:[{
            required:true,
            message:"天数不能为空！",
            trigger:'blur'
          }],
          day:[{
            required:true,
            message:"天数不能为空！",
            trigger:'blur'
          }],
          causalMoney:[{
            required:true,
            message:"预交金额不能为空！",
            trigger:'blur'
          }],
          moneyFunc:[{
            required:true,
            message:"押金去向不能为空！",
            trigger:'blur'
          }],
          money:[{
            required:true,
            message:"返还金额不能为空！",
            trigger:'blur'
          }],
          agent1:[{
            required:true,
            message:"登记人不能为空！",
            trigger:'blur'
          }],

        },
        toTrafficTools: '',
        rules3:{
          func:[{
            required:true,
            message:"出行方式不能为空，中转录入最多2次！",
            trigger:'blur'
          }],
          toDates:[{
            required:true,
            message:"时间不能为空！",
            trigger:'blur'
          }],
          toPlace:[{
            required:true,
            message:"地点不能为空！",
            trigger:'blur'
          }],
          toTrafficTools:[{
            required:true,
            message:"交通工具不能为空！",
            trigger:'blur'
          }],
          trafficNumber:[{
            required:false,
            message:"私家车/出租车可以不填写！",
            trigger:'blur'
          }],
          arriveDates:[{
            required:true,
            message:"时间不能为空！",
            trigger:'blur'
          }],
          arrivePlace:[{
            required:true,
            message:"地点不能为空！",
            trigger:'blur'
          }]
        },
        rules4:{
          func:[{
            required:true,
            message:"出行方式不能为空，中转录入最多2次！",
            trigger:'blur'
          }],
          toDates:[{
            required:true,
            message:"时间不能为空！",
            trigger:'blur'
          }],
          toPlace:[{
            required:true,
            message:"地点不能为空！",
            trigger:'blur'
          }],
          toPlace1:[{
            required:true,
            message:"中转地不能为空！",
            trigger:'blur'
          }],
          toTrafficTools1:[{
            required:true,
            message:"从出发地达中转地交通工具不能为空！",
            trigger:'blur'
          }],
          trafficNumber1:[{
            required:false,
            message:"私家车/出租车可以不填写！",
            trigger:'blur'
          }],
          toTrafficTools2:[{
            required:true,
            message:"从中转地到达目的地交通工具不能为空！",
            trigger:'blur'
          }],
          trafficNumber2:[{
            required:false,
            message:"私家车/出租车可以不填写！",
            trigger:'blur'
          }],
          arriveDates:[{
            required:true,
            message:"时间不能为空！",
            trigger:'blur'
          }],
          arrivePlace:[{
            required:true,
            message:"地点不能为空！",
            trigger:'blur'
          }]
        },
        rules5:{
          func:[{
            required:true,
            message:"出行方式不能为空，中转录入最多2次！",
            trigger:'blur'
          }],
          toDates:[{
            required:true,
            message:"时间不能为空！",
            trigger:'blur'
          }],
          toPlace:[{
            required:true,
            message:"地点不能为空！",
            trigger:'blur'
          }],
          toPlace1:[{
            required:true,
            message:"中转地不能为空！",
            trigger:'blur'
          }],
          toPlace20:[{
            required:false,
            message:"中转地不能为空！",
            trigger:'blur'
          }],
          toTrafficTools1:[{
            required:true,
            message:"从出发地达中转地1交通工具不能为空！",
            trigger:'blur'
          }],
          trafficNumber1:[{
            required:false,
            message:"私家车/出租车可以不填写！",
            trigger:'blur'
          }],
          toTrafficTools2:[{
            required:true,
            message:"从中转地1到达中转地2交通工具不能为空！",
            trigger:'blur'
          }],
          trafficNumber2:[{
            required:false,
            message:"私家车/出租车可以不填写！",
            trigger:'blur'
          }],
          toTrafficTools3:[{
            required:true,
            message:"从中转地2到达目的地交通工具不能为空！",
            trigger:'blur'
          }],
          trafficNumber3:[{
            required:false,
            message:"私家车/出租车可以不填写！",
            trigger:'blur'
          }],
          arriveDates:[{
            required:true,
            message:"时间不能为空！",
            trigger:'blur'
          }],
          arrivePlace:[{
            required:true,
            message:"地点不能为空！",
            trigger:'blur'
          }]
        },
        rules: {
          commonName: [{
              required: true,
              message: '请输入姓名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 5,
              message: '长度在2到5个字符',
              trigger: 'blur'
            }
          ],
          dharmaName: [{
              required: true,
              message: '请输入法名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 3,
              message: '长度在2到3个字符',
              trigger: 'blur'
            }
          ],
          gender: [{
            message: "请输入来源地",
            required: true,
            message: '请选择性别',
            trigger: 'change',
          }],
          source: [{
            required: true,
            message: '请输入来源地',
            trigger: 'blur'
          }],
          phoneNumber: [{
            required: true,
            validator: checkPhone,
            trigger: 'blur'
          }],
          IdNumber: [{
            required: true,

            validator: idCardValidity,
            trigger: 'blur'
          }],
          arrivalDate1: [{
            type: 'string',
            required: true,
            message: '请选择到达日期',
            trigger: 'change'
          }],
          arrivalDate2: [{
            type: 'date',
            required: true,
            message: '请选择到达时间',
            trigger: 'change'
          }],
          departureDate1: [{
            type: 'string',
            required: true,
            message: '请选择预离日期',
            trigger: 'change'
          }],
          departureDate2: [{
            type: 'date',
            required: true,
            message: '请选择预离时间',
            trigger: 'change'
          }],
          references: [{
            message: '请输入法名',
            trigger: 'blur'
          }],
          guarantor: [{
            message: '请输入法名/姓名',
            trigger: 'blur'
          }],
          emergencyPhone: [{
            required: true,
            validator: checkPhone,
            trigger: 'blur'
          }],
          agent: [{
            required: true,
            message: '请输入法名',
            trigger: 'blur'
          }],
          causalMoney: [{
            required: true,
            message: '请输入金额',
            trigger: 'blur'
          }]

        },
        active: '0',
        btnFlag: false,
        navSpans: '24',
        navOffsets: '0',
        activeIndex: '1',
        edit1:false,
        show1: true,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        showForm1: true,
        showForm2: false,
        showForm3: false,
        showCard3: false,
        textNote1: "欢迎来到荆溪大院山云林禅寺！欢迎回家！请点击上方红色按钮入场登记！",
        textNote2: "请如实填写！若有不明处，请联系管理员！谢谢配合！",
        url: "../../static/img/dataBg.jpg",
        fonticonSrc:'',
        fonticonSrc1:'',
        fonticonSrc2:'',
        fonticonSrc3:'',
        fonticonSrc4:'',
        fonticonSrc5:'',
        mData: [],
        source: [],
        disabled:false,
        showForm4:false,
        showForm5:false,
        show100:false,
        trafficList:[],
        submitEndBtn:false,
        weatherData:"",
        options3:[],
        options4:[],
        options5:[],
        options6:[],
        options7:[],
        options8:[],
        options9:[],
        options10:[],
        options11:[],
        options12:[]

      }
    
    },
    created() {
    console.log(this.$store.state.commonName)
       axios({
             method: 'get',
             url:'https://www.tianqiapi.com/free/day?appid=75698768&appsecret=7LyHELsc&city=福州'
        }).then((response) => {
            console.log(response);//查看接口返回的数据
           // this.wea=response.data.wea;//天气
           // this.tem=response.data.tem;//温度
           // this.wea_img=response.data.wea_img;//图标名称
            console.log(response.data)
            this.weatherData = response.data;
            }, function(response) {
            console.log("错误信息：" + response)
        });
        
       axios.get('http://192.168.43.119:8081/static/area.json', {
        params: {
          title: '成功'
        }
      }).then((res) => {
        //console.log(res.data);
        this.options = res.data;
        this.options2 = res.data;
        this.options3 = res.data;
        this.options4 = res.data;
        this.options5 = res.data;
        this.options6 = res.data;
        this.options7 = res.data;
        this.options8 = res.data;
        this.options9 = res.data;
        this.options10 = res.data;
        this.options11= res.data;
        this.options12 = res.data;

      })
    },
    mounted() {
      window.addEventListener('scroll', this.scrollToTop);
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
      showForm(){
        if(this.func == "1"){
       
          this.showForm3 = true;
          this.showForm4 = false;
          this.showForm5 = false;
          console.log(this.func)
        
        }
        if(this.func == "2"){
          this.showForm4 = true;
          this.showForm5 = false;
          this.showForm3 = false;
          console.log("中转1")
        }
        if(this.func == "3"){
  
          this.showForm5 = true;
          this.showForm4 = false;
          this.showForm3 = false;
          console.log("中转2次")
        }

        
      },
      showForm33(){
      console.log("form3")
        this.showForm3 = true;
         this.showForm4 = false;
          this.showForm5 = false;
          this.showCard2 = false;
          this.showCard3 = false;
          this.disabledEnd = true;
      },
       showForm44(){
        this.showForm3 = false;
         this.showForm4 = true;
          this.showForm5 = false;
          this.showCard1 = false;
          this.showCard3 = false;
            this.disabledEnd = true;
      },
       showForm55(){
        this.showForm3 = false;
         this.showForm4 = false;
          this.showForm5 = true;
          this.showCard1 = false;
          this.showCard2 = false;
            this.disabledEnd = true;
      },
      
      //计算时间差几天
      Days(){
        console.log("进来了哦。")
      /*  var aDate,oDate1,oDate2,iDays
        var sDate1 = this.ruleForm.arrivalDate1
        var sDate2 = this.ruleForm.departureDate1
        var aDate = sDate1.split("-")
        oDate1 = new Date(aDate[0],aDate[1],aDate[2])
        aDate   =  sDate2.split("-")  
        oDate2 = new Date(aDate[0] , aDate[1] , aDate[2])  
        if(oDate1<=oDate2){
           this.daysNote   =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24) +1   //把相差的毫秒数转换为天数  
           this.ruleForm.days = this.daysNote;
           this.ruleForm.causalMoney = this.daysNote * 50  + 100;
           }else{
              this.showMessage("error,Info,不符逻辑，请仔细填写！");
           }
          console.log(iDays)
        console.log(oDate1>oDate2)
        //this.ruleForm.days = iDays + 1;
        console.log(this.daysNote)
*/

      
         var sDate1 = this.ruleForm.arrivalDate1
        var sDate2 = this.ruleForm.departureDate1
         console.log(sDate1)
         console.log(sDate2)
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
      var  dateSpan = sDate2 - sDate1;
      var  dateSpan = Math.abs(dateSpan);
      var   iDays = Math.floor(dateSpan/(24*3600*1000))+1;
        console.log(iDays)
        this.ruleForm.days = iDays;
         this.ruleForm.causalMoney = iDays * 50  + 100;
        console.log(this.ruleForm.days)
        if(sDate1>sDate2){
        this.showMessage("error,Info,不符逻辑，请仔细填写！");
        }



        
      },
      open1() {
        this.$confirm('您已经注册过信息，点击取消重新填写，点击确认加载以录数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ruleForm = this.mData.res;
          this.ruleForm.source = this.mData.res.sourceArray;
          this.ruleForm.arrivalDate2 = ''
          this.ruleForm.departureDate2 = ''
          // this.ruleForm.arrivalDate2 = this.ruleForm.arrivalDate2.toLocaleTimeString()
          // this.ruleForm.departureDate2 = this.ruleForm.departureDate2.toLocaleTimeString()
          this.$message({
            type: 'success',
            message: '数据加载成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消加载，请重新填写！'
          });
        });
      },
      commonNameChange() {
       // console.log('ok')
        console.log(this.$store.state.commonName)
        axios.post('api/datas/commonNameChange', {
          commonName: this.ruleForm.commonName
        }).then((result) => {

          this.mData = result.data
        //  console.log(this.mData.res)
          if (this.mData.status == 101) {
            this.open1()

          }

        })
      },
      submitSuccess() {
        this.dialogVisible = false;
        this.$router.go(0);
      },
      printContext() {
        this.$print(this.$refs.print)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$router({param:'/buddhish'})
            done();
          })
          .catch(_ => {});
      },
      //最后一步
      submitInfo() {
        console.log("信息预览，如确认无误，请打印领取物品。")



        //this.dialogVisible = true;
        //this.active = '3'
      },
      notrafficInfo() {
        this.showCard2 = true;
      },
      trafficInfo() {
        this.showCard1 = true;  
        this.ruleForm3.toDate = this.ruleForm3.toDates.toLocaleDateString();
        this.ruleForm3.toTime = this.ruleForm3.toDates.toLocaleTimeString();
        this.ruleForm3.arriveDate = this.ruleForm3.arriveDates.toLocaleDateString();
        this.ruleForm3.arriveTime = this.ruleForm3.arriveDates.toLocaleTimeString();
          if (this.ruleForm3.toTrafficTools == '选项1') {
          this.fonticonSrc = "/static/img/fonticon (3).png"

        }
        if (this.ruleForm3.toTrafficTools == '选项2') {
          this.fonticonSrc = "/static/img/fonticon (4).png"

        }

        if (this.ruleForm3.toTrafficTools == '选项3') {
          this.fonticonSrc = "/static/img/fonticon (2).png"

        }
        if (this.ruleForm3.toTrafficTools == '选项4') {
          this.fonticonSrc = "/static/img/fonticon (5).png"

        }
        if (this.ruleForm3.toTrafficTools == '选项5') {
          this.fonticonSrc = "/static/img/fonticon (1).png"

        }
        if (this.ruleForm3.toTrafficTools == '选项6') {
          this.fonticonSrc = "/static/img/fonticon (6).png"

        }
      },
      areaHandleChange6(item) {
        this.ruleForm5.toPlace = this.$refs['myCascader6'].getCheckedNodes()[0].label
        //  console.log(this.toPlace)
      },
      areaHandleChange7(item) {
        this.ruleForm5.toPlace1 = this.$refs['myCascader7'].getCheckedNodes()[0].label
        //  console.log(this.toPlace)
      },
      areaHandleChange8(item) {
       // this.ruleForm5.toPlace20 = this.$refs['myCascader8'].getCheckedNodes()[0].label
        //  console.log(this.toPlace)
      },
      areaHandleChange9(item) {
        this.ruleForm5.arrivePlace = this.$refs['myCascader9'].getCheckedNodes()[0].label
        //  console.log(this.toPlace)
      },
      areaHandleChange3(item) {
        this.ruleForm4.toPlace = this.$refs['myCascader3'].getCheckedNodes()[0].label
        //  console.log(this.toPlace)
      },
      areaHandleChange4(item) {
        this.ruleForm4.toPlace1 = this.$refs['myCascader4'].getCheckedNodes()[0].label
        //  console.log(this.toPlace)
      },
      areaHandleChange5(item) {
        this.ruleForm4.arrivePlace = this.$refs['myCascader5'].getCheckedNodes()[0].label
        //  console.log(this.toPlace)
      },
      areaHandleChange(item) {
        this.ruleForm3.toPlace = this.$refs['myCascader'].getCheckedNodes()[0].label
        //  console.log(this.toPlace)
      },
      areaHandleChange1(item) {
        this.ruleForm3.arrivePlace = this.$refs['myCascader1'].getCheckedNodes()[0].label
        //  console.log(this.arrivePlace)

      },
      areaHandleChange2(item) {
        // this.ruleForm.source = this.source

        this.ruleForm.source = this.$refs['myCascader2'].getCheckedNodes()[0].label

        // console.log(this.$refs['myCascader2'].getCheckedNodes()[0])
        // console.log(this.$refs['myCascader2'].getCheckedNodes()[0].pathLabels)
        // this.ruleForm.source = this.$refs['myCascader2'].getCheckedNodes()[0].pathLabels.toString().replace(/,/g,'')



        console.log(this.$refs['myCascader2'].getCheckedNodes()[0].pathLabels[0])
        //   console.log(this.ruleForm.source)
        //  console.log(this.arrivePlace)

      },
      submitForm2() {
        console.log(this.$store.state._id);
        console.log()
        this.show100 = true;
        this.showBtn100 = true;
        const string = this.$store.state._id;
        const strs = string.split(" ")
       
        this.goodsList.unshift(string)
        let data = this.goodsList;
        console.log(data)
        axios.post('/api/datas/goodsList',data).then((result)=>{
          let res = result.data;
          if(res.status == '120'){
            this.showMessage("success,Info,物品领用数据已成功存储到数据库！")
            this.showForm2 = false;
            this.active = '2'
            this.showForm3 = true;



          }

          })
          

      },






      // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList

      changeMode() {

        if (this.mode == "transfer") {
         console.log('add')
          this.mode = "addressList";

        } else {
          console.log('add')
          this.mode = "transfer";

        }

      },
      

      // 监听穿梭框组件添加

      add(fromData, toData, obj) {
       // console.log("tree 进来了 ")
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的        {keys,nodes,halfKeys,halfNodes}对象

        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表

        //console.log("fromData:", fromData);

        // console.log("AddtoData:", toData);

        // console.log("Addobj:", obj.nodes);
        this.toData = toData;
        this.formData = fromData;


        const list = new Array()
        const list2 = new Array()
        /*this.toData[0].children.forEach(function(element) {
          //console.log(element.label)

          list.push(element.label)

        })*/
        console.log(this.toData)
        console.log(this.toData.length)
        if(this.toData.length == '1'){
          this.toData[0].children.forEach(function(element) {
          //console.log(element.label)
          console.log("进入children0")
          list.push(element.label)

        })
        }

        
        if(this.toData.length == '2'){
          this.toData[0].children.forEach(function(element) {
          //console.log(element.label)
          
          list.push(element.label)

        })
          this.toData[1].children.forEach(function(element) {
          //console.log(element.label)
          
          list.push(element.label)

        })
        }
         if(this.toData.length == '3'){
            this.toData[0].children.forEach(function(element) {
          //console.log(element.label)
          
          list.push(element.label)

        })
          this.toData[1].children.forEach(function(element) {
          //console.log(element.label)
          
          list.push(element.label)

        })
            this.toData[2].children.forEach(function(element) {
          //console.log(element.label)
       
          list.push(element.label)

        })
          }
          
          console.log(list);
           // console.log(this.toData)
       // console.log(this.goodsList)
       // console.log(list.join())
        for(var i=0;i<list.length;i++){
            var str = list[i];
            var str1 = "name:";
            var obj={};
            obj = {"name":str,"index":i+1,"num":1}
            var str2 = str1+str 
         //   console.log(typeof str)
        //    console.log(str2)
          //  var str1 = "label:"
          // var str2 = str1 + st3
          // console.log(str2)

                   list2.push(obj);
        }
     //   console.log(list2)
        this.goodsList = list2
        //console.log(this.goodsList)
        //console.log(this.toData);
      },
      // 监听穿梭框组件移除

      remove(fromData, toData, obj) {

        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象

        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表

        //console.log("fromData:", fromData);

        //console.log("RemovetoData:", toData);

        // console.log("Removeobj:", obj.nodes);
        this.toData = toData;
        this.formData = fromData;
        //  console.log(this.toData)
        const list = new Array()
        const list2 = new Array()
      
         if(this.toData.length == '1'){
          this.toData[0].children.forEach(function(element) {
          //console.log(element.label)
          console.log("进入children0")
          list.push(element.label)

        })
        }

        
        if(this.toData.length == '2'){
          this.toData[0].children.forEach(function(element) {
          //console.log(element.label)
          
          list.push(element.label)

        })
          this.toData[1].children.forEach(function(element) {
          //console.log(element.label)
          
          list.push(element.label)

        })
        }
         if(this.toData.length == '3'){
            this.toData[0].children.forEach(function(element) {
          //console.log(element.label)
          
          list.push(element.label)

        })
          this.toData[1].children.forEach(function(element) {
          //console.log(element.label)
          
          list.push(element.label)

        })
            this.toData[2].children.forEach(function(element) {
          //console.log(element.label)
       
          list.push(element.label)

        })
          }
       for(var i=0;i<list.length;i++){
            var str = list[i];
            var str1 = "name:";
            var obj={};
            obj = {"name":str,"index":i+1,"num":1}
            var str2 = str1+str 
          //  console.log(typeof str)
           // console.log(str2)
          //  var str1 = "label:"
          // var str2 = str1 + st3
          // console.log(str2)

                   list2.push(obj);
        }
      //  console.log(list2)
        this.goodsList = list2

      },
      
      
      submitForm(formName) {
      //路径登记  直达
      if(formName == 'ruleForm3'){
        this.$refs[formName].validate((valid) => {
          if (valid) { 
            this.showCard1 = true;  
        this.ruleForm3.func = "直达"
        this.ruleForm3.toDate = this.ruleForm3.toDates.toLocaleDateString();
        this.ruleForm3.toTime = this.ruleForm3.toDates.toLocaleTimeString();
        this.ruleForm3.arriveDate = this.ruleForm3.arriveDates.toLocaleDateString();
        this.ruleForm3.arriveTime = this.ruleForm3.arriveDates.toLocaleTimeString();
        this.ruleForm3.arrivePlace = this.$refs['myCascader1'].getCheckedNodes()[0].label
        this.fonticonSrc = this.imgSrcs[this.ruleForm3.toTrafficTools];
        this.ruleForm3.toTrafficTools = this.tools[this.ruleForm3.toTrafficTools];
        this.disabled2 = false;
        this.disabledRuleForm3 = true;
        this.active = 3;
        var arr = new Array(this.$store.state._id,this.ruleForm3.func,this.ruleForm3.toDate,this.ruleForm3.toTime,this.ruleForm3.toPlace);
        var arr1 = new Array(this.$store.state._id,this.ruleForm3)
        console.log(this.ruleForm3)
        console.log(arr)
        console.log(arr1)
        //const string = this.$store.state._id;
        //const strs = string.split(" ")
       
       // this.trafficList.unshift(string)
        let data = arr1;
        //console.log(data)
        axios.post('/api/datas/trafficList',data).then((result)=>{
          let res = result.data;
            if(res.status == '130'){
              this.showMessage("success,Info,来时路径数据提交成功！")
              this.disabledRuleForm3 = true;
              this.submitEndBtn = true;
              this.submitEnd = false;
              this.disabledEnd = false;
       
            }
          })
          } else {
            this.showMessage("error,Info,您还有一些必填项目未完成，请填写");
          }
        })

      }      

      //路径登记  中转1次
      if(formName == 'ruleForm4'){
        this.$refs[formName].validate((valid) => {
          if (valid) { 
                 this.showCard2 = true;  
        this.ruleForm4.func = "中转1次"
        this.ruleForm4.toDate = this.ruleForm4.toDates.toLocaleDateString();
        this.ruleForm4.toTime = this.ruleForm4.toDates.toLocaleTimeString();
        this.ruleForm4.arriveDate = this.ruleForm4.arriveDates.toLocaleDateString();
        this.ruleForm4.arriveTime = this.ruleForm4.arriveDates.toLocaleTimeString();
        this.ruleForm4.toPlace = this.$refs['myCascader3'].getCheckedNodes()[0].label
        this.ruleForm4.toPlace1 = this.$refs['myCascader4'].getCheckedNodes()[0].label
        this.ruleForm4.arrivePlace = this.$refs['myCascader5'].getCheckedNodes()[0].label
        this.fonticonSrc1 = this.imgSrcs[this.ruleForm4.toTrafficTools1];
        this.fonticonSrc2 = this.imgSrcs[this.ruleForm4.toTrafficTools2];
        this.ruleForm4.toTrafficTools1 = this.tools[this.ruleForm4.toTrafficTools1];
        this.ruleForm4.toTrafficTools2 = this.tools[this.ruleForm4.toTrafficTools2];
       
        this.active = 3;
        var arr1 = new Array(this.$store.state._id,this.ruleForm4)
        console.log(this.ruleForm4)
        console.log(arr1)
        //const string = this.$store.state.commonName;
        //const strs = string.split(" ")
       
       // this.trafficList.unshift(string)
        let data = arr1;
        //console.log(data)
        axios.post('/api/datas/trafficList',data).then((result)=>{
          let res = result.data;
            if(res.status == '130'){
              this.showMessage("success,Info,来时路径数据提交成功！")
              this.disabledRuleForm4 =true;
              this.showCard2 = true;
              this.showCard1 = false;
              this.submitEndBtn = true;
              this.submitEnd = false;
              this.disabledEnd = false;
       
            }
          })
          } else {
            this.showMessage("error,Info,您还有一些必填项目未完成，请填写");
          }
        })

      }
      //路径登记  中转2次
      if(formName == 'ruleForm5'){
        this.$refs[formName].validate((valid) => {
          if (valid) { 
                 this.showCard3 = true;  
        this.ruleForm5.func = "中转2次"
        this.ruleForm5.toDate = this.ruleForm5.toDates.toLocaleDateString();
        this.ruleForm5.toTime = this.ruleForm5.toDates.toLocaleTimeString();
        this.ruleForm5.arriveDate = this.ruleForm5.arriveDates.toLocaleDateString();
        this.ruleForm5.arriveTime = this.ruleForm5.arriveDates.toLocaleTimeString();
        this.ruleForm5.toPlace = this.$refs['myCascader6'].getCheckedNodes()[0].label
        this.ruleForm5.toPlace1 = this.$refs['myCascader7'].getCheckedNodes()[0].label
        this.ruleForm5.toPlace20 = this.$refs['myCascader8'].getCheckedNodes()[0].label    
        this.ruleForm5.arrivePlace = this.$refs['myCascader9'].getCheckedNodes()[0].label
        this.fonticonSrc3 = this.imgSrcs[this.ruleForm5.toTrafficTools1];
        this.fonticonSrc4 = this.imgSrcs[this.ruleForm5.toTrafficTools2];
        this.fonticonSrc5 = this.imgSrcs[this.ruleForm5.toTrafficTools3];
        this.ruleForm5.toTrafficTools1 = this.tools[this.ruleForm5.toTrafficTools1];
        this.ruleForm5.toTrafficTools2 = this.tools[this.ruleForm5.toTrafficTools2];
        this.ruleForm5.toTrafficTools3 = this.tools[this.ruleForm5.toTrafficTools3];
       
        var arr1 = new Array(this.$store.state._id,this.ruleForm5)
        console.log(this.ruleForm5)
        console.log(arr1)
        let data = arr1;
        axios.post('/api/datas/trafficList',data).then((result)=>{
          let res = result.data;
            if(res.status == '130'){
              this.showMessage("success,Info,来时路径数据提交成功！")
              this.showCard3 = true;
              this.submitEndBtn = true;
              this.submitEnd = false;  
              this.active = 3;
              this.disabledRuleForm5 = true;
              this.disabledEnd = false;
       
            }
          })
          } else {
            this.showMessage("error,Info,您还有一些必填项目未完成，请填写");
          }
        })

      }
      //离场登记表
      if(formName == 'ruleForm0'){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = this.ruleForm0;
            let data = {
              "commonName":this.ruleForm0.commonName,
              "agent1":this.ruleForm0.agent1,
              "departureDate1":this.ruleForm0.departureDate1,
              "departureDate3":this.ruleForm0.departureDate3,
              "days":this.ruleForm0.days,
              "moneyFunc":this.ruleForm0.moneyFunc,
              "money":this.money,
              "day2":this.ruleForm0.money,
              "isOK":'OK'
            
            }
            console.log(data)
            axios.post('/api/datas/update',data).then((result)=>{
              let res = result.data;
              if(res.status == '400'){
                this.showMessage("success,Info,离场登记成功！")
              

              }
              })


          } else {
            console.log('error submit!!');
            this.$.showMessage("error,Info,请填完整后在提交。")
          }
        });
      }




      //基本信息表单
      if(formName == 'ruleForm'){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.active = 1;
            
            let data1 = this.ruleForm;
            const time1 = this.ruleForm.arrivalDate2.toLocaleTimeString()
            const time2 = this.ruleForm.departureDate2.toLocaleTimeString()
            let data = {
              "commonName": this.ruleForm.commonName,
              "dharmaName": this.ruleForm.dharmaName,
              "gender": this.ruleForm.gender,
              "source": this.$refs['myCascader2'].getCheckedNodes()[0].pathLabels.toString().replace(/,/g, ''),
              "phoneNumber": this.ruleForm.phoneNumber,
              "IdNumber": this.ruleForm.IdNumber,
              "agent": this.ruleForm.agent,
              "arrivalDate1": this.ruleForm.arrivalDate1,
              "arrivalDate2": this.ruleForm.arrivalDate2,
              "departureDate1": this.ruleForm.departureDate1,
              "departureDate2": this.ruleForm.departureDate2,
              "references": this.ruleForm.references,
              "guarantor": this.ruleForm.guarantor,
              "emergencyPhone": this.ruleForm.emergencyPhone,
              "causalMoney": this.ruleForm.causalMoney,
              "days": this.ruleForm.days,
              "sourceArray": this.ruleForm.source,
       
            }
            console.log(data)
            axios.post('/api/datas/datas', data).then((result) => {
              let res = result.data;
              if (res.status == 100) {
                this.showMessage("success,Info,数据提交成功！");
                this.showForm1 = false;
                this.showForm2 = true;
                this.show4 = true;
                this.disabled = true;
                console.log(res.res._id)
               // console.log(res.res)
               // this.$store.state.commonName = res.res.commonName;
                this.$store.state._id = res.res._id;
                console.log(this.$store.state._id);
              }


              if (res.status == 110) {
                this.showMessage("success,Info,数据更新成功！");
                this.showForm1 = false;
                this.showForm2 = true;
                this.show4 = true;
                this.disabled = true;
              //  this.$store.state.commonName = res.res.commonName;
               // console.log(res)
               // console.log(res.res.commonName)
               // console.log(this.$store.state.commonName)
               console.log(res.res._id)
                console.log(res.res)
                     this.$store.state._id = res.res._id;
                console.log(this.$store.state._id);
              }



            })
          } else {
            this.showMessage("error,Info,您还有一些必填项目未完成，请填写");

            console.log("")
          }


        })



      }

      },
      resetForm(formName) {
       if(formName == 'ruleForm'){
        this.$refs[formName].resetFields();
        this.active = '0';
       }
       if(formName == 'ruleForm0'){
        this.$refs[formName].resetFields();
        this.edit = false;
     
       }
       if(formName == 'ruleForm3'){
        this.$refs[formName].resetFields();
          this.showCard1 = false;  
          this.disabledRuleForm3 = false;
          this.disabled2 = true;
          this.submitEndBtn = false;
          this.submitEnd = true;
          this.active = 2
       }
        if(formName == 'ruleForm4'){
        this.$refs[formName].resetFields();
        this.disabledRuleForm4 = false;
        this.showCard2 = false;
        this.submitEndBtn = false;
        this.submitEnd = true;
        this.active = 2
       }
       if(formName == 'ruleForm5'){
        this.$refs[formName].resetFields();
        this.disabledRuleForm5 = false;
        this.showCard3 = false;
        this.submitEndBtn = false;
        this.submitEnd = true;
        this.active = 2
       }
      },
      
      submitEnd1(){
        //this.$router.push({path:'/print'})
         this.dialogTableVisible1 = true;
        // console.log('jinlaile')
       //this.flagHead = true;
         let data ={"_id":this.$store.state._id} 
        if(this.$store.state._id){
          //console.log('hhhh')
          axios.post('/api/datas/datasList',data).then((result) => {
          let res = result.data;
       
          this.gridDatas = res.res
          var obj1 = res.res 
          var array = JSON.parse(JSON.stringify(obj1));
          var arr = [];
          for(let i in array){
            arr.push(array[i]);
          }
          console.log(obj1)
          
          var infoList1 = [
                  {
                    commonName:arr[4],
                    dharmaName:arr[5],
                    guarantor:arr[20],
                    gender:arr[6],
                    source:arr[7],
                    phoneNumber:arr[8],
                    IdNumber:arr[9],
                    arrivalDate1:arr[11],
                    arrivalDate2:arr[12],
                    days:arr[18],
                    causalMoney:arr[17],
                    departureDate1:arr[13],
                    departureDate2:arr[14],
                    references:arr[15],
                    emergencyPhone:arr[16],
                    agent:arr[10]
                  }
          ]
          var goodsList1 = [];
       
           goodsList1 = arr[1];
       //    infoList1 = JSON.parse(JSON.stringify(infoList1));
          var trafficList1 = arr[2]
          // console.log(infoList1[0])
          // console.log(goodsList1)
         //  console.log(trafficList1[0])
        //   console.log(trafficList1)
          //var str = infoList1.split(",");
          //cosole.log(str);
            this.infoList = infoList1;
            this.goodsList = goodsList1;
            if(trafficList1[0].func == '直达'){
              this.table1 = true;
              this.table2 = false;
              this.table3 = false;
            }
            if(trafficList1[0].func == '中转1次'){
              this.table2 = true;
              this.table1 = false;
              this.table3 = false;
            }
            if(trafficList1[0].func == '中转2次'){
              this.table3 = true;
              this.table1 = false;
              this.table2 = false;
            }
            this.trafficList = trafficList1;
           
          
          if(res.status == 140){
             this.showMessage("success,Info,数据获取成功！");

          }

        })
        }else{
          console.log('我的')
        }
        

      },
      change(e){
        this.$forceUpdate()
      },
      printInfo(){
        this.$router.push({path:'/print'})
      },
      
      openMessage() {
        this.$notify.error({
          title: 'Info',
          message: '。',
          showClose: false
        })

      },
      showMessage(obj) {
        this.$notify({
           type: obj.split(",")[0],
          title: obj.split(",")[1],
          message: obj.split(",")[2],
          showClose: false,
        })
      },
      next() {
        this.active = 1;
      },
      addDatas() {
        this.show0 = false;
        this.show1 = false;
        this.show3 = true;
        this.show00 = false;
      },
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
      showSearch() {
        this.show2 = true;
        this.show3 = false;
        this.show1 = false;
        this.show00 = true;
        //数据列表
         axios.post('api/datas/getDataList').then((result)=>{
          if(result.data.status == 0){
          var arr = [];
          for(let i in JSON.parse(JSON.stringify(result.data.res))){
            this.infoAllList.push(JSON.parse(JSON.stringify(result.data.res))[i]);
          }
          console.log(result.data.res)
          //this.list = result.data.res;
      
         }
      })

         


      },
      weather(){
        axios({
             method: 'get',
             url:'https://www.tianqiapi.com/free/day?appid=75698768&appsecret=7LyHELsc&city=福州'
        }).then((response) => {
            console.log(response);//查看接口返回的数据
           // this.wea=response.data.wea;//天气
           // this.tem=response.data.tem;//温度
           // this.wea_img=response.data.wea_img;//图标名称
            console.log(response.data)
            }, function(response) {
            console.log("错误信息：" + response)
        });
        
      },
      showDataIndex() {
        this.show3 = false;
        this.show2 = false;
        this.show1 = true;
        this.show00 = false;
      },
      prints () {
      this.$print(this.$refs.print)
    },
    leave(){
      this.show1 = false;
      this.show0 = true;
      this.show3 = false;
    },
    getInfo(){
       axios.post('api/datas/getInfo', {
          commonName: this.ruleForm0.commonName
        }).then((result) => {

          let res = result.data
           if (res.status == 191) {
            this.showMessage("error,Info,您还没有入场登记，因此无法完成离场登记。")

          }
          if(res.status == 190){
            console.log(res.res)
            console.log(res.res.dharmaName)
            this.edit = true;
            this.ruleForm0= res.res
            console.log(this.ruleForm0)
            console.log(res.res.isOK)
            if(res.res.isOK == "OK"){
            this.edit1 = true;
              this.showMessage("error,Info,您已经离场登记过了，不可以重新登记，如有错误请联系管理员修改。")
            }
          }

        })
    },
    //计算时间差几天
      Days1(){
       /* console.log("进来了哦。")
        console.log(this.ruleForm0.departureDate1);
        var aDate,oDate1,oDate2,iDays
        var sDate1 = this.ruleForm0.departureDate1
        var sDate2 = this.ruleForm0.departureDate3
        var aDate = sDate1.split("-")
        oDate1 = new Date(aDate[0],aDate[1],aDate[2])
        aDate   =  sDate2.split("-")  
        oDate2 = new Date(aDate[0] , aDate[1] , aDate[2])  
        if(oDate1<=oDate2){
           this.daysNote1   =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
           this.ruleForm0.day = this.daysNote1;
           console.log(this.daysNote1)
         // this.ruleForm.causalMoney = this.daysNote * 50  + 100;
           }else{
              this.showMessage("error,Info,不符逻辑，请仔细填写！");
           }
          console.log(iDays)
          console.log(this.ruleForm0.day)
        console.log(oDate1>oDate2)
        //this.ruleForm.days = iDays + 1;
        console.log(this.daysNote1)*/

        console.log(this.ruleForm0.departureDate1)
       console.log(this.ruleForm0.departureDate3)

        var sDate1 = this.ruleForm0.departureDate1
        var sDate2 = this.ruleForm0.departureDate3

        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        var dateSpan = sDate2 - sDate1;
        var dateSpan = Math.abs(dateSpan);
        var iDays = Math.floor(dateSpan/(24*3600*1000));
        //console.log(iDays)
        this.daysNote1 = iDays
        //少住了
        if(sDate1>sDate2){
            //提早离开
            //返还金额：+ daysNote1 差异天数  
          //  console.log(this.ruleForm0.days)
               this.ruleForm0.day2 = parseInt(this.ruleForm0.days) - parseInt(this.daysNote1)
            this.daysNote1 = -iDays
            console.log(this.daysNote1)
            
           // this.ruleForm0.money = Math.abs(this.daysNote1) * 50 +100
           if(this.ruleForm0.day2 <= 0 ){
            this.showMessage("error,Info,请核实后再填写。")
            alert("请重新填写实离时间。")
           }

          }
          //正好
        if(sDate1 == sDate2){
        this.daysNote1 = 0;
       // console.log(this.daysNote1)
        this.ruleForm0.day2 = this.ruleForm0.days;
       // this.ruleForm0.money = 100
        //this.daysNote1 = 0;
        }
        //多住了
        if(sDate1<sDate2){
           this.daysNote1 = iDays
           console.log(this.daysNote1)
           this.ruleForm0.day2 = parseInt(this.ruleForm0.days) + parseInt(this.daysNote1)
          //  this.ruleForm0.money = 100 - this.daysNote1 * 50
        }
       // console.log(this.ruleForm0.moneyFunc)
         
        },
        filterHandler(value, row, column) {
      //  const prop

                return row[property] === value;
      },
      indexMethod(index) {
        return index+1 ;
      },
      moneyF(){
        console.log(this.ruleForm0.moneyFunc)
        console.log('moneyff')
         var sDate1 = this.ruleForm0.departureDate1
         var sDate2 = this.ruleForm0.departureDate3

        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);

        //daysNote1 < 0   少住了，应该返钱
        if(this.ruleForm0.moneyFunc == '返还本人'){

          if(this.daysNote1<0){
             this.money = -this.daysNote1 * 50 + 100;
          }
          if(this.daysNote1 == 0){
         
          this.money = 100
               }
          if(this.daysNote1>0){
          this.money = 100 - this.daysNote1 * 50 ;
          }
      }
      if(this.ruleForm0.moneyFunc == '转为因果'){
          if(this.daysNote1<0){
             this.money = -this.daysNote1 * 50  ;
          }
          if(this.daysNote1 == 0){
         
          this.money = 0
          console.log(this.ruleForm0.money)
           }
          if(this.daysNote1>0){
          this.money =  -this.daysNote1 * 50;
          }
      }
      if(this.ruleForm0.moneyFunc == '转为供养'){
          if(this.daysNote1<0){
             this.money = -this.daysNote1 * 50 ;
          }
          if(this.daysNote1 == 0){
         
          this.money = 0
          console.log(this.ruleForm0.money)
           }
          if(this.daysNote1>0){
          this.money =  -this.daysNote1 * 50  ;
          console.log("jinlaile")
          console.log(typeof this.daysNote1)
          console.log(typeof parseInt(this.daysNote1))
          }
      }
    }
  },
    components: {
      Head,
      Foot,
      treeTransfer
    }
  }
</script>

<style scoped>
  #table{
    border-collapse: collapse;
    margin:0 auto;
    text-align:center;
  }
  #table td, #table th{
    border:1px solid #cad9ea;
    color:#666;
    height:30px;
  }
  #transfer1,
  #transfer2 {

    padding: 10px;
    width: 10rem;

    text-align: left;

  }

  .go-top {
    position: fixed;
    bottom: 40px;
    right: 30px;

  }

  .bg {
    height: 3000px;
  }

  .demo-ruleForm .i {
    padding-top: 10px;
  }

  .addDia .el-dialog {
    width: 1000px;
  }
  .printArea{
    width:1300px;
    height:2000px;
     display:block;
    float:left;

    position: absolute;left:0px;top:3300px;
    
  }
  .customWidth{

    width:2000px;
  }
  ._table{width: 100%; border-collapse: collapse; border:1px solid black;text-align: center}
  ._table .thead  { border:1px solid #C1C1C1;font-size: 13px;    text-align: center;  font-weight:bold;}
  ._table .td{ line-height: 20px; text-align: center; height: 18px;border: 1px solid  #C1C1C1;}
  ._table td{border:1px solid   #C1C1C1;}
  .print {}
  
  .item {
  margin-top: 10px;
  margin-right: 40px;
}

</style>
