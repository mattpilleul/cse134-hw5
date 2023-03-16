const form = document.querySelector("form#form");
const deleteBtn = document.getElementById("deleteBtn");
const output = document.getElementById("response");

const showOutput = (object) => {
  output.innerHTML = `<pre class="terminalOutput">${JSON.stringify(
    object,
    null,
    2
  )}</pre>`;
};

const triggerGet = async () => {
  const res = await fetch("https://httpbin.org/get");
  const json = await res.json();
  showOutput(json);
};

const triggerPost = async (data) => {
  const res = await fetch("https://httpbin.org/post", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const json = await res.json();
  showOutput(json);
};

const triggerPut = async (data) => {
  const res = await fetch("https://httpbin.org/put", {
    method: "PUT",
    body: JSON.stringify(data),
  });
  const json = await res.json();
  showOutput(json);
};

const triggerDelete = async (data) => {
  const res = await fetch("https://httpbin.org/delete", {
    method: "DELETE",
    body: JSON.stringify(data),
  });
  const json = await res.json();
  showOutput(json);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    let clean = DOMPurify.sanitize(value);
    data[key] = clean;
  });
  data.article_date = new Date();

  const submitType = e.submitter.value;

  switch (submitType) {
    case "Get":
      triggerGet();
      break;
    case "Post":
      triggerPost(data);
      break;
    case "Put":
      triggerPut(data);
      break;
    case "Delete":
      triggerDelete(data);
      break;
  }
});
