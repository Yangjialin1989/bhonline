<template>
  <div class="contents">
    <Head></Head>
    <div class="bg">

      <van-sticky>
        <el-row :gutter="20">
          <el-col :span="navSpans" :offset="navOffsets">
            <div class="grid-content bg-purple">
              <el-menu :default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item><img width="35" height="35" src="../assets/img/brand.png" alt=""></el-menu-item>
                <el-menu-item index="1">数据首页</el-menu-item>
                <el-menu-item index="2">排行榜</el-menu-item>
                <el-menu-item index="3">地图</el-menu-item>
                <el-menu-item>
                  <div>
                    <el-input placeholder="搜你所想" v-model="search" class="input-search">

                      <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                  </div>
                </el-menu-item>
                <el-menu-item>
                  <el-button :show="show3"  type="danger" @click="addGoods()">添加</el-button>
                </el-menu-item>
                </el-menu-item>
              </el-menu>

              <van-notice-bar v-if="this.$store.state.nickNameFlag" mode="closeable" left-icon="volume-o" :text="textNote">
                <marquee width="800%;" behavior="" direction="">{{ this.$store.state.nickName+"," }}{{ textNote }}</marquee>
              </van-notice-bar>

               <!-- 数据列表 @row-click="handleCurrentChange"-->
                 <el-table
                 class="tb-edit" highlight-current-row
                   :data="tableData.filter(data => !search || data.goods_name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%"
                    height="850">
                    <el-table-column
                      fixed
                      prop="goods_name"
                      label="名称"
                      width="150">
                    </el-table-column>
                    <el-table-column
                      prop="goods_sn"
                      label="序列号"
                      width="120">
                    </el-table-column>
                    <el-table-column prop="goods_medicines_producer" label="生产商" width="200"></el-table-column>

                    <el-table-column prop="goods_medicines_attr" label="物品类型" width="120"></el-table-column>
                    <el-table-column prop="goods_keywords" label="关键字" width="120"></el-table-column>
                    <el-table-column prop="goods_desc" label="详情" width="300"></el-table-column>
                    <el-table-column prop="goods_medicines_use" label="使用方法" width="200"></el-table-column>
                    <el-table-column prop="goods_img" id="box" label="图片" width="120">
                     <!-- <img style="width:100px;height:100px;" src="../../static/img/bg-0.jpg" alt="">

                   <div v-html="html1"></div>-->
                   </el-table-column>
                    <el-table-column
                      prop="goods_attr"
                      label="属性"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="goods_type"
                      label="类别"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="goods_position"
                      label="位置"
                      width="120">
                    </el-table-column>

                    <el-table-column
                      prop="goods_price"
                      label="单价(RMB)"
                      width="120">
                    </el-table-column>
                    <el-table-column prop="goods_number" label="数量" width="120"></el-table-column>
                    <el-table-column prop="goods_medicines_norms" label="规格" width="200"></el-table-column>





                    <el-table-column prop="goods_medicines_data_of_manufacture" label="生产日期" width="120"></el-table-column>
                    <el-table-column prop="goods_medicines_quality_guarantee_period" label="有效期(YEAR)" width="120"></el-table-column>
                    <el-table-column prop="goods_medicines_limit" label="过期日期" width="120"></el-table-column>
                    <el-table-column prop="goods_admin" label="提供人" width="120"></el-table-column>
                    <el-table-column prop="goods_people" label="统计人" width="120"></el-table-column>
                    <el-table-column prop="goods_add_time" label="统计日期" width="120"></el-table-column>



                    </el-table-column>




                  </el-table>

               <!-- 数据等级平台 -->
                  <div class="form_bg1 " v-if="show4">


                    <h2>数据库录入系统</h2>
                    <hr>
                    <van-notice-bar
                      left-icon="https://img.yzcdn.cn/1.png"
                      :text="textNote1"
                    />

                    <el-form :label-position="labelPosition" label-width="80px" :model="goods" ref="goods" >
                      <el-form-item label="属性:" prop="goods_attr">

                        <el-select v-model="goods.goods_attr" placeholder="请选择" @change="blur1">
                          <el-option v-for="item in attrs" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="类型:" prop="goods_type">
                        <el-select v-model="goods.goods_type" placeholder="请选择">
                          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="位置:" prop="goods_position">
                        <el-select v-model="goods.goods_position" placeholder="请选择">
                          <el-option v-for="item in positions" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="序列号:" prop="goods_sn">
                        <el-input v-model="goods.goods_sn" @focus="random">
                          <template slot="prepend">{{this.goods.goods_attr}}-{{this.goods.goods_type}}-{{this.goods.goods_position}}</template>

                        </el-input>
                      </el-form-item>
                      <el-form-item label="名称:" prop="goods_name">
                        <el-input v-model="goods.goods_name"></el-input>
                      </el-form-item>
                      <el-form-item label="数量(商品包装的最大单位):" prop="goods_number">
                        <!--                    <el-input v-model="goods.goods_number"></el-input> -->
                        <el-input-number v-model="goods.goods_number" @change="handleChange" :min="1" :max="300" label="描述文字"></el-input-number>

                      </el-form-item>
                      <el-form-item label="生产商:" v-if="flag3" prop="goods_number">
                        <el-input v-model="goods.goods_medicines_producer"></el-input>
                      </el-form-item>
                      <el-form-item label="物品类型:" v-if="flag3" prop="goods_medicines_attr">
                        <el-select v-model="goods.goods_medicines_attr" placeholder="请选择">
                          <el-option v-for="item in medicines_types" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="使用方法:" v-if="flag3" prop="goods_medicines_use">
                        <el-input v-model="goods.goods_medicines_use"></el-input>
                      </el-form-item>
                      <el-form-item label="规格:" v-if="flag3" prop="goods_medicines_norms">
                        <el-input v-model="goods.goods_medicines_norms"></el-input>
                      </el-form-item>
                      <el-form-item label="生产日期:" v-if="flag3" prop="goods_medicines_data_of_manufacture">
                        <el-date-picker v-model="goods.goods_medicines_data_of_manufacture" type="date" placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="保质期(年):" v-if="flag3" prop="goods_medcines_quality_guarantee_period">
                        <el-input-number v-model="goods.goods_medicines_quality_guarantee_period" :precision="2" :step="0.1"
                          :max="6">

                        </el-input-number>
                      </el-form-item>
                      <el-form-item label="过期日期:" v-if="flag3" prop="goods_medicines_limit">
                        <el-date-picker v-model="goods.goods_medicines_limit" type="date" placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="成本:" prop="goods_price">
                        <el-input v-model="goods.goods_price">
                          <template slot="append">RMB</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="关键字:" prop="goods_keywords">
                        <el-autocomplete class="inline-input" v-model="goods.goods_keywords" :fetch-suggestions="querySearch"
                          placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
                      </el-form-item>
                      <el-form-item label="详情:" prop="goods_desc">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="goods.goods_desc"></el-input>
                      </el-form-item>
                      <el-form-item label="图片地址:" prop="goods_img">
                        <el-input v-model="goods.goods_img"></el-input>
                      </el-form-item>
                      <el-form-item label="添加时间:" prop="goods_time">
                        <el-date-picker v-model="goods.goods_add_time" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="存在:" v-if="flag2" prop="goods_is_real">
                        <el-switch v-model="goods.goods_is_real" active-color="#13ce66" inactive-color="#ff4949"
                          active-value="1" inactive-value="0">
                        </el-switch>
                      </el-form-item>
                      <el-form-item label="删除:" v-if="flag2">
                        <el-switch v-model="goods.goods_is_delete" active-color="#13ce66" inactive-color="#ff4949"
                          active-value="1" inactive-value="0">
                        </el-switch>
                      </el-form-item>
                      <el-form-item label="最新:" v-if="flag2">
                        <el-switch v-model="goods.goods_is_new" active-color="#13ce66" inactive-color="#ff4949"
                          active-value="1" inactive-value="0">
                        </el-switch>
                      </el-form-item>
                      <el-form-item label="最热:" v-if="flag2">
                        <el-switch v-model="goods.goods_is_hot" active-color="#13ce66" inactive-color="#ff4949"
                          active-value="1" inactive-value="0">
                        </el-switch>
                      </el-form-item>
                      <el-form-item label="提供人:" prop="goods_admin">

                        <el-transfer id="transfer1" v-model="goods.goods_admin" :data="data"></el-transfer>



                      </el-form-item>
                      <el-form-item label="统计人:" prop="goods_people">
                        <el-input v-model="goods.goods_people"></el-input>

                              </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button @click="resetForm('goods')">重置</el-button>

                        <el-button @click="out">取消</el-button>

                      </el-form-item>
                    </el-form>

                </div>
                </el-table>











              </div>
          </el-col>
        </el-row>
      </van-sticky>
    </div>



    <img v-if="btnFlag" @click="backTop" class="go-top right" style="width:30px;height:30px;" src="/static/img/backtop.png"
      alt="">
  <Foot></Foot>
  </div>
</template>

<script>
  import Head from '@/components/Head'
  import Foot from '@/components/Foot'
  import axios from 'axios'
  export default {
    data() {

//               const cities = [
//               '智晴', '净意', '净云', '道望', '清凉', '会妙', '静真',
//               '清莲', '寂道', '会宁', '智明', '智清', '智慧', '智玲',
//               '净清', '智增', '慧贤', '禅晓', '清瑞', '寂芳', '会善',
// ];

    const generateData = _ => {
            // const data = [];
            // for (let i = 1; i <= 15; i++) {
            //   data.push({
            //     key: i,
            //     label: `备选项 ${ i }`
            //   });
            // }
           const data = [
                               {key:'1',label:'智晴'},{key:'2',label:'净云'},{key:'3',label:'道望'},{key:'4',label:'清凉'},{key:'5',label:'会妙'},
                               {key:'6',label:'静真'},{key:'7',label:'清莲'},{key:'8',label:'寂道'},{key:'9',label:'会宁'},{key:'10',label:'智明'},
                               {key:'11',label:'智清'}, {key:'12',label:'智晴'},{key:'13',label:'净云'},{key:'14',label:'道望'},{key:'15',label:'智增'},
                               {key:'16',label:'慧贤'},{key:'17',label:'禅晓'},{key:'18',label:'清瑞'},{key:'19',label:'寂芳'},{key:'20',label:'会善'},
                               {key:'21',label:'禅远'},{key:'22',label:'智玉'},{key:'23',label:'智醒'},{key:'24',label:'明海'}, {key:'25',label:'慧明'},
                               {key:'26',label:'静思'},{key:'27',label:'禅愿'},{key:'28',label:'定霞'}, {key:'29',label:'慧冰'}, {key:'30',label:'禅清'},
                               {key:'31',label:'定霖'}, {key:'32',label:'普闻'},{key:'33',label:'普峰'}, {key:'34',label:'寂成'}, {key:'35',label:'会光'},
                               {key:'36',label:'智诚'}, {key:'37',label:'智悟'},{key:'38',label:'智芳'}, {key:'39',label:'慧清'},{key:'40',label:'妙善'},
                               {key:'41',label:'慈定'}, {key:'42',label:'智莹'},{key:'43',label:'慧云'},{key:'44',label:'未确'},{key:'45',label:'智觉'},
                               {key:'46',label:'智通'},{key:'47',label:'定然'},{key:'48',label:'慧虹'}, {key:'49',label:'智哲'},{key:'50',label:'智云'},
                               {key:'51',label:'定艳'}, {key:'52',label:'慧娟'},{key:'53',label:'静悟'},{key:'54',label:'慧灯'},{key:'55',label:'明会'},
                               {key:'56',label:'智刚'},{key:'57',label:'禅亮'},{key:'58',label:'普梅'}, {key:'59',label:'净佳'},{key:'60',label:'智怡'},
                               {key:'61',label:'智援'}, {key:'62',label:'智萍'},{key:'63',label:'慧聪'},{key:'64',label:'妙喜'},{key:'65',label:'智开'},
                               {key:'66',label:'禅海'},{key:'67',label:'智雨'},{key:'68',label:'普觉'}, {key:'69',label:'智福'},{key:'70',label:'智海'},
                               {key:'71',label:'智月'}, {key:'72',label:'湛月'},{key:'73',label:'慈月'},{key:'74',label:'智道'},{key:'75',label:'寂清'},
                               {key:'76',label:'定强'},{key:'77',label:'智香'},{key:'78',label:'慧莲'}, {key:'79',label:'定雅'},{key:'80',label:'安雅'},
                               {key:'81',label:'普定'}, {key:'82',label:'智庆'},{key:'83',label:'禅梦'},{key:'84',label:'慈如'},{key:'85',label:'定章'},

                               {key:'86',label:'明晓'},{key:'87',label:'静雨'},{key:'88',label:'普晨'}, {key:'89',label:'清秀'},{key:'90',label:'寂雨'},
                               {key:'91',label:'明智'}, {key:'92',label:'智喜'},{key:'93',label:'清智'},{key:'94',label:'清环'},{key:'95',label:'静实'},
                               {key:'96',label:'智雅'},{key:'97',label:'智犯'},{key:'98',label:'智霞'}, {key:'99',label:'禅明'},{key:'100',label:'禅颖'},
                               {key:'101',label:'慧雪'}, {key:'102',label:'会禅'},{key:'103',label:'会娟'},{key:'104',label:'明晓'},{key:'105',label:'普怡'},
                               {key:'106',label:'智愿'},{key:'107',label:'定缘'},{key:'108',label:'普殊'}, {key:'109',label:'清玉'},{key:'110',label:'静心'},
                               {key:'111',label:'智雯'}, {key:'112',label:'定超'},{key:'113',label:'清晓'},{key:'114',label:'清净'},{key:'115',label:'会菁'},
                               {key:'116',label:'寂然'},{key:'117',label:'静怡'},{key:'118',label:'智澜'}, {key:'119',label:'智空'},{key:'120',label:'智娟'},
                               {key:'121',label:'妙音'}, {key:'122',label:'妙震'},{key:'123',label:'慧平'},{key:'124',label:'悟本'},{key:'125',label:'正觉'},
                               {key:'126',label:'之静'},{key:'127',label:'安晓'},{key:'128',label:'智华'}, {key:'129',label:'智静'},{key:'130',label:'净范'},
                               {key:'131',label:'禅威'}, {key:'132',label:'智英'},{key:'133',label:'妙丽'},{key:'134',label:'智理'},{key:'135',label:'慧程'},
                               {key:'136',label:'普晓'},{key:'137',label:'定芳'},{key:'138',label:'清云'}, {key:'139',label:'智尧'},{key:'140',label:'普弘'},
                               {key:'141',label:'普缘'}, {key:'142',label:'定心'},{key:'143',label:'静明'},{key:'144',label:'禅易'},{key:'145',label:'慧心'},
                               {key:'146',label:'静武'},{key:'147',label:'净强'},{key:'148',label:'净惠'}, {key:'149',label:'定聪'},{key:'150',label:'智孝'},

                              {key:'151',label:'普觉'}, {key:'152',label:'净晓'},{key:'153',label:'清心'},{key:'154',label:'普光'},{key:'155',label:'普会'},
                               {key:'156',label:'清智'},{key:'157',label:'会远'},{key:'158',label:'普明'}, {key:'159',label:'普辉'},{key:'160',label:'普智'},
                               {key:'161',label:'净瑞'}, {key:'162',label:'妙音'},{key:'163',label:'普静'},{key:'164',label:'普强'},{key:'165',label:'普建'},
                               {key:'166',label:'妙心'},{key:'167',label:'普钰'},{key:'168',label:'普兰'}, {key:'169',label:'普毅'},{key:'170',label:'普伊'},
                               {key:'171',label:'妙香'}






                               ];
            return data;
          };


      return {
        html1:"<img style='width:100px;height:100px;'src='../../static/img/bg-0.jpg'>",
        html2:'<p>hhhhhhh</p>',
        textNote1:'欢迎来到数据登记系统，涉及到药品、用具有保质期的，要完整填写，谢谢配合！',
        src1:[],
        data: generateData(),
                value: [1,4],


        show3 : false,
        show4 :false,
        medicines_types: [{
            value: '中药',
            label: 'Chinese medicine'
          },
          {
            value: '西药',
            label: 'Western medicine'
          },
          {
            value: '中西药',
            label: 'Chinese and Western Medicine'
          },
          {
            value: '外用药品',
            label: 'Medicines for external use'
          },
          {
            value: '消毒药品',
            label: 'Disinfectant'
          },
          {
            value: '日化用品',
            label: 'Daily chemicals'
          },
          {
            value: '劳动用品',
            label: 'Labour articles '
          },
          {
            value: '医用工具',
            label: 'Medical tools'
          },
          {
            value:'保健药品',
            label:'Health care medicine'
          },
          {
            value: '配件',
            label: 'Parts'
          },
          {
            value: '其他',
            label: 'Other Medicine'
          },
          {
            value: '危化品',
            label: 'Hazardous chemicals'
          }
        ],
        flag2: false,
        flag3: true,
        restaurants: [],
        types: [{
            value: "001",
            label: "铁锹"
          },
          {
            value: "002",
            label: "镰刀"
          },
          {
            value: "003",
            label: "锄头"
          },
          {
            value: "004",
            label: "铁锨"
          },
          {
            value: "005",
            label: "耙子"
          },
          {
            value: "006",
            label: "扫把"
          },
          {
            value: "007",
            label: "畚斗"
          },
          {
            value: "008",
            label: "桶"
          },
          {
            value: "009",
            label: "盆"
          },
          {
            value: "010",
            label: "杯子"
          },
          {
            value: "011",
            label: "衣服"
          },
          {
            value: "012",
            label: "插排"
          },
          {
            value: "013",
            label: "水龙头"
          },
          {
            value: "014",
            label: "水管"
          },
          {
            value: "015",
            label: "打印机"
          },
          {
            value: "016",
            label: "饮水机"
          },
          {
            value: "017",
            label: "电视"
          },
          {
            value: "018",
            label: "空调"
          },
          {
            value: "019",
            label: "热水器"
          },
          {
            value: "020",
            label: "吸尘器"
          },
          {
            value: "021",
            label: "风扇"
          },
          {
            value: "022",
            label: "灯泡"
          },
          {
            value: "023",
            label: "音响"
          },
          {
            value: "024",
            label: "电脑"
          },
          {
            value: "025",
            label: "炒锅"
          },
          {
            value: "026",
            label: "蒸锅"
          },
          {
            value: "027",
            label: "茶具"
          },
          {
            value: "028",
            label: "碗"
          },
          {
            value: "029",
            label: "筷子"
          },
          {
            value: "030",
            label: "菜刀"
          },
          {
            value: "031",
            label: "抹布"
          },
          {
            value: "032",
            label: "香皂"
          },
          {
            value: "033",
            label: "肥皂"
          },
          {
            value: "034",
            label: "洗衣液"
          },
          {
            value: "035",
            label: "洗衣粉"
          },
          {
            value: "036",
            label: "螺丝刀"
          },
          {
            value: "037",
            label: "万用表"
          },
          {
            value: "038",
            label: "安全带"
          },
          {
            value: "039",
            label: "砍刀"
          },
          {
            value: "040",
            label: "手磨机"
          },
          {
            value: "041",
            label: "电钻"
          },
          {
            value: "042",
            label: "钳子"
          },
          {
            value: "043",
            label: "剪刀"
          },
          {
            value: "044",
            label: "胶"
          },
          {
            value: "045",
            label: "锯"
          },
          {
            value: "046",
            label: "锤子"
          },
          {
            value: "047",
            label: "斧头"
          },
          {
            value: "048",
            label: "钻头"
          },
          {
            value: "049",
            label: "药"
          },
          {
            value: "050",
            label: "创可贴"
          },
          {
            value: "051",
            label: "退热贴"
          },
          {
            value: "052",
            label: "消毒"
          },
          {
            value: "053",
            label: "牙签"
          },
          {
            value: "054",
            label: "收纳盒"
          },
          {
            value: "055",
            label: "体温计"
          },
          {
            value: "056",
            label: "镊子"
          },
          {
            value: "057",
            label: "手套"
          },
          {
            value: "058",
            label: "剪刀"
          },
          {
            value: "059",
            label: "口罩"
          },
          {
            value: "060",
            label: "固定贴"
          },
          {
            value: "061",
            label: "棉球"
          },
          {
            value: "062",
            label: "纱布"
          },
          {
            value: "063",
            label: "棉签"
          },
          {
            value: "064",
            label: "纱布块"
          },
          {
            value: "065",
            label: "粘敷贴"
          },
          {
            value: "066",
            label: "垃圾袋"
          },
          {
            value: "067",
            label: "纸篓"
          },
          {
            value: "068",
            label: "纸筒"
          },
          {
            value: "069",
            label: "针线盒"
          },{
            value: "070",
            label: "夹子"
          },
          {
            value: "071",
            label: "衣服架"
          },
          {
            value: "072",
            label: "订书钉"
          },
          {
            value: "073",
            label: "订书器"
          },
          {
            value: "074",
            label: "粘钩"
          },
          {
            value: "075",
            label: "护垫"
          },
          {
            value: "076",
            label: "雨伞"
          },
          {
            value: "077",
            label: "麦克风"
          },
          {
            value: "078",
            label: "去污剂"
          },
          {
            value: "079",
            label: "化妆品"
          },
          {
            value: "080",
            label: "鞋油"
          },
          {
            value: "081",
            label: "充电器"
          },
          {
            value: "082",
            label: "刷子"
          },
          {
            value: "083",
            label: "电吹风"
          },
          {
            value: "084",
            label: "导水球"
          },
          {
            value: "085",
            label: "剃须刀"
          },
          {
            value: "086",
            label: "蚊香"
          },
          {
            value: "087",
            label: "电蚊香"
          },
          {
            value: "088",
            label: "水舀"
          },
          {
            value: "089",
            label: "镐头"
          },
          {
            value: "090",
            label: "面板"
          },
          {
            value: "091",
            label: "擀面杖"
          },
          {
            value: "092",
            label: "羹匙"
          },
          {
            value: "093",
            label: "灭火毯"
          },
          {
            value: "094",
            label: "灭火器"
          },
          {
            value: "095",
            label: "勺子"
          },
          {
            value: "096",
            label: "铲子"
          },
        ],
        positions:[
          {
            value:'01',
            label:'工具间'
          },
          {
            value:'02',
            label:'请香处'
          },
          {
            value:'03',
            label:'天王殿'
          },
          {
            value:'04',
            label:'天井'
          },
          {
            value:'05',
            label:'大雄宝殿'
          },
          {
            value:'06',
            label:'厨房'
          },
          {
            value:'07',
            label:'监控室'
          },
          {
            value:'08',
            label:'斋堂'
          },
          {
            value:'09',
            label:'柴棚'
          },
          {
            value:'10',
            label:'男外寮'
          },
          {
            value:'11',
            label:'男内寮'
          },
          {
            value:'12',
            label:'女外寮'
          },
          {
            value:'13',
            label:'女内寮'
          },
          {
            value:'14',
            label:'男浴室'
          },
          {
            value:'15',
            label:'女浴室'
          },
          {
            value:'16',
            label:'帐篷'
          },
          {
            value:'17',
            label:'办公室'
          },
          {
            value:'18',
            label:'伽蓝殿'
          },
          {
            value:'19',
            label:'祖师殿'
          },
          {
            value:'20',
            label:'尊客堂'
          },
          {
            value:'21',
            label:'内观堂'
          },
          {
            value:'22',
            label:'土屋'
          }
        ],
        attrs: [{
            value: '01',
            label: '农用工具'
          },
          {
            value: '02',
            label: '厨房用具'
          },
          {
            value: '03',
            label: '餐饮用具'
          },
          {
            value: '04',
            label: '卧具'
          },
          {
            value: '05',
            label: '床上用品'
          },
          {
            value: '06',
            label: '办公用品'
          },
          {
            value: '07',
            label: '医疗用品'
          },
          {
            value: '08',
            label: '药品'
          },
          {
            value: '09',
            label: '上师专用'
          },
          {
            value: '10',
            label: '清洁用品'
          },
          {
            value: '11',
            label: '法具'
          },
          {
            value: '12',
            label: '电气工具'
          },
          {
            value: '13',
            label: '日化用品'
          },
          {
            value: '14',
            label: '消防用品'
          }

        ],
        labelPosition: 'right',
        goods: {
          goods_attr: '',
          goods_type: '',
          goods_position:'',
          goods_sn: '',
          goods_name: '',
          goods_number: '',
          goods_price: '',
          goods_keywords: '',
          goods_desc: '',
          goods_img: '',
          goods_is_real: '0',
          goods_add_time: '',
          goods_is_delete: '0',
          goods_is_new: '0',
          goods_is_hot: '0',
          goods_admin: [],
          goods_people: '会光',
          goods_medicines_producer: '',
          goods_medicines_attr: '',
          goods_medicines_use: '',
          goods_medicines_norms: '',
          goods_medicines_data_of_manufacture: '',
          goods_medicines_quality_guarantee_period: '',
          goods_medicines_limit: ''

        },
        show1: true,
        btnFlag: false,
        textNote: '欢迎来到数据中心！',
        navSpans: 18,
        navOffsets: 3,
        tableData:[],
        tableData1: [{
                  date: '2016-05-03',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }, {
                  date: '2016-05-02',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }, {
                  date: '2016-05-01',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }, {
                  date: '2016-05-08',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }, {
                  date: '2016-05-06',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }, {
                  date: '2016-05-07',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }],
        search: ''
      }
    },
    mounted() {
      window.addEventListener('scroll', this.scrollToTop);
      this.restaurants = this.loadAll();
      this.postLists()
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
      resetForm(goods){

               if (this.$refs[goods]!==undefined) {
                   this.$refs[goods].resetFields();

               }
            },
      postLists(){





        axios.post('/api/lists/getlists').then((result)=>{
          let res = result.data;
          if (res.status == 0) {
            console.log('数据获取成功')
           // console.log(res.res)
            this.tableData = res.res;


           var arr = []

            var nowDate = new Date();
           for(var i in res.res){
             if(nowDate < res.res[i].goods_medicines_limit){


                    arr.push(res.res[i]);


             }


           }
           console.log(arr)




          } else {
            console.log('数据获取失败')
          }
        })
      },
      transfer1(){
        console.log('xuanzhognlenile')
      },
      random(){

        var num = '';
                for(var i=0;i<4;i++)
                {
                    num+=Math.floor(Math.random()*10);
                }
        this.goods.goods_sn = num;
      },
      out(){
        this.show4 = false;
      },
      blur1() {
        if (this.goods.goods_attr == '08') {

          this.goods.goods_type = '049';


        } else {

          this.goods.goods_type = '';

        }
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [{
            "value": "上师专用"
          },
          {
            "value": "危险"
          },
          {
            "value": "高风险"
          },
          {
            "value": "怕雨"
          },
          {
            "value": "快过期了"
          },
          {
            "value": "特种工具"
          },
          {
            "value": "厨房专用"
          },
          {
            "value": "专人看管"
          },
          {
            "value": "待报废"
          },
          {
            "value": "已经损坏"
          },
          {
            "value": "注意"
          },
          {
            "value": "用电危险"
          },

        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      onSubmit() {
        var a = this.goods.goods_admin;
           var arr = []
          for(var i in a){
          arr.push(this.data[a[i]-1].label)
        }

        this.goods.goods_admin = arr;
         this.goods.goods_sn = this.goods.goods_attr + "-" + this.goods.goods_type + "-" + this.goods.goods_position + "-" + this.goods.goods_sn;
        let data = {
          'goods_attr': this.goods.goods_attr+"("+this.attrs[parseInt(this.goods.goods_attr)-1].label+")",

          'goods_type': this.goods.goods_type+"("+this.types[parseInt(this.goods.goods_type)-1].label+")",

          'goods_position':this.goods.goods_position+"("+this.positions[parseInt(this.goods.goods_position)-1].label+")",

          'goods_sn': this.goods.goods_sn,
          'goods_name': this.goods.goods_name,
          'goods_number': this.goods.goods_number,
          'goods_price': this.goods.goods_price,
          'goods_keywords': this.goods.goods_keywords,
          'goods_desc': this.goods.goods_desc,
          'goods_img': this.goods.goods_img,
          'goods_is_real': this.goods.goods_is_real,
          'goods_add_time': this.goods.goods_add_time,
          'goods_is_delete': this.goods.goods_is_delete,
          'goods_is_new': this.goods.goods_is_new,
          'goods_is_hot': this.goods.goods_is_hot,
          'goods_admin': this.goods.goods_admin,
          'goods_people': this.goods.goods_people,
          'goods_medicines_producer': this.goods.goods_medicines_producer,
          'goods_medicines_attr': this.goods.goods_medicines_attr,
          'goods_medicines_norms': this.goods.goods_medicines_norms,
          'goods_medicines_use': this.goods.goods_medicines_use,
          'goods_medicines_data_of_manufacture': this.goods.goods_medicines_data_of_manufacture,
          'goods_medicines_quality_guarantee_period': this.goods.goods_medicines_quality_guarantee_period,
          'goods_medicines_limit': new Date(this.goods.goods_medicines_limit),
        }
        axios.post('/api/lists/lists',data).then((result) => {
          let res = result.data;
          if (res.status == 0) {
            console.log('数据添加成功')
            console.log(res)
            this.resetForm('goods')
          } else {
            console.log('数据添加失败')
          }
        })
        console.log(data);
      },
      addGoods() {
        console.log('添加商品')
        this.show3 = false;
        this.show4 = true;


      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleChange(value) {
        console.log(value);
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



      }
    },
    components: {
      Head,
      Foot
    }
  }
</script>
<style scoped>
 #transfer1,#transfer2{

     padding:10px;

     text-align: left;

  }
  .contents {
    height: 1000px;
    padding: 30px;
  }

  .go-top {
    position: fixed;
    bottom: 40px;
    right: 30px;

  }

  .bg {
    height: 3000px;
  }

  .form_bg1 {

    background-color: gainsboro;
    height: 500px;

    position:fixed;left:30%;top:100px;
    padding: 10px;
    overflow: auto;
  }

/*  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  } */
</style>
