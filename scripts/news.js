$(document).ready(function(){
actionNewsInitialization({});

});


var news = {
'container' : null,
'current' : null,
'total' : 0,
'left' : null,
'right' : null,
'direction' : 'right',
'news' : [],
'step' : 0,
'cycle' : false
};


function actionNewsInitialization(options){
var defaults = {'container' : '.news > .block > .frame'};
var opts = $.extend(defaults, options);
	if($(opts['container']).length == 0)return;

	
news['container'] = $(opts['container']);
news['news'] = $(opts['container']).find('div.news-text') 
news['total'] = news['news'].length;
news['current'] = 0;
news['left'] = news['total']-1;
news['right'] = 1;
news['step'] = 	parseInt($(news['news'][0]).css('width'));

	$.each($(news['news']), function(index, item){
		if($(this).find('.hidden-object>.link').length>0 && $(this).find('.hidden-object>.link').html() != ''){
		$(this).unbind().bind('click', function(){window.location.href=$(this).find('.hidden-object>.link').html()});
		}
		if(index != news['current']){
		$(this).css({'left' : -2000});
		}
	});


	$(opts['container']).on('mouseenter', function(){
		if (!actionCheckAnimation({'elements' : $(this).find('.controls')})){
		actionAnimate({'element' : $(this).find('.controls'), 'effects' : {bottom: 0}, 'delay' : 750, 'timeout' : 2000, 'callback' : function(){}});
		}
	});
	
	$(opts['container']).on('mouseleave', function(){
	actionAnimate({'element' : $(this).find('.controls'), 'effects' : {bottom: -60}, 'delay' : 500});
	//console.log('mouse out');
	});
	
	$(opts['container']).find('.controls > .right, .controls > .left').bind('click', function(){
		if($(this).hasClass('left')) {news['direction'] = 'left'; actionNewsSlide({'direction' : 'left'});}
		if($(this).hasClass('right')) {news['direction'] = 'right'; actionNewsSlide({'direction' : 'right'});}
	});

	
	if($(opts['container']).find('.controls > .right').length > 0){
	news['cycle'] = setTimeout("actionNewsSlide()",(vars['timeout']['news']*1000));
	}
}



function actionBindNewsControls(options){
var defaults = {'container' : null};
var opts = $.extend(defaults, options);
	if(opts['container'] == null  || $(opts['container']).length <= 0) return;
}



function actionNewsSlide(options){
var defaults = {'direction' : news['direction'], 'left' : 1, 'sign' : '-'};
var opts = $.extend(defaults, options);
$(news['container']).find('.controls > .right, .controls > .left').unbind();
	if(news['cycle']){clearTimeout(news['cycle']);}

news['right'] = (news['current'] == (news['total']-1)) ? 0 : (news['current'] + 1);
news['left'] = (news['current'] == 0) ? (news['total']-1) : (news['current'] - 1);
news['next'] = (opts['direction'] == 'left') ? news['left'] : news['right'];
	
	if(opts['direction'] == 'right'){
	opts['left'] = -1;
	opts['sign'] = '+';
	}

    
var current_item = news['news'][news['current']];
var next_item = news['news'][news['next']];
$(next_item).css({'left' : (opts['left'] * news['step'])});

	
//	actionAnimate({'element' : $(current_item), 'effects' : {left: opts['sign']+'='+news['step']+'px'}, 'delay' : 1000, 'easing': 'easeOutBounce'});
//	actionAnimate({'element' : $(next_item), 'effects' : {left: opts['sign']+'='+news['step']+'px'}, 'delay' : 1000, 'easing': 'easeOutBounce'});

	actionAnimate({'element' : $(current_item), 'effects' : {left: opts['sign']+'='+news['step']+'px'}, 'delay' : 1000});
	actionAnimate({'element' : $(next_item), 'effects' : {left: opts['sign']+'='+news['step']+'px'}, 'delay' : 1000});

		var wait = setInterval(function(){
			if (!actionCheckAnimation({'elements' : $(current_item)})){
			clearInterval(wait);

				$(news['container']).find('.controls > .right, .controls > .left').bind('click', function(){
					if($(this).hasClass('left')) {news['direction'] = 'left'; actionNewsSlide({});}
					if($(this).hasClass('right')) {news['direction'] = 'right'; actionNewsSlide({});}
				});
			
			news['current'] = news['next'];
			news['cycle'] = setTimeout("actionNewsSlide()",(vars['timeout']['news']*1000));
			}
			else {
			//console.log('animated');
			}
		}, 200);	
}



function actionGetNews(options){
var defaults = {'limit' : 5, 'offset' : 0};
var opts = $.extend(defaults, options);
$('.news-list-more').fadeTo(10,0.0);

	if($('#id-newsListParams > .limit').html() != '') opts['limit'] = parseInt($('#id-newsListParams > .limit').html());
	if($('#id-newsListParams > .offset').html() != '') opts['offset'] = parseInt($('#id-newsListParams > .offset').html());

		
	$.ajax({
	data: {'action' : 'actionGetNews', 'limit' : opts['limit'], 'offset' : opts['offset']},
		success: function(out){
			var total = out['news'].length;
				$.each($(out['news']), function(index, item){
				object = $('<div/>').html(item).contents().hide();
				object.find('.action-button').button();
				$('.news-list').append($(object));
				object.fadeTo(1000,1.0, function(){
					if(index == (total-1)){
						if(parseInt(out['next']) == 0)$('.news-list-more').remove();
						
						$('body,html').animate({scrollTop: $(document).height()}, 800, function() {
							if(parseInt(out['next']) > 0){
							$('#id-newsListParams > .offset').html((opts['offset']+opts['limit']))
							$('.news-list-more').fadeTo(500,1.0);
							}
						});
						
					}
				});
			});
		}
	});
}