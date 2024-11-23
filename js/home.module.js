import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Home {
    constructor() {
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                this.changeActive(link);
            });
        });

        this.btnClose = document.getElementById('btnClose');
        this.loading = document.querySelector('.loading');
        this.details = document.getElementById('details');
        this.games = document.querySelector('.games');
        this.ui = new Ui();
        this.getGames("MMORPG");
    }

    async changeActive(link) {
        document.querySelector('.navbar-nav .active').classList.remove('active');
        link.classList.add('active');
        const category = link.getAttribute('data-category');
        this.getGames(category);
    }

    async getGames(cat) {
        this.loading.classList.remove('d-none');
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e832ef8456msh0a127c4f9d51108p1d916ajsn8b07cc1d198e',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`, options);
        const response = await api.json();
        this.loading.classList.add('d-none');
        this.ui.displayDataGame(response);

        document.querySelectorAll('.card').forEach((card, index) => {
            const gameId = response[index].id; 
            card.addEventListener('click', () => {
                this.details.classList.remove('d-none');
                this.games.classList.add('d-none');
                new Details(gameId); 
            });
        });
    }
}
