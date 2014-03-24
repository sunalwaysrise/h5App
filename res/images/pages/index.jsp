<%@page language="java" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %><!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta charset="utf-8" />
<title>彩票2元网手机站-手机买彩票_竞彩_足彩_足球彩票_福利彩票_体育彩票</title>
<meta name="keyword" content="彩票2元网,彩票,彩票网,福利彩票,中国福利彩票,体育彩票,足球彩票,手机彩票,wap彩票,即开型彩票,高频彩票,手机买彩票" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0;" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="http://res.cp2y.com/h5/res/images/114.png?v=2014030501" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="http://res.cp2y.com/h5/res/images/72.png?v=2014030501" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<link type="text/css" rel="stylesheet" href="http://res.cp2y.com/h5/res/css/css.css?v=2014030501"/>
</head>
<body>
<section id="index">
	<div class="indexNav" id="indexNav">
		<div class="indexNav1">
			<a href="/news/about.jsp">彩票2元网</a>
			<a id="drawCenterIn">开奖公告</a>
		</div>
		<div class="indexNav1">
			<a id="userCenterIn" data_part="signIn">注册登录</a>
			<a href="/activity/list" id="hasActive">活动中心</a>
		</div>
	</div>
	<div id="mainPage"></div>
	<div class="FaqTel"><a href="tel:4006667575">免费客服:400-666-7575</a></div>
</section>
<section id="mainSection">
	<header class="header">
		<h2 id="Title" onclick="cp2y.buy.openMore();"></h2>
		<h2 id="QRTi" onclick="cp2y.buy.editScheme();"></h2>
		<h2 id="ZhihaoTi">普通追号</h2>
		<a id="GoIndex" class="GoIndex">大厅</a>
		<a id="GoSelectArea" class="GoIndex">关闭</a>
		<a id="GoMyBets" class="GoIndex">关闭</a>
		<a id="More" class="more" onclick="cp2y.buy.openMore();"></a>
		<a id="EditBets" class="more" onclick="cp2y.buy.editScheme();">编辑</a>
		<a id="Zhuihao" class="more">高级追号</a>
	</header>
	<div id="MoreDetail">
		<div id="MoreNav"><a id="getTz" class="cur">投注</a><a id="getKj">开奖</a><a id="getWf">玩法</a></div>
		<div id="MoreLists">
			<div class="MoreLists" id="changePlayType" style="display:block"></div>
			<div class="MoreLists" id="getWfC"></div>
		</div>
	</div>
	<div id="MoreLocked" onclick="cp2y.buy.openMore();"></div>
	<div id="MainStep1">
		<div id="countDown">距<span id="curIssue"></span>期截止：<time id="curCountDown"></time></div>
		<section id="choose"></section>
		<section class="tools">
			<div class="tools1">
				<a onclick="cp2y.buy.clear()" id="clear">清除</a>
				<a onclick="cp2y.buy.setClear(2)" id="Randoms">快速机选</a>
				<a onclick="cp2y.buy.setClear(1)" id="cancelRandoms">取消机选</a>
			</div>
			<div class="tools2" id="tools2">已选<a id="curBets">0</a>注，共<a id="curMoney">0</a>元</div>
			<a onclick="cp2y.buy.addContent();" class="toolsBtn" id="addContent">确认</a>
			<div id="RandomList">
			<a onclick='cp2y.buy.random(1);'>1注</a>
			<a onclick='cp2y.buy.random(2);'>2注</a>
			<a onclick='cp2y.buy.random(3);'>3注</a>
			<a onclick='cp2y.buy.random(5);'>5注</a>
			<a onclick='cp2y.buy.random(10);'>10注</a></div>
		</section>
	</div>
	<div id="MainStep2">
		<div class="betListsTitle"><a onclick="cp2y.buy.step1();">继续添加</a><a onclick='cp2y.buy.random(1)'>机选一注</a></div>
		<ul id="betList"></ul>
		<div class="totalMsg">
			<div id="totalMsgTop" class="totalMsgTop">
				<p onclick="cp2y.buy.step3();cp2y.issues.getSimpleIssues(1);"><span id="issues2">1</span>期</p>
				<p onclick="cp2y.buy.step3();cp2y.issues.getSimpleIssues(2);"><span id="muls2" >1</span>倍</p>
			</div>
			<!-- <a onclick="cp2y.buy.buy();" class="totalMsg1">发起合买</a> -->
			<div class="tools2"><a id="bets">0</a>注，<a id="money">0</a>元</div>
			<a onclick="cp2y.buy.pay();" class="totalMsg2">付款</a>
			<div class="payBox" id="payBox"></div>
			<div class="buyBox" id="buyBox"></div>
		</div>
	</div>
	<div id="MainStep3">
		<div id="MainStep31">
			<div class="totalMsgTop">
				<p><input type="number" class="input1" id="issues" min="1" onblur="cp2y.issues.setSimple2(this);"  max="100" value="1" />期</p>
				<p><input type="number" class="input1" id="muls" min="1" onblur="cp2y.issues.setMul(this)" max="100" value="1" />倍</p>
			</div>
			<ul id="simpleIssues"></ul>
		</div>
		<div id="MainStep32">
			<div id="IssuesList"></div>
		</div>
		<div class="mainSectionBottom" id="aboutPrize">
			<div class="mS2">
				<span>累计中出</span><input class="input9" type="number" id="pStop" min="0" placeholder="多少"/><span>元，停止追号</span>
			</div>
			<a id="completeZH">完成</a>
		</div>
	</div>
</section>
<section id="userCenter">
	<header class="header">
		<a id="GoIndex1" class="GoIndex">大厅</a>
		<a id="GoIndex2" class="GoIndex">关闭</a>
		<a id="GoIndex3" class="GoIndex">关闭</a>
		<h2 id="userPartTitle"></h2>
		<a id="userMore"></a>
	</header>
	<div id="userMoreDetail"></div>
	<div id="userPartBox"></div>
	<div id="userPartDetail"></div>
</section>
<section id="drawCenter">
	<header class="header">
		<a id="GoIndex4" class="GoIndex">大厅</a>
		<a id="GoIndex5" class="GoIndex">关闭</a>
		<a id="GoIndex6" class="GoIndex">关闭</a>
		<h2 id="drawCenterTitle">开奖公告</h2>
	</header>
	<div id="drawContentBox"></div>
	<div id="drawDetail"></div>
</section>
<div id="loading"><div><a></a></div></div>
<script src="http://res.cp2y.com/h5/res/js/zepto.min.js?v=2014030501"></script>
<script src="http://res.cp2y.com/h5/res/js/selectCity.js?v=2014030501"></script>
<script src="http://res.cp2y.com/h5/res/js/base.js?v=2014030502"></script>
<script src="http://res.cp2y.com/h5/res/js/buy.js?v=2014030501"></script>
<script src="http://res.cp2y.com/h5/res/js/user.js?v=2014030502"></script>
<script src="http://res.cp2y.com/h5/res/js/init.js?v=2014030501"></script>
</body>
</html>