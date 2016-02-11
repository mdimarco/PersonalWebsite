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
	addToggler(id+"-background-img", "#project-select", id);
	addToggler(id+"-back", id, "#project-select");
}


var sections = [
	"#square",
	"#yahoo",
	"#ibm",
	"#clinch",
	"#deepcraft",
	"#gendid"];

sections.forEach( function (each) {
	addTogglers(each);
});

