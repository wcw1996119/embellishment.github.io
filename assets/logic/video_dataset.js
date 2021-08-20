/* JS for tab "video dataset" card */
class VideoData_Card {

    constructor({id, eg_title, eg_source, eg_link}) {
        this._id = id + "";
        this._title = eg_title + "";
        this._source = eg_source + "";
        this._link = eg_link + "";
    }

    _createCard () {
        let deck_single_node = document.createElement("div");
        let card = document.createElement("div");
        let cardImg_Html = `<a href="${this._link}" class="card-img-top" target="_blank"><img src="./assets/image/dataset_img/${this._id}.jpg"></a>`;
        let card_body = document.createElement("div");
        let cardTitle_Html = `<a href="${this._link}" class="card-title" target="_blank">${this._title}</a>`;
        let cardText_Html = `<p class="card-text"><a href="${this._link}" target="_blank">${this._source}</a><span class="hidden-id">No. ${this._id}</span></p>`;

        deck_single_node.classList.add("col", "video-deck-single");
        card.classList.add("card");
        card_body.classList.add("card-body");

        card_body.innerHTML = cardTitle_Html + cardText_Html;
        card.innerHTML = cardImg_Html;
        card.appendChild(card_body);
        
        deck_single_node.appendChild(card);
        return deck_single_node;
    }

    _bindEvents () {
        if(this._deck_single_node === undefined) {
            console.error("Video dataset card do not exist!");
        }
        // tooltip binding to card title
        $(this._deck_single_node.querySelector(".card-title")).tooltip({ title: this._title });
    }
}

VideoData_Card.prototype.appendTo = function (parentNode, nextNode) {
    if(!(parentNode instanceof HTMLElement)) {
        console.error(`${parentNode} is not a DOM node!`);
        return false;
    }

    this._deck_single_node = this._createCard();
    this._bindEvents();

    parentNode.insertBefore(this._deck_single_node, nextNode);
    return true;
}

export {VideoData_Card as VideoData_Card};