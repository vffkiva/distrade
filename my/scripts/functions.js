function showDialog(id, options){
id = 'dialog-'+id;
 if(document.getElementById(id)){
 $('#'+id).remove();
 }
var html = '<div id="'+id+'"><\/div>';
$('#dialogs').append(html);

var tmp = $('#'+id).dialog(options).dialog('open');
	if(typeof options['zIndex'] != 'undefined' && options['zIndex'] != null && options['zIndex'] != '')$(tmp).parents('div.ui-dialog').zIndex(options['zIndex']);

return $('#'+id);
}


function actionShowMessage(options){
var defaults = {'text' : '', 'type' : 'info', 'container' : '.message', 'mode' : 'prompt', 'title' : tr({'var' : 'TITLE_ERROR'}), 'width' : 400, 'height' : 200, 'wrap' : false};
var opts = $.extend(defaults, options);

	if(opts['text'] != '' && opts['container'] != ''){
	var container = $(opts['container']);
	var icon, state, div;

		if(opts['type'] == 'info'){
		icon = 'ui-icon-info';
		state = 'ui-state-highlight';
		}
		if(opts['type'] == 'error'){
		icon = 'ui-icon-alert';
		state = 'ui-state-error';
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
			'<div style="width:400px; padding: 10px; margin:5px auto 20px; text-align:center" class="'+state+' ui-corner-all">'+
			'<span style="float: left; margin-right:5px;" class="ui-icon '+icon+'"></span>'+
			'<span style="text-align:left;">'+opts['text']+'</span>'+
			'</div>';
			}
			
			if($(container).length == 0){
			container = $('<div class="message"></div>');
				if($('#content-center').length > 0) $('#content-center').prepend($(container));
			}
			else $(container).html('');
		
		$('body,html').animate({
			scrollTop: 0
			}, 800, function() {
			$(container).hide().html($(opts['text'])).fadeTo(1000,1.0);
			});
		}
	}
}


function actionHideMessage(){
var container = $('.message');
$(container).html('').hide();
}


function tr(options){
var opts = $.extend({'var' : 'unknown'}, options);

	if(opts['var'] == 'unknown' || typeof lg[opts['var']] == 'undefined') return opts['var'];
	else return lg[opts['var']];
}

function updateField(source,targetPattern){
var value = $('[name='+source+']').val();
var target = $("[name^='"+targetPattern+"']");
target.val(value);
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


Array.prototype.arrayRemoveByValue = function(val) {
	for (var i = 0; i < this.length; i++) {
		if(this[i] == val) {
		this.splice(i, 1);
		i--;
		}
	}
return this;
}


function inArray(needle, haystack) {
var length = haystack.length;
	for(var i = 0; i < length; i++) {
		if(haystack[i] == needle) return true;
	}
return false;
}


function arrayFindByAttribute(array, attr, value) {
	for(var i = 0; i < array.length; i += 1) {
		if(array[i][attr] === value) {
		return i;
		}
	}
return null;
}


function myInArrayNumeric(Item,Arr){
var arrj, arrSize = Arr.length;
var tmp = Item.split(':');

 for(arrj=0;arrj<arrSize;arrj++){
 var tmpArr = Arr[arrj].split(':');
 tmp[0].replace(/\s/g, "");
 tmpArr[0].replace(/\s/g, "");
 
  if(tmp[0] == tmpArr[0])return arrj; 
 }
return 'not_found';
}

serialize = function(obj, prefix) {
    var str = [];
    for(var p in obj) {
        var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
        str.push(typeof v == "object" ? 
            serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
    return str.join("&");
}


function showFileBrowser(options){
var opts = $.extend({'action' : '', 'target' : ''}, options);
var newWindow = window.open('/my/fm/index.html?action='+opts['action'],'filemanager','height=700,width=1000');
newWindow.focus();
}

function showFileTree(options){
var opts = $.extend({'title' : '', 'target' : '#gallery-pics'}, options);
id = 'filetree';
var dialog = showDialog(id,{'width' : 300, 'height' : 230, 'title': opts['title'], 'resizable' : true});	

$(dialog).append('<div id="file-tree" style="overflow: auto;height:180px; border:1px solid rgb(200,200,200); background:rgb(255,255,255);"></div>');
$('#file-tree').fileTree({
	root: '/files/',
	datafunc: myPopulateFileTree,
	multiFolder: true,
	folderCallback: function(path){},
	after: function(data){}
		}, function(file){
		var d = new Date();
			$.getJSON(fileConnector + '?mode=getinfo&path=' + file + '&time=' + d.getMilliseconds(), function(data){
			data['target'] = opts['target'];
			gallerySetPicture(data);
			});
		});
}

var myPopulateFileTree = function(path, callback){
	var d = new Date();
	var url = fileConnector + '?path=' + encodeURIComponent(path) + '&mode=getfolder&showThumbs=true&time=' + d.getMilliseconds();
	$.getJSON(url, function(data) {
		var result = '';
		// Is there any error or user is unauthorized?
		if(data.Code=='-1') {
			handleError(data.Error);
			return;
		};
		
		if(data) {
			result += '<ul class="jqueryFileTree" style="display: none;">';
			for(key in data) {
				if (data[key]['File Type'] == 'dir') result += '<li class="directory collapsed"><a href="#" rel="'+data[key]['Path']+'">'+data[key]['Filename']+'</a></li>';
				else result += '<li class="file ext_'+data[key]['File Type'].toLowerCase()+'"><a href="#" rel="'+data[key]['Path']+'">'+data[key]['Filename']+'</a></li>';
			}
			result += '</ul>';
		} else {
			result += '<h1>' + tr({'var' : lg['could_not_retrieve_folder']}) + '</h1>';
		}
		callback(result);
	});
}


function actionBindCheck(options){
var defaults = {'source' : 'input[name^="SelectAll_"]', 'target' : 'input[name^="Channel_"]'};
var opts = $.extend(defaults, options);
$(opts['target']).prop('checked', $(opts['source']).is(':checked'));
}


function dialogTitleConfiguration(options){
var defaults = {'object_id' : '', 'lang_key' : '', 'lang_id' : '', 'text' : '', 'type' : 'section'};
var opts = $.extend(defaults, options);

	$.ajax({
	data: {'action' : 'dialogTitleConfiguration', 'LangID' : opts['lang_id'], 'ObjectID' : opts['object_id'], 'TitleText' : opts['text'], 'Type' : opts['type']},
		success: function(data){
		var buttons = {};
			buttons[tr({'var' : 'BTTN_SAVE'})] = function(){
			var post = {};
			post['Style'] = $('#editor-title-preview').attr('style');
			post['action'] = 'actionSaveTitleConfiguration';
			post['LangID'] = opts['lang_id'];
			post['object_id'] = opts['object_id'];
			post['Type'] = opts['type'];
			post['SetToAll'] = ($(dialog).find("input[name='SetToAll']").is(':checked')) ? 1 : 0;
				if(post['SetToAll'] == 0 || ( post['SetToAll'] == 1 && confirm(tr({'var' : 'MSG_TITLE_STYLE_FOR_ALL_CONFIRM'})) ) ){
					$.ajax({
					data: post,
						success: function(out){
						$(dialog).dialog().remove();
						actionShowMessage(out['message']);
						}
					})
				}
			}
		
		var dialog = showDialog('dialog_preview_edit',{'width' : 'auto', 'height' : 300, 'modal' : true, 'title': data.dialog.title, 'resizable' : true, buttons: buttons});
		$(dialog).html(data.dialog.text);
		
		var tmp = $(dialog).find('#editor-title-preview').attr('style').split(';');
		titleStyles = new Array;
			for(i=0;i<tmp.length;i++){
			var style = tmp[i];
			 if(style!='')titleStyles[titleStyles.length] = style;
			}
		
		var styles = new Array;			
		var buttons = $(dialog).find("[id^='bttn-editor_']");
		var drops = $(dialog).find("[name^='drop-editor_']");
		$(buttons).button();
			
			$(buttons).bind('click', function(){
			var name = $(this).attr('name');
			var type = name.replace('bttn-editor_','');
			var checked = $(dialog).find("input[name='"+name+"']").is(':checked');
				if(checked && myInArrayNumeric(styleDefinitions[type],titleStyles) == 'not_found')titleStyles[titleStyles.length] = styleDefinitions[type];
				if(!checked && myInArrayNumeric(styleDefinitions[type],titleStyles) != 'not_found')titleStyles.splice(myInArrayNumeric(styleDefinitions[type],titleStyles),1);
			showTitlePreview();
			});
		
		$('#bttn-editor-reset').button().css({'float' : 'right'}).bind('click', function () {
		titleStyles = new Array;
		showTitlePreview();
			$(buttons).each(function(index,value){
			$(this).attr("checked" , false );
			$(this).button('refresh');
			});
			$(drops).each(function(index,value){
			$(this).val('');
			});
		});
	
			$(drops).bind('change', function(){
			var name = $(this).attr('name');
			var type = name.replace('drop-editor_','');
			var value = $(this).val();
			var cssName = (type == 'fontfamily') ? 'font-family' : 'font-size';
				if(value!=''){
				var cssValue = cssName+':'+value;
					if(myInArrayNumeric(cssValue,titleStyles) != 'not_found')titleStyles[myInArrayNumeric(cssValue,titleStyles)] = cssValue;
					else titleStyles[titleStyles.length] = cssValue;
				showTitlePreview();
				}
			});
		
		
			$('#colorpickerHolder2').ColorPicker({
				flat: true,
				color: '#00ff00',
				onSubmit: function(hsb, hex, rgb) {
					$('#colorSelector2 div').css('background-color', '#' + hex);
					$('#colorpickerHolder2').stop().animate({height: 0}, 500);
					widt = !widt;
					cssValue = 'color: rgb(' + rgb['r']+', '+rgb['g']+', '+rgb['b']+')';
						if(myInArrayNumeric(cssValue,titleStyles) != 'not_found')titleStyles[myInArrayNumeric(cssValue,titleStyles)] = cssValue;
						else titleStyles[titleStyles.length] = cssValue;
					showTitlePreview();
				}
			});
		
		$('#colorpickerHolder2>div').css('position', 'absolute');
		
		var widt = false;
			$('#colorSelector2').bind('click', function() {
				$('#colorpickerHolder2').stop().animate({height: widt ? 0 : 173}, 500);
				widt = !widt;
			}).css({'cursor' : 'pointer'});
	
		
		}
	});	
}



function showTitlePreview(){
var stylesLength = titleStyles.length, i;
var object = $('#editor-title-preview');
$(object).removeAttr('style');

	if(stylesLength > 0){
		for(i=0;i<stylesLength;i++){
		var tmp = titleStyles[i].split(':');
		var cssName = tmp[0];
		var cssValue = tmp[1];
		$(object).css(cssName,cssValue);
		}
	}
}


function dialogAttachFile(options){
var position = [];
	if(typeof options != 'undefined' && typeof options.event != 'undefined'){
	position[0] = parseFloat(options.event.clientX);
	position[1] = parseFloat(options.event.clientY);
	}
	
var dialog_id = 'attach_file';
var buttons = {};

buttons[tr({'var' : 'BTTN_ADD'})] = function(){
var files = $(this).find('.qq-upload-success');

	$(files).each(function(index,value){
	var id = $(this).attr('id').replace('File_','');
	var text = $(this).find('.qq-upload-file').html()+' ('+$(this).find('.qq-upload-size').html()+')';
	var real = $(this).find('.qq-upload-data').find('.real-filename').html();
	var item = $('<div id="File_'+id+'" class="message-item ui-accordion-header ui-state-default ui-corner-all">'+text+' <div class="object-hidden">'+real+'</div><span class="ui-icon ui-icon-close"><!----></span></div>');

	$(item).find('.ui-icon-close').bind('click', function(){$(this).parent().remove();});
	var container = (opts['container'] == '') ? 'id-import-file' : opts['container'];
	$('#'+container).append($(item));
	});
	$(this).dialog().remove();
};
		
var defaults = {'container' : '', 'upload_dir' : '', 'title' : lg.STR_UPLOAD_FILE, 'width' : 300, 'height' : 200, 'position' : position, 'resizable' : true, 'buttons': buttons};
var opts = $.extend(defaults, options);
var dialog = showDialog(dialog_id,opts);
	$.ajax({
	data: 'action=dialogBrowseForFile&UploadDir='+escape(opts.upload_dir),
		success: function(data){
		$("#dialog-"+dialog_id).html(data.dialog.text);
			var uploader = new qq.FileUploader({
    			element: $(dialog).find('#file-uploader')[0],
			action: '/my/tools/upload_file.html',
			upload_dir: escape(opts['upload_dir'])
			});	
	 	}
	});
}


function bindRemoveItem(options){
var defaults = {'container' : null};
var opts = $.extend(defaults, options);
	if(opts['container'] != null)opts['container'].find('.ui-icon-close').unbind().bind('click', function(){$(this).parent().remove();});
}


function _log(object){
console.log(object);
}