function initializeHero() {
    const params = TEMPLAR.paramREC();
    // If no params, we might want to default to a 'null' option
    if (!params || !params.infoHash) {
        $("#hero").val("null");
        return;
    }

    const currentFile = {
        apa: params.apa || "Unknown",
        format: params.format || "...",
        infoHash: params.infoHash
    };

    const $existing = $(`#hero option[value="${currentFile.infoHash}"]`);

    if ($existing.length === 0) {
        assertHero(currentFile, params);
    }

    // Update the dropdown to match the current URL silently
    switchSelect(currentFile.infoHash);
}

function switchSelect(infoHash) {
    const $select = $("#hero");
    const $option = $select.find(`option[value="${infoHash}"]`);

    if ($option.length > 0) {
        // Set selected status without triggering '.user_action'
        $select.val(infoHash);
        $option.prop('selected', true);
        
        // Sync the UI elements manually instead of triggering a change event
        $(".output").hide();
        $("#output_" + infoHash).show();
        assertPeersProgress();
    }
}