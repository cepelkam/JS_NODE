const locations = [
    {
        name: "Los Santos",
        type: "Město",
        description: "Velké město inspirované Los Angeles, kde se odehrává většina příběhu GTA V.",
    },
    {
        name: "Vinewood",
        type: "Čtvrť",
        description: "Luxusní čtvrť plná filmových studií, drahých domů a slavného nápisu Vinewood.",
    },
    {
        name: "Sandy Shores",
        type: "Pouštní město",
        description: "Malé pouštní město u jezera Alamo Sea, kde žije Trevor Philips.",
    },
    {
        name: "Paleto Bay",
        type: "Pobřežní město",
        description: "Klidné město na severu mapy známé například loupeží v místní bance.",
    },
    {
        name: "Mount Chiliad",
        type: "Hora",
        description: "Nejvyšší hora v San Andreas s lanovkou, stezkami a tajemstvími.",
    },
    {
        name: "Fort Zancudo",
        type: "Vojenská základna",
        description: "Přísně střežená vojenská základna na západě Blaine County.",
    },
];

function findAll() {
    return locations;
}

module.exports = { findAll };
