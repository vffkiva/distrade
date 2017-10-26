	$(document).ready(function(){
	actionInitialization({});
	});


var data = {
'container' : null,
'current' : null,
'total' : 0,
'left' : null,
'right' : null,
'slides' : [],
'title' : {
	'bottom' : 80,
	'left' : 50
	},
'text' : {
	'bottom' : 80,
	'left' : 50
	},
'cycle' : false
};


function actionInitialization(options){
var defaults = {
	'container' : '.slider',
	'effect' : 'fade'
};
var opts = $.extend(defaults, options);
	if($(opts['container']).length == 0)return;

data['container'] = $(opts['container']);
data['slides'] = $(opts['container']).find('div.slide') 
data['total'] = data['slides'].length;
data['current'] = 0;
data['left'] = data['total']-1;
data['right'] = 1;
	
	if(data['container'].find('div.tit1le').length > 0){
	data['title']['bottom'] = parseFloat($(data['container'].find('div.title')[0]).css('bottom'));
	data['title']['left'] = parseFloat($(data['container'].find('div.title')[0]).css('left'));
	}

	if(data['container'].find('div.text').length > 0){
	data['text']['bottom'] = parseFloat($(data['container'].find('div.text')[0]).css('bottom'));
	data['text']['left'] = parseFloat($(data['container'].find('div.text')[0]).css('left'));
	}
	
	$.each($(data['slides']), function(index, item){
		if(index != data['current']){
		actionAnimate({'element' : $(this), 'effects' : {opacity: 0.0}, 'delay' : 0});
		}
	});


	data['container'].find('.left, .right').bind('click', function(){
		if($(this).hasClass('left')) actionSlide({'direction' : 'left'});
		if($(this).hasClass('right')) actionSlide({'direction' : 'right'});
	});

data['cycle'] = setTimeout("actionSlide()",(vars['timeout']['slides'] * 1000));
}


function actionSlide(options){
var defaults = {
	'direction' : 'right',
	'effect' : 'fade',
	'title' : {
		'direction' : (randomNumber(0,1) == 0) ? '+' : '-'
		},
	'text' : {
		'direction' : (randomNumber(0,1) == 0) ? '+' : '-'
	}
}

var opts = $.extend(defaults, options);
data['container'].find('.left, .right').unbind();
	if(data['cycle'])clearTimeout(data['cycle']);

data['right'] = (data['current'] == (data['total']-1)) ? 0 : (data['current'] + 1);
data['left'] = (data['current'] == 0) ? (data['total']-1) : (data['current'] - 1);

	
	if($(data['slides'][data['current']]).find('div.title, div.text').length > 0){
		if($(data['slides'][data['current']]).find('div.title').length > 0){
		var item = $(data['slides'][data['current']]).find('div.title');
		actionAnimate({'element' : $(item), 'effects' : {opacity: 0.0, bottom: opts['title']['direction']+'=100px'}, 'delay' : 750, 'easing': 'easeInOutQuint'});
		}
		if($(data['slides'][data['current']]).find('div.text').length > 0){
		var item = $(data['slides'][data['current']]).find('div.text');
		actionAnimate({'element' : $(item), 'effects' : {opacity: 0.0, left: opts['text']['direction']+'=100px'}, 'delay' : 750, 'easing': 'easeInOutQuint'});
		}
	}
	else {

	}

	
	if(opts['effect'] == 'fade'){
	data['next'] = (opts['direction'] == 'left') ? data['left'] : data['right'];
	
		var wait = setInterval(function(){
			if (!actionCheckAnimation({'elements' : $(data['slides'][data['current']]).find('div.title, div.text')})){
			clearInterval(wait);
			var element = $(data['slides'][data['current']]);
			actionAnimate({'element' : element, 'effects' : {opacity: 0.0}, 'delay' : 750, 'callback' : function(){
				actionAnimate({'element' : element.find('div.title'), 'effects' : {opacity: 0.8, bottom: data['title']['bottom']}, 'delay' : 0});
				actionAnimate({'element' : element.find('div.text'), 'effects' : {opacity: 0.8, left: data['text']['left']}, 'delay' : 0});
				}
			});
		
			actionAnimate({'element' : $(data['slides'][data['next']]), 'effects' : {opacity: 1.0}, 'delay' : 750, 'callback' : function(){
				data['container'].find('.left, .right').bind('click', function(){
					if($(this).hasClass('left')) actionSlide({'direction' : 'left'});
					if($(this).hasClass('right')) actionSlide({'direction' : 'right'});
				});
				}
			});
			
			data['current'] = data['next'];
			data['cycle'] = setTimeout("actionSlide()",(vars['timeout']['slides']*1000));
			}
		},
		200);
	}
}