//fungsi hamburger button
function mobileMenuButton() {
  const clickMenu = document.querySelector("#m-menu-button");
  const mainMenu = document.querySelector("#m-menu");
  if (clickMenu.children[1].classList.contains("block")) {
    clickMenu.children[1].classList.replace("block", "hidden");
    clickMenu.children[2].classList.replace("hidden", "block");
    mainMenu.classList.replace("hidden", "block");
  } else {
    clickMenu.children[1].classList.replace("hidden", "block");
    clickMenu.children[2].classList.replace("block", "hidden");
    mainMenu.classList.replace("block", "hidden");
  }
}

function getPageFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let page = urlParams.get("page");

  return page;
}

async function getBooksData() {
  let response = await fetch("./data.json");
  let json = await response.json();
  return json["books"];
}

/**
 * To get books data, you should make sure that your function is async function
 * and call `getBooksData` function with await.
 *
 * e.g.
 * async function yourFunction() {
 *      let books = await getBooksData();
 * }
 */
