console.log("Here we are, Cat Clicker Premium!!");

(function($) {
    console.log("Into main IIFE (Immediately-Invoked Function Expression, pronounced like \"iffy\")");

    let model = {
        /**
         * Marca como seleccionado un gato en particular y lo devuelve
         * @param {string} catName - Nombre de un gato
         * @return {Object} The selected cat object
         */
        selectCat: function(catName) {
            for(const cat of this.data.cats) { // Se utiliza el bucle "for of" porque se necesita poder romper el loop (y forEach no lo permite)
                if (cat.name === catName) {
                    this.data.selectedCat = catName;
                    break;
                }
            }

            return this.data.cats.filter(cat => cat.name === catName)
        },
        /**
         * Añade un click a un gato
         * @param {string} catName - Nombre de un gato
         */
        hitCat: function(catName) {
            // Se recorre la estructura de datos hasta llegar al requerido y se le suma un click
            this.data.cats.forEach(function(cat) {
                if (cat.name === catName) {
                    cat.hits += 1;
                }
            })
        },
        /**
         * Definición e inicialización de la estructura de datos de la aplicación
         */        
        init: function ()  {
            // Definición de la estructura de datos de la aplicación
            this.data = {
                selectedCat: "",
                cats: []
            }

            // Inicialización de la estructura inicial de datos
            const catNamesList = ["Bisvis", "Kiki", "Zaspa", "Cosi", "Piedri", "Mari"]; // Cat names choosen by Icíar González Martín :) (Jun / 2019)
            catNamesList.forEach(function(catName) {
                let cat = {
                    name: catName,
                    hits: 0
                };

                this.data.cats.push(cat);
            }.bind(this));
        }
    };

    let octopus = {
        init: function() {
            model.init();
        }
    };

    octopus.init();

})(jQuery);
