/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
requirejs.config({
    baseUrl: '/kolabNXFront/js/',
    paths: {
        app: './'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['kz_backendHelper']);


