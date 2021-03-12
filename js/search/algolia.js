var AlgoliaSearch,SearchService="";!function(a){SearchService=function(e){var t=this;t.config=a.extend({per_page:10,selectors:{body:"body",form:".u-search-form",input:".u-search-input",container:"#u-search",modal:"#u-search .modal",modal_body:"#u-search .modal-body",modal_footer:"#u-search .modal-footer",modal_overlay:"#u-search .modal-overlay",modal_results:"#u-search .modal-results",modal_metadata:"#u-search .modal-metadata",modal_error:"#u-search .modal-error",modal_loading_bar:"#u-search .modal-loading-bar",modal_ajax_content:"#u-search .modal-ajax-content",modal_logo:"#u-search .modal-footer .logo",btn_close:"#u-search .btn-close",btn_next:"#u-search .btn-next",btn_prev:"#u-search .btn-prev"},brands:{hexo:{logo:"",url:""},google:{logo:"google.svg",url:"https://cse.google.com"},algolia:{logo:"algolia.svg",url:"https://www.algolia.com"},baidu:{logo:"baidu.svg",url:"http://zn.baidu.com/cse/home/index"},azure:{logo:"azure.svg",url:"https://azure.microsoft.com/en-us/services/search/"}},imagePath:"https://cdn.jsdelivr.net/gh/volantis-x/cdn-volantis@master/img/logo/"},e),t.dom={},t.percentLoaded=0,t.open=!1,t.queryText="",t.nav={next:-1,prev:-1,total:0,current:1},t.parseSelectors=function(){for(var o in t.config.selectors)t.dom[o]=a(t.config.selectors[o])},t.beforeQuery=function(){t.open||t.dom.container.fadeIn(),t.dom.input.each((function(o,e){a(e).val(t.queryText)})),document.activeElement.blur(),t.dom.modal_error.hide(),t.dom.modal_ajax_content.removeClass("loaded"),t.startLoading()},t.afterQuery=function(){t.dom.modal_body.scrollTop(0),t.dom.modal_ajax_content.addClass("loaded"),t.stopLoading()},t.search=function(a,o){t.beforeQuery(),t.search instanceof Function?t.query(t.queryText,a,(function(){t.afterQuery()})):(console.log("query() does not exist."),t.onQueryError(t.queryText,""),t.afterQuery())},t.onQueryError=function(a,o){var e="";e="success"===o?'No result found for "'+a+'".':"timeout"===o?"Unfortunate timeout.":"Mysterious failure.",t.dom.modal_results.html(""),t.dom.modal_error.html(e),t.dom.modal_error.show()},t.nextPage=function(){-1!==t.nav.next&&t.search(t.nav.next)},t.prevPage=function(){-1!==t.nav.prev&&t.search(t.nav.prev)},t.getUrlRelativePath=function(a){var o=a.split("//"),e=o[1].indexOf("/"),t=o[1].substring(e);return-1!=t.indexOf("?")&&(t=t.split("?")[0]),t},t.buildResult=function(a,o,e){var n="";return n="<li>",n+="<a class='result' href='"+t.getUrlRelativePath(a)+"'>",n+="<span class='title'>"+o+"</span>",""!==e&&(n+="<span class='digest'>"+e+"</span>"),n+="</a>",n+="</li>"},t.close=function(){t.open=!1,t.dom.container.fadeOut(),t.dom.body.removeClass("modal-active")},t.onSubmit=function(o){o.preventDefault(),t.queryText=a(this).find(".u-search-input").val(),t.queryText&&t.search(1)},t.startLoading=function(){t.dom.modal_loading_bar.show(),t.loadingTimer=setInterval((function(){t.percentLoaded=Math.min(t.percentLoaded+5,95),t.dom.modal_loading_bar.css("width",t.percentLoaded+"%")}),100)},t.stopLoading=function(){clearInterval(t.loadingTimer),t.dom.modal_loading_bar.css("width","100%"),t.dom.modal_loading_bar.fadeOut(),setTimeout((function(){t.percentLoaded=0,t.dom.modal_loading_bar.css("width","0%")}),300)},t.addLogo=function(a){var o="";t.config.brands[a]&&t.config.brands[a].logo&&(o+="<a href='"+t.config.brands[a].url+"' class='"+a+"'>",o+='<img src="'+t.config.imagePath+t.config.brands[a].logo+'" />',o+="</a>",t.dom.modal_logo.html(o))},t.destroy=function(){t.dom.form.each((function(o,e){a(e).off("submit")})),t.dom.modal_overlay.off("click"),t.dom.btn_close.off("click"),t.dom.btn_next.off("click"),t.dom.btn_prev.off("click"),t.dom.container.remove()},t.init=function(){a("body").append(o),t.parseSelectors(),t.dom.modal_footer.show(),t.dom.form.each((function(o,e){a(e).on("submit",t.onSubmit)})),t.dom.modal_overlay.on("click",t.close),t.dom.btn_close.on("click",t.close),t.dom.btn_next.on("click",t.nextPage),t.dom.btn_prev.on("click",t.prevPage)},t.init()};var o='<div id="u-search"><div class="modal"> <header class="modal-header" class="clearfix"><form id="u-search-modal-form" class="u-search-form" name="uSearchModalForm"> <input type="text" id="u-search-modal-input" class="u-search-input" /> <button type="submit" id="u-search-modal-btn-submit" class="u-search-btn-submit"> <span class="fas fa-search"></span> </button></form> <a class="btn-close"> <span class="fas fa-times"></span> </a><div class="modal-loading"><div class="modal-loading-bar"></div></div> </header> <main class="modal-body"><ul class="modal-results modal-ajax-content"></ul> </main> <footer class="modal-footer clearfix"><div class="modal-metadata modal-ajax-content"> <strong class="range"></strong> of <strong class="total"></strong></div><div class="modal-error"></div> <div class="logo"></div> <a class="nav btn-next modal-ajax-content"> <span class="text">NEXT</span> <span class="fad fa-chevron-right"></span> </a> <a class="nav btn-prev modal-ajax-content"> <span class="fad fa-chevron-left"></span> <span class="text">PREV</span> </a> </footer></div><div class="modal-overlay"></div></div>'}(jQuery),function(a){"use strict";AlgoliaSearch=function(o){SearchService.apply(this,arguments);var e=this,t="https://"+e.config.appId+"-dsn.algolia.net/1/indexes/"+e.config.indexName;return e.addLogo("algolia"),e.buildResultList=function(o){var t="";return a.each(o,(function(a,o){var n=o.permalink||o.path||"";!o.permalink&&o.path&&(n=ROOT+n);var r=o.title;t+=e.buildResult(n,r,"",a+1)})),t+="<script>try{pjax.refresh(document.querySelector('#u-search'));document.addEventListener('pjax:send',function(){$('#u-search').fadeOut(500);$('body').removeClass('modal-active')});}catch(e){$('#u-search').fadeOut(500);}<\/script>"},e.buildMetadata=function(a){e.nav.current=a.page*a.hitsPerPage+1,e.nav.currentCount=a.hits.length,e.nav.total=parseInt(a.nbHits),e.dom.modal_metadata.children(".total").html(e.nav.total),e.dom.modal_metadata.children(".range").html(e.nav.current+"-"+(e.nav.current+e.nav.currentCount-1)),e.nav.total>0?e.dom.modal_metadata.show():e.dom.modal_metadata.hide(),a.page<a.nbPages-1?(e.nav.next=a.page+1+1,e.dom.btn_next.show()):(e.nav.next=-1,e.dom.btn_next.hide()),a.page>0?(e.nav.prev=a.page+1-1,e.dom.btn_prev.show()):(e.nav.prev=-1,e.dom.btn_prev.hide())},e.query=function(o,n,r){a.get(t,{query:o,page:n-1,hitsPerPage:e.config.per_page,"x-algolia-application-id":e.config.appId,"x-algolia-api-key":e.config.apiKey},(function(a,t){if("success"===t&&a.hits&&a.hits.length>0){var n=e.buildResultList(a.hits);e.dom.modal_results.html(n)}else e.onQueryError(o,t);e.buildMetadata(a),r&&r(a)}))},e}}(jQuery);