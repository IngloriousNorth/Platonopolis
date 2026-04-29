var $progressBar
var $numPeers
var $downloaded
var $total
var $remaining
var $uploadSpeed
var $downloadSpeed

async function assertDL(torrent) {
    const isMultiFile = torrent.files.length > 1;
    const buttonId = isMultiFile ? `dl-zip-${infoHash}` : `dl-${torrent.files[0].name.replace(/[^a-z0-9]/gi, '-')}`;

    // Prevent duplicate buttons
    if (document.getElementById(buttonId)) return;

    const btn = document.createElement('a');
    btn.className = "DL";
   
    // Stop TEMPLAR router hijack
    btn.onclick = (e) => e.stopPropagation();

    if (isMultiFile) {
        btn.innerText = `DL`;
        
        btn.addEventListener('click', async () => {
            btn.innerText = "ZIPPING...";
            btn.style.borderColor = "#ffff00";
            btn.style.color = "#ffff00";

            const zip = new JSZip(); // Assumes JSZip is loaded in your project
            
            try {
                // Map all files to blob promises
                const filePromises = torrent.files.map(file => {
                    return new Promise((resolve, reject) => {
                        file.getBlob((err, blob) => {
                            if (err) reject(err);
                            zip.file(file.path, blob); // Use file.path to maintain folder structure
                            resolve();
                        });
                    });
                });

                await Promise.all(filePromises);
                const content = await zip.generateAsync({ type: "blob" });
                
                // Trigger download
                const zipUrl = URL.createObjectURL(content);
                const link = document.createElement('a');
                link.href = zipUrl;
                link.download = `${torrent.name}.zip`;
                link.click();
                
                btn.innerText = "DOWNLOAD COMPLETE";
                btn.style.borderColor = "#00ff00";
                btn.style.color = "#00ff00";
            } catch (err) {
                console.error("Zip Error:", err);
                btn.innerText = "ZIP FAILED";
                btn.style.borderColor = "#ff0000";
            }
        });
    } else {
        // Original Single File Logic
        const file = torrent.files[0];
        file.getBlobURL((err, url) => {
            if (err) return;
            btn.href = url;
            btn.download = file.name;
            btn.innerText = "DL";
        });
    }

    // Context check before appending to #output
    if (TEMPLAR.paramREC() && TEMPLAR.paramREC().infoHash === torrent.infoHash) {
        $("#hero_client").append(btn);
    }
}

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
    console.log(torrent.progress)
}