$(function() {
	$(".object-icon").bind('mouseover mouseout',function() {
    $(this).removeClass('ui-state-hover').removeClass('ui-state-default');
  });



	$("#modules-available-top,  #modules-top").sortable({
	connectWith: ".modules-top",
	opacity: 0.5,
	handle: '.object-header',
	beforeStop: function (e, ui){
		if($(ui.item).find('.module-unique').html() == 0 && $($(ui.placeholder).parent()[0]).attr('id') != 'modules-top'){
		$(ui.item).find('.ui-icon-trash').trigger('click');
		}
	},
	helper : function (e,ui){
		tmp = $(ui).clone().addClass('modules-top');
		return tmp.appendTo('body').show();
		},
	receive: function (e,ui){
	var sourceList = 'modules-available-top', targetList = 'modules-top';
	var objectTarget = $(this);
	var object = $(ui)[0].item;
	var objectClone = $(object).clone();
		if($(objectTarget).attr('id') == targetList){
		var objectTrashIcon = $(ui)[0].item.children().find('.object-icon:nth-child(1)');
		var objectSettingsIcon = $(ui)[0].item.children().find('.object-icon:nth-child(2)');
//		var objectEditIcon = $(ui)[0].item.children().find('.object-icon:nth-child(3)');

		var trash = $('<span><!----></span>').addClass('ui-icon ui-icon-trash cursor-pointer');
		var settings = $('<span><!----></span>').addClass('ui-icon ui-icon-wrench cursor-pointer');
//		var edit = $('<span><!----></span>').addClass('ui-icon ui-icon-pencil cursor-pointer');
		
		$(trash).appendTo($(objectTrashIcon)).hide().fadeTo(1500,1.0).bind('click', function(){removeObject($(trash),sourceList);});
		$(settings).appendTo($(objectSettingsIcon)).hide().fadeTo(1500,1.0).bind('click', function(){dialogLayoutObjectSettings({'object' : $(settings)});});
//		$(edit).appendTo($(objectEditIcon)).hide().fadeTo(1500,1.0).bind('click', function(){editObject($(edit));});
		
			if($(this).find('li.object-drag')[1] != undefined){
				$($(this).find('li.object-drag')[1]).find('.ui-icon-trash').trigger('click');
			}
		
			if($(object).find('.module-unique').html() == 0){
			$('#'+sourceList).first().prepend($(objectClone).hide().fadeTo(500,1.0));
			}
		}
		else {
		$(ui)[0].item.children().find('.object-icon:nth-child(1)').children().remove();
		$(ui)[0].item.children().find('.object-icon:nth-child(2)').children().remove();
		$(ui)[0].item.children().find('.object-icon:nth-child(3)').children().remove();
		}
	},
	placeholder: "ui-state-highlight ui-corner-all"
	}).disableSelection();

	
	$("#modules-available-center,  #modules-center").sortable({
	connectWith: ".modules-center",
	opacity: 0.6,
	handle: '.object-header',
	beforeStop: function (e, ui){
		if($(ui.item).find('.module-unique').html() == 0 && $($(ui.placeholder).parent()[0]).attr('id') != 'modules-center'){
		$(ui.item).find('.ui-icon-trash').trigger('click');
		}
	},
	helper : function (e,ui){
		tmp = $(ui).clone().addClass('modules-center');
		return tmp.appendTo('body').show();
	},
	receive: function (e,ui){
	var sourceList = 'modules-available-center', targetList = 'modules-center';
	var objectTarget = $(this);
	var object = $(ui)[0].item;
	var objectClone = $(object).clone();
		if($(objectTarget).attr('id') == targetList){
		var objectTrashIcon = $(ui)[0].item.children().find('.object-icon:nth-child(1)');
		var objectSettingsIcon = $(ui)[0].item.children().find('.object-icon:nth-child(2)');
//		var objectEditIcon = $(ui)[0].item.children().find('.object-icon:nth-child(3)');
		
		var trash = $('<span><!----></span>').addClass('ui-icon ui-icon-trash cursor-pointer');
		var settings = $('<span><!----></span>').addClass('ui-icon ui-icon-wrench cursor-pointer');
//		var edit = $('<span><!----></span>').addClass('ui-icon ui-icon-pencil cursor-pointer');
		
		$(trash).appendTo($(objectTrashIcon)).hide().fadeTo(1500,1.0).bind('click', function(){removeObject($(trash),sourceList);});
		$(settings).appendTo($(objectSettingsIcon)).hide().fadeTo(1500,1.0).bind('click', function(){dialogLayoutObjectSettings({'object' : $(settings)});});
//		$(edit).appendTo($(objectEditIcon)).hide().fadeTo(1500,1.0).bind('click', function(){editObject($(edit));});
			
			if($(object).find('.module-unique').html() == 0){
			$('#'+sourceList).first().prepend($(objectClone).hide().fadeTo(500,1.0));
			}
		}
		else {
		$(ui)[0].item.children().find('.object-icon:nth-child(1)').children().remove();
		$(ui)[0].item.children().find('.object-icon:nth-child(2)').children().remove();
		$(ui)[0].item.children().find('.object-icon:nth-child(3)').children().remove();
		}
	},
	placeholder: "ui-state-highlight ui-corner-all"
	}).disableSelection();

	$("#modules-available-bottom,  #modules-bottom").sortable({
	connectWith: ".modules-bottom",
	opacity: 0.6,
	handle: '.object-header',
	beforeStop: function (e, ui){
		if($(ui.item).find('.module-unique').html() == 0 && $($(ui.placeholder).parent()[0]).attr('id') != 'modules-bottom'){
		$(ui.item).find('.ui-icon-trash').trigger('click');
		}
	},
	helper : function (e,ui){
		tmp = $(ui).clone().addClass('modules-bottom');
		return tmp.appendTo('body').show();
		},
	receive: function (e,ui){
	var sourceList = 'modules-available-bottom', targetList = 'modules-bottom';
	var objectTarget = $(this);
	var object = $(ui)[0].item;
	var objectClone = $(object).clone();
		if($(objectTarget).attr('id') == targetList){
		var objectTrashIcon = $(ui)[0].item.children().find('.object-icon:nth-child(1)');
		var objectSettingsIcon = $(ui)[0].item.children().find('.object-icon:nth-child(2)');
//		var objectEditIcon = $(ui)[0].item.children().find('.object-icon:nth-child(3)');
		
		var trash = $('<span><!----></span>').addClass('ui-icon ui-icon-trash cursor-pointer');
		var settings = $('<span><!----></span>').addClass('ui-icon ui-icon-wrench cursor-pointer');
//		var edit = $('<span><!----></span>').addClass('ui-icon ui-icon-pencil cursor-pointer');
		
		$(trash).appendTo($(objectTrashIcon)).hide().fadeTo(1500,1.0).bind('click', function(){removeObject($(trash),sourceList);});
		$(settings).appendTo($(objectSettingsIcon)).hide().fadeTo(1500,1.0).bind('click', function(){dialogLayoutObjectSettings({'object' : $(settings)});});
//		$(edit).appendTo($(objectEditIcon)).hide().fadeTo(1500,1.0).bind('click', function(){editObject($(edit));});
			

			if($(object).find('.module-unique').html() == 0){
			$('#'+sourceList).first().prepend($(objectClone).hide().fadeTo(500,1.0));
			}
		}
		else {
		$(ui)[0].item.children().find('.object-icon:nth-child(1)').children().remove();
		$(ui)[0].item.children().find('.object-icon:nth-child(2)').children().remove();
		$(ui)[0].item.children().find('.object-icon:nth-child(3)').children().remove();
		}
	},
	placeholder: "ui-state-highlight ui-corner-all"
	}).disableSelection();



$( "#layout-available-modules-top,#layout-available-modules-bottom,#layout-available-modules-center " )
.draggable({cursor: 'move',stack: '#layout-available-modules-set div',handle: '.layout-available-modules-title'})
.disableSelection()
.bind('click', function(event,item){
$('body').find('div[id^="layout-available-modules"]').css({'z-index' : 10});
$(this).css({'z-index' : 100});
});

});



function removeObject(item,target){
var object = $(item).parent().parent().parent();
var icons = $(item).parent().parent().find('.object-icon');
	$(icons).each(function () {
	$(this).children().remove();
	});
var objectClone = $(object).clone();
$(object).fadeTo(500,0.0, function(){$(this).remove()});

	if($(object).find('.module-unique').html() == 1){
	$('#'+target).first().prepend($(objectClone).hide().fadeTo(500,1.0));
	}
}



function dialogLayoutObjectSettings(options){
var defaults = {'object' : null, 'params' : '','position' : '' ,'params_arr' : '', 'params_json' : ''};
var opts = $.extend(defaults, options);
	if(opts['object'] != null){
	opts['params'] = opts['object'].parents('li').find('.object-hidden').find('.module-params').html();
	opts['position'] = opts['object'].parents('ul').attr('id').replace('modules-','');

		if(opts['params'] != ''){
		opts['params_arr'] = $.extend({'module_type' : '', 'module_id' : ''},$.parseJSON(opts['params']));
		
		var buttons = {};
		buttons[tr({'var' : 'BTTN_SAVE'})] = function(){
		var params = {
			'text' :  $(dialog).find('select[name="ObjectID"] option:selected').text(), 
			'id' : $(dialog).find('select[name="ObjectID"] option:selected').val(),
			'show_title' :  $(dialog).find('input[name="ShowTitle"]:checked').val(), 
			'show_navigation' :  $(dialog).find('input[name="ShowNavigation"]:checked').val()
			};

			if(params['id'] == ''){
			actionShowMessage({'type' : 'error', 'text' : tr({'var' : 'MSG_ERROR_SELECT_LAYOUT_MODULE_ITEM'}), 'wrap' : true});
			return;
			}
		
		opts['params'] = $.toJSON($.extend(opts['params_arr'],{'module_id' : params['id'], 'show_title' : params['show_title'], 'show_navigation' : params['show_navigation']}));
		opts['object'].parents('li').find('span.text').html(params['text']);
		opts['object'].parents('li').find('.object-hidden').find('.module-params').html(opts['params']);
		$(dialog).dialog().remove();
		};
		buttons[lg['BTTN_CLOSE']] = function(){$(this).dialog().remove();};
		var dialog_id = 'layout_object_settings';
		var dialog = showDialog(dialog_id,{'width' : 650, 'height' : 200, 'resizable' : true, 'zIndex' : 200, buttons: buttons});	
		//console.log(opts);
		$.ajax({
		data: {'action' : 'dialogLayoutObjectSettings', 'position' : opts['position'], 'params' : opts['params']},
			success: function(out){
				$("#dialog-"+dialog_id).html(out['dialog']['text']);
				$(dialog).dialog('option', 'title', out['dialog']['title']);
				}
			});
		}
	}

}



function actionSaveLayout(options){
var defaults = {'modules' : [], 'top' : {}, 'center' : {}, 'bottom' : {}};
var opts = $.extend(defaults, options);
var nr = 0;
var module = '';
	$.each($('#modules-top>li, #modules-center>li, #modules-bottom>li'), function(index, item){
	if(module != $(item).parent().attr('id')){
	nr = 0;
	module = $(item).parent().attr('id');
	}

		if($(item).hasClass('object-drag') && ((module == 'modules-top' && nr <=0) || (module == 'modules-center' && nr <=8) || (module == 'modules-bottom' && nr <=2))){
		//var params = $.parseJSON($(item).find('.object-hidden').find('.module-params').html());
		var params = $(item).find('.object-hidden').find('.module-params').html();

		opts['modules'][opts['modules'].length] = {
		'position' : module.replace('modules-',''),
		'nr' : nr,
		'params' : params,
		'text' : $(item).find('span.text').html()
		};
		}
	nr++;
	});

var data = {'action' : 'actionSaveLayout', 'data' : $.toJSON(opts['modules'])};
	$.ajax({
	data: data,
		success: function(out){
				actionShowMessage(out['message']);
		}
	});
}
