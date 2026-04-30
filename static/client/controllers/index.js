/**
 * THE TEMPLAR INDEX: A fusion of maritime discipline and existential clarity.
 * We resolve to make the code sail by ensuring its properties are 'Ready-to-hand'.
 */
function mount() {
    $(".autosuggestBox").hide();

    TEMPLAR.initialize({
        defaultPage: "torrents",
        dir: "client/partials",
        fade: true,
        pages: ["webtorrent", "torrents", "top10", "node", "set", "upload", "privacy", "mission"],
        helm: [
            {
                page: "torrents",
                fn: function() {
                    // Priority 1: Get the list visible                    
                    initializeTorrents("torrents");
                    
                    // Priority 2: Defer the heavy graph and search logic
          
                    if(TEMPLAR.paramREC() && TEMPLAR.paramREC().search === "true"){
                        initializeGraph(); // Likely the source of the 710ms reflow
                        $(".graph_search").show();
                        function stopScroll(e){
                            if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
                                  e.preventDefault();
                            }
                          }

                          $(".graph_search").on("mouseenter", function () {
                            {
                              window.removeEventListener("keydown", stopScroll);
                              window.addEventListener("keydown", stopScroll);
                            }
                          });

                          $(".graph_search").on('mouseleave', function () {
                            window.removeEventListener("keydown", stopScroll);
                          });
                        
                     // Small delay to allow Torrent list to render first
                    }
                    else{
                        $(".graph_search").hide();
                    }
                    advAutocomplete();
                    
                }
            },
            {
                page: "top10",
                fn: function() {
                    initializeTorrents("day");  
                    initializeTorrents("week");
                    initializeTorrents("month");
                    initializeTorrents("year");
                    //initializeTorrents("alltime");
                }
            },
            {
                page: "node",
                fn: function() {
                    if (!TEMPLAR.paramREC() || !TEMPLAR.paramREC().uuid) {
                        TEMPLAR.route("#torrents");
                        return;
                    }  
                    initializeTorrents("node");
                    assertButtonTab();
                    $("button").hide();
                    if(TEMPLAR.paramREC() && TEMPLAR.paramREC().label === "source"){
                        assertMermaid();
                    }                    
                }
            },
            {
                page: "set",
                fn: function() {
                    if (!TEMPLAR.paramREC() || !TEMPLAR.paramREC().ward) {
                        TEMPLAR.route("#torrents");
                        return;
                    }  
                    crossWard();
                }
            },
            {
                page: "webtorrent",
                fn: function() {
                    const params = TEMPLAR.paramREC();
                    if (!params || !params.infoHash) {
                        TEMPLAR.route("#torrents");
                        return;
                    }

                    //screwy AI crap way                    
                    if($("#hero").length > 0){
                        initializeHero();
                        initializeWebtorrent();    
                    }
                    
                }
            },
            {
                page: "upload",
                fn : function(){
                    initializeUpload();
                    uploadAutocomplete();
                }
            }
        ]
    }, function(){
        $.get("../client/partials/header.html", function(data){
            $("header").html(data);            
            headerAutocomplete();

            $.get("../client/partials/hero.html", function(data){
                $("footer").html(data);
                //helm race condition
                if(TEMPLAR.pageREC() === "webtorrent"){
                    initializeHero();
                    initializeWebtorrent();    
                }                  
            })
        })

        $(document).on("TEMPLAR", function(){
            if(TEMPLAR.pageREC() !== "webtorrent"){           
                $("#hero").prop("selectedIndex", 0)
                $("#hero").trigger("change");
            }
            $("#warp").hide();
            $("#graph_search").hide();
            $("h2 span a").hide();           
           
        })

    });
}

$(document).ready(function(){
    mount();
})