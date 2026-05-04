function assertOutput(infoHash){
    //add #output_infoHash div, controlled by hero.js
    $(".output").hide();  

    const prim = $("#output_" + infoHash).length;

    if(prim){
        $("#output_" + infoHash).show();
    }
    else{
        const output = document.createElement("div");
        $(output).attr("id", "output_" + infoHash);
        $(output).addClass("output");
        $("div.webtorrent").append(output);
        $(output).show();
    }
    
}

function assertFile(file, infoHash) {
    const fileContainerId = "wrapper-" + file.name.replace(/[^a-z0-9]/gi, '-');
    let $container = $("#" + fileContainerId);
    const heroInfoHash = $("#hero").find("option:selected").val();

    // Create container if it doesn't exist
    if ($container.length === 0) {
        $container = $("<div class='file-entry' style='margin-bottom: 25px;'></div>").attr("id", fileContainerId);
        $("#output_" + infoHash).append($container);
        
        console.log(heroInfoHash, infoHash)
        // Render media content (Audio/Video/Img)

        if (heroInfoHash === infoHash) {
            const container = document.querySelector("#" + fileContainerId);

            // Use the async pattern they used in the example
            (async () => {
                try {
                    // 1. Get the blob using the modern promise method
                    const blob = await file.blob();
                    const url = URL.createObjectURL(blob);

                    // 2. Decide which element to create
                    let element;
                    const fileName = file.name.toLowerCase();

                    if (fileName.endsWith('.pdf')) {
                        element = document.createElement('embed');
                        element.type = 'application/pdf';
                        element.style.height = '80vh';
                    } else if (fileName.match(/\.(mp4|webm|ogg|mkv)$/)) {
                        element = document.createElement('video');
                        element.controls = true;
                    } else if (fileName.match(/\.(mp3|flac|wav)$/)) {
                        element = document.createElement('audio');
                        element.controls = true;
                    } else if (fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
                        element = document.createElement('img');
                    }

                    if (element) {
                        element.src = url;
                        element.style.width = '100%';
                        
                        container.appendChild(element);
                        console.log(`Rendered: ${file.name}`);
                    }
                } catch (err) {
                    console.error("Modern blob retrieval failed:", err.message);
                }
            })();
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

function assertButton(file, infoHash) {
    const statusId = "status-" + file.name.replace(/[^a-z0-9]/gi, '-');
    const $statusElement = $("#" + statusId);
    
    // Only proceed if there is a placeholder to replace
    if ($statusElement.length > 0) {
        // We MUST wrap this in an IIFE and EXECUTE it with () at the end
        (async () => {
            try {
                // 1. Get the blob using the modern promise method
                const blob = await file.blob();
                const url = URL.createObjectURL(blob);

                // 2. Create the high-contrast terminal button
                const btn = document.createElement('a');
                btn.href = url;
                btn.download = file.name;
                btn.innerText = "DL: " + file.name;
                btn.className = "download-button-main";
                
                // Styling
                btn.style.cssText = "display:inline-block; padding:10px; margin-top:5px; margin-bottom:10px; background:#50C777; color:skyblue; border:1px solid #00ccff; text-decoration:none; font-family:monospace; font-size:14px; border-radius:3px; cursor:pointer;";

                // Stop the click from triggering TEMPLAR's global router
                btn.onclick = (e) => e.stopPropagation();

                // 3. Perform the swap
                // Using a more robust check for the current page
                const currentParams = TEMPLAR.paramREC();
                if (currentParams && currentParams.infoHash === infoHash) {
                    $statusElement.replaceWith(btn);
                    $(btn).after("<br>");
                }
            } catch (err) {
                console.error("Button generation failed:", err);
                $statusElement.text("[ ERROR: ARCHIVE EXTRACTION FAILED ]").css("color", "#ff0000");
            }
        })(); // <--- These parentheses are what trigger the function!
    }
}
