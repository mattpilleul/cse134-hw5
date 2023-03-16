const addButton = document.getElementById("addButton");
const blogPosts = document.getElementById("blogPosts");
const addDialog = document.getElementById("addDialog");
const editDialog = document.getElementById("editDialog");
const deleteDialog = document.getElementById("deleteDialog");

let lastId = 0;
let editId = 0;
let deleteId = 0;

let blogList = [];

addButton.addEventListener("click", () => {
  addDialog.showModal();
});

function getLastBlogId() {
  lastId = blogList.length ? blogList[blogList.length - 1].id + 1 : 0;
}

function reformatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function addBlogToList(blog) {
  if (!blog.title || !blog.description) {
    return;
  }
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <div>
      <p>${blog.title}</p> <p>${reformatDate(blog.date)}</p>
      <p>${blog.description}</p>
      <div>
        <br /> <button class="editButton">Edit</button>
        <button class="deleteButton">Delete</button>
      </div>
    </div>
  `;
  listItem.id = blog.id;

  blogPosts.appendChild(listItem);

  const deleteButton = listItem.querySelector("button.deleteButton");
  const editButton = listItem.querySelector("button.editButton");
  const id = listItem.id;

  editButton.addEventListener("click", () => {
    editDialog.showModal();
    editId = id;
    const title = document.querySelector("#editDialog .title");
    const date = document.querySelector("#editDialog .date");
    const description = document.querySelector("#editDialog .description");
    const currentBlog = blogList.find((blog) => blog.id == editId);
    title.value = currentBlog.title;
    date.value = currentBlog.date;
    description.value = currentBlog.description;
  });

  deleteButton.addEventListener("click", () => {
    deleteDialog.showModal();
    deleteId = id;
  });
}

function showList() {
  if (blogList.length) {
    getLastBlogId();
    for (const blog of blogList) {
      addBlogToList(blog);
    }
  }
}

function findBlog(id) {
  const response = {
    blog: "",
    pos: 0,
  };

  blogList.forEach(function (value, i) {
    if (value.id == id) {
      response.blog = value;
      response.pos = i;
    }
  });

  return response;
}

function initBlogSampleData() {
  let blogPosts = [
    {
      id: 0,
      title: "React Native 0.71-RC0 Android outage postmortem",
      date: "2023-01-27",
      description:
        "Now that 0.71 is available, we want to share some key information about the incident that broke Android builds for all React Native versions while releasing the first 0.71 release candidate for React Native & Expo Android builds on November 4th, 2022.",
    },
    {
      id: 1,
      title: "Pointer Events in React Native",
      date: "2022-12-13",
      description:
        "Today we are sharing an experimental cross-platform pointer API for React Native. We’ll go over motivations, how it works, and its benefits to React Native users. There are instructions on how to enable and we’re excited to hear your feedback!",
    },
  ];

  blogList = blogPosts;

  localStorage.setItem("blogList", JSON.stringify(blogList));
  addBlogToList(blogPosts);
}

function initBlog() {
  const storedBlogList = window.localStorage.getItem("blogList");
  if (storedBlogList) {
    blogList = JSON.parse(storedBlogList);
  } else {
    blogList = [];
    initBlogSampleData();
  }
  showList();
}

function saveBlog(title, date, description) {
  let blog = {
    id: lastId,
    title: title,
    date: date,
    description: description,
  };

  blogList.push(blog);
  localStorage.setItem("blogList", JSON.stringify(blogList));
  addBlogToList(blog);
  lastId++;
}

function addDialogLogic(dialog) {
  dialog.addEventListener("close", () => {
    let title = document.querySelector("#addDialog .title");
    const date = document.querySelector("#addDialog .date");
    let description = document.querySelector("#addDialog .description");
    let answer = dialog.returnValue;

    if (answer != "") {
      saveBlog(title.value, date.value, description.value);
      title.value = "";
      date.value = "";
      description.value = "";
    }
  });
}

function updateBlog(title, date, description) {
  const blogToUpdate = findBlog(editId)?.blog;
  const pos = findBlog(editId)?.pos;

  if (blogToUpdate) {
    blogToUpdate.title = title;
    blogToUpdate.date = date;
    blogToUpdate.description = description;

    blogList[pos] = blogToUpdate;
    localStorage.setItem("blogList", JSON.stringify(blogList));
  }
}

function editDialogLogic(dialog) {
  dialog.addEventListener("close", () => {
    let title = document.querySelector("#editDialog .title");
    let date = document.querySelector("#editDialog .date");
    let description = document.querySelector("#editDialog .description");
    let answer = dialog.returnValue;

    if (answer != "") {
      updateBlog(title.value, date.value, description.value);
      title.value = "";
      date.value = "";
      description.value = "";
      location.reload();
    }
  });
}

function removeBlog() {
  blogList.forEach(function (value, i) {
    if (value.id == deleteId) {
      blogList.splice(i, 1);
    }
  });
  localStorage.setItem("blogList", JSON.stringify(blogList));
}

function deleteDialogLogic(dialog) {
  dialog.addEventListener("close", () => {
    let answer = dialog.returnValue;

    if (answer != "") {
      removeBlog();
      location.reload();
    }
  });
}

initBlog();
addDialogLogic(addDialog);
editDialogLogic(editDialog);
deleteDialogLogic(deleteDialog);
