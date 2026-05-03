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
    
    // Attach metadata for easy retrieval
    $option.data({
        infohash: params.infoHash,
        apa: params.apa,
        format: params.format
    });

    $("#hero").append($option);

    const $hero = $("#hero");
    // Clear existing listeners to prevent leaks
    $hero.off(".propagate_ui");

    // 1. RE-CLICK HANDLER: Fires even if the value hasn't changed
    $hero.on("click.propagate_ui", function() {
        const val = $(this).val();
        if (!val || val === "null") return;

        // If the URL doesn't match the current selection, force the route
        const currentHash = window.location.hash;
        if (!currentHash.includes(val)) {
            $hero.trigger("change.user_action");
        }
    });

    // 2. CHANGE HANDLER: Only routes when it's a genuine 'user_action'
    $hero.on("change.user_action", function() {
        const $opt = $(this).find('option:selected');
        const val = $opt.val();
        if (!val || val === "null") return;

        // Navigate only if we aren't already there
        TEMPLAR.route(`#webtorrent?format=${$opt.data("format")}&infoHash=${$opt.data("infohash")}&apa=${$opt.data("apa")}`);
        
        $(".output").hide();
        $("#output_" + $opt.data("infohash")).show();
        assertPeersProgress();
    });
}

function switchSelect(infoHash) {
    const $select = $("#hero");
    const $option = $select.find(`option[value="${infoHash}"]`);

    if ($option.length > 0) {
        // Set the value SILENTLY (don't trigger .user_action)
        $select.val(infoHash);
        $option.prop('selected', true);
        
        // Update UI components manually to avoid routing flicker
        $(".output").hide();
        $("#output_" + infoHash).show();
        assertPeersProgress();
    }
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
    if(torrent.infoHash === $("#hero").val() || $("#hero").val() === "null"){
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
    if(!torrent){
        if ($numPeers) $numPeers.innerHTML = 0 + ' peers';
        if ($progressBar) $progressBar.style.width = 0 + "%";
        return;
    }
    if ($numPeers) $numPeers.innerHTML = (torrent.numPeers ? torrent.numPeers : 0) + (torrent.numPeers === 1 ? ' peer' : ' peers');
    const percent = Math.round(torrent.progress * 100 * 100) / 100;
    if ($progressBar) $progressBar.style.width = (percent ? percent : 0) + "%";
}