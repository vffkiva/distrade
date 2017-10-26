function actionCheckAnimation(options){
var opts = $.extend({'elements' : null},options);
var animated = false;
	if(opts['elements'] == null || $(opts['elements']).length <= 0) return false;
	$.each(opts['elements'], function(index, item){
		if($(this).is(':animated')) animated = true;
	});
return animated;
}


function actionAnimate(options){
var defaults = {
	'easing' : 'swing',
	'element' : null,
	'effects' : {},
	'delay' : 1000,
	'callback' : null,
	'timeout' : 0,
	'show_animation' : true
	}
var opts = $.extend(defaults,options);
	if(opts['element'] == null) return;

	setTimeout(function(){
		opts['element'].animate(opts['effects'],opts['delay'],opts['easing'], function(){
			if(opts['callback'] != null && typeof opts['callback'] == 'function')eval(opts['callback']());
		});
	},opts['timeout']);	
}



function randomNumber(from,to){
return Math.floor(Math.random()*(to-from+1)+from);
}


function inputOver(item, position){
var parents = $(item).parent().parent().find('li');
var img = '/img/image.png';

	parents.each( function(index, value) { 
 	var tmp = $(this).attr('class').split('-');
		if(tmp[1] == 'start')$(this).css({'background' : 'url("'+img+'") no-repeat scroll '+position[1]+' '+position[0]+' transparent'});
 	 	if(tmp[1] == 'center')$(this).css({'background' : 'url("'+img+'") no-repeat scroll '+position[2]+' '+position[0]+' transparent'});
		if(tmp[1] == 'end') $(this).css({'background' : 'url("'+img+'") no-repeat scroll '+position[3]+' '+position[0]+' transparent'});
	});
}

function inputOut(item, position){
var parents = $(item).parent().parent().find('li');
var img = '/img/image.png';
	parents.each( function(index, value) { 
 	var tmp = $(this).attr('class').split('-');
		if(tmp[1] == 'start') $(this).css({'background' : 'url("'+img+'") no-repeat scroll '+position[1]+' '+position[0]+' transparent'});
 	 	if(tmp[1] == 'center') $(this).css({'background' : 'url("'+img+'") no-repeat scroll '+position[2]+' '+position[0]+' transparent'});
		if(tmp[1] == 'end') $(this).css({'background' : 'url("'+img+'") no-repeat scroll '+position[3]+' '+position[0]+' transparent'});
	});
}

function showDialog(id, options){
id = 'dialog-'+id;
 if(document.getElementById(id)){
 $('#'+id).remove();
 }
var html = '<div id="'+id+'"><\/div>';
$('#dialogs').append(html);
$('#'+id).dialog(options).dialog('open');

return $('#'+id);
}


function tr(options){
var opts = $.extend({'var' : 'unknown'}, options);
	if(opts['var'] == 'unknown' || typeof lg[opts['var']] == 'undefined') return opts['var'];
	else return lg[opts['var']];
}


function actionShowMessage(options){
var defaults = {'text' : '', 'type' : 'info', 'container' : '.message', 'mode' : 'plain', 'title' : '', 'width' : 400, 'height' : 200, 'wrap' : true};
var opts = $.extend(defaults, options);

	if(opts['text'] != '' && opts['container'] != ''){
	var container = $(opts['container']);
	var icon, state, div;

		if(opts['type'] == 'info'){
		icon = 'ui-icon-info';
		state = 'ui-state-highlight';
		state_plain = 'message-info';
		}
		if(opts['type'] == 'error'){
		icon = 'ui-icon-alert';
		state = 'ui-state-error';
		state_plain = 'message-error';
		}


		
		if(opts['mode'] == 'prompt'){
			if(opts['wrap']){
			opts['text'] = 
			'<div class="'+state+' ui-corner-all" style="width:99%;float:left;">'+
			'<div style="width:30px;height:100%;min-height:100px;float:left;text-align:center; padding:5px 0 0 10px;"><span class="ui-icon '+icon+'"><!----></span></div>'+
			'<div style="width:auto;height:100%;min-height:100px;padding-top:5px;">'+opts['text']+'</div>'+
			'</div>';
			}
		
		var buttons = {'OK' : function(){$(this).dialog('close')}};
		var dialog_msg = showDialog('dialog-message',{'width' : opts['width'], 'height' : opts['height'], 'title' : opts['title'], 'resizable' : false, 'modal' : true, buttons: buttons});
		$(dialog_msg).html(opts['text']);
		}
		else{
			if(opts['wrap']){
			opts['text'] = 
			'<div style="text-align: center; padding: 3px;" class="'+state_plain+'">'+opts['text']+'</div>';
			}
			
			if($(container).length == 0){
			container = $('<div class="message"></div>');
				if($('#content-center').length > 0) $('#content-center').prepend($(container));
			}
			else $(container).html('');
		
		$('body,html').animate({
			scrollTop: 0
			}, 800, function() {
			$(container).hide().html(opts['text']).fadeTo(1000,1.0);
			});
		}
	}
}


function actionHideMessage(options){
var defaults = {'container' : '.message', 'mode' : 'plain'};
var opts = $.extend(defaults, options);
	if(opts['mode'] == 'plain'){
	$(opts['container']).parents('form').find('span[id^="status-"]').removeClass('error');
		if($(opts['container']).html() != '')$(opts['container']).html('').hide();
	}
}



(function( $ ){
	$.fn.serializeJSON=function() {
	var json = {};
		jQuery.map($(this).serializeArray(), function(n, i){
		json[n['name']] = n['value'];
		});
	return json;
	};
})( jQuery );



function actionLoadImage1(options){
var defaults = {'object' : null};
var opts = $.extend(defaults, options);
	if(opts['object'] == null || opts['object'].length == 0) return;

var data = {};

data['width'] = opts['object'].outerWidth();
data['height'] = opts['object'].outerHeight();
data['position'] = opts['object'].css('position');

var css = {
	'border' : '1px solid red', 
	'width' : data['width']+'px', 
	'height' : data['height']+'px', 
	'position' : data['position'],
	'display' : 'inline-block'
}

var tmp = $('<div>aaa</div>');
tmp.css(css);

//opts['object'].parent().prepend(tmp);
console.log(data);
	
      opts['object'].hide() //Hide it
        .one('load', function() { //Set something to run when it finishes loading
          $(this).fadeIn(); //Fade it in when loaded
        })
        .attr('src', opts['object'].attr('src')) //Set the source so it begins fetching
        .each(function() {
          //Cache fix for browsers that don't trigger .load()
          if(this.complete) $(this).trigger('load');
        });
	
}


function actionLoadImage(options){
var defaults = {'object' : null};
var opts = $.extend(defaults, options);
	if(opts['object'] == null || opts['object'].length == 0) return;
	
      opts['object'].fadeTo(0,0) //Hide it
        .one('load', function() { //Set something to run when it finishes loading
          $(this).fadeTo(200,1); //Fade it in when loaded
        })
        .attr('src', opts['object'].attr('src')) //Set the source so it begins fetching
        .each(function() {
          //Cache fix for browsers that don't trigger .load()
          if(this.complete) $(this).trigger('load');
        });
	
}