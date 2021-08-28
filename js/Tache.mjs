/**
 * Module de gestion des données et des requêtes des taches et des usagers
 *
 * @module Tache
 */
export default class Tache {
    /**
     * URL de base du service Web utilisé pour les appels de l'API.
     * @static
     * @memberof Tache
     */
    static api_url = "https://api-nodejs-todolist.herokuapp.com/";

    /**
     * Création du compte de l'usager sur le service Web
     *
     * @static
     * @param {object} usager
     * @param {string} usager.name
     * @param {string} usager.email
     * @param {string} usager.passworg
     * @param {string} usager.age
     * @returns ?
     * @memberof Tache
     */
    static setUsager(usager){
        console.log(this);

        const entete = new Headers();
        entete.append("Content-Type", "application/json");
        
        const reqOptions = {
            method: 'POST',
            headers: entete,
            body: JSON.stringify(usager),
            redirect: 'follow'
        };
          
        //fetch retourne une promesse
        fetch(this.api_url + "user/register", reqOptions)
            .then(function(reponse) {
                console.log(reponse);
            });
        
          
            
            
    }   
    /**
     * Connection de l'usager sur le service Web.
     *
     * @static
     * @param {object} usager
     * @param {string} usager.email
     * @param {string} usager.password
     * @returns {Promise} 
     * @memberof Tache
     */
    static logUsager(usager){
        
        const entete = new Headers();
        entete.append("Content-Type", "application/json");
        
        const reqOptions = {
            method: 'POST',
            headers: entete,
            body: JSON.stringify(usager),
            redirect: 'follow'
          };
        return fetch(this.api_url + "user/login", reqOptions)
            .then(function(reponse) {
                return reponse.json();
            });
    }   
    
    
    /**
     * Effacer le compte de l'usager sur le service Web
     *
     * @static
     * @param {string} auth - clé d'authorization liée au compte
     * @returns ?
     * @memberof Tache
     */
    static delUsager(auth){
        const entete = new Headers();
        entete.append("Authorization", "Bearer "+auth);

        const reqOptions = {
            method: 'DELETE',
            headers: entete,
            redirect: 'follow'
          };
          
          return fetch(this.api_url + "user/me", reqOptions)
          .then(function(reponse) {
              return reponse.json();
          });
    }   

    
    /**
     * Ajoute une tâche sur le service Web pour un usager spécifique
     *
     * @static
     * @param {object} tache
     * @param {string} tache.description
     * @param {string} auth - clé d'authorization liée au compte
     * @returns ?
     * @memberof Tache
     */
    static setTache (tache, auth){
        
        const entete = new Headers();
        entete.append("Content-Type", "application/json");
        entete.append("Authorization", "Bearer "+auth);

        const reqOptions = {
            method: 'POST',
            headers: entete,
            body: JSON.stringify(tache),
            redirect: 'follow'
          };
          return fetch(this.api_url + "task", reqOptions)
          .then(function(reponse) {
              console.log(reponse);
          });
    }
    
    /**
     * Récupérer l'ensemble des tâches sur le service Web pour un usager spécifique
     *
     * @static
     * @param {string} auth - clé d'authorization liée au compte
     * @returns ?
     * @memberof Tache
     */
    static getListeTache (auth){
       
        const entete = new Headers();
        entete.append("Content-Type", "application/json");
        entete.append("Authorization", "Bearer "+auth);

        const reqOptions = {
            method: 'GET',
            headers: entete,
            redirect: 'follow'
        };
        return fetch(this.api_url + "task", reqOptions)
            .then(reponse => reponse.json());
    }
}
