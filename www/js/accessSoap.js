    var objXMLHttpRequest;
    function NovoXMLHttpRequest(){
        if(window.XMLHttpRequest){
            objXMLHttpRequest = new XMLHttpRequest();
        }else if(window.ActiveXObject){
            try{
                objXMLHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            }catch(e){
                try{
                    objXMLHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }catch(e){}
            }
        }
    }









    /* LOGIN */

    function xmlLogin(email, senha){
      xml = '<?xml version="1.0" encoding="utf-8"?>'+
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
              '<soap:Body>'+
                '<Login xmlns="http://tempuri.org/">'+
                    '<chave>'+GLOBAL_SERVICE_KEY+'</chave>'+
                    '<app>'+GLOBAL_GUID+'</app>'+
                    '<conta>'+email+'</conta>'+
                    '<senha>'+senha+'</senha>'+
                  '</Login>'+
              '</soap:Body>'+
            '</soap:Envelope>';
      return xml;
        
    };
       
    function makeLogin(email, senha, callback, callback_error){
        objLogin = xmlLogin(email, senha);

          // console.log('objLogin', objLogin);

        NovoXMLHttpRequest();
        objXMLHttpRequest.onreadystatechange = function(){
             if(objXMLHttpRequest.readyState == 4){
                if(objXMLHttpRequest.status == 200) {
                    var XMLDoc = objXMLHttpRequest.responseXML;
                    callback(XMLDoc);
                }
                if(objXMLHttpRequest.status == 405 || objXMLHttpRequest.status == 500 ) {
                    callback_error(objXMLHttpRequest);
                }
            }
        };
        objXMLHttpRequest.open("POST", GLOBAL_END_POINT_LOGIN, true);
        objXMLHttpRequest.setRequestHeader("SOAPAction", "http://tempuri.org/Login");
        objXMLHttpRequest.setRequestHeader("Content-Type", "text/xml; charset=utf-8" );
        objXMLHttpRequest.send( objLogin );
    }

    function prepareLogin(email, senha, xcope){
      // document.getElementById("lblResultado").innerHTML = XMLDoc.getElementsByTagName("LoginResult")[0].childNodes[0].nodeValue;
      makeLogin(email, senha, function(XMLDoc){
          hideLoad();

          arrayResult = Array();
            for( c in XMLDoc.getElementsByTagName("LoginResult")[0].childNodes ){
              arrayResult[XMLDoc.getElementsByTagName("LoginResult")[0].childNodes[c].nodeName] = XMLDoc.getElementsByTagName("LoginResult")[0].childNodes[c].innerHTML ;
            }

          setStorage('credencial', email);
          location.href='#/init';
          
        //console.log( 'Sucesso' , arrayResult );
        //console.log( 'Sucesso-XML' , XMLDoc.getElementsByTagName("LoginResult")[0].childNodes );
          
      }, function(error){
          hideLoad();
           if(error.status == 405) {
                xcope.showAlert('Conexão recusada');
            }
            
            if(error.status == 500) {
              xcope.showAlert('Login e/ou Senha incorretos');
            }
          //console.log( 'Error' , error );
      });

    }









    /* REGISTER */

    function xmlRegister(email, senha, contrasenha, nome, sobrenome){
      xml = '<?xml version="1.0" encoding="utf-8"?>'+
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
              '<soap:Body>'+
                '<Registrar xmlns="http://tempuri.org/">'+
                  '<usuario>'+
                    '<guid>'+GLOBAL_GUID+'</guid>'+
                    '<email>'+email+'</email>'+
                    '<Roles>Usuario</Roles>'+
                    '<ultimoNome>'+sobrenome+'</ultimoNome>'+
                    '<primeiroNome>'+nome+'</primeiroNome>'+
                    '<Password>'+senha+'</Password>'+
                    '<ConfirmPassword>'+contrasenha+'</ConfirmPassword>'+
                  '</usuario>'+
                  '<chave>'+GLOBAL_SERVICE_KEY+'</chave>'+
                '</Registrar>'+
              '</soap:Body>'+
            '</soap:Envelope>';
      return xml;
    };
       
    function makeRegister(email, senha, contrasenha, nome, sobrenome, callback){
        objRegister = xmlRegister(email, senha, contrasenha, nome, sobrenome);

          // console.log('objRegister', objRegister);

        NovoXMLHttpRequest();
        objXMLHttpRequest.onreadystatechange = function(){
             if(objXMLHttpRequest.readyState == 4){
                if(objXMLHttpRequest.status == 200) {
                    var XMLDoc = objXMLHttpRequest.responseXML;
                    callback(XMLDoc);
                }
            }
        };
        objXMLHttpRequest.open("POST", GLOBAL_END_POINT_REGISTER, true);
        objXMLHttpRequest.setRequestHeader("SOAPAction", "http://tempuri.org/Registrar");
        objXMLHttpRequest.setRequestHeader("Content-Type", "text/xml; charset=utf-8" );
        objXMLHttpRequest.send( objRegister );
    }

    function prepareRegister(email, senha, contrasenha, nome, sobrenome){
      makeRegister(email, senha, contrasenha, nome, sobrenome, function(XMLDoc){
          //sucesso..
      });
    }









    /* CONSULTAR POR SACADO */

    function xmlCPS(email){
      xml = '<?xml version="1.0" encoding="utf-8"?>'+
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
              '<soap:Body>'+
                ' <ConsultarPorSacado xmlns="http://tempuri.org/">'+
                  '<email_sacado>'+email+'</email_sacado>'+
                  '<chave>'+GLOBAL_SERVICE_KEY+'</chave>'+
                '</ConsultarPorSacado>'+
              '</soap:Body>'+
            '</soap:Envelope>';
      return xml;
    };
       
    function makeCPS(email, callback, callback_error){
        objCPS = xmlCPS(email);

          // console.log('objCPS', objCPS);

        NovoXMLHttpRequest();
        objXMLHttpRequest.onreadystatechange = function(){
             if(objXMLHttpRequest.readyState == 4){
                if(objXMLHttpRequest.status == 200) {
                    var XMLDoc = objXMLHttpRequest.responseXML;
                    callback(XMLDoc);
                }
                if(objXMLHttpRequest.status == 500){
                  callback_error(objXMLHttpRequest);
                }
            }
        };
        objXMLHttpRequest.open("POST", GLOBAL_END_POINT_CONSULTAR_COBRANCAS, true);
        objXMLHttpRequest.setRequestHeader("SOAPAction", "http://tempuri.org/ConsultarPorSacado");
        objXMLHttpRequest.setRequestHeader("Content-Type", "text/xml; charset=utf-8" );
        objXMLHttpRequest.send( objCPS );
    }

    function prepareCPS(email, xcope){
      showLoad();
      makeCPS(email, function(XMLDoc){

          arrayResult = Array();
          for(var i=0; i< XMLDoc.getElementsByTagName("ConsultarPorSacadoResult")[0].childNodes.length; i++){
              registro = XMLDoc.getElementsByTagName("ConsultarPorSacadoResult")[0].childNodes[i]; 
              temp = [];
              for( ccv in registro.childNodes ){
                if(registro.childNodes[ccv].nodeName !== undefined ){
                  temp[registro.childNodes[ccv].nodeName] =  registro.childNodes[ccv].innerHTML ;
                }
              }
              temp.length = registro.childNodes.length;
              arrayResult[arrayResult.length] = temp;
          }

          xcope.$apply(function(){
            xcope.debitos = arrayResult;
            hideLoad();
            //console.log( arrayResult );
          });
          

      }, function(error){
          console.log('error',error);
      });
    }
