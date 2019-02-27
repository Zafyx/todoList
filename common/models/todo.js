'use strict';

module.exports = function(Todo) {

      Todo.beforeRemote('create', function(context, todo, next) {
        context.args.data.usuarioId = context.req.accessToken.userId;
        var fecha = context.args.data.date;
        
        if (fecha < Date.now()) {
            next(new Error('No es posible generar un evento pasado.'));
        } else {
            next();
        }
      });

        /**
        * muestra los eventos del usuario autenticado pendientes de realización
        * @param {Function(Error, array)} callback
        */

       Todo.eventosPendientes = function(context, callback) {
         var eventosPendientes;
         
         var idUsuario = context.req.accessToken.userId;
         
         if (idUsuario!==null) {
            if(context.args.data.date > Date.now()) {
                
            Todo.find({
                
                    scope: {
                        fields: ['title','description','date','isComplete','id','usuarioId']
                    }
                
            }, function(err, eventos){
                callback(err, eventos);
            });
            
        }
    }
            callback(null, eventosPendientes);
          
            };

   



};
