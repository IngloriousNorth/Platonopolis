var $progressBar
var $numPeers
var $downloaded
var $total
var $remaining
var $uploadSpeed
var $downloadSpeed


function assertHero(currentFile, params) {
    const $option = $("<option></option>");
    
    $option.val(currentFile.infoHash);
    $option.text(`${currentFile.apa} (${currentFile.format})`);
    
    // Store metadata
    $option.data("infohash", params.infoHash);
    $option.data("apa", params.apa);
    $option.data("format", params.format);

    $("#hero").append($option);

    // Re-bind change event (using off to prevent double-binding)
    $("#hero").off("change").on("change", function() {
        const $opt = $(this).find('option:selected');
        const val = $opt.val();
        if (!val || val === "null") return;

        // Route to the selected file
        TEMPLAR.route(`#webtorrent?format=${$opt.data("format")}&infoHash=${$opt.data("infohash")}&apa=${$opt.data("apa")}`);
    });
 
}

function assertProgress(){
    $progressBar = document.querySelector('#progressBar');
    $numPeers = document.querySelector('#numPeers');
    $downloaded = document.querySelector('#downloaded');
    $total = document.querySelector('#total');
    $remaining = document.querySelector('#remaining');
    $uploadSpeed = document.querySelector('#uploadSpeed');
    $downloadSpeed = document.querySelector('#downloadSpeed');
    if ($numPeers) $numPeers.innerHTML = 0 + ' peers';
    if ($progressBar) $progressBar.style.width = 0 + '%';
}

function onProgress(torrent) {
    const $hero = $("#hero").find("option:selected");
    if(torrent.infoHash === $("#hero").val()){
        if ($numPeers) $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers');
        const percent = Math.round(torrent.progress * 100 * 100) / 100;
        if ($progressBar) $progressBar.style.width = percent + '%';
        if ($downloaded) $downloaded.innerHTML = prettyBytes(torrent.downloaded);
        if ($total) $total.innerHTML = prettyBytes(torrent.length);

        if ($remaining) {
            let remaining = torrent.done ? 'Done.' : moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize() + ' remaining.';
            $remaining.innerHTML = remaining.charAt(0).toUpperCase() + remaining.slice(1);
        }

        if ($downloadSpeed) $downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s';
        if ($uploadSpeed) $uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s';
    }
    
}

function assertPeersProgress(){
    const $hero = $("#hero").find("option:selected");
    const torrent = $hero.data("torrent");
    if ($numPeers) $numPeers.innerHTML = (torrent.numPeers ? torrent.numPeers : 0) + (torrent.numPeers = 1 ? ' peer' : ' peers');
    const percent = Math.round(torrent.progress * 100 * 100) / 100;
    if ($progressBar) $progressBar.style.width = (percent ? percent : 0) + "%";
}