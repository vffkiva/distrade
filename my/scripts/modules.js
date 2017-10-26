function actionAddModule(options){
var defaults = {'container' : '#id-formModule', 'redirect' : ''}
var opts = $.extend(defaults,options);

var data = $(opts['container']).serializeJSON();
data['action'] = 'actionAddModule';
data['redirect'] = opts['redirect'];

	$.each($('textarea[name^="Text_"]'), function(index, item){
	data['Text_'+index] = CKEDITOR.instances['Text_'+index].getData();
	data['Description_'+index] = CKEDITOR.instances['Description_'+index].getData();
	});

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


function actionBlockModules(options){
var defaults = {'container' : '#id-formModules', 'redirect' : '', 'block_status' : 0}
var opts = $.extend(defaults,options);

var data = $(opts['container']).serializeJSON();
data['action'] = 'actionBlockModules';
data['redirect'] = opts['redirect'];
data['BlockStatus'] = opts['block_status'];
data['TotalFields'] = $(opts['container']).find('input[name^="Module_"]').length;

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


function actionDeleteModule(options){
var defaults = {'module_id' : '', 'redirect' : '', 'block_status' : 0}
var opts = $.extend(defaults,options);
data = {'action' : 'actionDeleteModule', 'redirect' : opts['redirect'], 'ModuleID' : opts['module_id']};
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