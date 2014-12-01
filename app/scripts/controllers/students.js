'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:StudentsCtrl
 * @description
 * # StudentsCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
    .controller('StudentsCtrl', function($scope, $http, $filter) {

        var orderBy = $filter('orderBy')

        $http.get('data/data.json').success(function(data) {

            $scope.students = data

            $scope.students.forEach(function(x){
            	x.name = x.info.name
            	x.advisor = x.phd.advisor
            })

        });

                
        $scope.showMilestones = true
        $scope.showPublications = false
        $scope.showCourses = false
        $scope.showAwards = false
        
        $scope.toggleShowPublications = function(){
        	$scope.showPublications = ! $scope.showPublications
        }

        $scope.toggleShowCourses = function(){
        	$scope.showCourses = ! $scope.showCourses	
        }

        $scope.toggleShowMilestones = function(){
        	$scope.showMilestones = ! $scope.showMilestones
        }

  		$scope.toggleShowAwards = function(){
        	$scope.showAwards = ! $scope.showAwards
        }        

        $scope.b = function(state){
        	if (state){
        		return 'btn-info'
        	}else{
        		return ''
            }
        };

    });