function dialogAddLanguage(options){
var dialog_id = 'add_language';
var buttons = {};

buttons[lg.BTTN_SAVE] = function(){
		$.ajax({
		data: 'action=actionAddLanguage&'+$(this).find('form').serialize(),
		success: function(out){
				if(out['message']['type'] == 'error')actionShowMessage(out['message']);
				else {
					if(opts['redirect'] !='')window.location.href=opts['redirect'];
				}
			}	
		});
};

var defaults = {'lang_id' : '', 'redirect' : '', 'title' : '', 'width' : 450, 'height' : 300, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);
buttons[lg['BTTN_CLOSE']] = function(){$(this).dialog().remove();};

var dialog = showDialog(dialog_id,opts);
	$.ajax({
	data: {'action' : 'dialogAddLanguage', 'lang_id' : opts['lang_id'], 'redirect' : opts['redirect']},
		success: function(out){
			$("#dialog-"+dialog_id).html(out['dialog']['text']);
			$(dialog).dialog('option', 'title', out['dialog']['title']);
		}
	});

}


