/**
 * @author luwenbin
 */

//var CurBets=$("#curBets");
cp2y.index();
$("#userCenterIn").click(function(){
	var part=$(this).attr("data_part");
	location.hash="type=user&part="+part;
	cp2y.index();
});//进入 用户中心模块
userDom.GoIndex1.click(function(){
	var part=$(this).attr("data_part");
	location.hash="#";
	cp2y.index();
});
userDom.GoIndex2.click(function(){
	cp2y.user.home();
	cp2y.index();
});
$("#drawCenterIn").click(function(){
	var part=$(this).attr("data_part");
	location.hash="type=draw&part=index";
	cp2y.index();
});//进入 
drawDom.GoIndex4.click(function(){
	var part=$(this).attr("data_part");
	location.hash="#";
	cp2y.index();
});//返回大厅
drawDom.GoIndex5.click(function(){
	cp2y.draw.index();
});//返回开奖首页
drawDom.GoIndex6.click(function(){
	drawDom.GoIndex5.show();
	$(this).hide();
	drawDom.drawDetail.hide();
	drawDom.drawContent.show();
	location.hash="type=draw&part=list&playType="+cp2y.util.getArgs('playType');
	if(drawDom.drawContent.children("div").size()==0){//如果列表为空 重加载列表数据
		cp2y.index();
	}
});//返回列表页
playDom.GoIndex.click(function(){
	location.hash="#";
	cp2y.index();
	try{clearTimeout(autoRunMark);}catch(e){}
	cp2y.buy.serverTime = '';
	cp2y.buy.currentIssue ='';
	cp2y.buy.currentIssueId = '';
	cp2y.buy.issueStatus = '';
	cp2y.buy.sellEndTime = '';
	$("#curIssue").html('');
	$("#curCountDown").html('');
	Issues.val(1);
	Muls.val(1);
	$("#issues2").html(1);
	$("#muls2").html(1);
	$("#pStop").val('');
	cp2y.buy.issues=[];
});//返回首页清除数据
playDom.GoSelectArea.click(function(){
	cp2y.buy.step1();
});//返回投注区
playDom.GoMyBets.click(function(){
	cp2y.buy.step2();
});//返回我的选项区
playDom.More.click(function(){
	
});//投注区域展开查看更多玩法
$("#pStop").blur(function(){
	if($(this).val()>9999){
		$(this).val(9999);
	}
});
playDom.complete.click(function(){
	$("#mainSection header").removeClass('fixed');
	var prizeStop=$("#pStop").val();
	if(!prizeStop){prizeStop=0;}
	if($("#burstIntoStop").size()>0){
		var burstIntoStop=$("#burstIntoStop").attr('checked');
		if(burstIntoStop){
			cp2y.buy.burstIntoStop=1;
		}else{
			cp2y.buy.burstIntoStop=0;
		}
	}
	Issues2.html(cp2y.buy.getTotalMoney()[0]); //输出期数
	Issues.val(cp2y.buy.getTotalMoney()[0]);
	Money.html(cp2y.buy.getTotalMoney()[1]);
	cp2y.buy.prizeStop=prizeStop;
	cp2y.buy.step2();
});
userDom.more.click(function(){
	$(this).toggleClass("on");
	userDom.moreDetail.toggle();
});
userDom.userPartTitle.click(function(){
	if(document.getElementById("userMore").style.display=="none"){
		return false;
	}else{
		userDom.more.toggleClass("on");
		userDom.moreDetail.toggle();
	}
});
playDom.MainStep1.click(function(){
	if(playDom.More.html()=="收起"){
		playDom.More.click();
	}
});
window.addEventListener('pageshow',cp2y.buy.reCountDown(), false);
// Zepto(window).on("pageshow", function() {
//     cp2y.buy.reCountDown();
// });
// Zepto(window).on("pageshow", function() {
//     cp2y.buy.reCountDown();
// });
$("#getTz").click(function(){
	$(this).siblings().removeClass("cur");
	$(this).addClass("cur");
	$(".MoreLists").hide();
	ChangePlayType.show();
});
$("#getWf").click(function(){
	$(this).siblings().removeClass("cur");
	$(this).addClass("cur");
	$.ajax({
		url:WebAppUrl.HOME_APP_URL+"/help/"+_.bt+".txt",
		beforeSend:function(){$(".MoreLists").hide();cp2y.dialog.loading();},
		success:function(data){
			cp2y.dialog.clearLoading();
			$("#getWfC").html(data).show();
		},
		error:function(){cp2y.dialog.clearLoading();}
	});
});
//滑动事件
var touch = {
	tX : [],
	touchStart : function(a) {
		this.tX.push(a.touches[0].pageX);
	},
	touchMove : function(c) {
		this.tX.push(c.touches[0].pageX);
		//c.preventDefault();
	},
	touchEnd1 : function() {
		//alert(this.tX[0]+","+this.tX[this.tX.length - 1]);
		if (this.tX[0] - this.tX[this.tX.length - 1] > 100) {
			$("#GoMain1").click();
		}
		this.tX = [];
	},
	touchEnd2 : function() {
		if (this.tX[0] - this.tX[this.tX.length - 1] > 100) {
			$("#GoUserCenter").click();
		} else if (this.tX[0] - this.tX[this.tX.length - 1] < -100) {
			$("#GoIndex").click();
		}
		this.tX = [];
	},
	touchEnd3 : function() {
		if (this.tX[0] - this.tX[this.tX.length - 1] < 0) {
			$("#GoMain1").click();
		}
		this.tX = [];
	}
}
//摇一摇
var SHAKE_THRESHOLD =5000,last_update = 0,x, y, z, last_x=0, last_y=0, last_z=0;
function deviceMotionHandler(eventData) {
    var acceleration =eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime - last_update)> 100) {
        var diffTime = parseInt(curTime -last_update);
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) {
        	try{cp2y.buy.random(1);}catch(e){}
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}
if (window.DeviceMotionEvent) {
    //window.addEventListener('devicemotion',deviceMotionHandler, false);
}
