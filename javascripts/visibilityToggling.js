/**
 * makes clickable have hideMe hidden and showMe shown when clicked
 */
var addToggler = function (clickable, hideMe, showMe) {
	$(clickable).click( function() {
		$(hideMe).hide();
		$(showMe).show();
	});
};

var addTogglers = function (id) {
	addToggler(id+"-background-img", "#work-select", id);
	addToggler(id+"-back", id, "#work-select");
}


var sections = [
	"#square",
	"#yahoo",
	"#ibm"];

sections.forEach( function (each) {
	addTogglers(each);
});


//Personal section togglers
var sections = ['thailand', 'tesla', 'bike'];
sections.forEach(function(section) {
	$("#"+section+"-background-img").click( function() {
		var title = $("#"+section+"-background-img"+" .personal-title");
		var subText = $("#"+section+"-background-img"+" .small-text");
		var fadeTime = 400;
		if (title.css('display') === 'none') {
			subText.fadeOut(fadeTime, function() { title.fadeIn(); });
		} else {
			title.fadeOut(fadeTime, function() { subText.fadeIn(); });
		}
	})
})
