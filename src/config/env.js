/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * dataSources：数据源
 */

let baseUrl = ''; 
let BASE_API=""
let routerMode = 'hash';
let dataSources='local';//local=本地，其他值代表非本地


if (process.env.NODE_ENV == 'development') {
	// baseUrl='';
	BASE_API= '"http://localhost:8084"'

}else if(process.env.NODE_ENV == 'production'){
	BASE_API='"http://localhost:8084"'
}

// export {
// 	baseUrl,
// 	routerMode,
// 	dataSources,
// }
export {
	BASE_API
}