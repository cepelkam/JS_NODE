const locations = [
    {
        name: "Los Santos",
        type: "Město",
        description: "Velké město inspirované Los Angeles, kde se odehrává většina příběhu GTA V.",
        image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "Vinewood",
        type: "Čtvrť",
        description: "Luxusní čtvrť plná filmových studií, drahých domů a slavného nápisu Vinewood.",
        image: "https://images.unsplash.com/photo-1515896769750-31548aa180ed?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "Sandy Shores",
        type: "Pouštní město",
        description: "Malé pouštní město u jezera Alamo Sea, kde žije Trevor Philips.",
        image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "Paleto Bay",
        type: "Pobřežní město",
        description: "Klidné město na severu mapy známé například loupeží v místní bance.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "Mount Chiliad",
        type: "Hora",
        description: "Nejvyšší hora v San Andreas s lanovkou, stezkami a tajemstvími.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "Fort Zancudo",
        type: "Vojenská základna",
        description: "Přísně střežená vojenská základna na západě Blaine County.",
        image: "https://images.unsplash.com/photo-1532664189809-02133fee698d?auto=format&fit=crop&w=900&q=80",
    },
];

function findAll() {
    return locations;
}

module.exports = { findAll };
