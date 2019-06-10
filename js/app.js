console.log("Here we are, Cat Clicker!!");

(function($) {
    console.log("Into main IIFE (Immediately-Invoked Function Expression, pronounced like \"iffy\")");

    const catNamesList = ["Bisvis", "Kiki", "Zaspa", "Cosi", "Piedri", "Mari"]; // Cat names choosen by Icíar González Martín :) (2019)

    let app = {
        init: function () {
            this.wrapperEl = document.getElementById("wrapper");
            this.resetPage();
            this.createSkeleton();

            catNamesList.forEach(function(catName, i) {
                this.createCatListElement(catName, i);
            }.bind(this))
        },
        resetPage: function() {
            this.wrapperEl.textContent = null;
        },
        createSkeleton: function() {
            let ulEl = document.createElement("ul");
            this.wrapperEl.appendChild(ulEl);
        },
        createCatListElement: function(catName, i) {
            let liEl = document.createElement("li");
            liEl.textContent = catName;
            liEl.addEventListener("click", function(e) {
                e.stopPropagation();
                this.createCat(e.target.textContent, i).bind(this);
            }.bind(this));

            this.wrapperEl.querySelector("ul").appendChild(liEl);
        },
        createCat: function(catName, i) {
            Array.from(this.wrapperEl.querySelectorAll(".cat")).forEach(function(el) {
                el.style.display = "none";
            });

            let catWrapperEL = this.wrapperEl.querySelector("#" + catName);
            if(!catWrapperEL) { // There is no cat element yet..
                let counter = 0;

                catWrapperEL = document.createElement("div");
                catWrapperEL.className = "cat";
                catWrapperEL.id = catName;

                let catTitle = document.createElement("div");
                catTitle.textContent = catName;

                let catCounterEl = document.createElement("div");
                catCounterEl.id = catName + "Counter";
                catCounterEl.textContent = counter;

                let catElement = document.createElement("img");
                catElement.src = "img/cat" + i + ".jpg";
                catElement.title = catName;
                catElement.width = "350";

                
                catElement.addEventListener("click", function() {
                    counter += 1;
                    catWrapperEL.querySelector("#" + catName + "Counter").textContent = counter;
                });

                catWrapperEL.appendChild(catTitle);
                catWrapperEL.appendChild(catElement);
                catWrapperEL.appendChild(catCounterEl);
                this.wrapperEl.appendChild(catWrapperEL);
            } else {
                catWrapperEL.style.display = "block";
            }
        }
    };

    app.init();
    window.app = app;

})(jQuery);
