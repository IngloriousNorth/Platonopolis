# WELCOME

Gazelle-WebTorrent is an Open Source BitTorrent Indexer for WebTorrent inspired by the innovative Information Architecture of Project Gazelle. It was originally made with the intention of a public domain educational use-case and has been open-sourced with an MIT License. 

Please note that the organizer of this code has no association with any members of Project Gazelle. It is simply an Open Source JQuery/WebTorrent Library generated based on their very innovative and secretive architecture. 

My site was propagate.info, meant for public domain, educational Ebooks, Audiobooks, Classical Music, Documentaries, and Renaissance Art. Starting with an educational use-case, I have decided to Open-Source this Software, because the way that Gazelle structures Libraries could be very innovative for research, ethics, and scholarship. This work was conceived in December 2013, and WebTorrent came out in 2016. After struggling with WebTorrent seeding for 4 years and failing to receive my SSI in time to renew my AWS subscription, I gave up on my goal of building a public library. 2 days later my SSD failed so I can't seed. 


Fully built in and plug-in play is a Quantum Random Neo4J Recommendation Engine, which also works on mobile, making this the first quantum mobile app. There is also graph visualization (with VR-toggle), which coheres with an Advanced Search feature, so that users can search by title, author, class, publisher, source type, media, format, and resolution.

# GETTING STARTED

The server is express/node.js, and the Database is Neo4j; downloads are to work using WebTorrent in the Browser. The Library renders a paginated JQuery DataTable and a ForceGraphVR to the client (under the advanced search-condition). I have developed an in-house client-side SPA-router called TEMPLAR, which routes using #anchors and uriParams, as a lightweight alternative to AngularJS. You will find the TEMPLAR router on my GitHub page.

The whole thing follows MVC architecture based on AngularJS, where a "bind" is a DOM manipulator. 

This should be literally plug-and-play, all you have to do to get a fully working WebTorrent Indexer is 1) Set up a Neo4J Database, 2) Input your Neo4J credentials into config.js, and 3) Edit the torrents.js model to suit the types, media, formats, and resolutions of your public domain media. 

To get started, you will need to:

*Start a Neo4j Aura Database, or host your own* (they have a free Community Edition up to 200,000 or so nodes)!

*Edit config.js and enter your Neo4j credentials.*

*Edit the Torrents model under static/client/models* Insert Source types (such as Documentary, or Renaissance Art), edition_torrent media (such as Ebook or Concert), and edition_torrent format (such as PDF or mp3), and resolutions (such as v0, 720p or 1080x720) For perspective, an Ebook vs Audiobook would be [media] and a PDF vs djvu would be [format]. 

*Edit the torrents.js bind map function and relate Image thumbnails to Source types*, also put your image thumbnails in the static/img folder

*Host server.js, config.js, static/, and js/ on a node.js platform; you might have to work out the express port on certain platforms*

OPTIONAL:
*For codecs* There is no codec <select> model. mp3 bitrates are resolutions but mkvs have codecs in addition to resolution, so the current code uses a "format (codec)" paradigm, so mkv and mkv(x264) are different "formats" (the codec is baked into the format), but you could use resolutions as in 1080p / x264 vs. 1080p. 

