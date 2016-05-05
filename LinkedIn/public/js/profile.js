/**
 * New node file
 */
"use strict";
	function displayEducation($scope,$http,$location)
 	{	
 			$http({
 		
			method:'GET',
			url:'/displayEdu'
			}).success(function(response){
				$scope.schools = response;
				
			}).error(function(error)
					{//alert("in error");
				});
 			$scope.saveEduInfo= function()
 			{	
 				$http({
	            method: 'POST',
	            url: '/addEducation',
	            data: { "school": $scope.school, "dateFrom": $scope.dateFrom,"dateTill": $scope.dateTill,
	            	"fieldOfStudy": $scope.fieldOfStudy,"grade": $scope.grade,
	            	"activities": $scope.activities,"description": $scope.description}
	            
	         }).success(function(response){
	        	 
	        	 $http({
	        	 	method:'GET',
	     			url:'/displayEdu'
	     			}).success(function(response){
	     				$scope.schools = response;
	     				
	     			}).error(function(error)
	     					{//alert("in error");
	     				});
	        	 
	         }).error(function(response)
	         {
 				
	         });
 			};
 			$scope.editEdu= function(x)
 			{	
 				$http({
	            method: 'PUT',
	            url: '/editEducation',
	            data: { "id":x.id,"school": x.school, "dateFrom": x.dateFrom,"dateTill": x.dateTill,
	            	"fieldOfStudy": x.fieldOfStudy,"grade": x.grade,
	            	"activities": x.activities,"description": x.description}
	            
	         }).success(function(response){
	        	 
	        	 $http({
	        	 	method:'POST',
	     			url:'/displayEdu'
	     			
	     			}).success(function(response){
	     				$scope.schools = response;
	     				
	     			}).error(function(error)
	     					{//alert("in error");
	     				});
	        	 
	         }).error(function(response)
	         {
 				
	         });
 			};
 			
 			
 	}
 	function displayExperience($scope,$http)
    	{
    		
    		$http({
    			method :'GET',
    			url : '/displayExperience'
    		}).success(function(response){
    			//alert("in success exp");
    			$scope.experiences = response;
    		}).error(function(response){
    			//alert("error");
    		});
    	$scope.saveExpInfo= function()
			{
				$http({
            method: 'POST',
            url: '/addExperience',
            data: { "title": $scope.title, "dateFrom": $scope.dateFrom,"dateTill": $scope.dateTill,
            	"companyName": $scope.companyName,"location": $scope.location,
            	"summary": $scope.summary,"description": $scope.description}
            
         }).success(function(response){
        	
        	 $http({
        	 	method:'GET',
     			url:'/displayExperience'
     			}).success(function(response){
     				$scope.experiences = response;
     				
     			}).error(function(error)
     					{//alert("in error");
     				});
        	 
	         }).error(function(response)
	         {
					
	         });
			};
			$scope.editExp= function(x)
 			{	
 				$http({
	            method: 'PUT',
	            url: '/editExperience',
	            data: { "id":x.id,"title": x.title, "dateFrom": x.dateFrom,"dateTill": x.dateTill,
	            	"companyName": x.companyName,"location": x.location,
	            	"summary": x.summary,"description": x.description}
	            
	         }).success(function(response){
	        	 
	        	 $http({
	        	 	method:'GET',
	     			url:'/displayExperience'
	     			
	     			}).success(function(response){
	     				$scope.experiences = response;
	     				
	     			}).error(function(error)
	     					{//alert("in error");
	     				});
	        	 
	         }).error(function(response)
	         {
 				
	         });
 			};
    		
    	}
 	function displaySummary($scope,$http)
    	{
    		
    		$http({
    			method :'GET',
    			url : '/displaySummary'
    			
    		}).success(function(response){
    			//alert("in success exp");
    			$scope.summarys = response;
    		}).error(function(response){
    			//alert("error");
    		});
    		$scope.saveSummary= function()
			{	
				$http({
            method: 'POST',
            url: '/addSummary',
            data: { "summary": $scope.summary}
            
         }).success(function(response){
        	 
        	 $http({
        	 	method:'GET',
     			url:'/displaySummary'
     			}).success(function(response){
     				$scope.summarys = response;
     				
     			}).error(function(error)
     					{//alert("in error");
     				});
        	 
	         }).error(function(response)
	         {
					
	         });
			};
			
			$scope.editSum= function(x)
 			{	
 				$http({
	            method: 'PUT',
	            url: '/editSummary',
	            data: { "summary":x.summary,"id":x.id}
	            
	         }).success(function(response){
	        	 
	        	 $http({
	        	 	method:'GET',
	     			url:'/displaySummary'
	     			
	     			}).success(function(response){
	     				$scope.summarys = response;
	     				
	     			}).error(function(error)
	     					{//alert("in error");
	     				});
	        	 
	         }).error(function(response)
	         {
 				
	         });
 			};
    		
    	}
 	
 	function logoutController($scope,$http)
 	{
 		$scope.logout= function()
 		{
 			$http({
			method :'GET',
			url : '/logout'
			
		}).success(function(response){
			window.location = '/';
		}).error(function(response){
			//alert("error");
		});
 			
 		};
 				
 	}
 	
 	function displayDetail($scope,$http)
 	{
 		
		$http({
			method :'GET',
			url : '/displayDetail'
			
		}).success(function(response){
			//alert("in success exp");
			$scope.user = response;
		}).error(function(response){
			//alert("error");
		});
		$scope.editDetail= function(x)
			{	
				$http({
            method: 'PUT',
            url: '/editDetail',
            data: { "firstName":x.firstName,"country":x.country,"lastName":x.lastName,"city":x.city,"schoolOrCompany":x.schoolOrCompany,"role":x.role}
            
         }).success(function(response){
        	 
        	 $http({
        	 	method:'GET',
     			url:'/displayDetail'
     			
     			}).success(function(response){
     				$scope.user = response;
     				
     			}).error(function(error)
     					{//alert("in error");
     				});
        	 
         }).error(function(response)
         {
				
         });
			};
 	}
			function displayInvitations($scope,$http)
			{	
				$http({
					method :'GET',
					url : '/showInvites'
					
				}).success(function(response){
					//alert("in success exp");
					$scope.invites = response;
				}).error(function(response){
					//alert("error");
				});
				$scope.accept=function(x)
				{	
					$http({
						method:'PUT',
						url:'/acceptInvite',
						data:{"id":x.id}
					}).success(function(response){
						
					}).error(function(response){
						
					});
					
				};
 		
			}
			
			function displaySkill($scope,$http)
			{	
				$http({
					method :'GET',
					url : '/displaySkills'
					
				}).success(function(response){
					//alert("in success exp");
					$scope.skills = response;
				}).error(function(response){
					//alert("error");
				});
				$scope.saveSkill=function()
				{	
					$http({
						method:'POST',
						url:'/addSkill',
						data:{"skill":$scope.skill}
					}).success(function(response){
						$http({
							method :'GET',
							url : '/displaySkills'
							
						}).success(function(response){
							//alert("in success exp");
							$scope.skills = response;
						}).error(function(response){
							//alert("error");
						});
					}).error(function(response){
						
					});
				};
					$scope.editSkill=function(x)
					{	
						$http({
							method:'PUT',
							url:'/editSkill',
							data:{"skill":x.skill,"id":x.id}
						}).success(function(response){
							$http({
								method :'GET',
								url : '/displaySkills'
								
							}).success(function(response){
								//alert("in success exp");
								$scope.skills = response;
							}).error(function(response){
								//alert("error");
							});
						}).error(function(response){
							
						});
										
				};
 		
			}
 	
 	function displayConnections($scope,$http)
 	{
 		
 		$http({
 			method:'GET',
 			url :'/showMyConnections'
 			
 		}).success(function(response){
 			$scope.connections = response;
 			
 		}).error(function(response){
 			
 		});
 		
 	}
 	function searchController($scope,$http)
 	{
 		
 		alert("in search");
 		$scope.search = function()
 		{	alert(" searching");
 			$http({
 				method:'POST',
 				url:'/searchMember',
 				data:{"searchText":$scope.searchText}
 			}).success(function(response){
 				var res = response;
 				alert(JSON.stringify(response));
 				$http({
 					method:'GET',
 					url:'/displayMembers'
 				}).success(function(response){
 					$scope.members = res;				
 				}).error(function(response){
 					
 				});
 				
 				
 			}).error(function(response){
 				
 			});
 			
 		};
 		
 	}