<%@page language="java" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta charset="utf-8" />
<title>彩票2元网手机站-手机买彩票_竞彩_足彩_足球彩票_福利彩票_体育彩票</title>
<meta name="description" content="彩票2元网,彩票,彩票网,福利彩票,中国福利彩票,体育彩票,足球彩票,手机彩票,wap彩票,即开型彩票,高频彩票,手机买彩票" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=1" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta content="telephone=no" name="format-detection" />
<link type="text/css" rel="stylesheet" href="http://res.cp2y.com/h5/res/css/news.css?v=2014032001"/>
</head>
<body>
	<header class="header">
		<a class="GoIndex" href="/">关闭</a>
		<h2>资讯中心</h2>
	</header>
	<ul class="mainSection newsList">
		<c:choose>
			<c:when test="${newslist==null}">
				<p style="text-align: center;">暂时为空</p>
			</c:when>
			<c:otherwise>
				<c:forEach var="news" items="${newslist}">
					<li><a href="/zx/newsdetail?id=${news.id}">${news.newstitle}</a></li>
				</c:forEach>
			</c:otherwise>
		</c:choose>
	</ul>
	<p class="pages">
		<c:forEach var="i" begin="1" end="${pageSize}" step="1">
			<td><a href="/zx/newslist?page=${i}">${i}</a></td>
		</c:forEach>
	</p>
</body>
</html>