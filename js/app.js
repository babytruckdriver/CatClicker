/* eslint-disable no-console */
console.log("Here we are, Cat Clicker Premium!!");

(function ($) {
    console.log("Into main IIFE (Immediately-Invoked Function Expression, pronounced like \"iffy\")");

    /* ======= Model ======= */

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
        getSelectedCat: function () {
            return this.selectCat(this.data.selectedCat);
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
        setAdminMode: function (mode) {
            this.data.adminMode = mode;
        },
        getAdminMode: function () {
            return this.data.adminMode;
        },
        saveCat: function (updatedCat) {
            var catName = this.getSelectedCat()[0].name;
            this.data.cats.forEach(function (cat) {
                if (cat.name === catName) {
                    cat.hits = updatedCat.hits;
                    cat.name = updatedCat.name;
                }
            })
        },
        /**
         * Definición e inicialización de la estructura de datos de la aplicación
         */
        init: function () {
            // Definición de la estructura de datos de la aplicación
            this.data = {
                selectedCat: "",
                adminMode: false,
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

    /* ======= Octopus ======= */

    let octopus = {
        init: function () {
            model.init();
            catFrameView.init();
            catAdminView.init();
            view.init();
        },
        // Métodos utilizado desde la vista: view
        getCats: function (catName) {
            if (catName) {
                return model.selectCat(catName);
            } else {
                return model.getCats();
            }
        },
        selectCat: function (evt) {
            let catName = $(evt.target).text();
            model.selectCat(catName);
            catFrameView.render();
            catAdminView.render();
        },
        getSelectedCat: function () {
            return model.getSelectedCat();
        },
        hitCat: function (evt) {
            let catName = $(evt.target).attr("title");
            model.hitCat(catName);
            catFrameView.render();
            catAdminView.render();
        },
        setAdminMode: function (mode) {
            model.setAdminMode(mode);
            catAdminView.render();
        },
        getAdminMode: function () {
            return model.getAdminMode();
        },
        saveCat: function (cat) {
            model.setAdminMode(false);
            model.saveCat(cat);
            catFrameView.render();
            catAdminView.render();
        }
    };

    /* ======= View ======= */

    let view = {
        init: function () {
            // Cacheos del DOM
            this.catList = $("#catList");

            // this.catTemplate = $('script[data-template="cat"]').html();
            // Creación de escuchadores
            this.catList.on("click", "li", octopus.selectCat); // Escuchador delegado

            this.render();
        },
        render: function () {
            var catList = this.catList;

            // Creación de la lista de gatos
            var htmlStr = "";
            octopus.getCats().forEach(function (cat) {
                htmlStr += "<li>" + cat.name + "</li>"; //catTemplate.replace(/{{name}}/g, cat.name).replace(/{{hits}}/g, cat.hits);
            });

            catList.html(htmlStr);
        }
    }

    let catFrameView = {
        init: function () {
            // Cacheos del DOM
            this.root = $("#wrapper");
            this.catFrame = $("#catFrame");
            this.catInfo = this.catFrame.find(".cat-info");

            // Creación de escuchadores
            this.catFrame.on("click", "img", octopus.hitCat)

            this.render();
        },
        render: function () {
            var catInfo = this.catInfo;
            var catFrame = this.catFrame;


            // Actualización del marco del gato si hay alguno seleccionado
            let selectedCat = octopus.getSelectedCat();
            if (selectedCat[0]) {
                catFrame.find("img").attr("title", selectedCat[0].name).attr("src", "./img/" + selectedCat[0].name + ".jpg");
                catInfo.text("Cat: " + selectedCat[0].name + ". Hits: " + selectedCat[0].hits);
            }
        }
    }

    let catAdminView = {
        init: function () {
            // Cacheos del DOM
            this.btoAdmin = $("#btoAdmin");

            this.formCatAdmin = $("#formCatAdmin");
            this.inputCatName = this.formCatAdmin.find("#inputCatName");
            this.inputCatHits = this.formCatAdmin.find("#inputCatHits");
            this.btoCancel = this.formCatAdmin.find("#btoCancel");
            this.btoSave = this.formCatAdmin.find("#btoSave");

            // Creación de escuchadores
            this.btoAdmin.on("click", function () {
                octopus.setAdminMode(true);
            });

            this.btoCancel.on("click", function () {
                octopus.setAdminMode(false);
            });

            this.btoSave.on("click", function () {
                var cat = {};
                cat.name = this.inputCatName.val();
                cat.hits = this.inputCatHits.val();
                octopus.saveCat(cat);
            }.bind(this));
        },
        render: function () {
            var inputCatName = this.inputCatName;
            var inputCatHits = this.inputCatHits;
            var formCatAdmin = this.formCatAdmin;

            var selectedCat = octopus.getSelectedCat();
            if (selectedCat[0]) {
                inputCatName.val(selectedCat[0].name);
                inputCatHits.val(selectedCat[0].hits)
            }

            if (octopus.getAdminMode()) {
                formCatAdmin.removeClass("d-none");
            } else {
                formCatAdmin.addClass("d-none");
            }
        }
    }

    octopus.init();

})(jQuery);
