define([
	'knockout',
	'../../data-objects/feature-request',
	// '../../services/feature-request-service',
	'text!./feature-request-display.html'
	], function(
		ko,
		FeatureRequest,
		// FeatureRequestService,
		htmlString
		) {
    function FeatureRequestDisplayViewModel(params) {
		var self = this;		

		self.featureRequest = new FeatureRequest(params);
		self.productAreaName = ko.observable(params.product_area_name);

		// self.featureRequestService = new FeatureRequestService();
		
		// self.deleteFeatureRequest = function() {
			// self.featureRequestService.deleteFeatureRequest(
				// self.featureRequest.id(), 
				// function(data) {
					// console.log("del success");				
				// },
				// function(data) {
					// self.alertError();
				// }
			// );
		// }
    }

    return { viewModel: FeatureRequestDisplayViewModel, template: htmlString };
});