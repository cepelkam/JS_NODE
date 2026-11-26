const locations = [
    {
        name: "Los Santos",
        type: "Město",
        description: "Velké město inspirované Los Angeles, kde se odehrává většina příběhu GTA V.",
        image: "https://www.igrandtheftauto.com/content/images/lg/3603-gta5-just-another-wonderful-sunset-in-los-santos.jpg",
    },
    {
        name: "Vinewood",
        type: "Čtvrť",
        description: "Luxusní čtvrť plná filmových studií, drahých domů a slavného nápisu Vinewood.",
        image: "https://www.igta5.com/images/gta-5-trailer-1--vinewood-sign.jpg",
    },
    {
        name: "Sandy Shores",
        type: "Pouštní město",
        description: "Malé pouštní město u jezera Alamo Sea, kde žije Trevor Philips.",
        image: "https://staticg.sportskeeda.com/editor/2022/10/8808f-16648984046483.png?w=1200",
    },
    {
        name: "Paleto Bay",
        type: "Pobřežní město",
        description: "Klidné město na severu mapy známé například loupeží v místní bance.",
        image: "https://i.imgur.com/KBdQXTo.jpeg",
    },
    {
        name: "Mount Chiliad",
        type: "Hora",
        description: "Nejvyšší hora v San Andreas s lanovkou, stezkami a tajemstvími.",
        image: "https://miro.medium.com/max/1400/1%2A-rdoU_qT5-Ww5zjySWbCmw.png",
    },
    {
        name: "Fort Zancudo",
        type: "Vojenská základna",
        description: "Přísně střežená vojenská základna na západě Blaine County.",
        image: "https://cdn.mos.cms.futurecdn.net/sP2pbPhscE36WWeiwS7Tsn-1200-80.jpg",
    },
];

function findAll() {
    return locations;
}

module.exports = { findAll };
