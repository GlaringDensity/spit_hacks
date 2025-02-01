let addbtn = document.querySelector(".addbtn");
let inp = document.querySelector(".inputbtn");
let ul = document.querySelector("ul");
let li = document.querySelectorAll(".task");
let div = document.querySelectorAll(".contents");
let close = document.querySelectorAll(".close");

addbtn.addEventListener("click", () => {
    if(inp.value != "") {
        let task = document.createElement("li");
        let contents = document.createElement("div");
        let del = document.createElement("button");
        let checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        task.classList.add("task");
        contents.classList.add("contents");
        del.classList.add("close");
        del.innerHTML = '<i class="fa-solid fa-xmark"></i>';

        contents.innerText = inp.value;
        ul.appendChild(task);
        task.appendChild(checkbox);
        task.appendChild(contents);
        task.appendChild(del);

        inp.value = "";
    }
});

ul.addEventListener("click", function(event) {
    if(event.target.nodeName == "BUTTON" ) {
        let listItem = event.target.parentElement;  
        listItem.remove();
    }

    if(event.target.nodeName == "I" ) {
        let listItems = event.target.parentElement;  
        let listItem = listItems.parentElement;
        listItem.remove();
    }
});



