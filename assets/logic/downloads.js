import { language } from "../constans/language.js";
const citation_copy = function () {
    const citation_node = document.querySelector(".citation-format");
    let text = citation_node.innerText;
    let input = document.createElement("input");
    input.classList.add("citation-input");
    document.querySelector("body").appendChild(input);
    
    input.value = text;
    // input.innerHTML = text;
    input.select();
    try {
        document.execCommand("Copy");
        destroy(input);
    } catch (e) { }
    
    confirm("Citation was successfully copied to your clipBoard.");
}

var language_zh=false;
language_zh=sessionStorage.getItem("language")==="zh"?true:false
export const downloads_loading = function () {
    const workshop_dataset=document.getElementById("workshop-dataset");
    const dataset_list=document.getElementById("dataset-list");
    const design_space=document.getElementById("design-space");

    workshop_dataset.innerHTML=workshop_dataset.title=language_zh?language.DOWNLOADS_WORKSHOP_ZH:language.DOWNLOADS_WORKSHOP_EN;
    dataset_list.innerHTML=dataset_list.title=language_zh?language.DOWNLOADS_DATASET_LIST_ZH:language.DOWNLOADS_DATASET_LIST_EN;
    design_space.innerHTML=design_space.title=language_zh?language.DOWNLOADS_DESIGN_SPACE_ZH:language.DOWNLOADS_DESIGN_SPACE_EN;

    // document.querySelector(".citation-btn").addEventListener("click", citation_copy);
    // $(".downloads-card-text > a").tooltip({ title: "click to start downloading task" });
    $(".downloads-card-text > a").tooltip();
}