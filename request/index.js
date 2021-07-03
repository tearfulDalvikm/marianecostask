// 模拟数据请求部分 ————————————————————————————————————————————————————————————————————
import ceshiData from './data/index.js';//测试数据代替远程服务器的请求返回数据
var runLocal=true;//是否运行模式 本地测试数据=true。非本地=false
// 请求密钥
var configure={
	signature:{
		userId:'1234',
		sesionId:'12315465213',
		},
	
}
// 设置请求apiName对应的请求参数
var apiObj ={
		goodsShop:{
			url:"http://csapi.we99.net/api/goodsShop",
			header:{signature:configure.signature},
			data:{}
		},
	}
if(runLocal){
	apiObj=ceshiData	
}

// //实际项目使用中请删除这个函数
// function ceshifun(Obj){
// 	console.log(Obj)
// 	if(ceshiData[Obj.url]){
// 		if(Obj.success && typeof Obj.success=='function'){
// 		Obj.success({header:'',data:{code:200,message:'ok',data:ceshiData[Obj.url]}});	
// 		}else{
// 			console.log('您未设置成功回调函数success')
// 			if(Obj.fail && typeof Obj.fail=='function'){
// 				Obj.fail('请求失败')
// 			}
// 			
// 		}
// 		if(Obj.complete && typeof Obj.complete=='function'){
// 			Obj.complete('请求结束')
// 		}
// 		return true;
// 	}
// 	// console.log('测试请求函数，位置request/ajax.js-11行ceshifun(),正式使用请删除')
// 
// 	return false;
// }
// 模拟数据请求部分完————————————————————————————————————————————————————————————————————



/**
 * 向服务器发起异步请求
 * Obj 包含如下参数：
 * url			string 		请求地址
 * method 		string 		请求类型大写，如：'GET'|'POST'|'PUT'等
 * data			Object		发给服务器的请求数据
 * header		object 		请求头
 * dataType		string		如果为json返回的数据会尝试做一次 JSON.parse
 * responseType string		响应返回的数据类型 'json'|'text'
 * success 		function	请求成功的返回内容
 * fail			function	请求接口失败返回内容
 * complete		function	请求结束的返回内容无论成功失败均会执行
 */
// function request(Obj){
// 	if(ceshifun(Obj)){
// 		console.log('request/ajax/request() 测试模拟数据，实际项目使用时请删除')
// 		// console.log(ceshifun(Obj))
// 		return ;
// 	};
// 	//模拟请求函数，实际项目使用中请删除这行代码，和这个函数 ——————————————————————————————————————————————————
// // 	console.log(Obj)
// 	var auth=Obj.auth || 0;
// 	if(typeof auth=== 'object'){
// 		Obj.header= configure;
// 	}
// 	var method=Obj.method || 'GET';//请求方式
// 	var url =Obj.url || host; //仅为示例，并非真实接口地址。
// 	var data= Obj.data || {};
// 	var header=Obj.header || {'custom-header': 'hello'};//自定义请求头信息
// 	var success =Obj.success ||  function(res){//请求成功返回值
// 			// console.log(res.data);
// 			console.log('request/ajax.js 请求成功返回')
// 		};
// 	var dataType =Obj.dataType || 'json';//如果设为 json，会尝试对返回的数据做一次 JSON.parse
// 	var responseType =Obj.responseType || 'text';//相应数据类型，合法值：text、arraybuffer
// 	var fail= Obj.fail || function(e){//请求接口失败返回值
// 		console.log(e)
// 	}
// 	var complete=Obj.complete || function(e){//请求结束返回，无论成功失败都返回
// 	uni.hideLoading();//关闭等等框
// 		console.log(e)
// 	}
// 
// 	uni.request({
// 		method:method,
// 		url: url, //仅为示例，并非真实接口地址。
// 		data:data,
// 		header:header,
// 		success:success,
// 		dataType:dataType
// 	})
// }
/**
 * 修补请求方法
 * urlName			string 		请求地址 name
 * successFun 		function 	请求成功回调函数；
 * dataObj			object		请求参数数据requeObj.data
 * requeObj			object		请求参数全部参数(含 method,data,header,dataType,responseType,fail等更多) 
 */
function ajax(apiNameStr,successFun,dataObj,requeObj){
	var apiNameStr=apiNameStr || "index";
	var dataObj =dataObj || {};
	var requeObj =requeObj || {};
	var Obj=apiObj[apiNameStr];
	
	if(Obj){
			// 合并 用户请求参数+系统预置请求参数
			requeObj.header=requeObj.header || {};
			requeObj.data=requeObj.data || {};
			requeObj.method=Obj.method || "GET";
			requeObj.dataType=Obj.dataType || "json";

			if(Obj.header && typeof Obj.header==='object'){
				requeObj.header=Object.assign(requeObj.header,Obj.header)
			}
			
			if(Obj.data && typeof Obj.data==='object'){
				requeObj.data=Object.assign(requeObj.data,Obj.data)
			}
			
			requeObj.fail=requeObj.fail || Obj.fail || function(e){//请求接口失败返回值
			console.log("请求失败")
				console.log(e)
			};
			requeObj.complete=requeObj.complete|| Obj.complete || function(e){//请求结束返回，无论成功失败都返回
			uni.hideLoading();//关闭等等框
				console.log(e)
			}
			requeObj.success=successFun ||  requeObj.success || Obj.success || function(e){ console.log("请给ajax请求添加回调函数")};
			
			if(Obj.success && typeof Obj.success==='function'){
				requeObj.success=Obj.success;
			}
			requeObj.url=Obj.url;
		
		// 判断是不是本地测试模式，返回模拟数据
			if(runLocal){
				requeObj.success({header:'',data:{code:200,message:requeObj,data:Obj}});
				return true;
			}
			uni.request(requeObj)
	}
}

export default {
	ajax:ajax,
// 	post:post,
// 	get:get
}
// // 中断请求任务
// requestTask.abort();