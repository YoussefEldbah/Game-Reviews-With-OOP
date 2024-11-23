import { Ui } from "./ui.module.js";

export class Details {
    constructor(gameId) {
        document.getElementById('btnClose').addEventListener('click', () => {
            document.getElementById('details').classList.add('d-none');
            document.getElementById('games').classList.remove('d-none');
        });

        this.getDetails(gameId); 
    }

    async getDetails(gameId) { 
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e832ef8456msh0a127c4f9d51108p1d916ajsn8b07cc1d198e',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, options);
        const response = await api.json();
        new Ui().displayDetails(response);
        console.log(response);
    }
}
