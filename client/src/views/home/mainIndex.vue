<template>
	<div class="Bigdiv">
	<div class="header">
		<img src="../../../build/logos.png" alt="" />
		<span>中铁建物业数据平台</span>
	</div>
	<div class="divBox">
		<div class="el-col el-col-24 left">
			<div class="el-col el-col-6">
				<div class="bg">
					<h5 class=" title"><span></span>{{constants.title}}</h5>
					<div  id="businessIncome"></div>
				</div>
			</div>
			<div class="el-col el-col-6">
				<div class="bg">
					<h5 class="title"><span></span>{{netProfitTitle}}</h5>
					<div id="netProfit"></div>
				</div>
			</div>
			<div class="el-col el-col-6">
				<div class="bg">
					<h5 class="title"><span></span>{{liabilitiesTitle}}</h5>
					<div id="liabilities"></div>
				</div>
			</div>
			<div class="el-col el-col-6">
				<div class="bg">
					<h5 class="title"><span></span>{{propertyFeeTitle}}</h5>
					<div  id="propertyFee"></div>
				</div>
			</div>
			
		</div>
		<div class="el-col el-col-24 bottom">
			<div class="el-col el-col-6 bottomL">
				<div>
					<div class="bg">
						<h5 class="title"><span></span>{{personNumTitle}}</h5>
						<div id="personNum"></div>
					</div>
				</div>	
				<div>
					<div class="bg">
						<h5 class="title"><span></span>{{satisfactionTitle}}</h5>
						<div id="satisfaction"></div>
					</div>
				</div>	
				<div>
					<div class="bg">
						<h5 class="title"><span></span>{{waterElectricTitle}}</h5>
						<div id="waterElectric"></div>
					</div>
				</div>	
			</div>	
			<div class="el-col el-col-12 bottomC">
				<div class="bg">
					<div class="el-col el-col-12 pos-rela">
					<!--<h5 class="title"><span></span>{{waterElectricTitle}}</h5>-->
						<div class="gaojingBox">
							<div id="equipmentChart"></div>
						</div>
					
						<div class="pub-pos-a map-left-value">
							<ul>
								<li  v-for="(item,index) in companyleft"  :key="index" >{{item}}</li>
							</ul>
						</div>
						<div class="pub-pos-a map-right-value">
							<ul>
								<li  v-for="(item,index) in companyright"  :key="index" >{{item}}</li>
							</ul>
						</div>
						<div class="charge">
						  	<div   v-for="(item,index) in realCharge"  :key="index"  class="el-col-12 yesterday">
									<label class="font-s">{{item.title}}<span class="font-s-data">{{item.time}}</span></label>
									<h1 >{{item.money}}<span class="font-s-unit">{{item.unit}}</span></h1>
								</div>
						</div>
						<div class="bottom-Statistics clearfix">
							<div  v-for="(item,index) in mapAllStatistics"  :key="index"  class="yesterday float-left-c">
								<label class="font-s">{{item.title}}</label>
								<h1 >{{item.data}}<span class="font-s-unit">{{item.unit}}</span></h1>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="el-col el-col-6 bottomR">
				<div>
					<div class="bg">
						<h5 class="title"><span></span>{{prePaymentTitle}}</h5>
						<div id="propertyFeeid"></div>
					</div>
				</div>	
				<div>
					<div class="bg">
						<h5 class="title"><span></span>{{prepaidPropertyChargesTitle}}</h5>
						<div id="prepaidPropertyCharges"></div>
					</div>
				</div>	
				<div>
					<div class="bg">
						<h5 class="title"><span></span>{{operationsMultipleTitle}}</h5>
						<div id="operationsMultiple"></div>
					</div>
				</div>	
			</div>
			
		</div>
	</div>
</div>
</template>
	
<script>
	import CONSTANTS from '../../../config/Constants.js';
	import axios from "axios";
	export default {
	  name: 'hello',
	  components: {
		// ColumnarBrokenLine
	  },
	  data () {
	    return {
				msg: '',
				constants:CONSTANTS.businessIncome,
				netProfitTitle:CONSTANTS.netProfit.title,
				liabilitiesTitle:CONSTANTS.liabilities.title,
				propertyFeeTitle:CONSTANTS.propertyFee.title,
				personNumTitle:CONSTANTS.personNum.title,
				satisfactionTitle:CONSTANTS.satisfaction.title,
				waterElectricTitle:CONSTANTS.waterElectric.title,
				companyleft:CONSTANTS.equipmentChart.companyleft,
				companyright:CONSTANTS.equipmentChart.companyright,
				mapAllStatistics:CONSTANTS.equipmentChart.mapAllStatistics,
				prePaymentTitle:CONSTANTS.propertyFeeid.title,//物业费单价
				operationsMultipleTitle:CONSTANTS.operationsMultiple.title ,//多种经营
				realCharge:CONSTANTS.equipmentChart.realCharge, //  地图收费统计
				prepaidPropertyChargesTitle:CONSTANTS.prepaidPropertyCharges.title, //物业费预收
        data: ''

	    }
	 },
  mounted(){
	this.businessIncomeFn('businessIncome'); //营业同级收入
	this.businessIncomeFn('netProfit'); //净利润统计
	this.liabilitiesFn('liabilities');//成长规模
	this.propertyFee('propertyFee'); //当年物业费
	this.operationsMultipleFn('operationsMultiple'); //多种经营
	this.personNumFn(); //人员数量统计
	this.satisfactionFn(); //客户满意度
	this.waterElectricFn(); //用水用点情况
	this.drawEquipment();  //地图
	this.propertyFeeFn('propertyFeeid'); //物业费单价
	this.propertyFeeFn('prepaidPropertyCharges'); //物业收费
  this.getChemical();
   
  },
  methods: {
    getChemical() {
  axios.get("/chemical").then((response)=>{
		let res = response.data;
		this.data = res;
		console.log(this.data)
		console.log("执行了")
  }).catch((err)=>{
    console.log(err);
  });	
},

	//    营业同级收入 -lyf
	businessIncomeFn(id){
        // 基于准备好的dom，初始化echarts实例
    	var nowChartBusinessIncome = this.$echarts.init(document.getElementById(id));
        // 绘制柱状折线图-营业收入统计
        var optionBusiness = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:CONSTANTS[id].itemTitle,
		        textStyle:{//图例文字的样式
           			color:'#fff',
				   },
			},
			grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '10%',
		        top:'30%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : CONSTANTS[id].xAxisData,
					
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						}
					}
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '(万元)',
					left:'10',
					data: CONSTANTS[id].yAxisData,
					min: 0,
          // max: 60000,
          // interval: 20000,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
					},
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          },
					nameTextStyle:{
						color:'#fff',
					}
				},
				{
					type : 'value',
					name : '',
					data: CONSTANTS[id].yAxisData1,
					max: 100,
          min: 0,
          interval: 25,
					axisLabel : {
						formatter: '{value}%',
						textStyle:{
							color:'#fff',
							fontSize:10
						}

					},
					splitLine : {
					show:true,
					lineStyle: {
						color: '#5e6067',
						type: 'dashed',
						width: 1
					}
            },
				}
			],
			series : [

				{
					name:'完成值',
					type:'bar',
					barWidth : 5,
					data:CONSTANTS[id].seriesBarData1,
					itemStyle: {
						normal: {
							color: '#f691b8',
						},
					}
				},
				{
					name:'目标值',
					type:'line',
					symbol:'none',
					itemStyle:{
						normal:{
							lineStyle: {
							width:2,
							type:'solid',
							color: '#8499bf',
							}
						}
					},
					data:CONSTANTS[id].seriesLineData
				},
				{
					name:'目标达成率',
					type:'line',
					yAxisIndex: 1,
					data:CONSTANTS[id].seriesLineData2,
					yAxisIndex: 1,
				},
			]
		};
   
                    
    	if (optionBusiness && typeof optionBusiness === "object") {
		    nowChartBusinessIncome.setOption(optionBusiness, true);
		  }
	} ,//方法end
	
	//    成长规模 -lyf
	liabilitiesFn(id){
        // 基于准备好的dom，初始化echarts实例
    	var nowChartBusinessIncome = this.$echarts.init(document.getElementById(id));
        // 绘制柱状折线图-营业收入统计
        var optionBusiness = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:CONSTANTS.liabilities.itemTitle,
		        textStyle:{//图例文字的样式
           			color:'#fff',
				   },
			},
			grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '10%',
		        top:'30%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : CONSTANTS.liabilities.xAxisData,
					
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						}
					}
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '(万元)',
					left:'10',
					data: CONSTANTS.liabilities.yAxisData,
					min: 0,
          max: 2000,
          interval: 500,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
					},
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          },
					nameTextStyle:{
						color:'#fff',
					}
				},
				{
					type : 'value',
					name : '',
					data: CONSTANTS.liabilities.yAxisData1,
					max: 0.8,
          min: 0,
          interval: 0.2,
					axisLabel : {
						formatter: '{value}%',
						textStyle:{
							color:'#fff',
							fontSize:10
						}

					},
					splitLine : {
					show:true,
					lineStyle: {
						color: '#5e6067',
						type: 'dashed',
						width: 1
					}
            },
				}
			],
			series : [

				{
					name:'在管面积',
					type:'bar',
					barWidth : 5,
					data:CONSTANTS.liabilities.seriesLineData1,
					itemStyle: {
						normal: {
							color: '#f691b8',
						},
					}
				},
				
				{
					name:'人均在管面积',
					type:'line',
					symbol:'none',
					yAxisIndex: 1,
					itemStyle:{
						normal:{
							lineStyle: {
							width:2,
							// type:'solid',
							// color: '#8499bf',
							}
						}
					},
					data:CONSTANTS.liabilities.seriesLineData3
				}
			]
		};
   
                    
    	if (optionBusiness && typeof optionBusiness === "object") {
		    nowChartBusinessIncome.setOption(optionBusiness, true);
		  }
	} ,//方法end
// 规模成长
	propertyFee(id){
	// 基于准备好的dom，初始化echarts实例
		var nowChartPropertyFee = this.$echarts.init(document.getElementById(id));
		// 绘制柱状折线图-营业收入统计
		var optionBusiness = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:CONSTANTS.propertyFee.itemTitle,
				textStyle:{//图例文字的样式
					color:'#fff',
				},
			},
			grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '10%',
		        top:'30%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : CONSTANTS.propertyFee.xAxisData,
					
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						}
					},
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '(万元)',
					data: CONSTANTS.propertyFee.yAxisData,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
					},
					
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          			},
					nameTextStyle:{
						color:'#fff',
					}
				},
				{
					type : 'value',
					name : '',
					data: CONSTANTS.propertyFee.yAxisData1,
					axisLabel : {
						formatter: '{value}%',
						textStyle:{
							color:'#fff',
							fontSize:10
						}

					},
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          },
				}
			],
			series : [

				{
					name:'完成值',
					type:'bar',
					barWidth : 5,
					data:CONSTANTS.propertyFee.seriesBarData,
					itemStyle: {
						normal: {
							color: '#f691b8',
						},
					}
				},
				{
					name:'目标值',
					type:'line',
					symbol:'none',
					itemStyle:{
						normal:{
							lineStyle: {
							 width:1,
							type:'solid'
							}
						}
					},
					data:CONSTANTS.propertyFee.seriesLineData1
				},
				{
					name:'清次率',
					type:'line',
					yAxisIndex: 1,
					data:CONSTANTS.propertyFee.seriesLineData2
				},
				{
					name:'收缴率',
					type:'line',
					yAxisIndex: 1,
					data:CONSTANTS.propertyFee.seriesLineData3,
				}
			]
		};

					
		if (optionBusiness && typeof optionBusiness === "object") {
			nowChartPropertyFee.setOption(optionBusiness, true);
			}
	},
	// 多种经营
		operationsMultipleFn(id){
	// 基于准备好的dom，初始化echarts实例
		var nowChartPropertyFee = this.$echarts.init(document.getElementById(id));
		// 绘制柱状折线图-营业收入统计
		var optionBusiness = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:CONSTANTS[id].itemTitle,
				textStyle:{//图例文字的样式
					color:'#fff',
				},
			},
			grid: {
		        left: '5%',
		        right: '4%',
		        bottom: '10%',
		        top:'30%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : CONSTANTS[id].xAxisData,
					
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						}
					},
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '(万元)',
					data: CONSTANTS[id].yAxisData,
					min: 0,
          max: 70000,
          interval: 20000,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
					},
					
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          			},
					nameTextStyle:{
						color:'#fff',
					}
				},
				{
					type : 'value',
					name : '',
					data: CONSTANTS[id].yAxisData1,
					axisLabel : {
						formatter: '{value}%',
						textStyle:{
							color:'#fff',
							fontSize:10
						}

					},
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          },
				}
			],
			series : [

				{
					name:'完成值',
					type:'bar',
					barWidth : 5,
					data:CONSTANTS[id].seriesBarData,
					itemStyle: {
						normal: {
							color: '#f691b8',
						},
					}
				},
				{
					name:'目标值',
					type:'line',
					symbol:'none',
					itemStyle:{
						normal:{
							lineStyle: {
							 width:1,
							type:'solid'
							}
						}
					},
					data:CONSTANTS[id].seriesLineData1
				},
				{
					name:'月度完成率',
					type:'line',
					yAxisIndex: 1,
					data:CONSTANTS[id].seriesLineData2
				},
				{
					name:'年度度完成率',
					type:'line',
					yAxisIndex: 1,
					data:CONSTANTS[id].seriesLineData3,
				}
			]
		};

					
		if (optionBusiness && typeof optionBusiness === "object") {
			nowChartPropertyFee.setOption(optionBusiness, true);
			}
	},
	// 人员数量
	personNumFn(){
		var nowChartPersonNum = this.$echarts.init(document.getElementById('personNum'));
		// 绘制柱状折线图-营业收入统计
		var optionPersonNum = {
			tooltip : {
			   	trigger: 'item',
			    formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient : 'vertical',
				x : 'right',
				textStyle: {
		            fontSize: 12,
		            color: '#fff'
		       },
				data:CONSTANTS.personNum.itemTitle
			},
			calculable : false,
			series : [
				{
					name:'访问来源',
					type:'pie',
					selectedMode: 'single',
					radius : [0,'35%'],
					center : ['35%', '50%'],
					funnelAlign: 'right',
					max: 1548,	
					itemStyle : {
						normal : {
							label : {
								position : 'inner'
							},
							labelLine : {
								show : false
							}
						}
					},
					data:CONSTANTS.personNum.seriesData.one,
					// itemStyle:{
					//    textStyle:{
					// 		 color:'#fff'
					// 	 }
					// }
				},
				{
					name:'访问来源',
					type:'pie',
					radius : ['40%', '60%'],
					center : ['35%', '50%'],
//					// for funnel
//					x: '60%',
//					width: '35%',
					funnelAlign: 'left',
					max: 1048,
					labelLine: {
		                normal: {
		                    length: 2,
		                    
		                }
		 
		            },

					data:CONSTANTS.personNum.seriesData.two
				}
			]
		};

					
		if (optionPersonNum && typeof optionPersonNum === "object") {
			nowChartPersonNum.setOption(optionPersonNum, true);
			}
	},
	//客户满意度
	satisfactionFn(){
		
		var nowChartSatisfaction= this.$echarts.init(document.getElementById('satisfaction'));
		// 雷达图
		var optionlei = {
			title : {
				// text: '客户满意度',
			},
			tooltip:{
		        trigger: 'axis'
		    },
			polar:[
				{
					nameGap : 5, // 图中工艺等字距离图的距离
					center:['50%','47%'],
					name:{
						textStyle: {
										color:'#fff' // 工艺等文字颜色
						}
					},
					indicator : CONSTANTS.satisfaction.indicatorValue,
					radius : 40,
				}
			],
			calculable : true,
			series : [
				{
					name: '满意度评价',
					type: 'radar',
					data : [
						{
							value : CONSTANTS.satisfaction.seriesDataValue,
							name : CONSTANTS.satisfaction.seriesDataName
						},
							{
							value : CONSTANTS.satisfaction.seriesDataValue1,
							name : CONSTANTS.satisfaction.seriesDataName1,
						},
					],
				},

			]
		};
		
			if (optionlei && typeof optionlei === "object") {
			nowChartSatisfaction.setOption(optionlei, true);
			}
		
	},
	// 用水电情况
		waterElectricFn(){
	// 基于准备好的dom，初始化echarts实例
		var nowChartwWaterElectric = this.$echarts.init(document.getElementById('waterElectric'));
		// 绘制柱状折线图-营业收入统计
		var optionWaterElectric = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:CONSTANTS.waterElectric.itemTitle,
				textStyle:{//图例文字的样式
					color:'#fff',
				},
			},
			grid: {
		        left: '10%',
		        right: '10%',
		        bottom: '20%',
		        top:'30%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : CONSTANTS.waterElectric.xAxisData,
					
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						}
					},
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '(万吨)',
					data: CONSTANTS.waterElectric.yAxisData,
					min: 0,
          max: 10,
          // interval: 20000,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
					},
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          			},
					nameTextStyle:{
						color:'#fff',
					}
				},
				{
					type : 'value',
					name : '万度',
					data: CONSTANTS.waterElectric.yAxisData1,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						}
					},
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
         			 },
         			nameTextStyle:{
						color:'#fff',
					}
				}
			],
			series : [
				// {
				// 	name:'目标值',
				// 	type:'line',
				// 	symbol:'none',
				// 	itemStyle:{
				// 		normal:{
				// 			lineStyle: {
				// 			width:1,
				// 			type:'dashed'
				// 			}
				// 		}
				// 	},
				// 	data:CONSTANTS.propertyFee.seriesLineData1
				// },
				{
					name:'用水',
					type:'line',
					yAxisIndex: 0,
					data:CONSTANTS.waterElectric.seriesLineData1
				},
				{
					name:'用电',
					type:'line',
					yAxisIndex: 1,
					data:CONSTANTS.waterElectric.seriesLineData2,
				}
			]
		};

					
		if (optionWaterElectric && typeof optionWaterElectric === "object") {
			nowChartwWaterElectric.setOption(optionWaterElectric, true);
			}
	} ,//方法end
	// 地图
	  drawEquipment(){
    	var  equipmentChart = this.$echarts.init(document.getElementById('equipmentChart'))
    	var data = [
						{name: '北京',value: 9},
						{name: '杭州', value: 12},
						{name: '上海', value: 30},
						{name: '西安', value: 30},
					];
			var geoCoordMap = {
			    '北京': [116.479008, 40.137923],
			    '上海': [121.556662, 31.145853],
			    '杭州':[120.19,30.26],
			    '西安':[108.95,34.27],
				};
			
			var convertData = function(data) {
				var res = [];
				for(var i = 0; i < data.length; i++) {
					var geoCoord = geoCoordMap[data[i].name];
					if(geoCoord) {
						res.push({
							name: data[i].name,
							value: geoCoord.concat(data[i].value)
						});
					}
				}
				return res;
			};
			
			var  colors=function(datas){
				var colorData=[];
				for(var i in datas){
					if(datas[i].value[2]>=9 && datas[i].value[2]<12){
						colorData .push( datas[i])
					}
				}
				return colorData
			}
			console.log(colors(convertData(data)))
		var	optionEqipment = {
			title: {
				
				
			},
			legend: {
				left: 'left',
				data: ['强', '中', '弱'],
				textStyle: {
					color: '#ccc'
				}
			},
			tooltip :{                                      //提示框组件
			    trigger: 'item',                            //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
			    triggerOn:"mousemove",                      //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
			    showContent:true,                           //是否显示提示框浮层
			    alwaysShowContent:true,                     //是否永远显示提示框内容
			    showDelay:0,                                  //浮层显示的延迟，单位为 ms
			    hideDelay:100,                                //浮层隐藏的延迟，单位为 ms
			    enterable:true,                             //鼠标是否可进入提示框浮层中
			    confine:true,                               //是否将 tooltip 框限制在图表的区域内
			    transitionDuration:0.4,                      //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
			    position:['20%', '23%'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
			    formatter:function(v){
						var text=v.name;
						var html='<p style="height:20px;line-height:10px;border-bottom:1px solid #2f343f;padding-left:10px;">'+v.name+'分公司</p >'
								+'<div style="height:190px;clear:both;padding-left:10px;">';
								for(var i=0;i<CONSTANTS.equipmentChart.companyName.length;i++){
									html+='<div style="width:50%;float: left;text-align:left;font-size:12px">'+CONSTANTS.equipmentChart.companyName[i].name+'</div>';
								}
								html+='</div></div>'

								return html

							
							
					},	                                           
			  	extraCssText:'width:220px;height:200px;overflow:scroll;background:rgba(5,11,27,.5);'
				},
			geo: {
				map: 'china',
				roam: false,
				label: {
					emphasis: {
						show: false
					}
				},
				itemStyle: {
					normal: {
						areaColor: '#031525',
						borderColor: '#3B5077',
						borderWidth: 1
					},
					emphasis: {
							areaColor: '#031525',
							borderColor: '#3B5077',
							borderWidth: 1
					}
				}
			},
			series: [
				{
					name: '城市',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					data: convertData(data),
					symbolSize: 5,
					showEffectOn: 'render',
					rippleEffect: {
						brushType: 'stroke'
					},
					hoverAnimation: true,
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						},
						emphasis:{
							show:true
						}
					},
					itemStyle: {
						normal: {
							color: '#f4e925',
							shadowBlur: 10,
							shadowColor: '#333'
						}
					},
					zlevel: 1
				},
//				{
//					name: '告警',
//					type: 'effectScatter',
//					coordinateSystem: 'geo',
//					data: colors(convertData(data)),
//					symbolSize:5,
//					showEffectOn: 'render',
//					rippleEffect: {
//						brushType: 'stroke'
//					},
//					hoverAnimation: true,
//					label: {
//						normal: {
//							formatter: '{b}',
//							position: 'right',
//							show: false
//						},
//						emphasis:{
//							show:true,
//							size:5,
//						}
//					},
//					itemStyle: {
//						normal: {
//							color: 'red',
//							shadowBlur: 10,
//							shadowColor: 'red'
//						},
//						emphasis:{
//							color: '#fee669',
//							size:5,
//							shadowBlur: 10,
//							shadowColor: 'red'
//						}
//					},
//					zlevel: 1
//				}
			]
		};
		if(optionEqipment && typeof optionEqipment ==="object") {
			equipmentChart.setOption(optionEqipment, true);
				var that=this
	  			equipmentChart.on('click',function (params) {
				    
				    if(params.data!=undefined){
//				    	if(params.data.name=="西安"){
//				    		sessionStorage.setItem("project","1")
//				    		that.$router.push({path: '/index/xianIndex',query:{}});
//				    	}else{
//				    		sessionStorage.setItem("project","0")
//				    		that.$router.push({path: '/index/all',query:{}});
//				    		
//				    	}
				    }
				    
				});
	  			
			    
		}
	},
	 // 9物业费单价 10物业费预收
	propertyFeeFn(id){
			var  propertyFeeidChart = this.$echarts.init(document.getElementById(id));
			var optionPropertyFeeid = {
					grid: {
							left: '3%',
							right: '20%',
							bottom: '10%',
							top:'30%',
							containLabel: true
					},
					tooltip : {
							trigger: 'axis',
							
					},
				
					xAxis : [
							{
									name:CONSTANTS[id].xAxisName,
									type : 'value',
									scale:true,
									axisLine:{
										lineStyle:{color: '#fff'},
									},
									axisLabel : {
											formatter: '{value}'
									},
									splitLine : {
										show:true,
										lineStyle: {
											color: '#5e6067',
											type: 'dashed',
											width: 1
										}
									},
							}
					],
					yAxis : [
							{
									name:CONSTANTS[id].yAxisName,
									type : 'value',
									scale:true,
									axisLabel : {
											formatter: '{value} '
									},
									axisLine:{
										lineStyle:{color: '#fff'},
									},
								splitLine : {
									show:true,
									lineStyle: {
										color: '#5e6067',
										type: 'dashed',
										width: 1
									}
								},
							}
					],
					series : CONSTANTS[id].zaiguanmianji
			};
						if (optionPropertyFeeid && typeof optionPropertyFeeid === "object") {
							propertyFeeidChart.setOption(optionPropertyFeeid, true);
						}

	},
	windowResize(){
		
//  	var nowChartBusinessIncome = this.$echarts.init(document.getElementById('businessIncome')); //营业收入统计
//		
//				// var  nowChart = this.$echarts.init(document.getElementById('nowChart'))
//				// var  dataChart = this.$echarts.init(document.getElementById('dataChart'))
//				// var  monthChart = this.$echarts.init(document.getElementById('monthChart'))
//				var  equipmentChart = this.$echarts.init(document.getElementById('equipmentChart'))
//				window.onresize = function(){
//				nowChartBusinessIncome.resize(); //营业收入统计
//				nowChartNetProfit.resize(); //净利润统计
//			// 　　nowChart.resize()
//			// 　　dataChart.resize()
//			// 　　monthChart.resize()
//				equipmentChart.resize();
//			}
    	
    },
  }
}
</script>

<style scoped>
	.Bigdiv{
		height: 100%;
	}
	.header{
		height: 45px;
		vertical-align: middle;
	}
	.header img{
		width: 25px;	
		vertical-align: middle;
   	 	margin-left: 15px;
		/*margin-top: 20px;
		margin-right: 20px;*/
	}
	.header span{
	
		font-size: 14px;
		line-height: 45px;
		color: #fff;	
	}
	.divBox{
		padding:0 9px;
		width: 100%;
		height: calc(100% - 45px);
		
	}
	.left{
		height:28%;
	}
	.left>div{
		
		height: 100%;
		/*margin-bottom: 10px;*/
		padding: 0px;
		margin: 0;
		padding-right: 5px;
		
	}
	.left>div .bg{
		background: rgba(10,18,44,0.65);
		height: 100%;
	}
	#businessIncome,#netProfit,#liabilities,#propertyFee,#satisfaction,#waterElectric,
	#personNum,#propertyFeeid,#prepaidPropertyCharges,#operationsMultiple{
		width: 100%;
		height: calc(100% - 16px);
		/* background-color:#000;
		opacity: .5; */
	}
	#equipmentChart{
		width: 100%;
		height: 100%;
	}

	
	.title{
		padding: 0px 0;
		margin: 0;
		width: 100%;
		color: #b1e2fe;
		font-size: 12px;
		font-weight: normal;
		text-align: left;
		line-height: 16px;
		height: 16px;
	}
	.title span{
		float: left;
		width: 3px;
		background: #b1e2fe;
		height: 16px;
		margin-right: 15px;
	}
	
	.bottom{
		height: calc(71% - 5px);
		margin-top: 5px;
	}
	.bottom>div{
		height: 100%;
	}
	.bottomL>div{
		width: 100%;
		height: 33.2%;
		padding-right: 5px;
	}
	.bottomL>div .bg{
		background: rgba(10,18,44,0.65);
    	height: 100%;
	}
	.bottomL>div:nth-child(1){
		padding-bottom:5px ;
		
	}
	.bottomL>div:nth-child(3){
		padding-top:5px ;
	}
	
	
	.bottomR>div{
		width: 100%;
		height: 33.2%;
		padding-right: 5px;
	}
	.bottomR>div .bg{
		background: rgba(10,18,44,0.65);
    	height: 100%;
	}
	.bottomR>div:nth-child(1){
		padding-bottom:5px ;
		
	}
	.bottomR>div:nth-child(3){
		padding-top:5px ;
	}
	.bottomC{
		padding-right: 5px;
	}
	.bottomC>.bg{
		background: rgba(10,18,44,0.65);
    	height: 100%;
    	
	}
	
	
	
	
	
	.gaojingBox{
		width: 100%;
		height: 100%;
	}
	
	.pos-rela{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.pub-pos-a {
		position: absolute;
		top:10%;
		color: #fff;
		padding: 8px;
		z-index: 100;
    	opacity: .5;
		 background-color: #000;
		 text-align: left;
	}
	.map-left-value{
		left: 0;
	}
	.map-right-value{
		right: 0;
	}
	.charge{
		position: absolute;
		top:10%;
		left: 20%;
		width: 60%;
		z-index: 100;
	}
	.bottom-Statistics{
		position: absolute;
		bottom:3%;
		left: 3%;
		width: 100%;
		z-index: 100;
	}
	.bottom-Statistics label{
		padding: 10px 0;
    margin: 0;
    width: 100%;
    color: #b1e2fe;
    font-size: 12px;
    height: 16px;
    text-align: left;
	}
	.bottom-Statistics .yesterday>h1{
		color: #fff;
		font-size: 24px;
	}
	.bottom-Statistics 	.font-s-unit{
		font-size: 10px;
	}
	.font-s{
		font-size: 14px;
		padding: 10px 0;
	    margin: 0;
	    width: 100%;
	    color: #fff;
	    height: 16px;
	    text-align: left;
	}
	.font-s-data{
		font-size: 10px;
	}
	.yesterday{text-align: left;}
	.yesterday>h1{
		font-size: 30px;
		color: #b1e2fe;
		margin: 0;
    font-weight: 800;
	}
	.font-s-unit{
		font-size: 13px;
	}
	.float-left-c{
		float: left;
		padding: 0 0 0 15px;
	}
	.w-50{
		width:50%;
		float: left;
	}
</style>
