// --- Game Logic Start ---
        
// Hardcoded list of all 151 Kanto (Gen 1) Pokémon
const kantoPokemon = [
    'Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon',
    'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie',
    'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill',
    'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate',
    'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu',
    'Sandshrew', 'Sandslash', 'Nidoran-f', 'Nidorina', 'Nidoqueen',
    'Nidoran-m', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable',
    'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat',
    'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect',
    'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth',
    'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape',
    'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath',
    'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp',
    'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel',
    'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke',
    'Slowbro', 'Magnemite', 'Magneton', 'Farfetchd', 'Doduo', 'Dodrio',
    'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster',
    'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno',
    'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute',
    'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan',
    'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon',
    'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra',
    'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr. Mime',
    'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros',
    'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee',
    'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte',
    'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax',
    'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair',
    'Dragonite', 'Mewtwo', 'Mew'
];

let currentPokemonName = '';
let currentPokemonId = 0;
let score = 0;

const pokemonImage = document.getElementById('pokemon-image');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-btn');
const revealButton = document.getElementById('reveal-btn');
const messageBox = document.getElementById('message-box');
const scoreValue = document.getElementById('score-value');

// Function to start a new round
function startNewRound() {
    // Get a random Pokémon from the list
    const randomIndex = Math.floor(Math.random() * kantoPokemon.length);
    currentPokemonName = kantoPokemon[randomIndex].toLowerCase();
    
    // The image ID is its index in the array + 1
    currentPokemonId = randomIndex + 1; 

    // Construct the URL for the Pokémon sprite
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemonId}.png`;
    pokemonImage.src = imageUrl;

    // Reset the image to a silhouette
    pokemonImage.classList.remove('revealed');

    // Reset UI elements
    guessInput.value = '';
    messageBox.textContent = '';
    guessButton.disabled = false;
    guessInput.focus();
}

// Function to check the user's guess
function checkGuess() {
    const userGuess = guessInput.value.toLowerCase().trim();
    if (userGuess === currentPokemonName) {
        // Correct guess
        messageBox.textContent = 'Correct! It was ' + currentPokemonName.charAt(0).toUpperCase() + currentPokemonName.slice(1) + '!';
        messageBox.className = 'correct';
        pokemonImage.classList.add('revealed');
        score++;
        scoreValue.textContent = score;
        guessButton.disabled = true;
        setTimeout(startNewRound, 2000); // Start new round after 2 seconds
    } else {
        // Incorrect guess
        messageBox.textContent = 'Incorrect! Try again.';
        messageBox.className = 'incorrect';
    }
}

// Function to reveal the Pokémon
function revealPokemon() {
    messageBox.textContent = 'It was ' + currentPokemonName.charAt(0).toUpperCase() + currentPokemonName.slice(1) + '!';
    messageBox.className = 'incorrect';
    pokemonImage.classList.add('revealed');
    guessButton.disabled = true;
    setTimeout(startNewRound, 3000); // Start new round after 3 seconds
}

// Event listeners for user interaction
guessButton.addEventListener('click', checkGuess);
revealButton.addEventListener('click', revealPokemon);
guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Start the first round when the page loads
document.addEventListener('DOMContentLoaded', startNewRound);
