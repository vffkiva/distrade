$(document).ready(function(){

  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

actionInitTags({});
actionCycleProduct({'container' : $('.product').parents('.section-cell'), 'action' : 'init'});

	$.each($('.product-navigation .link'), function(item, index){
		$(this).unbind().bind('click', function(){
			if($(this).attr('pid') == 'list')link = '?_page=264';
			else link = '?_product='+$(this).attr('pid');
		window.location.href=link;
		});
	
	});

	
	$.each($('.product-image'), function(item, index){actionLoadImage({'object' : $(this)});});
	
});



function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

function actionInitTags(options){
var defaults = {'container' : $('#id-products > .filter')};
var opts = $.extend(defaults, options);

opts['container'].find('input[name="Tags"]').bind('click focus', function(){$(this).css({'color' : 'rgb(100,100,100)'}).val('');});
opts['container'].find('input[name="Tags"]').bind('blur', function(){$(this).css({'color' : 'rgb(220,220,220)'}).val(tr({'var' : 'STR_TAGS'}));});
opts['container'].find('#id-tags .ui-icon-close').bind('click', function(){$(this).parent().remove();});
			
			opts['container'].find('input[name="Tags"]').bind('keyup', function(event){
				if(event.keyCode == 13){
				actionSetTag({'target' : opts['container'].find('#id-tags'), 'value' : $(this).val()});
				$(this).val('');
				}
			});

			opts['container'].find('#id-tags').parent().bind('click', function(){
			$(this).find('input').focus();
			});
			
			opts['container'].find('input[name="Tags"]').autocomplete({
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


}



function actionSetTag(options){
var defaults = {'target' : null, 'value' : '', 'unique' : true};
var opts = $.extend(defaults, options);
var add = true;
	if(opts['target'] != null && opts['value'] != ''){
	//opts['value'] = opts['value'].replace(/[^\w\s]/gi, '');
	//console.log(opts['value']);
	var item = $('<div class="message-item ui-accordion-header ui-state-default ui-corner-all" style="display:inline-block; height:18px;"><span class="text">'+opts['value']+'</span><span class="ui-icon ui-icon-close"><!----></span></div>');
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


function actionGetProducts(options){
var defaults = {};
var opts = $.extend(defaults, options);
var container = $('#id-products');
var tags = [];
var data = container.find('form').serializeJSON();
data['action'] = 'actionGetProducts';
data['opt_no_gluten'] = 0;
data['opt_no_milk'] = 0;
data['opt_no_eggs'] = 0;
data['opt_no_sugar'] = 0;
data['opt_no_sugar_all'] = 0;
data['opt_bio'] = 0;
data['opt_vegan'] = 0;

    $.each(container.find('.sicon'), function(){
        if($(this).hasClass('active'))data[$(this).attr('data-value')] = 1;
    });


	$.each(container.find('#id-tags > .message-item'), function(index, item){
	tags.push($(this).find('span.text').html());
	});

data['Tags'] = tags.join(',');

	$.ajax({
	data: data,
	success: function(out){
			if(out['products']['html'] != ''){
			
			$(container).find('.products').html('').append($(out['products']['html']));
			
				$(container).find('tr[id^="id-channelRow"]').bind('mouseenter', function(){
				$(this).css({'background-color' : 'rgb(240,240,240)', 'cursor' : 'pointer'});
				});

				$(container).find('tr[id^="id-channelRow"]').bind('mouseleave', function(){
				$(this).css({'background-color' : ''});
				});
				
				$(container).find('tr[id^="id-channelRow"]').bind('click', function(){
				window.location.href='?_product='+$(this).find('td:first > span').html();
				});
			
				$.each($(container).find('.product-image'), function(item, index) {
				
				//actionLoadImage({'object' : $('#id-channelRow_1').find('img.product-image')});
				actionLoadImage({'object' : $(this)});
				});
			
			
			}
			else $(container).find('.products').html(tr({'var' : 'NO_RESULTS_FOUND'}));
			if(out['products']['pager'] != ''){
			$(container).find('.pager').html('').append(out['products']['pager']);
			actionMakePageNumbers({'rows' : out['products']['per_page'], 'total' : out['products']['total']});
			
			$(container).find('.products').css({'height' : ((parseInt(out['products']['per_page'])+1) * 35)+'px'});
			}
			
		}
	});
}


//$(function() {
//actionMakePageNumbers({'rows' : <?php echo $Data['rows'];?>, 'total' : <?php echo $Data['total_rows'];?>});
//});

function actionMakePageNumbers(options){
var defaults = {'rows' : 8, 'total' : 0, 'start' : 1, 'end' : 8};
var opts = $.extend(defaults, options);
var container = $('.channels-pages');
	if(opts['total'] > 0){
	var pages = $(container).find('span');
	var rows = $('tr[id^="id-channelRow_"]');

		$.each($(pages), function(key,value) {
			$(this).unbind().bind('click', function(){
			var page = $(this).html();
			var show_objects = [];
			opts['start'] = parseInt(page) * parseInt(opts['rows']) - parseInt(opts['rows']) + 1;
			opts['end'] = opts['start'] + parseInt(opts['rows']) - 1;
			$(pages).removeClass('selected');
			$(this).addClass('selected');
				for(i = opts['start']; i <= opts['end']; i++)show_objects[show_objects.length] = 'tr[id="id-channelRow_'+i+'"]';

			$(rows).hide();
			$(show_objects.join(',')).show();
			});
		});
	}
}



function actionGetOneProduct(options){
var defaults = {'pid' : null};
var opts = $.extend(defaults, options);
var container = $('#id-productHtml');
	if(opts['pid'] == null) return;

	$.ajax({
	data: {'product_id' : opts['pid'], 'action' : 'actionGetOneProduct'},
		success: function(out){
			if(out['product']['html'] != ''){
			$(container).html(out['product']['html']);
			actionLoadImage({'object' : $(container).find('.product-item .image img')});
			$(container).find('.product-item .image a').fancybox({});
			}
			
			$('.product-navigation>.left, .product-navigation>.right').html('');
			if(out['product']['left'] != ''){
			var left = $(out['product']['left']).unbind().bind('click', function(){actionGetOneProduct({'pid' : $(this).attr('pid')});});
			$('.product-navigation>.left').append(left);
			}
			if(out['product']['right'] != ''){
			var right = $(out['product']['right']).unbind().bind('click', function(){actionGetOneProduct({'pid' : $(this).attr('pid')});});
			$('.product-navigation>.right').append(right);
			}			
		}	
	});
}


function actionCycleProduct(options){
var defaults = {'container' : null, 'left' : null, 'right' : '', 'next' : null, 'direction' : 'right', 'action' : 'cycle'};
var opts = $.extend(defaults, options);
var current = left = right = new_current = '';
var elements = [];
	if(opts['container'] == null || opts['container'].length == 0)return;


current = opts['container'].find('.product-current').html();
elements = opts['container'].find('.product-rotate-item');


	if(elements.length > 1){
		$.each(elements, function(index, item){
		var pid = $(this).attr('pid');
			if(pid == current){
				opts['left'] = (index == 0) ? elements[elements.length - 1] : elements[index-1];
				opts['right'] = (index == (elements.length-1)) ? elements[0] : elements[index+1];
				opts['next'] = (opts['direction'] == 'right') ? opts['right'] : opts['left'];
				new_current = $(opts['next']).attr('pid');
			return false;
			}
		});
	
		if(opts['action'] == 'cycle'){
		opts['container'].find('.product-current').html(new_current);
		opts['container'].find('.navigation>.action-button').removeAttr('onclick').unbind().bind('click', function(){window.location='?_product='+new_current;});
		
			$.each(opts['container'].find('.product td>span'), function(index, item){
				$(this).fadeTo(200,0.0, function(){
					if($(this).hasClass('manufacturer'))$(this).html($(opts['next']).find('span.manufacturer').html());
					if($(this).hasClass('name'))$(this).html($(opts['next']).find('span.name').html());
					if($(this).hasClass('weight'))$(this).html($(opts['next']).find('span.weight').html());
					if($(this).hasClass('description')){
					$(this).html($(opts['next']).find('span.description').html());
					$(this).find('.product-picture>a').fancybox({});
					}
				$(this).fadeTo(200,1.0);
				});
			});
		}
		
		if(opts['action'] == 'init'){
		var link_left = $('<span class="product-link-left"/>');
		var link_right = $('<span class="product-link-right"/>');
		$(link_left).bind('click', function(){actionCycleProduct({'container' : opts['container'], 'direction' : 'left'});});
		$(link_right).bind('click', function(){actionCycleProduct({'container' : opts['container'], 'direction' : 'right'});});
		opts['container'].find('.title').append($(link_left));
		opts['container'].find('.title').append($(link_right));
		
		opts['container'].find('.product-picture>a').fancybox({});
		}
	}


}
