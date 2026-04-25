$(".DMCA").on("click", function(e){
	e.preventDefault();
	alert("I have taken the drastic measure of hiding every torrent published after 1930, even if they show up on a standard Google search. Exceptions are those found on U.S. government websites or InternetArchive. Please send DMCA complaints, preferrably including the torrent infoHash of allegedly infringing content, to: inevitableambrosia@gmail.com, and the torrent infoHash will be set to 'deleted' and hidden from all users upon prompt review.")
})

$(document).on("click", "#mobile_menu", function(e){
	e.preventDefault()
	$(".mobile_menu").slideToggle(333);
})

$(document).on("TEMPLAR", function(){
	$(".mobile_menu").slideUp(333);
})

$(window).on("resize", function(){
	if($(window).width() > 1079){
		$(".mobile_menu").fadeOut(1337);
	}
})

function assertH1Loading(){
  $("h1 a").text("Loading...").addClass("loading");
}