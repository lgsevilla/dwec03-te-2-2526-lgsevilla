
const WORD_LIST = [
    // nature / environment
    "sua",      // fire
    "suge",     // snake
    "mendi",    // mountain
    "harri",    // stone
    "hodei",    // cloud
    "eguzki",   // sun
    "ilargi",   // moon
    "izar",     // star
    "euria",    // rain
    "haize",    // wind
    "itsaso",   // sea
    "baso",     // forest
    "lur",      // earth
    "ibai",     // river
    "mendiak",  // mountains (plural)
    "landa",    // field / countryside
    "hondar",   // sand
    "uharri",   // gravel/stone (compact form ok)
    "basa",     // wild

    // animals
    "otso",     // wolf
    "txakur",   // dog
    "miau",     // cat sound but fun, keep?
    "katu",     // cat
    "behi",     // cow
    "ahuntz",   // goat
    "zaldi",    // horse
    "txori",    // bird
    "arrain",   // fish
    "arkakuso", // flea (funny but longish -> 8 letters)
    "sagu",     // mouse
    "txin",     // bug/ant-ish (short but okay)
    "igel",     // frog
    "txoriak",  // birds (plural)

    // body / health / feelings
    "odol",     // blood
    "bihotz",   // heart
    "buru",     // head
    "begi",     // eye
    "belarri",  // ear
    "aho",      // mouth
    "sudur",    // nose
    "esku",     // hand
    "hanka",    // leg
    "bizkar",   // back
    "sorbald",  // shoulder (shortened 'sorbald(a)')
    "gorputz",  // body
    "bizia",    // life
    "mina",     // pain
    "nekea",    // tiredness/fatigue
    "pozik",    // happy
    "triste",   // sad
    "beldur",   // fear
    "amets",    // dream
    "ametsa",   // dream (noun)
    "haserre",  // angry
    "barre",    // laugh/laughter
    "nekatuta", // tired (this is 8+ letters, acceptable if <=8)
    "lo",       // sleep (too short, we'll filter it out later)
    "arnasa",   // breath
    "zauri",    // wound
    "sendu",    // heal/recover
    "zaindu",   // to protect / take care of

    // actions / verbs
    "etorri",   // come
    "joan",     // go/leave
    "ibil",     // walk (root)
    "ibilki",   // walk/go along
    "ibili",    // to walk/go around
    "korrika",  // run
    "salta",    // jump
    "erori",    // fall
    "igo",      // climb up
    "bota",     // throw
    "hartu",    // take
    "eman",     // give
    "emanak",   // given
    "ekarri",   // bring
    "pentsa",   // think
    "ikusi",    // see
    "entzun",   // hear
    "bilatu",   // search
    "aurkitu",  // find
    "itxaron",  // wait
    "lagundu",  // help
    "babestu",  // protect/defend
    "zaindu",   // take care
    "ihes",     // escape
    "borrok",   // fight (root of 'borroka')
    "borroka",  // fight/battle
    "eraso",    // attack
    "defenda",  // defend (root/imperative)
    "salbatu",  // save/rescue

    // combat / danger / power
    "kolpe",    // hit
    "indar",    // force, strength
    "botere",   // power
    "energia",  // energy
    "arma",     // weapon
    "armak",    // weapons
    "ezpata",   // sword
    "arku",     // bow
    "gezia",    // arrow
    "arrisku",  // danger
    "etsai",    // enemy
    "arerio",   // rival/enemy
    "babes",    // protection
    "zaintza",  // guarding
    "seguru",   // safe
    "sorgin",   // witch
    "deabru",   // demon/devil
    "munstro",  // monster
    "izaki",    // creature/being
    "izakia",   // being (with article)
    "pozoia",   // poison
    "sumendi",  // volcano
    "sukurts",  // eh, skip weird bank forms, we won't include this

    // objects / world / places
    "etxe",     // house
    "etxea",    // the house
    "gela",     // room
    "giltza",   // key
    "atea",     // the door
    "ate",      // door
    "leiho",    // window
    "mahai",    // table
    "aulkia",   // chair
    "ailu",     // (skip weird or rare forms)
    "armairu",  // closet/cabinet
    "armairuak",
    "liburu",   // book
    "papera",   // paper
    "mapa",     // map
    "oinatz",   // footprint/track
    "bide",     // path / way
    "bidea",    // the way / the path
    "herria",   // town
    "herri",    // people / nation
    "etxeko",   // domestic / of the house
    "eskolan",  // at school
    "eskola",   // school
    "gelako",   // of the classroom
    "kalea",    // the street
    "kale",     // street
    "gaua",     // night
    "eguna",    // day
    "goiza",    // morning
    "gau",      // night (short, <3 later filtered)
    "arrats",   // root of afternoon/evening
    "arratsa",  // evening
    "astea",    // the week
    "urtea",    // the year
    "ordu",     // hour
    "minutu",   // minute

    // adjectives / descriptions
    "handi",    // big
    "txiki",    // small
    "berri",    // new
    "zaharra",  // old
    "beroa",    // hot/warm
    "hotz",     // cold
    "azkar",    // fast
    "motel",    // slow
    "arraro",   // strange
    "txarra",   // bad
    "ona",      // good (short, <3 later filtered)
    "ikusgarri",// impressive (too long, will be cut)
    "erdiko",   // middle
    "garrantzi",// importance (longer, likely >8, filtered)
    "magia",    // magic (loan-y, but totally allowed)
    "misterio", // mystery (8 letters, nice)
    "iluna",    // dark (adjective)
    "argia",    // light/bright (noun/adj)
    "garbi",    // clean
    "zikina",   // dirty
    "arriskuts",// dangerous-ish truncated (we’ll drop if >8 or weird)
];

function isAcceptableWord(w) {
    const len = w.length;
    if (len < 3 || len > 8) return false;
    return /^[a-z]+$/.test(w);
}

const FILTERED_WORDS = Array.from(
    new Set(
        WORD_LIST
            .map(w => w.toLowerCase().trim())
            .filter(isAcceptableWord)
    )
);

export const WORDS_BASQUE = FILTERED_WORDS;
export const WORDS_BASQUE_SET = new Set(FILTERED_WORDS);

// Validation helper
export function isWordValidBasque(rawWord) {
    if (!rawWord) return false;
    const w = rawWord.toLowerCase().trim();
    if (!isAcceptableWord(w)) return false;
    return WORDS_BASQUE_SET.has(w);
}