function dialogPasswordReset(options){
var dialog_id = 'password_reset';
var buttons = {};
buttons[lg.BTTN_CHANGE_PASSWORD] = function(){
		$.ajax({
		data: 'action=actionPasswordReset&'+$(this).find('form').serialize(),
		success: function(out){
				actionShowMessage(out['message']);
				if(out['message']['type'] != 'error'){
				$(dialog).dialog().remove();
				}
			}	
		});

};

var defaults = {'title' : lg.STR_PASSWORD_RESET, 'width' : 320, 'height' : 180, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);
var dialog = showDialog(dialog_id,opts);

	$.ajax({
	data: 'action=dialogPasswordReset&UserID='+$('#ActionForm :input[name="UserID"]').val(),
		success: function(out){
		$("#dialog-"+dialog_id).html(out['dialog']['text']);
		}
	});
}



function dialogAddUser(options){
var dialog_id = 'add_user';
var buttons = {};

buttons[lg.BTTN_SAVE] = function(){
		$.ajax({
		data: 'action=actionAddUser&'+$(this).find('form').serialize(),
		success: function(out){
				if(out['message']['type'] == 'error'){
				actionShowMessage(out['message']);
				}
				else {
					if(opts['redirect'] !='')window.location.href=opts['redirect'];
				}
			}	
		});
};

var defaults = {'user_id' : '', 'redirect' : '', 'title' : '', 'width' : 450, 'height' : 375, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);

	if(opts['user_id'] != ''){
	buttons[lg['BTTN_CHANGE_PASSWORD']] = function(){dialogPasswordReset({})};
	}
buttons[lg['BTTN_CLOSE']] = function(){$(this).dialog().remove();};

var dialog = showDialog(dialog_id,opts);
	$.ajax({
	data: {'action' : 'dialogAddUser', 'user_id' : opts['user_id'], 'redirect' : opts['redirect']},
		success: function(out){
			if(out['message']['type'] == 'error'){
			actionShowMessage(out['message']);
			$(dialog).dialog().remove();
			}
			else {
			$("#dialog-"+dialog_id).html(out['dialog']['text']);
			$(dialog).dialog('option', 'title', out['dialog']['title']);
			
			
				$(dialog).find('select[name="TypeID"]').bind('change', function(){
				actionGetSections({'dialog' : $(dialog), 'type_id' : $(this).val()});
				});
			actionGetSections({'dialog' : $(dialog), 'type_id' : $(dialog).find('select[name="TypeID"]').val(), 'user_id' : $(dialog).find('input[name="UserID"]').val()});
			}
		}
	});

}



function dialogViewUser(options){
var buttons = {};
buttons[lg['BTTN_CLOSE']] = function(){$(this).dialog().remove();}


var defaults = {'user_id' : '', 'title' : '', 'width' : 450, 'height' : 350, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);
var dialog_id = 'user_'+opts['user_id'];
var dialog = showDialog(dialog_id,opts);
	$.ajax({
	data: 'action=dialogViewUser&UserID='+opts['user_id'],
		success: function(out){
		$("#dialog-"+dialog_id).html(out['dialog']['text']);
	 	$(dialog).dialog('option', 'title', out['dialog']['title']);
	 	}
	});
}



function dialogAddUserType(options){
var dialog_id = 'add_user_type';
var buttons = {};

buttons[lg.BTTN_SAVE] = function(){
		$.ajax({
		data: 'action=actionAddUserType&'+$(this).find('form').serialize(),
		success: function(out){
				if(out['message']['type'] == 'error')actionShowMessage(out['message']);
				else {
					if(opts['redirect'] != '')window.location.href=opts['redirect'];
				}
			}	
		});
};

var defaults = {'type_id' : '', 'redirect' : '', 'title' : '', 'width' : 400, 'height' : 250, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);
buttons[lg.BTTN_CLOSE] = function(){$(this).dialog().remove();};

var dialog = showDialog(dialog_id,opts);
	$.ajax({
	data: 'action=dialogAddUserType&TypeID='+opts['type_id'],
		success: function(out){
		$("#dialog-"+dialog_id).html(out['dialog']['text']);
	 	$(dialog).dialog('option', 'title', out['dialog']['title']);

		actionGetSections({'dialog' : $(dialog), 'type_id' : opts['type_id']});
		}
	});
}



function dialogViewUserOnlineParams(options){
var buttons = {};
buttons[lg['BTTN_CLOSE']] = function(){$(this).dialog().remove();};
var defaults = {'log_id' : '', 'title' : '', 'width' : 400, 'height' : 300, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);
var dialog_id = 'log_params'+opts.log_id;
var dialog = showDialog(dialog_id,opts);
	$.ajax({
	data: 'action=dialogViewUserOnlineParams&LogID='+opts.log_id,
		success: function(out){
		$("#dialog-"+dialog_id).html(out['dialog']['text']);
	 	}
	});

}


function actionGetSections(options){
var defaults = {'dialog' : null, 'type_id' : '', 'user_id' : ''};
var opts = $.extend(defaults, options);

	$.ajax({
	data: {'action' : 'actionGetSections', 'TypeID' : opts['type_id'], 'UserID' : opts['user_id']},
		success: function(out){
			if(opts['dialog'] != null)$(opts['dialog']).find('#id-tdStartSubId').html(out['dialog']['text']);
		}
	});
}


function actionDeleteUser(options){
var defaults = {'user_id' : '', 'redirect' : ''};
var opts = $.extend(defaults,options);
data = {'action' : 'actionDeleteUser', 'redirect' : opts['redirect'], 'UserID' : opts['user_id']};
	$.ajax({
	data: data,
		success: function(out){
			if(out['message']['type'] == 'error')actionShowMessage(out['message']);
			else {
				if(out['redirect'] != '') window.location = out['redirect'];
			}
		}
	});
}


function actionDeleteUserType(options){
var defaults = {'type_id' : '', 'redirect' : ''};
var opts = $.extend(defaults,options);
data = {'action' : 'actionDeleteUserType', 'redirect' : opts['redirect'], 'TypeID' : opts['type_id']};
	$.ajax({
	data: data,
		success: function(out){
			if(out['message']['type'] == 'error')actionShowMessage(out['message']);
			else {
				if(out['redirect'] != '') window.location = out['redirect'];
			}
		}
	});
}