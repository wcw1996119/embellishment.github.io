
class Carouse {
    constructor() {
    }
    code = () => {
        var swiper = new Swiper('.cardId.swiper-container',
            {
                loop: true,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                //mouse can't drag
                simulateTouch: false,
                preloadImages:false,
                onSlideChangeEnd: function (swiper) {
                    const cardBack = swiper.container[0].parentNode.parentNode
                    const caption = cardBack.querySelector(".card-body").querySelector(".card-body-caption")
                    const footer=cardBack.querySelector(".card-footer a")
                    
                    const index = swiper.activeIndex
                    var capData = caption.getAttribute("data-cardcaption")
                    //Cut into arrays
                    var dataArr = capData.split("#split");
                    var dataObjArr = []
                    //Converts the contents of an array to objects
                    dataArr.forEach((item) => {
                        dataObjArr.push(JSON.parse(item))
                    })
                    //Change the captionValue
                    //Check whether there are child nodes. If there are child nodes, delete them
                    if (caption.hasChildNodes()) {
                        caption.innerHTML = ""
                    }
                    //Eliminate the loop head to tail
                    var num;
                    //Swiper.slides. Length-1 head and tail were calculated once again
                    if(index===swiper.slides.length-1){
                        num=0
                    }else if(index===0){
                        num=dataObjArr.length-1
                    }else{
                        num=index-1
                    }
                    var currentCardContent = dataObjArr[num]
                    var caption_item_html = ''
                    
                    for (let key in currentCardContent) {
                        if (key ==='url') {
                            footer.setAttribute("href",currentCardContent[key])
                            
                        }else if(key ==='OBJECT'){
                            let object_node = document.createElement("div");
                            object_node.classList.add("card-body-object");
                            object_node.innerHTML+=`<h6 class="card-body-subtitle">OBJECT:&nbsp</h6>`
                            caption_item_html=`<h6 class="card-body-subtitle-content">${currentCardContent[key]}</h6>`;
                            object_node.innerHTML+=caption_item_html
                            caption.appendChild(object_node)
                        }else{
                            caption_item_html = `<div class='caption-text' title='${currentCardContent[key]}'><span>${key}: </span>${currentCardContent[key]}</div>`;
                            caption.innerHTML += caption_item_html;
                            
                        }
                    }
                }
            }
        );
    }
    getSwiperCode() {
        return this.code.toString()
    }
}
export {
    Carouse as Carouse
};