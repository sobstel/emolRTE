/**
 * emolrte tools for emolrte 0.1
 *
 * Copyright (c) 2007 Przemek Sobstel (http://sobstel.org).
 */

var rteLiteTools = {
	bold : {
		exec: 'bold',
		desc: 'Bold'
	},
	italic : {
		exec: 'italic',
		desc: 'Italic'
	},
	underline: {
		exec: 'underline',
		desc: 'Underline'
	},
	del: {
		exec: 'strikeThrough',
		desc: 'Strike Through'
	},
	sub: {
		exec: 'subscript',
		desc: 'Subscript'
	},
	sup: {
		exec: 'superscript',
		desc: 'Superscript'
	},	
	justify_left: {
		exec: 'justifyLeft',
		desc: 'Justify Left'
	},
	justify_center: {
		exec: 'justifyCenter',
		desc: 'Justify Center'
	},
	justify_right: {
		exec: 'justifyRight',
		desc: 'Justify Right'
	},
	justify_full: {
		exec: 'justifyFull',
		desc: 'Justify Full'
	},
	ol: {
		exec: 'insertOrderedList',
		desc: 'Ordered List'
	},
	ul : {
		exec: 'insertUnorderedList',
		desc: 'Unordered List'
	},
	indent: {
		exec: 'indent',
		desc: 'Indent'
	},
	outdent: {
		exec: 'outdent',
		desc: 'Outdent'
	},	
	link: {
		exec: function(rte){
			var url = prompt("URL:");
	        if (url){			 
				emolrteExecCommand(rte, 'createLink', url);
			}
		},
		desc: 'Link'
	},
	unlink: {
		exec: 'unlink',
		desc: 'Unlink'
	},
	image: {
		exec: function(rte){
			var url = prompt("URL:");
	        if (url){			 
				emolrteExecCommand(rte, 'insertImage', url);
			}
		},
		desc: 'Link'
	},
	para : {
		exec: 'insertParagraph',
		desc: 'Paragraph'
	},	
	pre: {
		exec: 'formatBlock',
		execOpt: $.browser.msie ? '<pre>' : 'pre',
		desc: 'Preformatted'
	},	
	h1: {
		exec: 'formatBlock',
		execOpt: $.browser.msie ? '<h1>' : 'h1',
		desc: 'Heading 1'
	},
	h2: {
		exec: 'formatBlock',
		execOpt: $.browser.msie ? '<h2>' : 'h2',
		desc: 'Heading 2'
	},
	h3: {
		exec: 'formatBlock',
		execOpt: $.browser.msie ? '<h3>' : 'h3',
		desc: 'Heading 3'
	},
	h4: {
		exec: 'formatBlock',
		execOpt: $.browser.msie ? '<h4>' : 'h4',
		desc: 'Heading 4'
	},
	h5: {
		exec: 'formatBlock',
		execOpt: $.browser.msie ? '<h5>' : 'h5',
		desc: 'Heading 5'
	},
	h6: {
		exec: 'formatBlock',
		execOpt: $.browser.msie ? '<h6>' : 'h6',
		desc: 'Heading 6'
	},	
	hr: {
		exec: 'insertHorizontalRule',
		desc: 'Horizontal rule'
	},
	unformat: {
		exec: 'removeFormat',
		desc: 'Unformat'
	},
	undo: {
		exec: 'undo',
		desc: 'Undo'
	},
	redo: {
		exec: 'redo',
		desc: 'Redo'
	},
	html: {
		exec: function(rte, $textarea){
			var $rte = $(rte);
			var $toolbar = $rte.prev();
			var $tools = $('a', $toolbar);
			var $htmlTool = $('a:last', $toolbar);
			if ($textarea.css('display') == 'none'){
				emolrteUpdateTextarea(rte, $textarea);
				$tools.hide();			
				$rte.hide();		
				$htmlTool.show();
				$textarea.show();
			}else{
				emolrteUpdateRte(rte, $textarea);
				$textarea.hide();
				$tools.show();
				$rte.show();
			}
		},
		desc: 'HTML/WYSIWYG switch'
	}
}