//Instalar nodejs y conrrer con el comando ---> node index.js
const Crawler = require("crawler");
const fs = require('fs');

//Este programa te trae las referencias de articulos de wikipedia y las guarda en un archivo
const c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;

            //Convierte toda la pagina en texto sin etiquetas html
            const info = $.text()

            //Separa todas las linea de la pagina
            const line = info.split('\n');

            //Escribe el titulo de la pagina en el documento 

            fs.appendFile('temp.txt', $("title").text().split('-')[0] + '\n', function (err) {
                if (err) throw err;
                console.log('Saved!');
            });

            //Recorre todas las linea de la pagina 
            for (let index = 0; index < line.length; index++) {
                const element = line[index];

                //Si la linea tiene el caracter ↑, entonces es una referencia 
                if (element.includes('↑')) {

                    //Escribe en el documento la referencia 
                    fs.appendFile('temp.txt', element + '\n', function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                    });

                }
            }
            
        }
        done();
    }
});

// URls de los articulos
c.queue(['https://es.wikipedia.org/wiki/Universidad_de_Stanford', 'https://es.wikipedia.org/wiki/Agujero_negro']);

// Queue a list of URLs