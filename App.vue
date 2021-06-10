<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import "./common/uni.css";
	@import "./common/css/iconfont.css"; 
	@import "./common/css/tui.css";
	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		color: #666;
		background-color:#F4F5F6;
		height: 100%;
		font-size:28upx;
		line-height: 1.8em;
	}
</style>
