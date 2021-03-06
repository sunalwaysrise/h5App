/**
 * @author luwenbin@live.com
 */
var _ = {
	bt: 10059,
	playName: "竞彩足球",
	playTypes: function (a) {
		var html = [],
			v1 = '',
			v2 = '';
		if (a == "a0") {
			v1 = 'class="onn"';
		} else if (a == "a1") {
			v2 = 'class="onn"';
		}
		html.push('<a data="a0" href="' + WebAppUrl.HOME_APP_URL + '/lottery/10059?type=a0" ' + v1 + ' data2="胜平负">胜平负</a>');
		html.push('<a data="a1" href="' + WebAppUrl.HOME_APP_URL + '/lottery/10059?type=a1" ' + v2 + ' data2="让球胜平负">让球胜平负</a>');
		return html.join('');
	}
};
_.a0 = {
	jcType:0,
	bt: _.bt,
	playName: _.playName,
	playType: "胜平负",
	maxMatch: 8,
	url: "/lottery/spf/",
	bet: function () {
		$.ajax({
			url: WebAppUrl.HOME_APP_URL + this.url,
			beforeSend: function () {
				cp2y.dialog.loading();
			},
			success: function (data) {
				cp2y.dialog.clearLoading();
				cp2y.buy.sels = data.sels.split(',');
				cp2y.buy.betType = data.betType;
				var leagues = data.leagues.split(','),
					data = data.data,
					html = [],
					i = 0,
					len = data.length;
				cp2y.buy.issue = data[0].issueId;
				for (i; i < len; i++) {
					var j = 0,
						data2 = data[i].matches,
						jlen = data2.length;
					html.push("<div class='tip tip2'>" + data[i].dayOfWeekStr + "<b class='fr'>比赛场次：<span>" + data[i].matchCount + "场</span></b></div><ul>");
					for (j; j < jlen; j++) {
						var betCounter = data2[j].betCounter ? data2[j].betCounter.split(',') : ["-", "-", "-"];
						html.push('<li class="' + data2[j].leagueName + '"><div class="jc_line1"  data="{no:' + data2[j].matchCode + ',end:false,name:\'' + data[i].dayOfWeekStr + '0' + (j + 1).addZero() + '\',h:\'' + data2[j].hostName + '\',g:\'' + data2[j].guestName + '\',rq:\'' + data2[j].rate + '\',dw:\'' + data[i].dayOfWeekStr + '\'}">');
						html.push('<strong><em>' + data2[j].leagueName + '</em>');
						html.push('<var>' + '0' + (j + 1).addZero() + '</var>');
						html.push('<time>' + data2[j].sellEndTime.substr(11, 5) + '截止</time>');
						html.push('</strong><div>');
						html.push('<i data="3" data_s="' + data2[j].sheng + '" data_class="a' + data2[j].matchCode + '_3" class="jcBet a' + data2[j].matchCode + '_3"><span>' + data2[j].hostName + '</span><b>主胜' + data2[j].sheng + '</b></i>');
						var rq='';
						if(cp2y.buy.jcType==1){
							rq= data2[j].rate;
							if(rq>0){
								rq="(+"+rq+")";
							}else{
								rq="("+rq+")";
							}
						}
						html.push('<i data="1" data_s="' + data2[j].ping + '" data_class="a' + data2[j].matchCode + '_1" class="jcBet a' + data2[j].matchCode + '_1"><span>VS'+rq+'</span><b>平' + data2[j].ping + '</b></i>');
						html.push('<i data="0" data_s="' + data2[j].fu + '" data_class="a' + data2[j].matchCode + '_0" class="jcBet a' + data2[j].matchCode + '_0"><span>' + data2[j].guestName + '</span><b>主负' + data2[j].fu + '</b></i>');
						html.push('</div></div><div class="jc_line2"><table class="jc_table">');
						html.push('<tr><td>两队排名</td><td>'+(data2[j].hostRank ? data2[j].hostRank : '--')+'</td><td>'+(data2[j].visitRank ? data2[j].visitRank : '--')+'</td><td rowspan="4" style="display:none;"></td></tr>');
						var historyScore=(data2[j].historyScore?data2[j].historyScore:'-,-,-').split(',');
						html.push('<tr><td>历史交锋</td><td colspan="2">主队'+historyScore[0]+'胜'+historyScore[1]+'平'+historyScore[2]+'负</td></tr>');
						html.push('<tr><td>平均赔率</td><td colspan="2"><table class="jc_table2"><tr><td>' + (data2[j].odds3 ? data2[j].odds3 : '--') + '</td><td>' + (data2[j].odds1 ? data2[j].odds1 : '--') + '</td><td>' + (data2[j].odds0 ? data2[j].odds0 : '--') + '</td></tr></table></td></tr>');
						html.push('<tr><td>投注比例</td><td colspan="2"><table class="jc_table2"><tr><td>' + betCounter[0] + '</td><td>' + betCounter[1] + '</td><td>' + betCounter[2] + '</td></tr></table></td></tr>');
						html.push('</table></div></li>');
					}
					html.push("</ul>");
				}
				jcDom.choose.html(html.join(''));
				i = 0;
				len = leagues.length;
				html = [];
				for (i; i < len; i++) {
					html.push('<a class="on">' + leagues[i] + '</a>');
				}
				jcDom.lcs.html(html.join(''));
				$("#choose .jcBet").click(function () {
					cp2y.buy.select($(this), false);
				});
				cp2y.buy.showLine2();
			},
			error: function () {
				cp2y.dialog.clearLoading();
			}
		});

	}
};
_.a1 = {
	jcType:1,
	bt: _.bt,
	playName: _.playName,
	playType: "让球胜平负",
	maxMatch: 8,
	url: "/lottery/rqspf/",
	bet: _.a0.bet
};