//get players details by search by player name
const allPlayers = () => {
    document.getElementById("player-container").innerHTML = ""; //clear div data
    //document.getElementById("spinner").style.display = "block"; //spinner show
    const searchInput = document.getElementById("search-box");
    const searchValue = searchInput.value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.player == null);
            if (data.player == null) {
                document.getElementById("spinner").style.display = "block";//spinner show
            } else {
                showPlayersDetails(data.player);
                document.getElementById("spinner").style.display = "none"; //spinner hide
            }
        });
    searchInput.value = ''; //clear input field
};

const showPlayersDetails = (players) => {
    //console.log(players);
    const parent = document.getElementById("player-container");

    for (const player of players) {
        // console.log(player.strPlayer);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card border p-5">
                        <div class="pro-pic">
                            <img src="${player.strThumb}" alt="" class="w-50" >
                        </div>
                        <h2>Name:${player.strPlayer}</h2>
                        <h4>Country: ${player.strNationality}</h4>
                        <p></p>
                        <div class="allbutton">
                            <button class="btn btn-danger">delete</button>
                            <button onclick="playerDetails('${player.idPlayer}')" class="btn btn-success">details</button>
                        </div>
                    </div>
        `;
        parent.appendChild(div);
        // console.log(players);
    }
}

//get one player details by ID
const playerDetails = (playerId) => {
    // console.log(playerId);
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPlayerDetails(data.players[0]))
}

const showPlayerDetails = (players) => {
    //console.log(players.strGender);

    //show male or female image depend on gender of male and female 
    if (players.strGender == 'Male') {
        document.getElementById("male").style.display = "block";
        document.getElementById("female").style.display = "none";
    } else {
        document.getElementById("male").style.display = "none";
        document.getElementById("female").style.display = "block";
    }

    //show name of player
    document.getElementById("details-container").innerHTML = `
    <div>
      <img src="" alt="">
      <h2>Name: ${players.strPlayer}</h2>
    </div>
    `;
}