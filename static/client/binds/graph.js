function traverseGraph(set, searchable){
    switch(set){
            case "source":
              TEMPLAR.route(
                  "#torrents?search=true&title=" +
                    searchable +
                    "&author=" +                    
                    "&classes=" +                    
                    "&all=false" +                    
                    "&publisher=" +
                    "&type=all" +
                    "&media=all" +                   
                    "&format=all" +
                    "&res=all"                     
                );
                break;
            case "author":
                TEMPLAR.route(
                      "#torrents?search=true" +
                      "&title=" +                         
                        "&author=" + searchable +                        
                        "&classes=" +                        
                        "&all=false" +                        
                        "&publisher=" +
                        "&type=all" +
                        "&media=all" +                   
                        "&format=all" +
                        "&res=all"                  
                    );
                break;
            case "class":
                TEMPLAR.route(
                      "#torrents?search=true" +
                      "&title=" +                         
                        "&author=" +                         
                        "&classes=" + JSON.stringify(searchable) +               
                        "&all=false" +                        
                        "&publisher=" +
                        "&type=all" +
                        "&media=all" +                   
                        "&format=all" +
                        "&res=all"    
                    );
                break;
            case "publisher":
                TEMPLAR.route(
                      "#torrents?search=true" +
                      "&title=" +                         
                        "&author=" +                      
                        "&classes=" +                        
                        "&all=false" +                        
                        "&publisher=" + searchable +  
                        "&type=all" +
                        "&media=all" +                   
                        "&format=all" +
                        "&res=all"                
                    );
                break;

        }
}
