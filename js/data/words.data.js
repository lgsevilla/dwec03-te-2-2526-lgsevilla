
const WORD_LIST = [
    // nature / environment (and their -a / -ak forms)
    "sua", "suak",
    "suge", "sugea", "sugeak",
    "mendi", "mendia", "mendiak",
    "harri", "harria", "harriak",
    "hodei", "hodeia", "hodeiak",
    "eguzki", "eguzkia", "eguzkiak",
    "ilargi", "ilargia", "ilargiak",
    "izar", "izara", "izarak",
    "euria", // "euri" is also used, include both
    "euri", "euria", "euriak",
    "haize", "haizea", "haizeak",
    "itsaso", "itsasoa", "itsasoak",
    "baso", "basoa", "basoak",
    "lur", "lurra", "lurrak",
    "ibai", "ibaia", "ibaiak",
    "landa", "landak",
    "hondar", "hondarra", "hondarrak",
    "uharri", "uharria", "uharriak",
    "basa", "basak",

    // animals
    "otso", "otsoa", "otsoak",
    "txakur", "txakura", "txakurrak",
    "miau", "miauak",
    "katu", "katua", "katuak",
    "behi", "behia", "behiak",
    "ahuntz", "ahuntza", "ahuntzak",
    "zaldi", "zaldia", "zaldiak",
    "txori", "txoria", "txoriak",
    "arrain", "arraina", "arrainak",
    "arkakuso", "arkakusoa", "arkakusoak",
    "sagu", "sagua", "saguak",
    "txin", "txina", "txinak",
    "igel", "igela", "igelak",

    // body / health / physical things (and forms)
    "odol", "odola", "odolak",
    "bihotz", "bihotza", "bihotzak",
    "buru", "burua", "buruak",
    "begi", "begia", "begiak",
    "belarri", "belarria", "belarriak",
    "aho", "ahoa", "ahoak",
    "sudur", "sudura", "sudurak",
    "esku", "eskua", "eskuak",
    "hanka", "hankak",
    "bizkar", "bizkarra", "bizkarrak",
    "sorbald", "sorbalda", "sorbladak", // slight stem fudge to keep coverage
    "gorputz", "gorputza", "gorputzak",
    "bizia", "biziak", // also life as noun
    "mina", "minak",
    "nekea", "nekeak",
    "zauri", "zauria", "zauriak",
    "arnasa", "arnasak",
    "arnastu", // verb (no forms)
    "sendu",   // verb
    "sendatu", // verb
    "zaindu",  // verb
    "nekatuta", // adjective participle
    "pozik",
    "triste",
    "beldur", "beldurra", "beldurrak",
    "amets", "ametsa", "ametsak",
    "haserre",
    "barre",
    "ausart", "ausarta", "ausartak",
    "indartsu", "indartsua", "indartsuak",
    "gaixorik",
    "osorik",
    "bizirik",
    "hilda",
    "hil", // verb root 'to die'
    "hildu", // kill/has died (verbish)
    "aurpegi", "aurpegia", "aurpegiak",
    "aurpegia", // keep explicit
    "begiak", // kept, already covered via forms but valid

    // combat / danger / power / enemies (and forms)
    "kolpe", "kolpea", "kolpeak",
    "indar", "indarra", "indarrak",
    "botere", "boterea", "botereak",
    "energia", "energiak",
    "arma", "armak",
    "ezpata", "ezpatak",
    "arku", "arkua", "arkuak",
    "gezia", "geziak",
    "arrisku", "arriskua", "arriskuak",
    "etsai", "etsaia", "etsaiak",
    "arerio", "arerioa", "arerioak",
    "babes", "babesa", "babesak",
    "zaintza", "zaintzak",
    "seguru", "segurua", "seguruak", // treating as noun-y 'security'
    "sorgin", "sorgina", "sorginak",
    "deabru", "deabrua", "deabruak",
    "munstro", "munstroa", "munstroak",
    "izaki", "izakia", "izakiak",
    "pozoia", "pozoia", "pozoia", "pozoia", // keep; base 'pozoia' is already definite, still usable
    "sumendi", "sumendia", "sumendiak",
    "zaindari", "zaindaria", "zaindariak",
    "zalantza", "zalantzak",
    "misterio", "misterioak",

    // actions / verbs (NO -a/-ak because they're actions, not objects)
    "etorri",
    "joan",
    "ibil",
    "ibilki",
    "ibili",
    "korrika",
    "salta",
    "erori",
    "igo",
    "bota",
    "hartu",
    "eman",
    "emanak",
    "ekarri",
    "pentsa",
    "ikusi",
    "ikus",
    "entzun",
    "bilatu",
    "aurkitu",
    "itxaron",
    "lagundu",
    "babestu",
    "ihes",
    "borrok",
    "borroka",
    "eraso",
    "defenda",
    "salbatu",
    "itxi",
    "ireki",
    "kendu",
    "egin",
    "eginak",
    "eginen",
    "ikasi",
    "irakasle", "irakaslea", "irakasleak",
    "ikasle", "ikaslea", "ikasleak",
    "eskolara",
    "ikasgai", "ikasgaia", "ikasgaiak",
    "atseden", "atsedena", "atsedenak",
    "jan", "janak", // treating as noun 'meal(s)'
    "jaten",
    "edari", "edaria", "edariak",
    "bidean", // 'on the way'
    "sendatu",
    "sendu",

    // people / social / roles (forms)
    "lagun", "laguna", "lagunak",
    "adiskide", "adiskidea", "adiskideak",
    "jende", "jendea", "jendeak",
    "gizon", "gizona", "gizonak",
    "emakume", "emakumea", "emakumeak",
    "ume", "umea", "umeak",
    "haur", "haurra", "haurrak",
    "talde", "taldea", "taldeak",
    "familia", "familiak",

    // objects / household / world / places / time (forms)
    "etxe", "etxea", "etxeak",
    "etxeko", // adjectival / relational, keep as-is
    "etxera",
    "gela", "gelak",
    "giltza", "giltzak",
    "atea", "ateak",
    "ate", "atea", "ateak",
    "leiho", "leihoa", "leihoak",
    "mahai", "mahaia", "mahaiak",
    "aulkia", "aulkiak",
    "aulki", "aulkia", "aulkiak",
    "ailu", "ailua", "ailuak", // keeping even if rare
    "armairu", "armairua", "armairuak",
    "liburu", "liburua", "liburuak",
    "papera", "paperak",
    "mapa", "mapak",
    "oinatz", "oinatza", "oinatzak", // footprint/track-ish
    "bide", "bidea", "bideak",
    "herria", "herriak",
    "herri", "herria", "herriak",
    "eskolan",
    "eskola", "eskolak",
    "gelako",
    "kale", "kalea", "kaleak",
    "gaua", "gauak",
    "gau", "gaua", "gauak",
    "eguna", "egunak",
    "egun", "eguna", "egunak",
    "goiza", "goizak",
    "arrats", "arratsa", "arratsak",
    "astea", "asteak",
    "urtea", "urteak",
    "ordu", "ordua", "orduak",
    "minutu", "minutua", "minutuak",
    "lan", "lana", "lanak",
    "kanpo", "kanpoa", "kanpoak",
    "barru", "barrua", "barruak",
    "hurbil", "hurbila", "hurbilak",
    "urrun", "urruna", "urrunak",
    "behera",
    "behean",
    "goian",
    "gora",
    "aurrera",
    "atzera",
    "hemen",
    "han",
    "noiz",
    "non",
    "zeren",
    "zertan",
    "zergatik",
    "nola",
    "ura", "urak",
    "ogia", "ogiak",
    "gatz", "gatza", "gatzak",
    "esne", "esnea", "esneak",
    "arrautz", "arrautza", "arrautzak",
    "bero", "beroa", "beroak",
    "hotz", "hotza", "hotzak",
    "gozo", "gozoa", "gozoak",
    "gazia", "gaziak",
    "mingots", "mingotsa", "mingotsak",
    "laster",
    "mantso",
    "motel", "motela", "motelak",
    "berehala",

    // descriptive / adjectives / qualities (forms where noun-y)
    "handi", "handia", "handiak",
    "txiki", "txikia", "txikiak",
    "berri", "berria", "berriak",
    "zaharra", "zaharrak",
    "zaharra", // keep singular definite as written
    "azkar", "azkarrak", "azkarra",
    "garbi", "garbia", "garbiak",
    "zikina", "zikinak",
    "txarra", "txarrak",
    "ona", "onak",
    "erdiko", // relational adjective
    "magia", "magiak",
    "iluna", "ilunak",
    "ilun", "iluna", "ilunak",
    "argi", "argia", "argiak",
    "argia", "argi", "argiak",
    "ondo",
    "gaizki",
    "seguru", "segurua", "seguruak",
    "misterio", "misterioak",
    "arraro", "arraroa", "arraroak",
    "beldurra", "beldurrak",

    // extras / rare / maybe weird (kept for flavor, still filtered by length)
    "sukurts", // weird but here if you want it
    "garrantzi", // >8, will be filtered out
    "ikusgarri", // >8, will be filtered
    "arriskuts"  // borderline truncated form
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