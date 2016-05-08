 
	var abreLink = function(links){
		//if(GLOBAL_IS_WEB){
		//	window.open(links,'_new'+Math.random(1,10));
		//}else{
		//	if ( typeof navigator !== "undefined" && navigator.app )  
		//	    navigator.app.loadUrl( links, { openExternal:true } )
		//	else // iOS and others
			    window.open( links, '_system', 'location=no') ;
		//}
	};
	
	var alerta = function(texto){
		if(GLOBAL_IS_WEB){
			alert(texto);
		}else{
			try{
				navigator.notification.alert('', null, texto);
			}catch(e){
				alert(texto);
			}
		}
	};

	function validateEmail(email) {
	    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    return re.test(email);
	}

	var showLoad = function(){
		$('#loadera').show();
	};

	var hideLoad = function(){
		$('#loadera').hide();
	};
	
	var getStorage = function(ditem){
		return localStorage.getItem(ditem);
	};

	var setStorage = function(ditem,valor){
		localStorage.setItem(ditem, valor);
	};

	var clearAllStorage = function(){
		/* Warning */
		localStorage.clear();
	};

	var isLogged = function(){
		user_credencial = getStorage('credencial');
		if( user_credencial===null || user_credencial===undefined || user_credencial==='' ){
			return false;
		}else{
			return true;
		}
	};

	var doLogout = function(xcope){
		setStorage('credencial', '');
		xcope.changeView('');
	}

	var buildToggler = function(navID, mu, msn) {
        var debounceFn =  mu.debounce(function(){
            msn(navID).toggle()
              .then(function () {

               		// $log.debug("toggle " + navID + " is done");
               		
              });
          },300);
		return debounceFn;
    }

 
