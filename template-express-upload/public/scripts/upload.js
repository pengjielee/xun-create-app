var files = [];

document.getElementById("fileBox").onclick = function () {
  document.getElementById("fileInput").click();
};

document.getElementById("fileInput").onchange = function () {
  for (var i = 0; i < this.files.length; i++) {
    files.push(this.files[i]);
  }

  var html = [];
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    html.push("<li>");
    html.push('<span class="name">' + file.name + "</span>");
    html.push('<span class="size">' + file.size + "B</span>");
    html.push("</li>");
  }
  document.getElementById("fileList").innerHTML = html.join("");

  var form = document.forms.namedItem("fileForm");
  var formData = new FormData(form);
  var xhr = new XMLHttpRequest();
  // xhr.upload.addEventListener("progress", function(e){
  // }, false);
  xhr.addEventListener(
    "load",
    function (e) {
      console.log(e);
    },
    false
  );
  // xhr.addEventListener("error", function(e){
  // }, false);
  xhr.open("POST", "/uploads");
  xhr.send(formData);
};
