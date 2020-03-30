/* eslint-disable no-console */
console.log("Here we are, Cat Clicker Premium!!");

(function ($) {
    console.log("Into main IIFE (Immediately-Invoked Function Expression, pronounced like \"iffy\")");

    let model = {
        /**
         * Marca como seleccionado un gato en particular y lo devuelve
         * @param {string} catName - Nombre de un gato
         * @return {Object} The selected cat object
         */
        selectCat: function (catName) {
            for (const cat of this.data.cats) { // Se utiliza el bucle "for of" porque se necesita poder romper el loop (y forEach no lo permite)
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
        hitCat: function (catName) {
            // Se recorre la estructura de datos hasta llegar al requerido y se le suma un click
            this.data.cats.forEach(function (cat) {
                if (cat.name === catName) {
                    cat.hits += 1;
                }
            })
        },
        getCats: function () {
            return this.data.cats;
        },
        /**
         * Definición e inicialización de la estructura de datos de la aplicación
         */
        init: function () {
            // Definición de la estructura de datos de la aplicación
            this.data = {
                selectedCat: "",
                cats: []
            }

            // Inicialización de la estructura inicial de datos
            const catNamesList = ["Bisvis", "Kiki", "Zaspa", "Cosi", "Piedri", "Mari"]; // Cat names choosen by Icíar González Martín :) (Jun / 2019)
            catNamesList.forEach(function (catName) {
                let cat = {
                    name: catName,
                    hits: 0
                };

                this.data.cats.push(cat);
            }.bind(this));
        }
    };

    let octopus = {
        init: function () {
            model.init();
            view.init();
        },
        // Métodos utilizado desde la vista: view
        getCats: function () {
            return model.getCats();
        },
        hitCat: function (evt) {
            let catName = $(evt.target).attr("title");
            model.hitCat(catName);
            view.render();
        }
    };

    let view = {
        init: function () {
            // Cacheos del DOM
            this.root = $("#wrapper");

            // Creación de escuchadores
            this.root.on("click", "li", octopus.hitCat); // Escuchador delegado

            this.render();
        },
        render: function () {
            var htmlStr = "<ul>";
            octopus.getCats().forEach(function (cat) {
                htmlStr += "<li><img height='45px' width='45px' src='./img/" + cat.name + ".jpg' title='" + cat.name + "'> (" + cat.hits + ") </img></li>";
            });

            htmlStr += "</ul>";
            this.root.html(htmlStr);
        }
    }

    octopus.init();

})(jQuery);
