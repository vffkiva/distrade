CKEDITOR.config.toolbar_Section =
[
    { name: 'document',    items : [ 'Source','-','NewPage','DocProps','Preview','Print','-','Templates' ] },
    { name: 'clipboard',   items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
    { name: 'editing',     items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
    '/',
    { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
    { name: 'paragraph',   items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
    { name: 'links',       items : [ 'Link','Unlink','Anchor' ] },
    { name: 'insert',      items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak' ] },
    '/',
    { name: 'styles',      items : [ 'Styles','Format','Font','FontSize' ] },
    { name: 'colors',      items : [ 'TextColor','BGColor' ] },
    { name: 'tools',       items : [ 'Maximize', 'ShowBlocks',] }
];

CKEDITOR.config.toolbar_QuickEdit =
[
    { name: 'document',    items : [ 'Source','-','Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
    { name: 'editing',     items : [ 'Find','Replace','-','SelectAll' ] },
    '/',
    { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat', 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock' ] },
    '/',
    { name: 'styles',      items : [ 'Styles','Format','Font','FontSize' ] }
];

CKEDITOR.config.toolbar_Full =
[
    { name: 'document',    items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
    { name: 'clipboard',   items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
    { name: 'editing',     items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
    { name: 'forms',       items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
    '/',
    { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
    { name: 'paragraph',   items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
    { name: 'links',       items : [ 'Link','Unlink','Anchor' ] },
    { name: 'insert',      items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak' ] },
    '/',
    { name: 'styles',      items : [ 'Styles','Format','Font','FontSize' ] },
    { name: 'colors',      items : [ 'TextColor','BGColor' ] },
    { name: 'tools',       items : [ 'Maximize', 'ShowBlocks','-','About' ] }
];

CKEDITOR.config.toolbar_FontColor =
[
    { name: 'styles',      items : ['Source', 'Font','FontSize','TextColor','BGColor','Bold','Italic','Underline','Strike' ] }
];


CKEDITOR.config.height = '300px';
CKEDITOR.config.language = 'en';

CKEDITOR.config.filebrowserBrowseUrl = '/my/fm/index.html';
//CKEDITOR.config.filebrowserBrowseUrl = '/my/kcfinder/browse.php?type=files';
//CKEDITOR.config.filebrowserImageBrowseUrl = '/my/kcfinder/browse.php?type=images';
//CKEDITOR.config.filebrowserFlashBrowseUrl = '/my/kcfinder/browse.php?type=flash';
//CKEDITOR.config.filebrowserUploadUrl = '/my/kcfinder/upload.php?type=files';
//CKEDITOR.config.filebrowserImageUploadUrl = '/my/kcfinder/upload.php?type=images';
//CKEDITOR.config.filebrowserFlashUploadUrl = '/my/kcfinder/upload.php?type=flash';


CKEDITOR.stylesSet.add( 'my_styles',
[
{name:'Normal [Verdana 11px]',element:'span',styles:{'font-family' : 'Verdana', 'font-size' : '11px', 'color' : 'rgb(0,0,0)'}},
{name:'Normal [Verdana 12px]',element:'span',styles:{'font-family' : 'Verdana', 'font-size' : '12px', 'color' : 'rgb(0,0,0)'}},
{name:'Normal [Verdana 12px]',element:'span',styles:{'font-family' : 'Verdana', 'font-size' : '12px', 'color' : '#800080','line-height' : '18px'}},
{name:'News text',element:'span',styles:{'font-family' : '\'Open Sans\',sans-serif', 'font-size' : '13px', 'color' : '#666666'}},
{name:'Normal text',element:'span',styles:{'font-family' : '\'Open Sans\',sans-serif', 'font-size' : '12px', 'color' : '#666666'}},


{name:'Blue Title',element:'h3',styles:{color:'Blue'}},
{name:'Red Title',element:'h3',styles:{color:'Red'}},
{name:'Marker: Yellow',element:'span',styles:{'background-color':'Yellow'}},
{name:'Marker: Green',element:'span',styles:{'background-color':'Lime'}},
{name:'Big',element:'big'},{name:'Small',element:'small'},
{name:'Typewriter',element:'tt'},{name:'Computer Code',element:'code'},
{name:'Keyboard Phrase',element:'kbd'},{name:'Sample Text',element:'samp'},
{name:'Variable',element:'var'},
{name:'Deleted Text',element:'del'},
{name:'Inserted Text',element:'ins'},
{name:'Cited Work',element:'cite'},
{name:'Inline Quotation',element:'q'},
{name:'Language: RTL',element:'span',attributes:{dir:'rtl'}},
{name:'Language: LTR',element:'span',attributes:{dir:'ltr'}},
{name:'Image on Left',element:'img',attributes:{style:'padding: 5px; margin-right: 5px',border:'2',align:'left'}},
{name:'Image on Right',element:'img',attributes:{style:'padding: 5px; margin-left: 5px',border:'2',align:'right'}},
{name:'Borderless Table',element:'table',styles:{'border-style':'hidden','background-color':'#E6E6FA'}},
{name:'Square Bulleted List',element:'ul',styles:{'list-style-type':'square'}}
]);


CKEDITOR.config.stylesSet = 'my_styles';


CKEDITOR.config.skin = 'my';