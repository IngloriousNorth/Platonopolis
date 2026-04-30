function appendFile(file, infoHash) {
    const fileContainerId = "wrapper-" + file.name.replace(/[^a-z0-9]/gi, '-');
    let $container = $("#" + fileContainerId);
    const heroInfoHash = $("#hero").find("option:selected").val();

    // Create container if it doesn't exist
    if ($container.length === 0) {
        $container = $("<div class='file-entry' style='margin-bottom: 25px;'></div>").attr("id", fileContainerId);
        $("#output").append($container);
        
        // Render media content (Audio/Video/Img)
        if(heroInfoHash === infoHash){
            file.appendTo($container[0]);
        }
    }

    // Target media files for download buttons
    const isMedia = file.name.match(/\.(mp3|mp4|webm|ogg|wav|mov|m4a)$/i);
    if (isMedia) {
        const statusId = "status-" + file.name.replace(/[^a-z0-9]/gi, '-');
        
        // Prevent duplicate status messages
        if (!document.getElementById(statusId)) {
            const statusLabel = document.createElement('div');
            statusLabel.id = statusId;
            statusLabel.innerText = "[" + file.name + "]";
            
            // Retro-tech terminal styling
            statusLabel.style.cssText = "display:inline-block; padding:10px; margin-bottom:10px; font-family:'Share Tech Mono', system-ui; color:skyblue; border:1px dashed #ffff00; font-size:13px; background:rgba(0,0,0,0.5);";
            
            if(heroInfoHash === infoHash){
                // Place it at the top of the media container
                $container.prepend(statusLabel);
                $(statusLabel).after("<br>")
            }
        }
    }
}

function appendButton(file, infoHash) {
    const statusId = "status-" + file.name.replace(/[^a-z0-9]/gi, '-');
    const $statusElement = $("#" + statusId);
    const heroInfoHash = $("#hero").find("option:selected").val();
    
    // Only proceed if there is a placeholder to replace
    if ($statusElement.length > 0) {
        file.getBlobURL((err, url) => {
            if (err) {
                $statusElement.text("[ ERROR: ARCHIVE EXTRACTION FAILED ]").css("color", "#ff0000");
                return;
            }

            // Create the high-contrast terminal button
            const btn = document.createElement('a');
            btn.href = url;
            btn.download = file.name;
            btn.innerText = "DL: " + file.name;
            btn.className = "download-button-main";
            
            // Academic styling (monospace, cyan, high-contrast)
            btn.style.cssText = "display:inline-block; padding:10px; margin-top:5px; margin-bottom:10px; background:#50C777; color:skyblue; border:1px solid #00ccff; text-decoration:none; font-family:monospace; font-size:14px; border-radius:3px; cursor:pointer;";

            // Stop the click from triggering TEMPLAR's global router
            btn.onclick = (e) => e.stopPropagation();

            // Perform the swap and add a line break for sequential files (like MP3s)
            if (TEMPLAR.paramREC() && TEMPLAR.paramREC().infoHash === infoHash) {
                $statusElement.replaceWith(btn);
                $(btn).after("<br>");
            }
        });
    }
}