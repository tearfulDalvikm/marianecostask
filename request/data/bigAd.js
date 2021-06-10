var bigAd=()=>{
	var data=[];
	for(var i=1; i<5;i++){
		data.push({
			title:"这个产品是采用uni-app技术编辑而成。可以编译成多端语言发布",
			image:"https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product"+i+".jpg", 
		})
	}
	return {code:200,message:ok,data:data}
}
export default bigAd
