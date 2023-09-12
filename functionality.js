$(document).ready(function(){
    let searchBar = $("#search-input");
    let cardParent = $("#card-parent");
    let cardsHtml = ""
    
    // initial data load
    loadCardData();

    searchBar.change(function(){
        alert(searchBar.val());
    });

    function loadCardData(){
        toolData.forEach(function(individualTool){
            let tool_image;
            
            if(individualTool.image !== "default_image"){
                tool_image = individualTool.image;
            }else{
                tool_image = "./assets/site_images/gear_image.svg";
            }
            
            cardsHtml+= '<div class="card m-2">'+
                            '<div class="content">'+
                                '<div class="img d-flex justify-content-center align-items-center"><img src="'+tool_image+'" alt="..."></div>'+
                                '<div class="cardContent">'+
                                    '<div class="visible-details">'+
                                        '<h3>'+individualTool.name+'</h3>'+
                                        '<p class="tech-name">'+individualTool.techCategory+'</p>'+
                                    '</div>'+
                                    '<div class="hidden-details d-flex flex-column justify-content-center align-items-center">'+
                                        '<div class="description-parent">'+
                                            '<p class="description">'+individualTool.description+'</p>'+
                                        '</div>'+
                                        '<div class="d-flex justify-content-between w-100">'+
                                            '<div class="rating-parent d-flex align-items-center">'+
                                                '<img src="./assets/site_images/star.svg" alt="...">'+
                                                '<span class="mx-2">'+individualTool.rating+'</span>'+
                                            '</div>'+
                                            '<div class="visit-button">'+
                                                '<a href="'+individualTool.url+'" target="_blank"><span class="mx-5">visit</span></a>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
        
        });
        cardParent.html(cardsHtml);
    }

});




