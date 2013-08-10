var html_to_string = function(html){
  var div = document.createElement("div");
  div.innerHTML = html;
  var text = div.textContent || div.innerText || "";
  return text
}