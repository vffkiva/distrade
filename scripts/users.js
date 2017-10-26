$(document).ready(function(){

});

function actionUserLogin(options){
var defaults = {'dialog' : '', 'redirect' : ''};
var opts = $.extend(defaults, options);

actionHideMessage({'container' : '#login-message'});
	$.ajax({
	data: 'action=actionUserLogin&redirect='+opts['redirect']+'&'+opts['dialog'].find('form').serialize(),
	success: function(out){
			if(out['message']['type'] == 'error'){
			actionShowMessage(out['message']);
				$.each(out['error_fields'],function(index, item){
					if(!opts['dialog'].find('span#status-'+item).hasClass('error'))opts['dialog'].find('span#status-'+item).addClass('error')
				});
			}
			else {
				if(opts['redirect'] !='')window.location.href=opts['redirect'];
			}
		}	
	});
}

function dialogUserLogin(options){
var buttons = {};
buttons[tr({'var' : 'BTTN_LOGIN'})] = function(){actionUserLogin({'dialog' : $(dialog), 'redirect' : opts['redirect']});};

var defaults = {'dialog_id' : 'dialog_login', 'redirect' : '', 'title' : '', 'width' : 400, 'height' : 230, 'resizable' : true, 'modal' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);

var dialog = showDialog(opts['dialog_id'],opts);
	$.ajax({
	data: {'action' : 'dialogUserLogin', 'redirect' : opts['redirect']},
		success: function(out){
		$("#dialog-"+opts['dialog_id']).html(out['dialog']['text']);
		$(dialog).dialog('option', 'title', out['dialog']['title']);
		$(dialog).find('input').bind('click keydown', function(){actionHideMessage({'container' : '#login-message'});});
		$(dialog).find('input').bind('keyup', function(event){if(event.keyCode == 13){actionUserLogin({'dialog' : $(dialog), 'redirect' : opts['redirect']});}});
		}
	});
}



function actionUserLogout(options){
var defaults = {'redirect' : ''};
var opts = $.extend(defaults, options);

	$.ajax({
	data: {'action' : 'actionUserLogout', 'redirect' : opts['redirect']},
		success: function(out){
				if(out['message']['type'] == 'error'){
				actionShowMessage(out['message']);
				}
				else {
					if(opts['redirect'] !='')window.location.href=opts['redirect'];
				}
		}
	});
}