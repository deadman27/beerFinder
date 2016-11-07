angular.module('examplesApp').controller('MapsController', ['$scope','$http', 'AddressGeocoder', function ($scope, $http, AddressGeocoder) {

	//Filtres
	$scope.example1model = []; 
	$scope.example1data = [ {id: 1, label: "23h", type: "Horaires"}
						, {id: 2, label: "00H", type: "Horaires"}
						, {id: 3, label: "01h", type: "Horaires"}
						, {id: 4, label: "02h", type: "Horaires"}
						, {id: 5, label: "03h", type: "Horaires"}
						, {id: 6, label: "Happy Hours", type: "Critères"}
						, {id: 7, label: "Terrasse", type: "Critères"}
						, {id: 8, label: "500m", type: "Distance"}
						, {id: 9, label: "1km", type: "Distance"}
						, {id: 10, label: "3km", type: "Distance"}
						, {id: 11, label: "5km", type: "Distance"}
						];
						
	$scope.example2model = []; 
	$scope.example2data = [ {id: 1, label: "Blonde", type: "Style"}
						, {id: 2, label: "Brune", type: "Style"}
						, {id: 3, label: "Blanche", type: "Style"}
						, {id: 4, label: "Ambrée", type: "Style"}
						, {id: 5, label: "Rousse", type: "Style"}
						, {id: 6, label: "Rousse", type: "Style"}
						, {id: 7, label: "Belge", type: "Origine"}
						, {id: 8, label: "Française", type: "Origine"}
						, {id: 9, label: "Allemande", type: "Origine"}
						, {id: 10, label: "Américaine", type: "Origine"}
						, {id: 11, label: "500m", type: "Distance"}
						, {id: 12, label: "1km", type: "Distance"}
						, {id: 13, label: "3km", type: "Distance"}
						, {id: 14, label: "5km", type: "Distance"}
						];

	$scope.example7settings = {externalIdProp: ''};
						
    // Default address
    $scope.address = "";

    // Default map code
    $scope.map = {
        center: {
            latitude: 45,
            longitude: 4
        },
        zoom: 5
    };
	
	$scope.markers=[];
	
	$scope.monMarker = {
      id: 0,
      coords: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      options: { draggable: true },

    };
	
	//$scope.markers.push($scope.monMarker);

    $scope.findAddress = function () {
		document.getElementById("log").innerHTML = JSON.stringify($scope.example1model);

        AddressGeocoder.getLocation($scope.address).then(function (result) {

            if (result.success) {

                $scope.map.center = result.location;

            }

        });
    };
	
	$scope.findAddress2 = function () {
		
	//document.getElementById('log').value = "onch";

	AddressGeocoder.getLocation($scope.address).then(function (result) {

		if (result.success) {

			$scope.map.center = result.location;

		}

	});
    };
	
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	
	function success(pos) {
		var crd = pos.coords;
	  
		$scope.map.center.latitude = crd.latitude;
		$scope.map.center.longitude = crd.longitude;
		$scope.map.zoom = 17;

		$scope.$apply();
	  
	  //console.log('Your current position is:');
	  //console.log('Latitude : ' + crd.latitude);
	  //console.log('Longitude: ' + crd.longitude);
	  //console.log('More or less ' + crd.accuracy + ' meters.');
	};

	function error(err) {
	  console.warn('ERROR(' + err.code + '): ' + err.message);
	};
	
	$scope.findMe = function () {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/bars'
		}).then(function successCallback(response) {
			//document.getElementById('log').innerHTML = JSON.stringify(response.data);
			var monMarker;
			
			for (var i = 0; i < response.data.length; i++){
				var bar = response.data[i];
				//alert(bar.idbar);
				monMarker = {
					id: bar.idbar,
					coords: {
						latitude: bar.latitude,
						longitude: bar.longitude
					},
				};
				$scope.markers.push(monMarker);
			}
			
			//document.getElementById('log').innerHTML = JSON.stringify($scope.markers);
	
			
			// this callback will be called asynchronously
			// when the response is available
		}, function errorCallback(response) {
			alert('erreur');
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
		
		navigator.geolocation.getCurrentPosition(success, error, options);
    };
	
	
	$scope.showBar = function () {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/bars'
		}).then(function successCallback(response) {
			//document.getElementById('log').innerHTML = JSON.stringify(response.data);
			var monMarker;
			
			for (var i = 0; i < response.data.length; i++){
				var bar = response.data[i];
				//alert(bar.idbar);
				monMarker = {
					id: bar.idbar,
					coords: {
						latitude: bar.latitude,
						longitude: bar.longitude
					},
				};
				$scope.markers.push(monMarker);
			}
			
			//document.getElementById('log').innerHTML = JSON.stringify($scope.markers);
	
			
			// this callback will be called asynchronously
			// when the response is available
		}, function errorCallback(response) {
			alert('erreur');
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
		
		
    };
	

	}]);
