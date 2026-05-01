function initializeHero() {
    const params = TEMPLAR.paramREC();
    if (!params || !params.infoHash) return;

    const currentFile = {
        apa: params.apa || "Unknown",
        format: params.format || "...",
        infoHash: params.infoHash
    };

    // 1. Check if entry exists using a template literal for safety
    const $existing = $(`#hero option[value="${currentFile.infoHash}"]`);

    if ($existing.length === 0) {
        // 2. Create it if missing (happens on hard reload)
        assertHero(currentFile, params);
    }

    // 3. Force selection
    switchSelect(currentFile.infoHash);
}

function switchSelect(infoHash) {
    const $select = $("#hero");
    const $option = $select.find(`option[value="${infoHash}"]`);

    if ($option.length > 0) {
        // Setting .val() is usually enough, but .prop('selected') 
        // is more reliable for dynamic appends on page load
        $option.prop('selected', true);
        $select.val(infoHash);
        
        // Trigger change so other listeners know the UI updated
        $select.trigger('change.ui_sync'); 
    }
}