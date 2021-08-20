import { VNS_panel, EL_panel } from './hp_panel.js';
import { MNav, Collapse_Btn } from './hp_mobileNav.js';
import { init_card_display } from './hp_middle.js';
import { VideoData_Card } from './video_dataset.js';
import { downloads_loading } from './downloads.js';
import {language} from '../constans/language.js'

const VISITED_PAGE_ARR = [];
const VISIT_PAGE = function (page_name = "", callback) {
    if (page_name.length <= 0) {
        return;
    }
    VISITED_PAGE_ARR.push(page_name);
    callback();
}
var firstHome = false
var homeRes = ''
var language_zh=false
sessionStorage.getItem("language")==="zh"?language_zh=true:language_zh=false;
export const vns_method_to_btn_name = str => {
    str = str || "";
    if (typeof str !== "string") return str;
    return str.substring(0, 1).toUpperCase() + str.substring(1);
};

window.onload = function () {
    //judge frist enter
    if(!sessionStorage.getItem("language")){
        sessionStorage.setItem("language","en")
    }
    // Locate the tab
    VISIT_PAGE("home", openHomepage_ex);
    // Navigation bar event binding
    document.querySelectorAll(".navbar-item").forEach((tab, i, nodes) => {
        let tab_name = tab.getAttribute("name");
        let callback;
        tab.onclick = function () {
            navRelocation(tab_name);
            if (tab_name === "home") {
                callback = openHomepage_ex;
            }
            if (tab_name === "video-dataset") {
                callback = openVideoDataset;
            }

            if (tab_name === "downloads") {
                callback = openDownloads;
            }

            if (tab_name === "about") {
                callback = openAbout;
            }

            VISIT_PAGE(tab_name, callback);
        };
    });
}


function navRelocation(name = "") {
    name = name || "home";
    document.querySelectorAll(".navbar-item").forEach((tab, i, nodes) => {
        if (tab.getAttribute("name") === name) {
            if (!tab.classList.contains("active")) {
                tab.classList.add("active");
            }
        } else {
            if (tab.classList.contains("active")) {
                tab.classList.remove("active");
            }
        }
    });
    document.querySelector("main").innerHTML = "";
}

/* page loading methods */
function openHomepage_ex() {
    // Page rendering loading
    $.ajax({
        url: "./assets/static/homepage_ex.html",
        type: "get",
        contentType: "text/html",
        dataType: "html",
        success: function (res) {
            document.querySelector("main").innerHTML = res;
            Homepage_ex_loading();
            firstHome = !firstHome
            homeRes = document.querySelector("main").innerHTML
        }
    });
}


function openVideoDataset() {
    // Asynchronous interface loading
    $.ajax({
        // url: "https://jkalan6991.gitee.io/video-explorer/assets/static/videodataset.html",
        url: "./assets/static/videodataset.html",
        type: "get",
        contentType: "text/html",
        dataType: "html",
        success: function (res) {
            document.querySelector("main").innerHTML = res;
            videoDataset_loading();
        }
    });
}


function openDownloads() {
    // Asynchronous interface loading
    $.ajax({
        // url: "https://jkalan6991.gitee.io/video-explorer/assets/static/downloads.html",
        url: "./assets/static/downloads.html",
        type: "get",
        contentType: "text/html",
        dataType: "html",
        success: function (res) {
            document.querySelector("main").innerHTML = res;
            downloads_loading();
        }
    });
}


function openAbout() {
    // Asynchronous interface loading
    $.ajax({
        // url: "https://jkalan6991.gitee.io/video-explorer/assets/static/about.html",
        url: "./assets/static/about.html",
        type: "get",
        contentType: "text/html",
        dataType: "html",
        success: function (res) {
            document.querySelector("main").innerHTML = res;
            $("#official-side").tooltip({ title: "learn more about iDVx Lab" });
        }
    });
}


function Homepage_ex_loading() {
    const mobile_nav_node = document.querySelector(".mobile-nav-scrollSpy");
    const sidebar_node = document.getElementById("sidebar-ex");
    const card_display_node = document.getElementById("card-display-ex");

    const vns_extraNode_html = `<span class="scrollSpy-btn-stop"></span>`;
    const vns_extraClass_toA_arr = ["${VNS_tag}"];
    const vns_extraAttribute_toA = { href: "#${VNS_tag}" };
    const el_extraClass_toA_arr = ["el-${EL_tag}", "active"];
    const mn_extraClass_toA_arr = ["${VNS_tag}"];
    const mn_extraAttribute_toA = { "data-target": "#${VNS_tag}" };


    const changeZhBtn = document.getElementById("change-zh");
    const changEnBtn=document.getElementById("change-en");
    const pageTitle=document.getElementById("title-bold");
    const navHome=document.getElementById("nav-home");
    const navDataset=document.getElementById("nav-dataset");
    const navDownloads=document.getElementById("nav-downloads");
    const searchText=document.getElementById("searchbox-input")
    changeZhBtn.onclick = function () {
        console.log("click zh!")
        sessionStorage.setItem("language","zh")
        location.reload();
    }
    changEnBtn.onclick = function () {
        sessionStorage.setItem("language","en")
        location.reload();
    }
    
    changeZhBtn.innerHTML=language_zh?language.LANGUAGE_CHINESE_ZH:language.LANGUAGE_CHINESE_EN;
    changEnBtn.innerHTML=language_zh?language.LANGUAGE_ENGLISH_ZH:language.LANGUAGE_ENGLISH_EN;
    pageTitle.innerHTML=language_zh?language.PAGE_TITLE_ZH:language.PAGE_TITLE_EN;
    navHome.innerHTML=language_zh?language.HOME_ZH:language.HOME_EN;
    navDataset.innerHTML=language_zh?language.DATASET_ZH:language.DATASET_EN;
    navDownloads.innerHTML=language_zh?language.DOWNLOADS_ZH:language.DOWNLOADS_EN;
    language_zh?changEnBtn.style.color='grey':changeZhBtn.style.color='grey';
    searchText.value=language_zh?language.SEARCH_ZH:language.SEARCH_EN


    MNav.fillContainer(mobile_nav_node, mn_extraClass_toA_arr, mn_extraAttribute_toA, vns_method_to_btn_name);
    VNS_panel.appendTo(sidebar_node, vns_extraNode_html, vns_extraClass_toA_arr, vns_extraAttribute_toA, vns_method_to_btn_name);
    EL_panel.appendTo(sidebar_node, "", el_extraClass_toA_arr, {});

    const collapse_btn = new Collapse_Btn('.mobile-nav-btn', '#sidebar-ex', '.mobile-nav-scrollSpy');

    init_card_display(card_display_node);
    searchBox_EventListener(card_display_node);
    modal_EventListener();
}

/* homepage init related methods */
function searchBox_EventListener(card_display_node = new HTMLElement()) {
    const SEARCH_BOX = document.querySelector(".searchbox-input");
    const BUTTON = document.querySelector(".searchbox-button");

    document.querySelector(".searchbox-button").onclick = () => {
        let search_text = document.querySelector(".searchbox-input").value;
        init_card_display(card_display_node, search_text);
    }
    document.querySelector(".searchbox-input").onfocus = () => {
        document.querySelector(".searchbox-input").value = "";
    }
    document.querySelector(".searchbox-input").onblur = () => {
        let search_text = document.querySelector(".searchbox-input").value;
        let text=language_zh?language.SEARCH_ZH: language.SEARCH_EN
        document.querySelector(".searchbox-input").value = search_text ?search_text:text;
    }
    document.querySelector(".searchbox-input").onkeydown = () => {
        if (event.keyCode === 13) {
            let search_text = document.querySelector(".searchbox-input").value;
            
            init_card_display(card_display_node, search_text);
        }
    }
}

function modal_EventListener() {
    const modal_content_node = document.querySelector(".modal-content");
    $('#zooming-modal').on('hidden.bs.modal', function () {
        modal_content_node.className = "modal-content";
    });
    $('.modal-title').tooltip({ title: "visit the data video" });
}


/* video dataset page init method */
const video_dataset_url = "./assets/json/video_dataset.json";
function videoDataset_loading() {
    const video_deck_node = document.querySelector(".video-deck");
    const empty_deck_node = document.querySelector("#empty-deck-single");

    $.getJSON(video_dataset_url, json => {

        $.each(json, (i, video_item) => {
            let {
                id, eg_title, eg_source, eg_link
            } = video_item;

            let vd_object = new VideoData_Card(video_item);

            // insert card object to the deck
            vd_object.appendTo(video_deck_node, empty_deck_node);

            if (i === json.length - 1) {
            }
        });
    });
}
