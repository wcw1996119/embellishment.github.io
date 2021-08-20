/* JS for tab "homepage" reminder & card */
import { vns_method_to_btn_name } from './anicard.js';
import { Carouse } from './carouse.js'
import { tagMapZh } from '../map/tagMap_zh.js'
import { tagMap } from '../map/tagMap.js'
import {language} from "../constans/language.js"
var language_zh=sessionStorage.getItem("language") === "zh"
// homepage card class
class Homepage_Card {
    constructor(parameters = { card_id, card_title, VNS_tag, EL_tag, how, why, eg_content, eg_back_data }) {
        this.parameters = {};
        this.parameters = parameters;
    }

    _createCard() {
        let deck_single_node = document.createElement("div");
        let card_inner_node = document.createElement("div");
        let card_front_node = document.createElement("div");
        let card_back_node = document.createElement("div");
        let card_front_header = this._createCard_header();
        let card_back_header = card_front_header.cloneNode(true);
        deck_single_node.classList.add("col-xl-4", "col-lg-6", "col-sm-12", "card-deck-single");
        card_inner_node.classList.add("card-inner", `el-${this.parameters["EL_tag"].replace(/\s+/g, "-")}`);
        card_front_node.classList.add("card", "front");
        card_back_node.classList.add("card", "back");

        deck_single_node.setAttribute("name", "card_" + this.parameters["card_id"]);

        // front
        let front_nodeList = [
            card_front_header, this._createCard_frontImg(),
            this._createCard_frontBody(), this._createCard_footer(1)
        ];
        front_nodeList.forEach((node, i, nodeList) => card_front_node.appendChild(node));

        // back
        let back_nodeList = [
            card_back_header, this._createCard_backImgBox(),
            this._createCard_backBody(), this._createCard_footer(0)
        ];
        back_nodeList.forEach((node, i, nodeList) => card_back_node.appendChild(node));

        // insert to card-inner
        [card_front_node, card_back_node].forEach(
            (node, i, nodeList) => card_inner_node.appendChild(node)
        );
        deck_single_node.appendChild(card_inner_node);
        return deck_single_node;
    }

    _get_aim_deck() {
        if (this.parameters["VNS_tag"]) {
            return this.parameters["VNS_tag"];
        }
        return "";
    }

    _get_param(param_key) {
        param_key = param_key + "" || "card_id";
        if (Object.keys(this.parameters).indexOf(param_key) < 0) {
            return -1;
        }
        return this.parameters[param_key];
    }

    _createCard_header() {
        let card_header_node = document.createElement("div");
        let header_text_node = document.createElement("div");
        let header_symbol_node = document.createElement("span");
        let title_html = `<div class="header-text-title">${vns_method_to_btn_name(this.parameters["card_title"])}</div>`;
        let class_html = `<div class="header-text-class">${vns_method_to_btn_name(this.parameters["EL_tag"])}</div>`;

        card_header_node.classList.add("card-header");
        header_text_node.classList.add("header-text");
        header_symbol_node.classList.add("header-symbol");
        header_text_node.innerHTML = title_html + class_html;
        [header_text_node, header_symbol_node].forEach((node, i, nodeList) => card_header_node.appendChild(node));
        return card_header_node;
    }

    _createCard_frontImg() {
        let card_frontImg_node = document.createElement("div");
        let front_preview_html = `<img class="card-img front-preview" src="./assets/image/front_img/${this.parameters["card_id"]}.png">`  // 缺少正面预览png
        card_frontImg_node.classList.add("card-frontImg");
        card_frontImg_node.innerHTML = front_preview_html;
        return card_frontImg_node;
    }

    //Change to a rotation diagram
    _createCard_backImgBox() {
        let currentCardId = "card" + this.parameters["card_id"]
        // order
        //['title', 'chart-axis', 'chart-marks', 'chart-legend', 'caption', 'background']
        let carouselData = this.parameters["eg_content"];
        let imgBox = document.createElement("div");
        imgBox.classList.add("card-imgBox");
        let card_imgBox_node = document.createElement("div");
        card_imgBox_node.classList.add(currentCardId, ('swiper-container'))
        let imgBox_wrapper = document.createElement("div");
        imgBox_wrapper.classList.add("swiper-wrapper");
        let caption_item_html = '';

        carouselData.forEach((item) => {
            let filespec = `./assets/image/back_carouse/${currentCardId}/${item}.jpg`
            caption_item_html = `<div class="swiper-slide"><img class="card-img" src=${filespec} alt="Image loading error."></div>`;
            imgBox_wrapper.innerHTML += caption_item_html;
        })
        card_imgBox_node.appendChild(imgBox_wrapper)
        card_imgBox_node.innerHTML += `<div class="swiper-pagination"></div>`

        imgBox.appendChild(card_imgBox_node)
        let swiperScrpits = document.createElement("script")

        let carouse = new Carouse()
        let code = carouse.getSwiperCode()
        code = code.replace("() => {", "")
        code = code.slice(0, -1)

        //Replace the cardId number with the current cardId
        let id = code.match("cardId");
        code = code.replace(id, currentCardId)

        try {
            //IE considers script to be a special element and can no longer access child nodes; An error;
            swiperScrpits.appendChild(document.createTextNode(code));
        }
        catch (ex) {
            swiperScrpits.text = code;
        }
        swiperScrpits.type = "text/javascript"
        swiperScrpits.id = "card" + this.parameters["card_id"]
        imgBox.appendChild(swiperScrpits)
        return imgBox
    }
    _createCard_frontBody() {
        let card_body_node = document.createElement("div");
        let card_frontBody_titleHtml = "";
        let card_frontBody_textHtml = "";
        let card_body_front_textArray = [
            this.parameters["how"], this.parameters["why"]
        ];
        card_body_node.classList.add("card-body");
        Homepage_Card.card_body_front_titleArray.forEach((title, i, titleList) => {
            if (card_body_front_textArray[i] === "") {
                return;
            }
            card_frontBody_titleHtml = `<div class="card-body-subtitle">${title}</div>`;
            card_frontBody_textHtml = `<p class="card-body-text">${card_body_front_textArray[i]}</p>`;
            card_body_node.innerHTML += (card_frontBody_titleHtml + card_frontBody_textHtml);
        });
        return card_body_node;
    }

    _createCard_backBody() {
        let card_body_node = document.createElement("div");
        card_body_node.classList.add("card-body");

        let card_body_caption_node = document.createElement("div");
        card_body_caption_node.classList.add("card-body-caption");

        let strData = this.parameters["eg_back_data"]
        //Converts object type data to string
        //SetAttribute () only accepts contents of type string
        let newArr = []
        strData.forEach((item, i) => {
            newArr.push(JSON.stringify(item))
        })
        //Adding a separator
        let arrStr = newArr.join("#split")
        //Bind the data to the Caption node
        card_body_caption_node.setAttribute('data-cardCaption', arrStr)
        card_body_node.appendChild(card_body_caption_node);
        return card_body_node;
    }

    _createCard_footer(direction = 1) {

        let left_html = "";
        let button_text = "";
        let card_footer_bottom_html = "";
        let card_footer_node = document.createElement("div");

        if (direction > 0) {
            // positive
            left_html = `<span class="card-footer-num">NO. ${this.parameters["card_id"]}</span>`;
            language_zh?button_text=language.VIEW_EXAMPLES_ZH:button_text=language.VIEW_EXAMPLES_EN
            // button_text = "View examples";
        }
        else {
            // negative
            left_html = `<a href="" target="_blank"><span class="card-footer-url"></span>URL</a>`;
            language_zh?button_text=language.BACK_FRONT_ZH:button_text=language.BACK_FRONT_EN
            // button_text = "Back to front";
        }

        card_footer_bottom_html = `<button class="card-footer-bottom">${button_text}</button>`;
        card_footer_node.classList.add("card-footer");

        card_footer_node.innerHTML = left_html + card_footer_bottom_html;
        return card_footer_node;
    }
}

Homepage_Card.card_body_front_titleArray = ["HOW", "WHY"];
Homepage_Card.caption_keyArr = ["Source", "Year", "Category", "Subcategory"];

Homepage_Card.prototype._bindEvents = function () {

    let that = this;
    const this_card_node = this._deck_single_node;
    const card_inner_node = this_card_node.querySelector(".card-inner");
    const front_trans_button = card_inner_node.querySelector(".front .card-footer-bottom");
    const back_trans_button = card_inner_node.querySelector(".back .card-footer-bottom");
    const front_img = card_inner_node.querySelector(".front .card-frontImg");
    const back_caption = this_card_node.querySelector(".back .card-body-caption");

    // card footer button
    front_trans_button.addEventListener("click", () => {
        if (!card_inner_node.classList.contains("turned-over")) {
            card_inner_node.classList.add("turned-over");
        }
    });
    back_trans_button.addEventListener("click", () => {
        if (card_inner_node.classList.contains("turned-over")) {
            card_inner_node.classList.remove("turned-over");
        } document
    });

    // card footer URL
    $(card_inner_node.querySelector(".card-footer a")).tooltip({ title: "more details" });
}

Homepage_Card.prototype.appendTo = function (parentNode) {
    if (!(parentNode instanceof HTMLElement)) {
        console.error(`${parentNode} is not a DOM node!`);
        return false;
    }
    this._deck_single_node = this._createCard();
    this._bindEvents();
    parentNode.appendChild(this._deck_single_node);
    return true;
}

// homepage reminder class
class Homepage_Reminder {
    constructor({ VNS_tag, VNS_desc, VNS_num }) {
        this._VNS_tag = VNS_tag + "";
        this._VNS_num = VNS_num + "";
        this._VNS_desc = VNS_desc + "";
    }

    _createReminder(methodToReminderTitle = str => str) {
        let reminder_node = document.createElement("div");
        let reminder_bg_node = document.createElement("div");
        let reminder_content_node = document.createElement("div");
        let reminder_head_node = document.createElement("div");
        let reminder_desc_node = document.createElement("div");
        let reminder_symbol_html = `<span class="reminder-symbol"></span>`;
        let reminder_title_html = `<span class="reminder-title">${language_zh?methodToReminderTitle(tagMapZh[this._VNS_tag]):methodToReminderTitle(tagMap[this._VNS_tag])}&nbsp;</span>
            <span class='reminder-sum'>(${this._VNS_num})</span>
            <span class='reminder-sum-s'>SUM: ${this._VNS_num}</span>`;

        reminder_node.classList.add("display-reminder");
        reminder_bg_node.classList.add("reminder-bg");
        reminder_content_node.classList.add("reminder-content");
        // reminder_node.classList.add("display-reminder", "active-sticky");
        reminder_head_node.classList.add("reminder-head");
        reminder_desc_node.classList.add("reminder-desc");

        reminder_head_node.innerHTML = reminder_symbol_html + reminder_title_html;
        reminder_desc_node.innerHTML = this._VNS_desc;
        reminder_content_node.appendChild(reminder_head_node);
        reminder_content_node.appendChild(reminder_desc_node);
        reminder_node.appendChild(reminder_bg_node);
        reminder_node.appendChild(reminder_content_node);
        return reminder_node;
    }
}

Homepage_Reminder.prototype._bindEvents = function () {
    let that = this;
    // scroll
    const CARD_DISPLAY_NODE = document.querySelector("#card-display-ex");
    // const reminder_bg_node = reminder_node.querySelector(".reminder-bg");
    const event_callback = function () {
        if (that._reminder_node) {
            const reminder_node = that._reminder_node;
            if (reminder_node.nextElementSibling) {
                const card_deck_node = reminder_node.nextElementSibling;
                let distance_to_top = card_deck_node.getBoundingClientRect().top - reminder_node.getBoundingClientRect().bottom;
                if (distance_to_top < -3 && !reminder_node.classList.contains("active-sticky")) {
                    reminder_node.classList.add("active-sticky");
                } else if (distance_to_top >= -3 && reminder_node.classList.contains("active-sticky")) {
                    reminder_node.classList.remove("active-sticky");
                }
                let distance_to_bottom = card_deck_node.getBoundingClientRect().bottom - reminder_node.getBoundingClientRect().top;
                if ((distance_to_bottom < CARD_DISPLAY_NODE.parentElement.offsetHeight * 0.5) && !reminder_node.classList.contains("hidden-sticky")) {
                    reminder_node.classList.add("hidden-sticky");
                } else if ((distance_to_bottom >= CARD_DISPLAY_NODE.parentElement.offsetHeight * 0.5) && reminder_node.classList.contains("hidden-sticky")) {
                    reminder_node.classList.remove("hidden-sticky");
                }
            }
        }
    }

    event_callback();
    // CARD_DISPLAY_NODE.addEventListener("scroll", event_callback);
    CARD_DISPLAY_NODE.parentElement.addEventListener("scroll", event_callback);
}

Homepage_Reminder.prototype.appendTo = function (parentNode, nextNode, methodToReminderTitle) {
    if (!(parentNode instanceof HTMLElement) || !(nextNode instanceof HTMLElement)) {
        console.error(`Either ${parentNode} or ${nextNode} is not a DOM element!`);
        return false;
    }

    this._reminder_node = this._createReminder(methodToReminderTitle);
    this._bindEvents();

    parentNode.insertBefore(this._reminder_node, nextNode);
    return true;
}

export {
    Homepage_Card as Homepage_Card,
    Homepage_Reminder as Homepage_Reminder
};