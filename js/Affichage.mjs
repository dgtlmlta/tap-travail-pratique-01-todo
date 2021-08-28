/**
 * Module de gestion de l'affichage
 *
 * @Module Affichage
 * @requires Mustache.js {https://unpkg.com/mustache@latest}
 */
export default class Affichage {


    static afficheEnregistrer(){
        const template = document.querySelector("#tmplEnregistrer").innerHTML;
        const render = Mustache.render(template, {});
        document.querySelector("main").innerHTML = render;
    }
    /**
     * Convertie un template Mustache.js en Element et l'insère dans un noeud.
     *
     * @static
     * @param {String} tmpl
     * @param {Object} data
     * @param {Element} noeud
     * @memberof Affichage
     */
    static afficherTemplate(tmpl, data, noeud){
        
        noeud.innerHTML = Mustache.render(tmpl, data);
    }
    /**
     * Permet le chargement asynchrone des templates pour Mustache.js
     * 
     * @static
     * @param {{fichier: String, data: Object, tmpl:String}[]} aTemplates - Tableau qui contient la liste des fichiers à charger
     * @returns ?
     * @memberof Affichage
     */
    static chargementTemplate(aTemplates){
        let htmlTemplate = [];
        aTemplates.forEach(uneRoute=>{
            console.log(uneRoute.fichier);
            htmlTemplate.push(fetch("./vues/"+uneRoute.fichier)
                .then(reponse => reponse.text())
                    .then(template => uneRoute.tmpl = template));
                //.then(function(reponse) {return reponse.text()});
        })

        return Promise.all(htmlTemplate);
    }
}