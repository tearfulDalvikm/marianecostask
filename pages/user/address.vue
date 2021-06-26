<template>
	<view class="page-body tui">
		<view class="">
			<view class="tui-flex tui-column uni-card "  v-for="(item,index) in addressInfo" :key="index">
				<view  class="tui-flex tui-padding ">
					<view class="tui-item ">
						<label class="">姓名</label>
					{{item.name}}</view>
					<view class="tui-item">
					<label class="">电话</label>
					{{item.phone}}</view>
					<icon v-if="item.selected" type="success" color="#32CD32" :data-index="index"  class="cart-pro-select" @tap="selectList(index)"/>
					<icon v-else type="circle" class="cart-pro-select" :data-index="index" @tap="selectList(index)"/>
				</view>
				<view class="tui-flex tui-padding tui-border">
					<label class="">地址</label>
					<view class="tui-item">{{item.address}}</view>
						
					<icon type="clear" @tap="delet(index)" size="15"></icon> 
				</view>
				
			</view>
		</view>
		<view v-if="hasAddress" class="tui-flex tui-column">
			<view class="tui-center tui-padding">输入新地址</view>
			<view class="tui-flex tui-column uni-card">
				<view class="tui-flex tui-padding ">
					<view class="tui-flex ">
					<label class="">姓名</label>
					<input class="tui-input tui-border" type="text"  v-model="name" />
					</view>
					<view class="tui-flex">
						<label class="">电话</label>
						<input class="tui-input tui-border" type="text"   v-model="phone"  />
					</view>
				</view>
				<view class="tui-flex tui-border tui-padding">
					<label class="">地址</label>
					<input class="tui-input tui-border" type="text"  v-model="address"  />
				</view>
			</view>
			<view class="tui-item">
				<button class="" @tap="add()" type="primary">确认添加</button>
			</view>
			

		</view>

	<view v-if="!hasAddress">
		<button    @tap="hasAddress=!hasAddress" >
			<text>添加新地址</text>
		</button>
		<button   @tap="commit" type="primary">
			<text>确认</text>
		</button>
	</view>
	<view v-else >

		<button  @tap="hasAddress=!hasAddress" >
			<text>取消</text>
		</button>
	</view>
	</view>
</template>

<script>
	import Validate from "../../common/utils/Validate.js";
	import Storage from "@/common/utils/Storage.js";
	export default {
		data(){
			return {
				name:'',
				phone:'',
				detail:'',
				addressInfo:[],
				hasAddress:false,
			}
		},computed:{
// 			address(){
// 				return this.$store.getters.login;
// 			}
		},onLoad() {
			var addressInfo=[{
				name:"李先生",
				phone:"18888888888",
				address:"王府井边中南胡同1号院1101号"
			},{
				name:"李先生",
				phone:"16668888888",
				address:"西单胡同1号院101号"
			},{
				name:"李先生",
				phone:"19988886999",
				address:"中南海1号院1号"
			}];
			this.addressInfo=addressInfo;
			var data=Storage.get('addressInfo');
			if(typeof data==='object' && Array.isArray(data)){
				var addr=[];
				for(let i=0;i<data.length;i++){
					if(typeof data[i]==='object'){
						addr.push(data[i])	
					}
				}
				this.addressInfo=addr;
			}else if(data){
				Storage.remove('addressInfo');
			}
			// this.hasAddress=true;
		},
		methods:{
			delet(index){
				// this.address[index];
				this.addressInfo.splice(index,1); 
			},
			commit(){
				// console.log(this.address)
				Storage.set('addressInfo',this.addressInfo,300);
				var data=Storage.get('addressInfo')
				uni.showToast({
					title:"提交成功"
				})
				// console.log(data)
			},
			selectList(key){
				var addressInfo=this.addressInfo;
				for(let i=0;i<addressInfo.length;i++){
					if(i===key){
						addressInfo[i].selected=true;
					}else{
						addressInfo[i].selected=false;
					}
				}
				this.$store.commit('setAddress',addressInfo[key]);
				this.$set(this.addressInfo, key,addressInfo[key]);
			},
			add(){
				var addressInfo=this.addressInfo;
				var length=addressInfo.length;
				if(length>4){
					uni.showModal({
						title:"失败提示",
						content:"最多只能保存5个地址信息，请删除多余信息后提交"
					})
					return ;
				}
				var rule=[{
							name:"phone",
							errorMsg:"手机号输入不正确",
							checkType:"phoneno",
							},{
							name:"name",
							errorMsg:"收件人不能为空",
							checkType:"notnull",
							// checkRule:"1,8"
							},{
							name:"address",
							errorMsg:"地址不能为空",
							checkType:"notnull",
							checkRule:"6,20"
							},
						];
			var data={
						name:this.name,
						phone:this.phone,
						address:this.address
					}
			var Vali=Validate.check(data,rule);
			// console.log(Validate)
				if(!Vali){
					uni.showModal({
						title:"提示",
						content:Validate.error,
						showCancel:false
					})
					console.log(Validate)
				}else{
					this.addressInfo=this.addressInfo.concat([{
						name:this.name,
						phone:this.phone,
						address:this.address
					}])
					this.hasAddress=false;
					
					this.selectList(length);
					this.commit();
					uni.showToast({
						title:"提交成功"
					})
				}
			console.log(this.address)
			}
		}
	}
</script>

<style>
view{
	line-height: 2em;
}
.uni-card .uni-list{
	box-sizing: border-box;
	margin:10upx 0;
	padding: 0 15upx;
}
</style>
