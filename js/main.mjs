import TodoApp from './TodoApp.mjs';
import Tache from './Tache.mjs';
import Affichage from './Affichage.mjs';
import page from "//unpkg.com/page/page.mjs";

(function () {
	const
		todoApp = new TodoApp(),
		info = { usager: {}, taches: [], toto: "allo le monde" };

	const aRoutes = [
		{ chemin: "/enregistrer", fichier: "enregistrer.html", tmpl: "", cb: cbEnregistrer },
		{ chemin: "/tache", fichier: "tache.html", tmpl: "", cb: cbTaches },
		{ chemin: "/ajouter", fichier: "ajouter.html", tmpl: "", cb: cbAjouter },
		{ chemin: "/", fichier: "tache.html", tmpl: "", cb: function () { } },
		{ chemin: "/connecter", fichier: "connecter.html", tmpl: "", cb: cbConnecter },
	];

	/**
	 * Retourne le template pour l'affichage avec Mustache
	 * Trop spécifique pour être placé dans le module Affichage (deux dépenses)
	 *
	 * @param {Object} ctx
	 * @returns {string}
	 */
	function getTemplate(route) {
		let template;
		
		for(const uneRoute of aRoutes) {
			if (uneRoute.chemin == route) {
				template = uneRoute.tmpl;
				break;
			}
		};

		return template;
	}

	function cbEnregistrer(ctx) {
		let template = getTemplate(ctx.path);

		if (template) {
			Affichage.afficherTemplate(template, info, document.querySelector("main"));   // tmpl, data, noeud
		}
	};

	function cbConnecter(ctx) {
		let template = getTemplate(ctx.path);

		if (template) {
			Affichage.afficherTemplate(template, info, document.querySelector("main"));   // tmpl, data, noeud
		}

	};

	function cbTaches(ctx) {
		let template = getTemplate(ctx.path);

		Tache.getListeTache(info.usager.token)
			.then(donnees => {
				info.taches = donnees.data;
				
				if (template) {
					Affichage.afficherTemplate(template, info, document.querySelector("main"));   // tmpl, data, noeud
				}
			});
	};

	function cbAjouter(ctx) {
		if(!info.usager.token) {
			page.redirect("/connecter");
			return;
		}

		let template = getTemplate(ctx.path);				
		
		if (template) {
			Affichage.afficherTemplate(template, info, document.querySelector("main"));   // tmpl, data, noeud
		}
	};

	// Toujours s'assurer que le DOM est prêt avant de manipuler le HTML.
	document.addEventListener("DOMContentLoaded", () => {

		Affichage.chargementTemplate(aRoutes)
			.then(() => {
				// prêt à afficher/créer mes routes.
				aRoutes.forEach(uneRoute => {
					page(uneRoute.chemin, uneRoute.cb); // Configuration de l'ensemble des routes.
				})
			});

		// Lancement du router, avec les #!/routes (hashbang)
		page({
			hashbang: true
		});


		document.querySelector("main").addEventListener("click", function (evt) {
			
			if (evt.target.classList.contains("actionEnregistrer")) {
				
				const formulaireEnregistrement = document.forms.formulaireEnregistrement;

				const usager = {
					name: formulaireEnregistrement.name.value,
					email: formulaireEnregistrement.email.value,
					password: formulaireEnregistrement.password.value,
					age: formulaireEnregistrement.age.value
				}

				Tache.setUsager(usager);
			}

			if (evt.target.classList.contains("actionEffacerUsager")) {
				if (info.usager.token) {
					Tache.delUsager(info.usager.token);
					info.usager = {};
				}

			}

			if (evt.target.classList.contains("actionConnecter")) {
				const formulaireConnexion = document.forms.formulaireConnexion;

				const usager = {
					email: formulaireConnexion.email.value,
					password: formulaireConnexion.password.value,
				}
				
				Tache.logUsager(usager)
					.then(infoLogin => {
						info.usager = infoLogin;
					});
			}

			if (evt.target.classList.contains("actionDeconnecter")) {
				info.usager = {};
			}

			if (evt.target.classList.contains("actionAjouter")) {
				// let tache = {
				// 	description: "Test tache #" + Math.floor(Math.random() * 100)
				// }

				if (!info.usager.token) {
					return;
				}

				const formulaireAjoutTache = document.forms.formulaireAjoutTache;

				const tache = {
					description: formulaireAjoutTache.description.value
				}

				Tache.setTache(tache, info.usager.token);
			}

		})

	})
})()
