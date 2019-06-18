console.log("Here we are, Cat Clicker Premium!!");

(function($) {
    console.log("Into main IIFE (Immediately-Invoked Function Expression, pronounced like \"iffy\")");

    let model = {
        init: function ()  {
            this.cats = [];
            const catNamesList = ["Bisvis", "Kiki", "Zaspa", "Cosi", "Piedri", "Mari"]; // Cat names choosen by Icíar González Martín :) (Jun / 2019)
            catNamesList.forEach(function(catName) {
                let cat = {
                    name: catName,
                    hits: 0
                };

                this.cats.push(cat);
            });
        },
        hitCat: function(catName) {
            this.cats.forEach(function(cat) {
                if (cat.name === catName) {
                    cat.hits += 1;
                }
            })
        }
    };

    let octopus = {
        init: function() {
            model.init();
        }
    };

    octopus.init();

})(jQuery);
