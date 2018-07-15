define([], function() {
    function ProductAreaService(params) {
	
    }
 
	ProductAreaService.prototype.getProductAreas = function(productAreaId, successCallback, errorCallback) {
		urlString = "http://localhost:5000/product-area/GET";
		
		if(productAreaId) {
			urlString += "?id=" + productAreaId;
		}
		
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			cache: true,
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
 
    return ProductAreaService;
});