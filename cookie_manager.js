function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const box_links = document.getElementById("box_area");
const char_links = document.getElementById("char_area");
const paste_saves = document.getElementById("paste_area");

var auto_boxes = getCookie("auto_boxes");
if(auto_boxes == "")
{setCookie("auto_boxes", "", 365*10)}
else
{box_links.innerHTML = atob(auto_boxes)}

auto_boxes = getCookie("auto_chars");
if(auto_boxes == "")
{setCookie("auto_chars", "", 365*10)}
else
{char_links.innerHTML = atob(auto_boxes)}

auto_boxes = getCookie("paste_saves");
if(auto_boxes == "")
{setCookie("paste_saves", "", 365*10)}
else
{paste_saves.innerHTML = atob(auto_boxes)}

function set_textbox()
{
	//console.log(box_links.value)
	setCookie("auto_boxes", btoa(box_links.value), 365*10)
	alert("Box auto-load updated!")
}

function set_characters()
{
	setCookie("auto_chars", btoa(char_links.value), 365*10)
	alert("Character auto-load updated!")
}

function set_paste()
{
	setCookie("paste_saves", btoa(paste_saves.value), 365*10)
	alert("Clipboard updated!")
}