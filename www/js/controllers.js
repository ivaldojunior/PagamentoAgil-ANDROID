//Controllers
	//#
	app.controller('c_login' , function( $scope, $location, $mdDialog){		
		var init = function(){

			$scope.enderecoServidor = GLOBAL_SERVER_LOCATION;
			
			$scope.changeView = function(view){
				$('#content_angular').attr('class','slide');
				$location.path(view);
			};

			$scope.showAlert = function(mensagem) {
			    $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.body))
			        .title(mensagem)
			        .content('')
			        .ariaLabel('ALERT')
			        .ok('OK')
			        //.targetEvent(ev)
			    );
			};

			$scope.doLogin = function(ev){
				if( $('#user_email').val().length > 0 && $('#user_senha').val().length > 0 ){
					if(validateEmail( $('#user_email').val() )){
						showLoad();
						prepareLogin( $('#user_email').val(), $('#user_senha').val() , $scope);
					}else{
						$scope.showAlert(ev, 'Email inválido');
					}
				}else{
					$scope.showAlert(ev, 'Preencha todos os campos');
				}
				return false;
			};

			$scope.apagaRegister = function(){
				$('.home-botao-registro').hide();
			}

			$scope.acendeRegister = function(){
				$('.home-botao-registro').show();
			}

			if( !isLogged() ){
				$('#div-loadu').fadeOut();
				$('#formu-login').fadeIn();
			}else{
				$scope.changeView('init');
			}

		};
		init();
		
	});
















































	//#
	app.controller('c_registro',function($scope, $location, $mdDialog ){
		var init = function(){

			$scope.enderecoServidor = GLOBAL_SERVER_LOCATION;
			
			$scope.changeView = function(view){
				$('#content_angular').attr('class','edils');
				$location.path(view);
			};

			$scope.showAlert = function(mensagem) {
			    $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.body))
			        .title(mensagem)
			        .content('')
			        .ariaLabel('ALERT')
			        .ok('OK')
			      //  .targetEvent(ev)
			    );
			};

			$scope.verifyBack = function(ev){
				if( $('#user_email').val()!='' 
					&& $('#user_senha').val()!='' 
					&& $('#user_csenha').val()!='' 
					&& $('#user_nome').val()!='' 
					&& $('#user_sobrenome').val()!=''){
						cadUser(ev);
				}else{
					$scope.changeView('');
				}
			};
			
			$scope.cadUser = function(ev){
				if($('#user_email').val()!='' && $('#user_senha').val()!='' && $('#user_nome').val()!=''){
					if(validateEmail($('#user_email').val())){
						if($('#user_senha').val() == $('#user_csenha').val()){
							showLoad();
								//doIt

								$scope.showAlert("Criar usuario estará disponivel em breve");
								$scope.changeView('');
						}else{
							$scope.showAlert(ev, 'Senha e confirmação da senha não são iguais');
						}
					}else{
						$scope.showAlert(ev, 'Emvail inválido');
					}
				}else{
					$scope.showAlert(ev, 'Preencha todos os campos');
				}
				return false;
			};
		};
		init();
	});















































	//#
	app.controller('c_init',function($scope, $location, $mdUtil, $log, $mdDialog, $mdSidenav, $sce, $route){
		var init = function(){

			$scope.enderecoServidor = GLOBAL_SERVER_LOCATION;

			$scope.pitchs = [];

			$scope.toggleLeft = buildToggler('left', $mdUtil, $mdSidenav );

			$scope.openUrl = function(uri){
	            abreLink($scope.urlConfiavel(uri));
			}

			$scope.changeView = function(view){
				$('#content_angular').attr('class','slide');
				$location.path(view);
			};

			$scope.urlConfiavel = function(url){
				
				return $sce.trustAsResourceUrl(url);
			};

			$scope.showAlert = function(ev, mensagem) {
			    $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.body))
			        .title(mensagem)
			        .content('')
			        .ariaLabel('ALERT')
			        .ok('OK')
			        .targetEvent(ev)
			    );
			};

			$scope.getTimes = function(n){

			     return new Array(n);
			};


			/*
			mRefresh({
                scrollEl: 'md-content.container-principal',
                top: '63px', 
                index: 1,
                maxTime: 500,  
                	// freeze: true,
                onBegin: function(){
			      	$route.reload();
			    },
			    onEnd: function(){
			      	// alert('Finish the refresh');
			    }
            });	*/

			if( !isLogged() ){
				$scope.changeView('');
			}

            credencial = getStorage('credencial');

            prepareCPS(credencial ,$scope);
		
		};
		init();


	});















































	app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log, $route, $location) {
	    $scope.close = function (callback) {
		    $mdSidenav('left').close().then(function(){
		      	//depois de fechar
		      	callback();
		    });
	    };

	    $scope.changeView = function(view){
			$('#content_angular').attr('class','edils');
			$location.path(view);
		};

	    $scope.logout = function(){
			$scope.close(function(){
				doLogout($scope);
			})
		};

		$scope.openUrl = function(uri){
			$scope.close(function(){
				abreLink(uri);
			})
		}

		$scope.atualiza = function(){
			$scope.close(function(){
				$route.reload();
			});
		}
	});




























