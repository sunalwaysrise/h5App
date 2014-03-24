<%@page language="java" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="chrome=1">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<meta http-equiv="Cache-Control" content="max-age=0"/>
		<meta name="format-detection" content="telephone=no"/>
		<meta name="keyword" content="彩票2元网触屏版手机站" />
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0;" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<title>彩票2元网触屏版手机站</title>
		<link rel="stylesheet" href="http://res.cp2y.com/css/client/client.css"  type="text/css" media="all"/>
		<script src="/js/jquery-1.7.2.min.js?v=20140219" type="text/javascript" ></script>  
	</head>
	<body>
		<link href="/js/tableGrid/skins/style.css" rel="stylesheet" type="text/css"/>
		<script type="text/javascript" src="/js/tableGrid/js/table_split.js"></script>
		<h1>H5手机站服务性能监控列表</h1>
		<script type="text/javascript">
		  jQuery("document").ready(function(){	
			jQuery("span").click(function(){
			   var sort="asc";
			   var id=$(this).attr("id");
			   var className = $(this).attr("class");
			   if(className=="sort_down"){
			      sort="desc";
			   }
			   data="sort="+sort+"&id="+id,
			   document.location.href="/user/monitorRadio?"+data
			   
			});	
		 });	 
		 
		 function fresh(){
		 
		    jQuery.ajax({
		        url:"/user/fresh",
		        contentType : "application/json",
		        success : function(msg) {
		          var msg =  msg.flag;
		          alert(msg);
		        }
		  	});
		 }
		 
		  function freshMemCache(){
			   var cacheKey=document.getElementById("cacheKey").value;
			   if(cacheKey==null||cacheKey==""){
			       alert("请输入要刷新MemCache的key值");
			       return;
			   }
			   jQuery.ajax({
			        url:"/user/freshMemCache",
			        contentType : "application/json",
			        data: "cacheKey="+cacheKey,
			        success : function(msg) {
			          var msg =  msg.flag;
			          alert(msg);
			        }
			   });
		 }
		</script>
	<div><input type='button' onclick='fresh()' style='height:20px;width:100px;color:blue' value='刷新本地缓存'></div>
	<div><input type='button' onclick='freshMemCache()' style='height:20px;width:100px;color:blue' value='刷新memcache'><input type='text' id='cacheKey' name='cacheKey' length='40px'/></div>
	<table class="tableStyle" sortMode="true">
		<tr>
			<th>类名</th>
			<th>方法</th>
			<th>url</th>
			<th><span id="maxTime" class="sort_off">最大访问时间</span></th>
			<th><span id="minTime" class="sort_off">最小访问时间</span></th>
			<th><span id="averageTime" class="sort_off">平均访问时间</span></th>
			<th><span id="accessTime" class="sort_off">最后访问时间</span></th>
			<th><span id="totalAccessTime" class="sort_off">总时间</span></th>
			<th><span id="operateTimes" class="sort_off">访问次数</span></th>
		</tr>
		<c:forEach var="monitor" items="${dataList}">
			<tr>
				<td>${monitor.actionName}</td>
				<td>${monitor.methodName}</td>
				<td>${monitor.url}</td>
				<td>${monitor.maxTime}</td>
				<td>${monitor.minTime}</td>
				<td>${monitor.averageTime}</td>
				<td>${monitor.accessTime}</td>
				<td>${monitor.totalAccessTime}</td>
				<td>${monitor.operateTimes}</td>
			</tr>
		</c:forEach>
	</table>
</body>