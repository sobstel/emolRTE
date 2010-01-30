/**
 * emolrte 0.1 jQuery plugin
 * EVen MOre Lightweight Rich Text Editor 
 * Inspired by Batiste Bieler's jQuery RTE plugin.
 * 
 * Copyright (c) 2007 Przemek Sobstel (http://sobstel.org)
 * Distributed under the New BSD license.
 * Default icons by Mark James (http://www.famfamfam.com/)
 *
 * Settings :
 * - cssFile - css file for RTE
 * - prefix  - iframe id, toolbar class (default: rtelite-)
 * - icons - path to icons dir (default: 'icons/')
 */

(function($){

	$.fn.emolrte = function(settings){

		settings = $.extend({
			tools: {},
			prefix: 'emolrte-',
			icons: 'icons/'
		}, settings);

	    if(document.designMode || document.contentEditable){
	        $(this).each(function(){	
				if (this.tagName == 'TEXTAREA'){			
					var $textarea = $(this);
					var $rte = createRte($textarea);
					enableRte($rte, $textarea);
				}
	        });
	    }

		function createRte($textarea){
	        var rte = document.createElement('iframe');			
	        rte.frameBorder=0;
	        rte.frameMargin=0;
	        rte.framePadding=0;
			rte.className=settings.prefix+'iframe';
	        $textarea.before(rte);
	        var head = "";
	        if (settings.cssFile){
	            var head = "<link type='text/css' rel='stylesheet' href='"+settings.cssFile+"' />"
			}
	        var body = $textarea.val();  
	        if ($.trim(body)==''){ // Mozilla need this to display caret
	            body = '<br>';
			}
	        var doc = "<html><head>"+head+"</head><body class='frameBody'>"+body+"</body></html>";
			rte.contentWindow.document.open();
	        rte.contentWindow.document.write(doc);
	        rte.contentWindow.document.close();			
			rte.contentWindow.document.designMode = 'On';
			$rte = $(rte);
			$rte.width($textarea.width());
			$rte.hide();
			return $rte;
		}
		    
	    function enableRte($rte, $textarea){
			$textarea.hide();			
			addToolbar($rte, $textarea);
	        $rte.show();
	    }
	   		    
	    function addToolbar($rte, $textarea){
			var rte = $rte.get(0);
		
			var $toolbar = $('<div class="'+settings.prefix+'toolbar"></div>');
			$toolbar.width($rte.width());
			$rte.before($toolbar);
			
			for (var i in settings.tools){								
				(function(){
					var tool = settings.tools[i];					
				
					// icon, class
					tool = $.extend({
						className: i,
						desc: i,
						icon: i+'.png'					
					}, tool);
													
					// auto exec
					if (typeof tool.exec == 'string'){	
						var cmd = tool.exec;
						var cmdOpt = tool.execOpt;						
						tool.exec = function(rte){
							emolrteExecCommand(rte, cmd, cmdOpt);
						}
					}
					
					var $link = $('<a href="#" class="'+tool.className+'" title="'+tool.desc+'"><img src="'+settings.icons+tool.icon+'" alt="'+tool.desc+'" /></a>');
					$toolbar.append($link);
					
					$link.click(function(){
						tool.exec(rte, $textarea);
						return false;
					});
				})();
			}

			$(rte).parents('form').submit(function(){ // update textarea before submitting form
				if ($textarea.css('display') == 'none'){ // update only if rte is turn on (and textarea off)
		            emolrteUpdateTextarea(rte, $textarea);
		        }
			});
	    }
	}
	
})(jQuery);

function emolrteExecCommand(rte, cmd, option){
	rte.contentWindow.focus();
	rte.contentWindow.document.execCommand(cmd, false, option);
	rte.contentWindow.focus();
}

function emolrteUpdateRte(rte, $textarea){
	rte.contentWindow.document.getElementsByTagName("body")[0].innerHTML = $textarea.val();
}

function emolrteUpdateTextarea(rte, $textarea){
	$textarea.val(rte.contentWindow.document.getElementsByTagName("body")[0].innerHTML);
}
