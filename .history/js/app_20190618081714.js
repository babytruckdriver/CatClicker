console.log("Here we are, Cat Clicker Premium!!");

(function($) {
    console.log("Into main IIFE (Immediately-Invoked Function Expression, pronounced like \"iffy\")");

    let model = {
        selectCat: function(catName) {
            for(let cat of this.data.cats) {
                if (cat.name === catName) {
                    this.data.selectedCat = catName;
                    break;
                }
            }
        },
        hitCat: function(catName) {
            this.data.cats.forEach(function(cat) {
                if (cat.name === catName) {
                    cat.hits += 1;
                }
            })
        },        
        init: function ()  {
            this.data = {
                selectedCat: "",
                cats: []
            }
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
