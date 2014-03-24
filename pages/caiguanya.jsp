<%@page language="java" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta charset="utf-8" />
<title>彩票2元网手机站-手机买彩票_竞彩_足彩_足球彩票_福利彩票_体育彩票</title>
<meta name="keyword" content="彩票2元网,彩票,彩票网,福利彩票,中国福利彩票,体育彩票,足球彩票,手机彩票,wap彩票,即开型彩票,高频彩票,手机买彩票" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0;" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="http://res.cp2y.com/h5/res/images/114.png?v=2014031101" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="http://res.cp2y.com/h5/res/images/72.png?v=2014031101" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<link type="text/css" rel="stylesheet" href="http://res.cp2y.com/h5/res/css/css.css?v=2014031101"/>
</head>
<body>
<section id="mainSection" class="jc">
	<header class="header">
		<div id="headerS1" class="hide">
			<a href="/" class="GoIndex">大厅</a>
			<h2 id="Title" onclick="cp2y.buy.toggleMore();"></h2>
			<a id="More" class="more" onclick="cp2y.buy.toggleMore();"></a>
		</div>
		<div id="headerS2" class="hide">
			<a onclick="cp2y.buy.step1();" class="GoIndex">关闭</a>
			<h2 id="Title2" onclick="cp2y.buy.editScheme();"></h2>
			<a id="EditBets" class="more" onclick="cp2y.buy.editScheme();">编辑</a>
		</div>
	</header>
	<div id="MoreDetail">
		<div id="MoreLists">
			<div class="MoreLists" id="changePlayType" style="display:block"></div>
		</div>
	</div>
    <div id="MoreLocked" onclick="cp2y.buy.toggleMore();"></div>
	<div id="MainStep1">
		<div class="tip"><a class="fl" id="jcTime"></a><a class="fr pr10">投注球队：<span id="jcTo"></span></a></div>
		<ul id="choose" class="wordCup"></ul>
		<section class="tools">
			<div class="tools2" id="tools2">已选<a id="curBets">0</a>注，共<a id="curMoney">0</a>元</div>
			<a onclick="cp2y.buy.addContent();" class="toolsBtn">确认</a>
		</section>
	</div>
	<div id="MainStep2">
		<ul id="betList" class=""></ul>
		<div class="totalMsg totalMsg3">
			<div class="Center jcSetMul">
				<input onblur="cp2y.buy.setMul(this)" type="number" id="mul" step="1" min="1" max="9999" value="1"/>
				<span>倍</span>
			</div>
		</div>
		<div class="totalMsg">
			<div class="tools2"><a id="bets">0</a>注，<a id="money">0</a>元</div>
			<a onclick="cp2y.buy.pay();" class="totalMsg2">付款</a>
			<div class="payBox" id="payBox"></div>
			<div class="buyBox" id="buyBox"></div>
		</div>
	</div>
</section>
<div id="loading"><div><a></a></div></div>
<div id="userUtil"></div>
<script src="http://res.cp2y.com/h5/res/js/zepto.min.js?v=2014031101"></script>
<script src="http://res.cp2y.com/h5/res/js/base.js?v=2014031101"></script>
<script src="http://res.cp2y.com/h5/res/js/userUtil.js?v=2014031101"></script>
<script src="http://res.cp2y.com/h5/res/js/jcBuyCGY.js?v=2014031101"></script>
<script src="http://res.cp2y.com/h5/res/js/play/10059cgy.js?v=2014031101"></script>
<script>cp2y.buy.init("${type}");</script>
</body></html>