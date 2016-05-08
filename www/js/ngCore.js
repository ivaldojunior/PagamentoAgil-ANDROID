/* Variaveis Globais ! */

var GLOBAL_IS_WEB = false;
var GLOBAL_SERVICE_KEY = 'nn3ts1st3m4s';
var GLOBAL_GUID = '8CC0EC9D-A481-46B2-AD10-5C4FB7AA589C'; //'3a235152-5bd5-4abc-be5a-be7621069815';//
var GLOBAL_SERVER_LOCATION = 'http://www.pagamentoagil.com.br/';
var GLOBAL_END_POINT_LOGIN = 'https://contasegura.azurewebsites.net/services/v2/logon.asmx';
var GLOBAL_END_POINT_REGISTER = 'https://app-pagamentoagil.azurewebsites.net/services/v1/usuariows.asmx';
var GLOBAL_END_POINT_CONSULTAR_COBRANCAS = 'https://app-pagamentoagil.azurewebsites.net/services/v1/cobrancaws.asmx';

	/* Inicialização do Angular */
	var app = angular.module('pagamento-agil',['ngRoute','ngAnimate','ngMaterial']);
	//configuração das rotas do app ;
	app.config(function($routeProvider, $mdThemingProvider){
			$routeProvider.when('/',{
				controller: 'c_login',
				templateUrl: 'views/login.html'
			})
			.when('/registro',{
				controller: 'c_registro',
				templateUrl: 'views/registro.html'
			})
			.when('/init',{
				controller: 'c_init',
				templateUrl: 'views/init.html'
			})

			$mdThemingProvider.theme('default').primaryPalette('blue', {
			      'default': '400', 
			      'hue-1': '600', 
			      'hue-2': '700', 
			      'hue-3': '800'
			    }).accentPalette('grey',{
			      'default': '300', 
			      'hue-1': '500', 
			      'hue-2': '700', 
			      'hue-3': '600',
			    }).warnPalette('red',{
			      'default': '600', 
			      'hue-1': '500', 
			      'hue-2': '700', 
			      'hue-3': '900',
			    });

	});

	if(!GLOBAL_IS_WEB){
		document.addEventListener("deviceready", function(){
			//   try{ window.analytics.startTrackerWithId('UA-64749505-2'); }catch(e){ }

		},false);
	}else{
		$(document).ready(function(){

		});
	}
	


////Plugins Utilizados no Cordova

/*

cordova-plugin-inappbrowser
cordova-plugin-dialogs
cordova-plugin-google-analytics

*/




