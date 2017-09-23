//get the bookmarkstree
function getBookmarksTree(query) {
	var BookmarksTree = chrome.bookmarks.getTree(
		function(nodeTree){
			nodeTree.forEach(function(node){
			processNodes(node, query);
		});
	});
}

//delay keyup – execute a function after the user has stopped typing for a specified amount of time
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

// Search the bookmarks when entering the search keyword.
$(function() {
  $('#search').keyup(function() {
  		 delay(function(){
		    var userSearch = $('#search').val();
		    $('#footer').hide();
		    $('#bookmarks').empty();
		    getBookmarksTree(userSearch);
	    }, 250 );
  });
});


//process the bookmarktree nodes
function processNodes(node, query) {

if (node.id > 0) {

    if(node.children) {
     	$("#bookmarks").append('<h1 class="bookmarkFolder">' + node.title + '</h1>');
	
	}

    if(node.url && (!query || (node.title.toUpperCase().indexOf(query.toUpperCase()) > 1) )) {
    	$("#bookmarks").append('<a href="' + node.url  + '" class="bookmark">' + node.title + '</a>');
	
	}


}

   if(node.children) {
        node.children.forEach(function(child) { processNodes(child,query);});
    }

}


document.addEventListener('DOMContentLoaded', function () {
 	getBookmarksTree();
});