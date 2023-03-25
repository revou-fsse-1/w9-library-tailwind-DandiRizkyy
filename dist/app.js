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

//fungsi load halaman pertama kali agar script search library jalan
function loadLibrary() {
  document
    .getElementById("search-form")
    .addEventListener("submit", searchLibrary);
}
//fungsi search halaman utama
function searchLibrary(e) {
  e.preventDefault();
  let t = document.getElementById("search").value,
    d = document.getElementById("search-result"),
    m = ((d.innerHTML = ""), document.createElement("div"));
  (m.className = "my-6"),
    t && "" != t
      ? (d.classList.remove("hidden"),
        fetch("./data.json")
          .then((e) => e.json())
          .then((e) => {
            var o,
              e = e.books,
              e =
                (console.log(e),
                e.filter(
                  (e) =>
                    e.title.toLowerCase().includes(t) ||
                    e.authors.join(", ").toLowerCase().includes(t) ||
                    e.subjects.join(", ").toLowerCase().includes(t)
                ));
            0 < e.length
              ? (e.forEach((e) => {
                  var o = document.createElement("a"),
                    t =
                      ((o.href = "#"),
                      (o.className =
                        "flex flex-col items-center bg-white border border-gray-200 p-4 shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"),
                      document.createElement("img")),
                    d =
                      ((t.className =
                        "object-cover w-full rounded-lg h-96 md:h-auto md:w-24"),
                      (t.src = e.image),
                      (t.alt = e.title),
                      document.createElement("div")),
                    n =
                      ((d.className =
                        "flex flex-col justify-between p-4 leading-normal text-gray-400"),
                      document.createElement("h5")),
                    r =
                      ((n.className = "mb-2 text-2xl font-bold tracking-tight"),
                      (n.innerHTML = e.title),
                      document.createElement("p")),
                    a =
                      ((r.className = "mb-3 font-normal"),
                      document.createElement("b")),
                    c =
                      ((a.innerHTML = "Author(s): "),
                      document.createTextNode(e.authors.join(", "))),
                    r =
                      (r.appendChild(a),
                      r.appendChild(c),
                      document.createElement("caption"));
                  (r.innerHTML = e.subjects.join(", ")),
                    d.appendChild(n),
                    d.appendChild(a),
                    d.appendChild(r),
                    o.appendChild(t),
                    o.appendChild(d),
                    m.appendChild(o);
                }),
                d.appendChild(m))
              : ((e = document.createElement("center")),
                ((o = document.createElement("h1")).className =
                  "text-gray-400"),
                (o.innerHTML =
                  "No books found, please try with another keyword"),
                e.appendChild(o),
                d.appendChild(e));
          }))
      : d.classList.add("hidden");
}

// fungsi menampilkan buku dari data.json ketika halaman di load
async function getBooksData() {
  const page = new URLSearchParams(window.location.search).get("page") || 1;
  const startIndex = (page - 1) * 12;
  const response = await fetch("./data.json");
  console.log(response);
  const data = await response.json();
  console.log(data);
  const books = data.books;

  const bookSection = document.getElementById("book-grid");
  bookSection.innerHTML = "";
  books.slice(startIndex, startIndex + 12).forEach((book) => {
    const bookElement = createBookElement(book);
    bookSection.appendChild(bookElement);
  });
}

// fungsi membuat elemen html baru dari book data
function createBookElement(book) {
  const bookElement = document.createElement("div");
  bookElement.className =
    "w-full bg-gray-800 border border-gray-700 rounded-lg shadow";

  const bookLink = document.createElement("a");
  bookLink.href = "#";

  const bookImg = document.createElement("img");
  bookImg.className = "mx-auto h-72";
  bookImg.src = book.image;
  bookImg.alt = book.title;
  bookLink.appendChild(bookImg);

  const bookInformation = document.createElement("div");
  bookInformation.className = "p-5";

  const bookTitle = document.createElement("a");
  bookTitle.href = "#";
  bookTitle.className = "text-2xl mb-2 font-bold tracking-tight text-white";
  bookTitle.innerHTML = book.title;

  const bookAuthors = document.createElement("p");
  bookAuthors.className = "font-normal mb-3 text-gray-400";
  bookAuthors.innerHTML = "<b>Author(s):</b>" + book.authors.join(", ");

  bookInformation.appendChild(bookTitle);
  bookInformation.appendChild(bookAuthors);

  bookElement.appendChild(bookLink);
  bookElement.appendChild(bookInformation);

  return bookElement;
}

//fungsi next book pages
function nextBooksPage() {
  const page = new URLSearchParams(window.location.search).get("page");
  if (page === "1") {
    window.location.replace("?page=2");
  } else {
    window.location.reload();
  }
}

//fungsi previous book pages
function previousBooksPages() {
  const page = new URLSearchParams(window.location.search).get("page");
  if (page === "2") {
    window.location.replace("?page=1");
  } else {
    window.location.reload();
  }
}

// function getPageFromUrl() {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);

//   let page = urlParams.get("page");

//   return page;
// }

// template getbook from json
// async function getBooksData() {
//   let response = await fetch("./data.json");
//   let json = await response.json();
//   return json["books"];
// }
/**
 * To get books data, you should make sure that your function is async function
 * and call `getBooksData` function with await.
 *
 * e.g.
 * async function yourFunction() {
 *      let books = await getBooksData();
 * }
 */
