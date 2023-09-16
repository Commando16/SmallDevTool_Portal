$(document).ready(function(){
    let searchBar = $("#search-input");
    let cardParent = $("#card-parent");
    let currentSelectedTab;
    let cardsHtml = ""
    
    // initial data load
    loadCardData(cardType="all");

    searchBar.change(function(){
        alert(searchBar.val());
    });

    $(".card-tab").click(function(){
        currentSelectedTab = $(this);
        cardType = currentSelectedTab.attr("data-card-type");
        
        $(".card-tab").each(function(tab_index, tab){
            $(tab).children("span").removeClass("active");
        });
        currentSelectedTab.children("span").addClass("active");
        loadCardData(cardType);
    });


    function loadCardData(cardType){

        // removing any previous data in "cardsHtml" 
        cardsHtml = "";

        if(cardType == "tools"){ 
            cardData = toolData;
        }else if(cardType == "docs"){
            cardData = docData;
        }else{
            cardData = toolData.concat(docData);
            console.log(cardData);
        }

        cardData.forEach(function(individualCardData){
            let cardAvatarImage;
            
            if(individualCardData.image !== "default_image"){
                cardAvatarImage = individualCardData.image;
            }else{
                cardAvatarImage = "./assets/site_images/gear_image.png";
            }
            
            cardsHtml+= '<div class="card m-2">'+
                            '<div class="content">'+
                                '<div class="img d-flex justify-content-center align-items-center"><img src="'+cardAvatarImage+'" alt="..."></div>'+
                                '<div class="cardContent">'+
                                    '<div class="visible-details">'+
                                        '<h3>'+individualCardData.name+'</h3>'+
                                        '<p class="tech-name">'+individualCardData.techCategory+'</p>'+
                                    '</div>'+
                                    '<div class="hidden-details d-flex flex-column justify-content-center align-items-center">'+
                                        '<div class="description-parent">'+
                                            '<p class="description">'+individualCardData.description+'</p>'+
                                        '</div>'+
                                        '<div class="d-flex justify-content-between w-100">'+
                                            '<div class="rating-parent d-flex align-items-center">'+
                                                '<img src="./assets/site_images/star.svg" alt="...">'+
                                                '<span class="mx-2">'+individualCardData.rating+'</span>'+
                                            '</div>'+
                                            '<div class="visit-button">'+
                                                '<a href="'+individualCardData.url+'" target="_blank"><span class="mx-5">visit</span></a>'+
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




