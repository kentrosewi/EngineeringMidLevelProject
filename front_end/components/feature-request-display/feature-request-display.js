define([
	'knockout', 
	'pubsub', 
	'text!./feature-request-display.html'
	], function(
		ko, 
		pubsub, 
		htmlString
		) {
    function FeatureRequestDisplayViewModel(params) {
		var self = this;		

		
    }
 
    return { viewModel: FeatureRequestDisplayViewModel, template: htmlString };
});