for (let a of document.getElementsByTagName("input")) {
  if (a.getAttribute("type") == "checkbox") {
    a.parentNode.appendChild(new Text(a.getAttribute("value")));
  }
}
