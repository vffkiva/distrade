function menuShowHide(items,items_all){
Tmp = items.split('|');
TmpAll = items_all.split('|');

 var Action = (!$('#menuID_'+Tmp[1]).is(':visible')) ? 'show' : 'hide';

 $.each($(TmpAll), function(key, value){
 menuID = $('#menuID_'+value);
 $(menuID).hide();
 });

 if(Action == 'show'){
	$.each($(Tmp), function(key, value){
	menuID = $('#menuID_'+value);
	$(menuID).show();
	});
 }
}


function menuShowChilds(Childs){
TmpObj = getObj('mITEMS');
Tmp = TmpObj.innerHTML;
AllObj = Tmp.split('|');
AllLen = AllObj.length;

Tmp = Childs.split('::');
IDs = Tmp[0].split('|');

NextLevel = Number(Tmp[1])+1;
Len = IDs.length
CheckObj = '';

 for(i=1;i<Len;i++){
 ObjID = 'mID'+IDs[i]+'L'+NextLevel;
 TmpObj = document.getElementById(ObjID);
  if(TmpObj){CheckObj=TmpObj;break;}
 }
 if(CheckObj.style.display==''){
  
  for(i=1;i<Len;i++){
  Str = 'mID'+IDs[i];
  StrLen = Str.length;
   for(j=0;j<AllLen;j++){ 
   Tmp = AllObj[j].split('L');
    if(Tmp[0]==Str && document.getElementById(AllObj[j])){
    Hide(AllObj[j]);
    }
   }
  }
 }
 else{
  for(i=1;i<Len;i++){
  Str = 'mID'+IDs[i]+'L'+NextLevel;
   if(document.getElementById(Str)){
   Show(Str);
   }
  }
 }

}



function getObj(obj){
error = '';
out = '';
 if(typeof obj == 'object'){
  if(obj==null)error = 'System error! Object passed as an object not found on the page';
  else out = obj;
 }
 else {
  if(document.getElementById(obj))out = document.getElementById(obj);
  else error = 'System error! Object passed as a string: "'+obj+'" not found';
 }
 if(error!=''){alert(error);return false;}
 else return out;
}

function ShowHide(element){
Tmp = element.split('|');
 for(i=0;i<Tmp.length;i++){
 element=Tmp[i];
 obj = document.getElementById(element);
  if(obj){
   if(obj.style.display=='')Hide(element);
   else Show(element);
  }
 }
}

function Show(element){
objNew = getObj(element);
objNew.style.display='';
}            

function Hide(element){
objNew = getObj(element);
objNew.style.display='none';
}


function dialogAddNode(options){
var dialog_id = 'add_node';
var buttons = {};
var button_text = tr({'var' : 'BTTN_ADD'});
var defaults = {'node_id' : '', 'redirect' : '', 'sub-action' : 'add', 'title' : '', 'width' : 600, 'height' : 400, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);
	
	if(opts['sub-action'] == 'change')button_text = tr({'var' : 'BTTN_CHANGE'});
	
buttons[button_text] = function(){
	$.ajax({
	data: 'action=actionAddNode&NodeID='+opts['node_id']+'&SubAction='+opts['sub-action']+'&'+$(this).find('form').serialize(),
	success: function(out){
			if(out['message']['type'] == 'error')actionShowMessage(out['message']);
			else {
				if(opts['redirect'] != '')window.location.href=opts['redirect'];
			}
		}
	});
};
buttons[lg.BTTN_CLOSE] = function(){$(this).dialog().remove();};


var dialog = showDialog(dialog_id,opts);
	$.ajax({
	data: {'action' : 'dialogAddNode', 'NodeID' : opts['node_id'], 'SubAction' : opts['sub-action']},
		success: function(out){
		$("#dialog-"+dialog_id).html(out['dialog']['text']);
	 	$(dialog).dialog('option', 'title', out['dialog']['title']);
	 	}
	});
}


function dialogMoveNode(options){
var dialog_id = 'move_node';
var buttons = {};
var defaults = {'node_id' : '', 'redirect' : '', 'title' : '', 'width' : 600, 'height' : 400, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);
	
buttons[lg['BTTN_MOVE_IN_LEVEL']] = function(){
	$.ajax({
	data: 'action=actionMoveNode&NodeID='+opts['node_id']+'&Mode=mode1&'+$(this).find('form').serialize(),
	success: function(out){
			if(out['message']['type'] == 'error')actionShowMessage(out['message']);
			else {
				if(opts['redirect'] != '')window.location.href=opts['redirect'];
			}
		}
	});
};
buttons[lg['BTTN_MOVE_TO_ANOTHER_LEVEL']] = function(){
	$.ajax({
	data: 'action=actionMoveNode&NodeID='+opts['node_id']+'&Mode=mode2&'+$(this).find('form').serialize(),
	success: function(out){
			if(out['message']['type'] == 'error')actionShowMessage(out['message']);
			else {
				if(opts['redirect'] != '')window.location.href=opts['redirect'];
			}
		}
	});
};

buttons[lg.BTTN_CLOSE] = function(){$(this).dialog().remove();};


var dialog = showDialog(dialog_id,opts);
	$.ajax({
	data: {'action' : 'dialogMoveNode', 'NodeID' : opts['node_id']},
		success: function(out){
		$("#dialog-"+dialog_id).html(out['dialog']['text']);
	 	$(dialog).dialog('option', 'title', out['dialog']['title']);
		$(dialog).find('.action-button').button();
		
	 	}
	});
}