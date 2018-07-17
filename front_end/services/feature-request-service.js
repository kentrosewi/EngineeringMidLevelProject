define([], function() {
    function FeatureRequestService(params) {
	
    }
	
	FeatureRequestService.prototype.getClientFeatureRequests = function(clientId, productAreaId, successCallback, errorCallback) {
		urlString = "http://18.237.87.86:5000/feature-request/GET?";
		
		if(clientId) {
			urlString += "clientId=" + clientId + "&";
		}
		
		if(productAreaId) {
			urlString += "productAreaId=" + productAreaId;
		}		
		
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			url: encodeURI(urlString),
			crossDomain: true,
			success: function(data) {
				if(successCallback) {
					successCallback(data);
				}
			},
			error: function(data) {
				if(errorCallback) {
					errorCallback(data);
				}
			}
		});			
	};
 
	FeatureRequestService.prototype.submitNewFeatureRequest = function(newFeatureRequest, successCallback, errorCallback) {
		urlString = "http://18.237.87.86:5000/feature-request/POST?";
		//urlString = "http://18.237.87.86:5000/feature-request/POST";
		if(newFeatureRequest.title) {
			urlString += "title=" + newFeatureRequest.title + "&";
		}
		
		if(newFeatureRequest.description) {
			urlString += "description=" + newFeatureRequest.description + "&";
		}
		
		if(newFeatureRequest.target) {
			urlString += "target=" + newFeatureRequest.target + "&";
		}
		
		if(newFeatureRequest.priority) {
			urlString += "priority=" + newFeatureRequest.priority + "&";
		}
		
		if(newFeatureRequest.client_id) {
			urlString += "clientId=" + newFeatureRequest.client_id + "&";
		}
		
		if(newFeatureRequest.product_area_id) {
			urlString += "productAreaId=" + newFeatureRequest.product_area_id;
		}		
		
		// Should be a POST. Would have to update version of Python to make POST work.
		$.ajax({
			type: "GET",
			url: encodeURI(urlString),
			//url: urlString,
			contentType: "application/json; charset=utf-8",
			//data: JSON.stringify(newFeatureRequest),
			dataType: "jsonp",
			crossDomain: true,
			success: function(data) {
				if(successCallback) {
					successCallback();
				}			
			},
			error: function(data) {
				if(errorCallback) {
					errorCallback();
				}
			}
		});			
	};
	
	FeatureRequestService.prototype.deleteFeatureRequest = function(featureRequestId, successCallback, errorCallback) {

		urlString = "http://18.237.87.86:5000/feature-request/DELETE?";			
		
		if(featureRequestId) {
			urlString += "id=" + featureRequestId;
		}		
		
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			url: encodeURI(urlString),
			crossDomain: true,
			success: function(data) {
				if(successCallback) {
					successCallback();
				}
			},
			error: function(data) {
				if(errorCallback) {
					errorCallback();
				}
			}
		});			
	};
 
    return FeatureRequestService;
});