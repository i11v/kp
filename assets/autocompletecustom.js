(function(a){a.extend(Tapestry.Initializer,{customAutocomplete:function(d){var b=a("#"+d.id);if(!b.data("autocomplete")){return}var c=false;b.autocomplete({select:function(e,f){if(!c){c=true;a('a[data-key="'+f.item.value+'"]').trigger("click")}}});b.data("autocomplete")._renderItem=function(e,f){var g=fnFormatResult(f,this.element.val());return a("<li></li>").data("item.autocomplete",f).append(a("<a />").attr("data-key",f.value).click(function(){b.val(a(this).parent().data("item.autocomplete").value);b.parent().submit()}).append("<strong>"+g+"</strong>")).appendTo(e)};b.autocomplete({appendTo:b.parents("form")})}})})(jQuery);var reEscape=new RegExp("(\\"+["/",".","*","+","?","|","(",")","[","]","{","}","\\"].join("|\\")+")","g");function fnFormatResult(c,a){var b="("+a.replace(reEscape,"\\$1")+")";return c.label.replace(new RegExp(b,"gi"),"<i>$1</i>")};