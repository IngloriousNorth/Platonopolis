/*   const params = TEMPLAR.paramREC();

    const $option = $("#hero option[value='" + params.infoHash + "']");
    const torrentCache = $option.data("torrent");

    

    if (torrentCache) {

        assertPeersProgress();
    } else {
        if (client.get(params.infoHash)) {
            return; 
        }

        
        DL(params.infoHash);
    }

}*/

function DL(infoHash) {    
    assertProgress();
    assertOutput(infoHash);
    console.log("Downloading: " + infoHash)

    const myTrackers = [
        'wss://tracker.openwebtorrent.com',
        'wss://tracker.webtorrent.dev'
    ];

    client.add(infoHash, { announce: myTrackers }, (torrent) => {
        insertTorrent(infoHash, torrent);

        const interval = setInterval(function(){
            onProgress(torrent);

        },500);

        console.log("DOWNLOADED METADATA")

        

        // Sort files by sequence number
        torrent.files.sort(function(a, b) {
            const matchA = a.name.match(/_(\d+)_/) || a.name.match(/(\d+)/);
            const matchB = b.name.match(/_(\d+)_/) || b.name.match(/(\d+)/);
            const valA = matchA ? parseInt(matchA[1], 10) : 0;
            const valB = matchB ? parseInt(matchB[1], 10) : 0;
            return valA - valB;
        });

        // Initial render of files
        torrent.files.forEach(function(file, index) {
            assertFile(file, torrent.infoHash, index);
        });

        torrent.on('done', function(){
           onDone(torrent);

        });
    })        

    
    
}

function onDone(torrent) {  
    console.log("TORRENT COMPLETE")       
    onProgress(torrent);
    //assertDL(torrent)
    clearInterval(interval);
    // Save the downloaded file handles to the hero option for later cycling
    torrent.files.forEach((file, index) => {
       assertButton(file, torrent.infoHash, index);
    });

   $.post("/rev/" + torrent.infoHash)
}