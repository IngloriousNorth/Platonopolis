**WELCOME**

Gazelle-WebTorrent is an Open Source BitTorrent Indexer for WebTorrent inspired by the innovative Information Architecture of Project Gazelle.

Please note that the organizer of this code has no association with any members of Project Gazelle. It is simply an Open Source JQuery/WebTorrent Library generated based on their very innovative and secretive architecture. Here's the genius of Gazelle for library organization: PDFs and mp3s of the same Edition/Translation are listed under the same DataTable heading, and my style was to list two Editions of the same Source Title under the same dataTable dtrg-group heading. 

Classes (tags), Authors, and Publishers all have their own page, what is a corresponding DataTable of Source->Edition->Torrent. 

My site is propagate.info, meant for public domain, educational Ebooks, Audiobooks, Classical Music, Documentaries, and Renaissance Art. Starting with an educational use-case, I have decided to Open-Source this Software, because the way that Gazelle structures Libraries could be very innovative for research, ethics, and scholarship. This work was conceived in December 2013, and WebTorrent came out in 2016. 

Seeding in BiglyBT with the WebTorrent plugin works, WebTorrent Desktop works for few torrents and I am currently using qBitTorrent libtorrent 2.1 -webtorrent, which you can find the .exe of in my repository.

Fully built in and plug-in play is a Quantum Random Neo4J Recommendation Engine, which also works on mobile, making this the first quantum mobile app. There is also graph visualization (with VR-toggle), which coheres with an Advanced Search feature, so that users can search by title, author, class, publisher, source type, media, format, and resolution. If you search, say, Russell, Hume in the authors input, you will see them connected in a graph by "All is Quiet on the Western Front," almost like magic.  

**GETTING STARTED**

The server is express/node.js, and the Database is Neo4j; downloads are to work using WebTorrent in the Browser. The Library renders a paginated JQuery DataTable and a ForceGraphVR to the client (under the search-condition). I have developed an in-house client-side SPA-router called TEMPLAR, which routes using #anchors and uriParams, as a lightweight alternative to AngularJS. You will find the TEMPLAR router on my GitHub page.

The whole thing follows MVC architecture, where a "bind" is a DOM manipulator. 

This should be literally plug-and-play, all you have to do to get a fully working WebTorrent Indexer is 1) Set up a Neo4J Database, 2) Input your Neo4J credentials into config.js, and 3) Edit the torrents.js model to suit the types, media, formats, and resolutions of your public domain media. 

To get started, you will need to:

*Start a Neo4j Aura Database, or host your own* (they have a free Community Edition up to 200,000 or so nodes)!

*Edit config.js and enter your Neo4j credentials.*

*Edit the Torrents model under static/client/models* Insert Source types (such as Documentary, or Renaissance Art), edition_torrent media (such as Ebook or Concert), and edition_torrent format (such as PDF or mp3), and resolutions (such as v0, 720p or 1080x720) For perspective, an Ebook vs Audiobook would be [media] and a PDF vs djvu would be [format]. 

*Edit the torrents.js bind map function and relate Image thumbnails to Source types*, also put your image thumbnails in the static/img folder

*Host server.js, config.js, static/, and js/ on a node.js platform; you might have to work out the express port on certain platforms*

OPTIONAL:
*For codecs* There is no codec <select> model. mp3 bitrates are resolutions but mkvs have codecs in addition to resolution, so the current code uses a "format (codec)" paradigm, so mkv and mkv(x264) are different "formats" (the codec is baked into the format). If you want to code codecs you can just follow the resolutions paradigm and insert a codec model in torrents.js and add it to the upload.js controller (for file upload metadata) and torrent.js bind functions (for adv_search), insert it into the (:Torrent) DB query in post/upload on server.js, and add a <br> edition_torrent.torrent.properties.codec in the last function of torrents.js bind.

**ABOUT THE ARCHITECTURE**

This BitTorrent Indexer uses the very innovative and profound Gazelle Methodology for Organization, with (Source)-[]->(Edition)->[]->(Torrent). I have taken the liberty of using the Neo4J Graph Database to organize Libraries, primarily for the Graph Search VR feature. Two editions, with different translators, are listed under the same Datatable dtrg-group, called a Source (as in, "Primary Source"). If there exists both an audiobook (mp3) and an Ebook (PDF) for a particular translator (Edition), the two torrents are listed under that edition in a 'torrentsTable'.  

I have also added Graph Visualization based on Gazelle's "Similar Artists" web, using the powerful Neo4j Java database and ForceGraphVR.

To seed to browsers, please use WebTorrent Desktop for few files. qBitTorrent is slated to add WebTorrent support "soon," but if you check my repos I have a working qBitTorrent libtorrent 2.1 -webtorrent enabled .exe.

Gazelle-Webtorrent is also a Single-Page Application (SPA) with a functional use-case, as torrents stay seeding and downloading as you TEMPLAR.route partials. If you play an HTML audio element on the .webtorrent route, it will continue playing as you go back/forward.

The TEMPLAR router is black-boxed as a lib module, but if you want to add pages or manipulate function calls, you'll have to learn to initialize the helm() function. Check the docs of TEMPLAR.js repo.

**AMAZON-APACHE-TEMPLAR**

As an example of robust System Operations, I use **Apache** as a reverse proxy and **TEMPLAR** as an MVC-compatible client-side router. The Apache reverse-proxy and express app are hosted on an **Amazon** EC2 micro-instance, which is very cheap to run.

