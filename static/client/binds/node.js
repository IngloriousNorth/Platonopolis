function assertNodeNameFromData() {
    const params = TEMPLAR.paramREC();
    const targetUuid = params?.uuid ? String(params.uuid).trim().toLowerCase() : null;
    const targetLabel = params?.label; // 'source', 'author', 'class', 'publisher'

    // We must use the raw data, not the HTML strings array
    const dataSource = (typeof tableData !== 'undefined' && tableData.records) ? tableData.records : null;

    if (!dataSource || !Array.isArray(dataSource) || !targetUuid) {
        return;
    }

    let targetName = "";

    for (const record of dataSource) {
        if (targetName) break;
        const fields = record._fields;
        if (!fields) continue;

        // 1. Check Source (Field 0)
        if (fields[0]?.properties?.uuid && String(fields[0].properties.uuid).toLowerCase() === targetUuid) {
            targetName = fields[0].properties.name || fields[0].properties.title;
        }

        // 2. Check Authors (Field 1 - Array)
        if (!targetName && Array.isArray(fields[1])) {
            const match = fields[1].find(node => node.properties?.uuid && String(node.properties.uuid).toLowerCase() === targetUuid);
            if (match) targetName = match.properties.name;
        }

        // 3. Check Classes (Field 3 - Array)
        if (!targetName && Array.isArray(fields[3])) {
            const match = fields[3].find(node => node.properties?.uuid && String(node.properties.uuid).toLowerCase() === targetUuid);
            if (match) targetName = match.properties.name;
        }

        // 4. Check Publisher (Field 2 - Nested in edition_torrent array)
        if (!targetName && Array.isArray(fields[2])) {
            for (const et of fields[2]) {
                if (et.publisher?.properties?.uuid && String(et.publisher.properties.uuid).toLowerCase() === targetUuid) {
                    targetName = et.publisher.properties.name;
                    break;
                }
            }
        }
    }

    if (targetName) {
        const decoded = decodeEntities(decodeEntities((targetName)))
        updateTitleUI(decoded, targetLabel);
        assertGraphButton(encodeURIComponent(decoded));
    }
}

function updateTitleUI(name, label) {
    const colors = {
        source: "white",
        author: "yellow",
        class: "green",
        publisher: "red"
    };

    switch(label){
        case "source":
            name = toTitleCase(name);
            break;
        case "author":
            break;
        case "class":
            break;
        case "publisher":
            name = toTitleCase(name)
            break;
    }

    $("#nodeTitle span a").text(name)
       .addClass(label)
       .attr("href", "#node?label=" + label + "&uuid=" + (TEMPLAR.paramREC() ? TEMPLAR.paramREC().uuid : "undefined"))
       .css("color", colors[label] || "white").removeClass("gold").removeClass("red")   

    TEMPLAR.DOM();

/*    $(document).off("TEMPLAR_SHIFT", "a.TEMPLAR").on("TEMPLAR_SHIFT", "a.TEMPLAR", function(e){
        // 1. Prevent the mobile system menu from  assertTitleLoaded();aring //arising? airing this out
        const $self = $(this);
        const className = $self.attr('class').split(' ')[2];
        const text = encodeURIComponent($self.text());
        resetGraphParams();
        walkGraph(className, text);
    })     

    $(document).off("TEMPLAR_CTRL", "a.TEMPLAR").on("TEMPLAR_CTRL", "a.TEMPLAR", function(e){
        // 1. Prevent the mobile system menu from  assertTitleLoaded();aring //arising? airing this out
        const $self = $(this);
        const className = $self.attr('class').split(' ')[2];
        const text = encodeURIComponent($self.text());
        walkGraph(className, text);
    })      */        
}

function assertButtonTab(){
    switch(TEMPLAR.paramREC().label){
        case "source":
            $("#warp").fadeIn(1337);
            $("#graph_search").show();
            break;
        default:
            $("#warp").hide()
            $("#graph_search").show();
            break;
    }
}

function assertGraphButton(searchable){
    $("#graph_search").off("click")
    $("#graph_search").on("click", function(e){
        e.preventDefault();        
        walkGraph(TEMPLAR.paramREC().label, searchable);        
    })
}