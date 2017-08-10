	function showPic(whichpic) {
		var source = whichpic.getAttribute("href");
		var placeholder = document.getElementById("placeholder");
		placeholder.setAttribute("src",source);
	// 	var text = whichpic.getAttribute("title");
	// 	var description = whichpic.getElementById("description");
	// 	description.firstChild.nodeValue = text;
	}

/*function showPic(whichpic){
	if (!document.getElementById("placeholder")) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	if (placeholder.nodeName != "IMG") return false;
	placeholder.setAttribute("src",source);

	if (document.getElementById("description")) {
		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : " ";
		var description = whichpic.getElementById("description");
		if (description.firstChild.nodeType==3) {
			description.firstChild.nodeValue = text;
		}
	}
	return false;
}*/
