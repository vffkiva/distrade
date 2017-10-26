function dialogShowFilter(options){
var buttons = {};
buttons[lg['BTTN_SEARCH']] = function(){
		$.ajax({
		data: 'action=actionApplyFilter&redirect='+opts['redirect']+'&key='+opts['key']+'&'+$(this).find('form').serialize(),
		success: function(out){
				if(out['redirect'] != '')window.location.href = out['redirect'];
			}
		});
};

buttons[lg['BTTN_RESET']] = function(){
		$.ajax({
		data: 'action=actionResetFilter&redirect='+opts['redirect']+'&key='+opts['key']+'&'+$(this).find('form').serialize(),
		success: function(out){
				if(out['redirect'] != '')window.location.href = out['redirect'];
			}
		});
};


buttons[lg['BTTN_CLOSE']] = function(){$(this).dialog().remove();};

var defaults = {'key' : 'default', 'title' : 'Filter', 'redirect' : '', 'width' : 400, 'height' : 300, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);
var dialog_id = 'filter_'+opts['key'];
var dialog = showDialog(dialog_id,opts);
	$.ajax({
	data: 'action=dialogShowFilter&key='+opts['key'],
		success: function(data){
		$("#dialog-"+dialog_id).html(data.dialog.text);
	 	//$(dialog).find('input[name="start_date"],input[name="end_date"]').datetimepicker({ dateFormat: 'dd.mm.yy', changeYear: true });
	 	}
	});

}

