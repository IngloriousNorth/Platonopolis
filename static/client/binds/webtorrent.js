function appendFile(file, infoHash) {
    // 1. Render content (Video/Audio/Img/PDF) to main stage
    file.appendTo("#output");

    // 2. Generate and append download button
    file.getBlobURL((err, url) => {
        if (err) return;
        
        const buttonId = "dl-" + file.name.replace(/[^a-z0-9]/gi, '-');
        if (document.getElementById(buttonId)) return;

        const btn = document.createElement('a');
        btn.href = url;
        btn.download = file.name;
        btn.innerText = "DL: " + file.name;
        btn.className = "download-button-main";
        
        // Branded terminal styling
        btn.style.cssText = "display:inline-block; padding:10px; margin-top:5px; margin-bottom:5px; background:#1a1a1a; color:#00ccff; border:1px solid #00ccff; text-decoration:none; font-family:monospace; font-size:14px; border-radius:3px;";

        /**
         * THE FIX: STOP THE ROUTER HIJACK
         * We stop the click event from reaching the document level 
         * where TEMPLAR's global listener is waiting.
         */
        btn.onclick = function(e) {
            e.stopPropagation(); 
            // The browser will now handle the click naturally,
            // triggering the 'download' attribute logic.
        };
        // Ensure we are still looking at the correct torrent before adding
        if(TEMPLAR.paramREC() && TEMPLAR.paramREC().infoHash === infoHash) {
             //$("#output").prepend(btn);
        }
    
    });   
}