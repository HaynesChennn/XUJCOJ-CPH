// ==UserScript==
// @name         XujcOJ-CPH
// @version      0.1
// @description  Competitive Companion For XujcOJ
// @author       Haynes-ROB21026
// @match        https://xujcoj.com/home/contest/*/problem/*
// @match        https://xujcoj.com/home/problem/detail/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xujcoj.com
// ==/UserScript==

(function () {
    "use strict";
    var button = document.createElement("button");
    button.textContent = "Send CPH";
    button.style.width = "90px";
    button.style.height = "28px";
    button.style.align = "center";
    button.style.color = "white";
    button.style.background = "#5bc0de";
    button.style.border = "1px solid #46b8da";
    button.style.borderRadius = "4px";
    button.style.margin = "10px";
    button.style.fontFamily = "sans-serif";

    var elements = document.getElementsByClassName("title");
    var titleContent = elements[0].innerText;
    elements = document.getElementsByClassName("problem-text");
    var p_input = elements[3].innerText;
    var p_output = elements[4].innerText;
    p_input = p_input.replace(/\n\n/g, "\n");
    p_output = p_output.replace(/\n\n/g, "\n");

    var panel = document.querySelector(".panel");
    var h5 = panel.querySelector("h5");
    var time_mem = h5.innerText;
    var currentUrl = window.location.href;
    var time = time_mem.match(/\d+/g)[0];
    var mem = time_mem.match(/\d+/g)[1];

    console.log(currentUrl);
    console.log(titleContent);
    console.log(time);
    console.log(mem);
    console.log(p_input);
    console.log(p_output);

    button.addEventListener("click", clickBotton);
    function clickBotton() {
        setTimeout(function () {
            var url = "http://127.0.0.1:27121";
            var data = JSON.stringify({
                name: titleContent,
                url: currentUrl,
                interactive: false,
                memoryLimit: mem / 1024,
                timeLimit: time * 1000,
                tests: [
                    {
                        input: p_input,
                        output: p_output,
                    },
                ],
                testType: "single",
                input: {
                    type: "stdin",
                },
                output: {
                    type: "stdout",
                },
            });

            fetch(url, {
                method: "POST",
                body: data,
            }).then(function () {
                console.log(["Send CPH Success"]);
            });
        }, 100); // setTimeout 0.1秒后执行
    }
    var navbar = document.getElementsByClassName("navbar-header")[0]; //getElementsByClassName 返回的是数组，所以要用[] 下标
    navbar.appendChild(button);
})();
