function initializeWebtorrent(){
   const params = TEMPLAR.paramREC();

    const $option = $("#hero option[value='" + params.infoHash + "']");
    const torrentCache = $option.data("torrent");

    if (torrentCache) {
        $("#output").empty();
        torrentCache.files.forEach(function(file) {
            appendFile(file, torrentCache.infoHash);
        });
        assertPeersProgress();
    } else {
        $("#output").empty();
        // New download required
        DL(params.infoHash);
    }
}

function DL(infoHash) {
    
    assertProgress();

    const torrent = WebTorrent.add(getMagnetURI(infoHash));  
    torrent.on('wire', function(){
        insertTorrent(infoHash, torrent);
        assertPeersProgress();
    })

    torrent.on("metadata", function(){
        const interval = setInterval(function(){
            onProgress(torrent);

        },500);

        

        // Sort files by sequence number
        torrent.files.sort(function(a, b) {
            const matchA = a.name.match(/_(\d+)_/) || a.name.match(/(\d+)/);
            const matchB = b.name.match(/_(\d+)_/) || b.name.match(/(\d+)/);
            const valA = matchA ? parseInt(matchA[1], 10) : 0;
            const valB = matchB ? parseInt(matchB[1], 10) : 0;
            return valA - valB;
        });

        // Initial render of files
        torrent.files.forEach(function(file) {
            appendFile(file, torrent.infoHash);
        });

        
    })        

    torrent.on('done', function(){
       onDone(torrent);

    });
    
}

function onDone(torrent) {         
    onProgress(torrent);
    //assertDL(torrent)
    clearInterval(interval);
    // Save the downloaded file handles to the hero option for later cycling
    console.log("Transmission Complete. Filelist cached.");
}