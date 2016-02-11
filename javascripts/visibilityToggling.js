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

