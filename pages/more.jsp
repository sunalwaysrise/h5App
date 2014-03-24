<%@page language="java" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %><!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta charset="utf-8" />
<title>彩票2元网手机站-手机买彩票_竞彩_足彩_足球彩票_福利彩票_体育彩票</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=1" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta content="telephone=no" name="format-detection" />
<link type="text/css" rel="stylesheet" href="http://res.cp2y.com/h5/res/css/about.css?v=2014031401"/>
<style type="text/css">
#wechatTip{
	position:absolute;left:50%;top:80px;display:none;z-index:9999;
	width:260px;height:298px;margin-left:-130px;
	background:url(http://res.cp2y.com/h5/res/images/weChatTip.png?v=2014031403) no-repeat;background-size:contain;
}
</style>
</head>
<body>
<header class="header">
	<a class="GoIndex" href="/">大厅</a>
	<h2>彩票2元网</h2>
</header>
<section class="mainSection more">
	<h2>购买更多彩种，推荐您使用彩票客户端，彩种丰富玩法齐全，2元成就您的彩票梦想！</h2>
	<a class="down Android" id="Android" href="http://app.cp2y.com/download.htm">Android版</a>
	<a class="down iPhone" id="iPhone" href="http://itunes.apple.com/cn/app/cai-piao2yuan-wang/id533049676?mt=8">iPhone版</a>
	<h2><b>竞技彩：</b></h2>
	<h2>竞彩足球</h2>
	<h2><b>快开彩：</b></h2>
	<h2>新时时彩、老时时彩、新11选5</h2>
	<h2><b>数字彩：</b></h2>
	<h2>福彩3D、大乐透、排列3、排列5、七乐彩、七星彩、福彩15选5、体彩6+1、体彩20选5</h2>
</section>
<div id="LockedBg"></div>
<div id="wechatTip">
</div>
<script type="text/javascript">
var lock=document.getElementById('LockedBg'),Tip=document.getElementById('wechatTip');
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	document.getElementById('Android').addEventListener('click',function(e){
		lock.style.display='block';Tip.style.display='block';
		e.preventDefault();
	});
	document.getElementById('iPhone').addEventListener('click',function(e){
		lock.style.display='block';Tip.style.display='block';
		e.preventDefault();
	});
});
</script>
</body>
</html>