function actionAddNews(options){
var defaults = {'container' : '#id-formNews', 'redirect' : ''}
var opts = $.extend(defaults,options);

var data = $(opts['container']).serializeJSON();
data['action'] = 'actionAddNews';
data['redirect'] = opts['redirect'];

	$.each($('textarea[name^="Text_"]'), function(index, item){
	data['Text_'+index] = CKEDITOR.instances['Text_'+index].getData();
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


function actionBlockNews(options){
var defaults = {'container' : '#id-formNews', 'redirect' : '', 'block_status' : 0};
var opts = $.extend(defaults,options);

var data = $(opts['container']).serializeJSON();
data['action'] = 'actionBlockNews';
data['redirect'] = opts['redirect'];
data['BlockStatus'] = opts['block_status'];
data['TotalFields'] = $(opts['container']).find('input[name^="News_"]').length;

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


function actionDeleteNews(options){
var defaults = {'news_id' : '', 'redirect' : ''};
var opts = $.extend(defaults,options);
data = {'action' : 'actionDeleteNews', 'redirect' : opts['redirect'], 'NewsID' : opts['news_id']};
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