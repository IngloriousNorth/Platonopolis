**WELCOME**

Gazelle-WebTorrent is an Open Source Web2.0 (possibly soon to be 3.0) BitTorrent indexer for WebTorrent inspired by the innovative Information Architecture of Project Gazelle.

Please note that the organizer of this code has no association with any members of Project Gazelle. It is simply an Open Source JQuery/WebTorrent Library generated based on their very innovative and secretive architecture. Here's the genius of Gazelle for library organization: PDFs and mp3s of the same Edition/Translation are listed under the same DataTable heading, and my style was to list two Editions of the same Source Title under the same dataTable dtrg-group heading. 

Classes (tags), Authors, and Publishers all have their own page, what is a corresponding DataTable of Source->Edition->Torrent. 

My site is propagate.info, meant for public domain, educational Ebooks, Audiobooks, Classical Music, Documentaries, and Renaissance Art. Starting with an educational use-case, I have decided to Open-Source this Software, because the way that Gazelle structures Libraries could be very innovative for research, ethics, and scholarship. This work was conceived in December 2013, and WebTorrent came out in 2016. 

Seeding in BiglyBT with the WebTorrent plugin works with many torrents if you set the Tracker Concurrency to 8 and the Minimum Announce time to 51. Otherwise tracker.webtorrent.com ratelimits you.

Fully built in and plug-in play is a Quantum Random Neo4J Recommendation Engine, which also works on mobile, making this the first quantum mobile app. There is also graph visualization (with VR-toggle), which coheres with an Advanced Search feature, so that users can search by title, author, class, publisher, source type, media, format, and resolution. If you search, say, Russell, Hume in the authors input, you will see them connected in a graph by "All is Quiet on the Western Front," almost like magic.  

**GETTING STARTED**

The server is express/node.js, and the Database is Neo4j; downloads are to work using WebTorrent in the Browser. The Library renders a paginated JQuery DataTable and a ForceGraphVR to the client (under the search-condition). I have developed an in-house client-side SPA-router called TEMPLAR, which routes using #anchors and uriParams, as a lightweight alternative to AngularJS. You will find the TEMPLAR router on my GitHub page.

The whole thing follows MVC architecture, where a "bind" is a DOM manipulator. 

This should be literally plug-and-play, all you have to do to get a fully working WebTorrent Indexer is 1) Set up a Neo4J Database, 2) Input your Neo4J credentials into config.js, and 3) Edit the torrents.js model to suit the types, media, formats, and resolutions of your public domain media. 

To get started, you will need to:

*Start a Neo4j Aura Database, or host your own* (they have a free Community Edition up to 200,000 or so nodes)!

*Edit config.js and enter your Neo4j credentials.*

*Edit the Torrents model under static/client/models* Insert Source types (such as Documentary, or Renaissance Art), edition_torrent media (such as Ebook or Concert), and edition_torrent format (such as PDF or mp3), and resolutions (such as v0, 720p or 1080x720) For perspective, an Ebook vs Audiobook would be [media] and a PDF vs djvu would be [format]. If you want x264, I recommend setting mkv (x264) as a [format], and then using the Resolutions array to add SD, 720p, 4k, etc. 

*Host server.js, config.js, static/, and js/ on a node.js platform; you might have to work out the express port on certain platforms*

**ABOUT THE ARCHITECTURE**

This BitTorrent Indexer uses the very innovative and profound Gazelle Methodology for Organization, with (Source)-[]->(Edition)->[]->(Torrent). Two editions, with different translators, are listed under the same Datatable dtrg-group, called a Source (as in, "Primary Source"). If there exists both an audiobook (mp3) and an Ebook (PDF) for a particular translator (Edition), the two torrents are listed under that edition in a 'torrentsTable'.  

I have also added Graph Visualization based on Gazelle's "Similar Artists" web, using the powerful Neo4j Java database and ForceGraphVR.

To seed to browsers, please use WebTorrent Desktop for few files, or BiglyBT for many files (I can seed 3000 to browsers instantly using BiglyBT). qBitTorrent is slated to add WebTorrent support soon; Ferross' technology is a cutting-edge game-changer!

Gazelle-Webtorrent is also a Single-Page Application (SPA) with a functional use-case, as torrents stay seeding and downloading as you TEMPLAR.route partials. If you play an HTML audio element on the .webtorrent route, it will continue playing as you go back/forward.

The TEMPLAR router is black-boxed as a lib module, but if you want to add pages or manipulate function calls, you'll have to learn to initialize the helm() function. Check the docs of TEMPLAR.js

**AMAZON-APACHE-TEMPLAR**

As an example of robust System Operations, I use **Apache** as a reverse proxy and **TEMPLAR** as an MVC-compatible client-side router. The Apache reverse-proxy and express app are hosted on an **Amazon** EC2 micro-instance.

This setup costs less than 10$ a month to seed 100GB of stored data (18000 nodes).

