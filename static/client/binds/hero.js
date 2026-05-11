var $progressBar
var $numPeers
var $downloaded
var $total
var $remaining
var $uploadSpeed
var $downloadSpeed


//NB infohash is lowercase in hero, not camelCase, because it's an html5 data obj
function assertHero(currentFile) {
    const $existing = $(`#hero option[value="${currentFile.infohash}"]`);

    //called on webtorrent route load, either refresh or a.webtorrent route()
    if ($existing.length !== 0){
        assertSwitch(currentFile.infohash);
        return;
    }

    const $option = $("<option></option>");
    $option.val(currentFile.infohash);
    $option.text(`${currentFile.apa} (${currentFile.format})`);
    
    // Fix: ensure infohash is stored consistently
    $option.data(currentFile);

    $("#hero").append($option);

    // Trigger the download immediately when the file is first added
    DL(currentFile.infohash);

    const $hero = $("#hero");
    // Use 'change' for new selections and 'click' for re-clicking the same one
    $hero.off("click").on("click", function(e) {
        // If the dropdown is open, some browsers don't register 'click' on options.
        // We check the value; if it's valid, we route.
        const $selected = $(this).find("option:selected");
        const val = $selected.val();

        if (!val || val === "null") return;

        // Force route even if it's the same selection
        const routeURL = `#webtorrent?infoHash=${$selected.data("infohash")}&apa=${encodeURIComponent($selected.data("apa"))}&format=${$selected.data("format")}`;
        
        TEMPLAR.route(routeURL);
        
        $(".output").hide();
        $("#output_" + $selected.data("infohash")).show();
        assertPeersProgress();
    });

    assertSwitch(currentFile.infohash)
}


function assertSwitch(infoHash) {
    const $select = $("#hero");
    const $option = $select.find(`option[value="${infoHash}"]`);

    if ($option.length > 0) {
        // Set selected status without triggering '.user_action'
        $select.val(infoHash);
        $option.prop('selected', true);
        
        // Sync the UI elements manually instead of triggering a change event
        $(".output").hide();
        $("#output_" + infoHash).show();
        assertProgress();
    }
}
function assertProgress(){
    $progressBar = document.querySelector('#progressBar');
    $numPeers = document.querySelector('#numPeers');
    $downloaded = document.querySelector('#downloaded')
    $total = document.querySelector('#total')
    $remaining = document.querySelector('#remaining')
    $uploadSpeed = document.querySelector('#uploadSpeed')
    $downloadSpeed = document.querySelector('#downloadSpeed')

    if ($numPeers) $numPeers.innerHTML = 0 + ' peers';
    if ($progressBar) $progressBar.style.width = 0 + '%';
    $downloaded.innerHTML = ""
    $total.innerHTML = ""
    $remaining.innerHTML = ""
    $uploadSpeed.innerHTML = "0 b/s"
    $downloadSpeed.innerHTML = "0 b/s"
}

function onProgress(torrent) {
    const $hero = $("#hero").find("option:selected");
    if(torrent.infoHash === $("#hero").val() || $("#hero").val() === "null"){
        if ($numPeers) $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers');
        const percent = Math.round(torrent.progress * 100 * 100) / 100;
        if ($progressBar) $progressBar.style.width = percent + '%';
        $downloaded.innerHTML = prettyBytes(torrent.downloaded)
        $total.innerHTML = prettyBytes(torrent.length)

        // Remaining time
        let remaining
        if (torrent.done) {
          remaining = 'Done.'
        } else {
          remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
          remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
        }
        $remaining.innerHTML = remaining

        // Speed rates
        $downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s'
        $uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s'      
    }
    
}