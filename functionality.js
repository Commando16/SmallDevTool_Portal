$(document).ready(function(){
    let searchBar = $("#search-input");
    let cardParent = $("#card-parent");
    let currentSelectedTab;
    let cardsHtml = ""
    
    // initial data load
    loadCardData(cardType="all", isFilter=false);

    searchBar.change(function(){
        loadCardData( $(currentSelectedTab).attr("data-card-type"), isFilter=true, filterString=searchBar.val());
    });

    $(".card-tab").click(function(){
        currentSelectedTab = $(this);
        cardType = currentSelectedTab.attr("data-card-type");
        
        $(".card-tab").each(function(tab_index, tab){
            $(tab).children("span").removeClass("active");
        });
        currentSelectedTab.children("span").addClass("active");
        loadCardData(cardType, isFilter=false);
    });


    function loadCardData(cardType, isFilter=false, filterString=""){
        let filteringSet;
        if (isFilter){
            filteringSet = new Set(filterString.split(" "));
        }

        // removing any previous data in "cardsHtml" 
        cardsHtml = "";

        if (cardType == "tools"){ 
            cardData = toolData;
        } else if (cardType == "docs"){
            cardData = docData;
        } else{
            cardData = toolData.concat(docData);
        }

        cardData.forEach(function(individualCardData){
            let eligibleCard;

            if(isFilter){
                eligibleCard = check_eligibility(
                                    filteringWords=filteringSet, 
                                    cardName=individualCardData.name, 
                                    cardDescription=individualCardData.description, 
                                    cardCategory=individualCardData.techCategory,
                                    cardTags=individualCardData.tags
                                );
            }

            if (!isFilter || eligibleCard){
                let cardAvatarImage;
            
                if (individualCardData.image !== "default_image"){
                    cardAvatarImage = individualCardData.image;
                } else{
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
            } 
        });

        if (cardsHtml!=""){
            cardParent.html(cardsHtml);
        } else{
            cardParent.html('<p id="no-data-text">Sorry, No Data Available</p>');
        }
    }

    function check_eligibility(filteringWords, cardName, cardCategory, cardDescription, cardTags){        
        let cardNameSet = new Set(cardName.split(" "));
        let cardDescriptionSet = new Set(cardDescription.split(" "));
        let cardCategorySet = new Set(cardCategory.split(" "))
        let cardTagsSet = new Set(cardTags.split(","));

        for(let word of filteringWords.keys()){
            if( cardNameSet.has(word) || cardDescriptionSet.has(word) || cardCategorySet.has(word) || cardTagsSet.has(word) ){
                return true;
            }
        }

        return false;
    }
});




