var torrent = null;
var magnetURI = ""
var interval = null;
var wired = false;
var client;

async function insertClient(){
    client = new WebTorrent({
      dht: true,  // Enables Distributed Hash Table (finding peers without trackers)
      lsd: true,  // Enables Local Service Discovery (finding peers on your local WiFi)
      tracker: true // Enables standard tracker support
    });
    const controller = await navigator.serviceWorker.register('/sw.min.js', { scope: './' })
    await navigator.serviceWorker.ready
    client.createServer({ controller })
}



function getMagnetURI(infoHash){
    return "magnet:?xt=urn:btih:" + infoHash + "&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce";
}

/*
var queue = [];

function Q_FILE() {
    // 1. Create the file object
    let fileObj = {
    	//this is where webtorrent controller gets the id, which is set in queue.forEach(currentFile = )
        id: parseInt(TEMPLAR.paramREC().id),
        media: TEMPLAR.paramREC().media,
        format: TEMPLAR.paramREC().format,
        release: TEMPLAR.paramREC().release,
        apa: decodeURIComponent(TEMPLAR.paramREC().apa),
        interval: null, // Placeholder for the progress timer
        fileRefs: []      // Placeholder for the WebTorrent file object
    };
    const Q = queue.find(Q => Q.id === parseInt(TEMPLAR.paramREC().id))
    if(Q) return Q;

    // 2. Push to queue
    queue.push(fileObj);

    return fileObj;    

}*/