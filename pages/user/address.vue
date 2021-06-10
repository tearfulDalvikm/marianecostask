<template>
	<view class="uni-page-body">
		<view class="">
			<view class="tui-flex column uni-card"  v-for="(item,index) in address" :key="index">
				<view  class="tui-flex padding border">
					<view class="tui-flex-item ">
						<label class="">姓名</label>
					{{item.name}}</view>
					<view class="tui-flex-item">
					<label class="">电话</label>
					{{item.phone}}</view>
					<icon v-if="item.selected" type="success" color="#32CD32" :data-index="index"  class="cart-pro-select" @tap="selectList(index)"/>
					<icon v-else type="circle" class="cart-pro-select" :data-index="index" @tap="selectList(index)"/>
				</view>
				<view class="tui-flex padding border">
					<label class="">地址</label>
					<view class="tui-flex-item">{{item.detail}}</view>
						
					<icon type="clear" @tap="delet(index)" size="15"></icon> 
				</view>
				
			</view>
		</view>
		<view v-if="hasAddress" class="tui-flex column">
			<view class=" center padding">输入新地址</view>
			<view class="tui-flex column uni-card">
				<view class="tui-flex padding border">
					<view class="tui-flex ">
					<label class="">收货人</label>
					<input class="tui-input border" type="text"  v-model="name" />
					</view>
					<view class="tui-flex">
						<label class="">电话</label>
						<input class="tui-input border" type="text"   v-model="phone"  />
					</view>
				</view>
				<view class="tui-flex border padding">
					<label class="">地址</label>
					<input class="tui-input border" type="text"  v-model="detail"  />
				</view>
			</view>
			<button class="uni-card center" @tap="add()" type="primary">确认添加</button>

		</view>

	<view v-if="!hasAddress">
		<button    @tap="hasAddress=!hasAddress" >
			<text>添加新地址</text>
		</button>
		<button   @tap="commit" type="primary">
			<text>确认</text>
		</button>
	</view>
	<view v-else>

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
				address:[],
				hasAddress:false,
			}
		},
		onLoad() {
			var address=[{
				name:"李先生",
				phone:"18888888888",
				detail:"王府井边中南胡同1号院1101号",
				selected:true
			},{
				name:"李先生",
				phone:"16668888888",
				detail:"西单胡同1号院101号"
			},{
				name:"李先生",
				phone:"19988886999",
				detail:"中南海1号院1号"
			}];
			this.address=address;
			var data=Storage.get('address');
			if(typeof data==='object' && Array.isArray(data)){
				var addr=[];
				for(let i=0;i<data.length;i++){
					if(typeof data[i]==='object'){
						addr.push(data[i])	
					}
				}
				this.address=addr;
			}else if(data){
				Storage.remove('address');
			}
			// this.hasAddress=true;
		},
		methods:{
			delet(index){
				// this.address[index];
				this.address.splice(index,1); 
			},
			commit(){
				// console.log(this.address)
				Storage.set('address',this.address,300);
				var data=Storage.get('address')
				uni.showToast({
					title:"提交成功"
				})
				// console.log(data)
			},
			selectList(key){
				var address=this.address;
				for(let i=0;i<address.length;i++){
					if(i===key){
						address[i].selected=true;
					}else{
						address[i].selected=false;
					}
				}
				this.$set(this.address, key,address[key]);
			},
			add(){
				var address=this.address;
				var length=address.length;
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
							name:"detail",
							errorMsg:"地址不能为空",
							checkType:"notnull",
							checkRule:"6,20"
							},
						];
			var data={
						name:this.name,
						phone:this.phone,
						detail:this.detail
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
					this.address=this.address.concat([{
						name:this.name,
						phone:this.phone,
						detail:this.detail
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
	margin:10rpx 0;
	padding: 0 15rpx;
}
</style>
