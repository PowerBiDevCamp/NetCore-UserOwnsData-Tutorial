$(function(){

  // 1 - get DOM object for div that is report container 
	var reportContainer = document.getElementById("embed-container");

	// 2 - get report embedding data from view model
	var reportId = window.viewModel.reportId;
	var embedUrl = window.viewModel.embedUrl;
	var token = window.viewModel.token

	  // 3 - embed report using the Power BI JavaScript API.
	var models = window['powerbi-client'].models;
	
	var config = {
	  type: 'report',
	  id: reportId,
	  embedUrl: embedUrl,
	  accessToken: token,
	  permissions: models.Permissions.All,
	  tokenType: models.TokenType.Aad,
	  viewMode: models.ViewMode.View,
	  settings: {
		panes: {
		  filters: { expanded: false, visible: true },
		  pageNavigation: { visible: false }
		}
	  }
	};
  
	// Embed the report and display it within the div container.
	var report = powerbi.embed(reportContainer, config);
  
  // 4 - add logic to resize embed container on window resize event
  var heightBuffer = 12;
	var newHeight = $(window).height() - ($("header").height() + heightBuffer);
	$("#embed-container").height(newHeight);
	$(window).resize(function () {
	  var newHeight = $(window).height() - ($("header").height() + heightBuffer);
	  $("#embed-container").height(newHeight);
	});
  
});