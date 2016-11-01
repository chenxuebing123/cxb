'use strict'
/**
 * @ngdoc overview
 * @name testcxbApp
 * @description
 * # testcxbApp
 *
 * Main module of the application.
 */

angular
  .module('testcxbApp', ["ui.router","ngCookies"]).constant("server","http://www.somenote.cn:1510").controller("cont",["$scope","$http",function ($scope,$http) {
}]).config(["$stateProvider","$urlRouterProvider",function ($stateProvider,$urlRouterProvider){
	$stateProvider.state("a",{
		url:"/a",
		templateUrl:"views/denglu.html",
		controller:"con"
	}).state("b",{
		url:"/b",
		templateUrl:"views/zhuce.html",
		controller:"app"
	}).state("c",{
		url:"/c",
		templateUrl:"views/note.html",
		controller:"note"	
	}).state("d",{
		url:"/d",
		templateUrl:"views/add.html",
		controller:"note"
	}).state("e",{
		url:"/e?id&title&content",
		templateUrl:"views/hate.html",
		controller:"str"
	})
	$urlRouterProvider.when('','/a');
}])




