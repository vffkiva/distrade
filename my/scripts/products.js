function dialogAddProduct(options){
var dialog_id = 'add_product';
var buttons = {};

buttons[lg.BTTN_SAVE] = function(){


var opts = $.extend({'redirect' : ''},options);
var data = $(this).find('form').serializeJSON();
var pictures = $(this).find('div.gallery-picture');
var tags = $(this).find('#id-tags > .message-item');


data['action'] = 'actionAddProduct';
data['TotalPictures'] = $(pictures).length;
data['TotalLangs'] = parseInt($(this).find('[name="TotalLangs"]').val());
data['redirect'] = opts['redirect'];

	$(pictures).each( function(index,item){
 	data['Picture_'+index+'_source'] = $(this).find('.gallery-picture-image a').attr('href');
		for(i=0;i<data['TotalLangs'];i++){
		data['Picture_'+index+'_title_'+i] = $(this).find('input[name="Title_'+i+'"]').val();
		data['Picture_'+index+'_text_'+i] = $(this).find('textarea[name="Text_'+i+'"]').val();
		data['Picture_'+index+'_lang_id_'+i] = $(this).find('input[name="Lang_'+i+'"]').val();
		}
 	})
	
var tags_arr = [];
	$(tags).each( function(index,item){
	tags_arr.push($(this).find('.text').html());
	});
	data['Tags'] = tags_arr.join(',');
	
	
	$.ajax({
	data: data,
		success: function(out){
			if(out['message']['type'] == 'error')actionShowMessage(out['message']);
			else {
				if(out['redirect'] != '') window.location = out['redirect'];
			}
		}
	}); 



/*
		$.ajax({
		data: 'action=actionAddProduct&ProductID='+opts['product_id']+'&'+$(this).find('form').serialize(),
		success: function(out){
				if(out['message']['type'] == 'error')actionShowMessage(out['message']);
				else {
					if(opts['redirect'] !='')window.location.href=opts['redirect'];
				}
			}	
		});
*/
};

var defaults = {'product_id' : '', 'redirect' : '', 'title' : '', 'width' : 700, 'height' : 500, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);
buttons[lg['BTTN_CLOSE']] = function(){$(this).dialog().remove();};
var dialog = showDialog(dialog_id,opts);
	$.ajax({
	data: {'action' : 'dialogAddProduct', 'ProductID' : opts['product_id'], 'redirect' : opts['redirect']},
		success: function(out){
			$("#dialog-"+dialog_id).html(out['dialog']['text']);
			$(dialog).dialog('option', 'title', out['dialog']['title']);
			$(dialog).find('.action-button').button();
			galleryInit({'container' : '#dialog-'+dialog_id, 'img_container' : '#product-pics'});
			//var opts = $.extend({'container' : 'body', 'img_container' : '#gallery-pics'}, options);

/*
			$(dialog).find('input[name="BankAccount"]').autocomplete({
				source: function( request, response ) {
				$(dialog).find('input[name="BankAccountID"], select[name="BankAccountCurrencyID"], input[name="Company"]').val('');
					$.ajax({
					dataType: "json",
					data: ({'action' : 'actionFilterBankAccounts', 'Account' : request['term'], 'IsGlobal' : '1'}),
					success: function( data ) {response( $.map( data.accounts, function( item ) {
					return {bank_account_id: item.bank_account_id, company: item.company, currency_id: item.currency_id, currency: item.currency, label: item.label, value: item.value}}));}
					});
				},
				minLength: 3,
				select: function( event, ui ) {
					$(dialog).find('input[name="BankAccountID"]').val(ui.item.bank_account_id);
					$(dialog).find('select[name="BankAccountCurrencyID"]').val(ui.item.currency_id);
					$(dialog).find('input[name="Company"]').val(ui.item.company);
				}
			});
*/
			$(dialog).find('input[name="TagsEnter"]').bind('keyup', function(event){
				if(event.keyCode == 13){
				actionSetTag({'target' : $(dialog).find('#id-tags'), 'value' : $(this).val()});
				$(this).val('');
				}
			});

			$(dialog).find('input[name="TagsEnter"]').autocomplete({
				source: function( request, response ) {
					$.ajax({
					data: ({'action' : 'actionGetTags', 'Search' : request['term']}),
					success: function( data ) {response( $.map( data['results'], function( item ) {
					return {label: item.label, value: item.value}}));}
					});
				},
				minLength: 2,
				select: function( event, ui ) {
					//$(dialog).find('input[name="BankAccountID"]').val(ui.item.bank_account_id);
					//$(dialog).find('select[name="BankAccountCurrencyID"]').val(ui.item.currency_id);
					//$(dialog).find('input[name="Company"]').val(ui.item.company);
				}
			});

		bindRemoveItem({'container' : $(dialog).find('#id-tags')});
		
		}
	});
}


function actionSetTag(options){
var defaults = {'target' : null, 'value' : '', 'unique' : true};
var opts = $.extend(defaults, options);
var add = true;
	if(opts['target'] != null && opts['value'] != ''){
	//opts['value'] = opts['value'].replace(/[^\w\s]/gi, '');
	opts['value'] = opts['value'].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
	var item = $('<div class="message-item ui-accordion-header ui-state-default ui-corner-all"><span class="text">'+opts['value']+'</span><span class="ui-icon ui-icon-close"><!----></span></div>');
	$(item).find('.ui-icon-close').bind('click', function(){$(this).parent().remove();});

		if(opts['unique']){
			$.each(opts['target'].find('.message-item'), function(index, item){
			var text = $(this).find('.text').html();
			
				if(text == opts['value'])add = false;
			});
		}
		if(add)opts['target'].append($(item));
	}
}


function dialogAddManufacturer(options){
var dialog_id = 'add_manufacturer';
var buttons = {};

buttons[lg.BTTN_SAVE] = function(){
		$.ajax({
		data: 'action=actionAddManufacturer&ManufacturerID='+opts['manufacturer_id']+'&'+$(this).find('form').serialize(),
		success: function(out){
				if(out['message']['type'] == 'error')actionShowMessage(out['message']);
				else {
					if(opts['redirect'] !='')window.location.href=opts['redirect'];
				}
			}	
		});
};

var defaults = {'manufacturer_id' : '', 'redirect' : '', 'title' : '', 'width' : 550, 'height' : 350, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);
buttons[lg['BTTN_CLOSE']] = function(){$(this).dialog().remove();};
var dialog = showDialog(dialog_id,opts);
	$.ajax({
	data: {'action' : 'dialogAddManufacturer', 'ManufacturerID' : opts['manufacturer_id'], 'redirect' : opts['redirect']},
		success: function(out){
			$("#dialog-"+dialog_id).html(out['dialog']['text']);
			$(dialog).dialog('option', 'title', out['dialog']['title']);
		}
	});

}


function actionDeleteProduct(options){
var defaults = {'product_id' : '', 'redirect' : ''};
var opts = $.extend(defaults,options);
data = {'action' : 'actionDeleteProduct', 'redirect' : opts['redirect'], 'ProductID' : opts['product_id']};
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