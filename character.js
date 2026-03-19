const exp_box = document.getElementById("expression_box");
const char_name = document.getElementById("char_name");
const char_loader = document.getElementById("char_thing");

function loadImage(filePath)
{
	my_tempo = new Image()
	my_tempo.src = filePath
	return my_tempo
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

exp_list = []

function refresh_exp()
{
	for(let i = 0; i < exp_list.length; i++)
	{
		exp_list[i].border.remove()
		//exp_list[i].linebreak.remove()
	}
	for(let i = 0; i < exp_list.length; i++)
	{
		exp_list[i].upButtp.className = "exp_" + String(i)
		exp_list[i].upButt.className = "exp_" + String(i)
		exp_list[i].removeButt.className = "exp_" + String(i)
		exp_list[i].downButt.className = "exp_" + String(i)
		exp_list[i].downButtp.className = "exp_" + String(i)
		exp_list[i].exp_img.className = "exp_" + String(i)
		exp_box.appendChild(exp_list[i].border)
		//exp_box.appendChild(exp_list[i].linebreak)
	}
}

function exp_list_swap(which, dir)
{
	if(dir == -2)
	{
		var the_guy = exp_list.splice(which, 1);
		exp_list.splice(0,0,the_guy[0])
	}
	else if(dir == -1 && which > 0)
	{
		var the_guy = exp_list.splice(which, 1);
		exp_list.splice(which-1,0,the_guy[0])
	}
	else if (dir == 1 && which < exp_list.length)
	{
		var the_guy = exp_list.splice(which, 1);
		exp_list.splice(which+1,0,the_guy[0])
	}
	else if (dir == 2)
	{
		var the_guy = exp_list.splice(which, 1);
		exp_list.splice(exp_list.length-1,0,the_guy[0])
	}
	refresh_exp()
}

function new_exp(exp_name = "", exp_img=-1)
{
	var newExp = {}
	newExp.border = document.createElement("div");
	newExp.border.classList.add("box")
	newExp.border.style.width = "330px"
	newExp.border.style.display = "inline"

	newExp.expression = loadImage("assets/characters/test_portrait.png")
	newExp.expression.classList.add("image_border")

	if(exp_img != -1)
	{
		newExp.expression.src = exp_img
	}

	newExp.border.appendChild(newExp.expression)

	newExp.border.appendChild(document.createElement("br"))
	
	var info_txt = document.createElement("span");
	info_txt.innerHTML = "Name: "
	newExp.border.appendChild(info_txt)
	newExp.exp_name = document.createElement("input")
	newExp.exp_name.type = "text"
	newExp.exp_name.value = exp_name
	newExp.border.appendChild(newExp.exp_name)

	newExp.border.appendChild(document.createElement("br"))

	info_txt = document.createElement("span");
	info_txt.innerHTML = "File: "
	newExp.border.appendChild(info_txt)
	newExp.exp_img = document.createElement("input")
	newExp.exp_img.type = "file"
	newExp.exp_img.accept = "image/png"
	newExp.exp_img.classList.add("exp_" + String(exp_list.length))
	newExp.exp_img.addEventListener("change", function(ev)
	{
		if(ev.target.files) {
			let file = ev.target.files[0];
			var reader = new FileReader();
			
     		 	reader.readAsDataURL(file);
      			reader.onloadend = (e) => 
			{
				var which_char = Number(this.className.substring(4))
				exp_list[which_char].expression.src=e.target.result;
      			}
   		}
	});
	newExp.border.appendChild(newExp.exp_img)

	newExp.border.appendChild(document.createElement("br"))
	newExp.border.appendChild(document.createElement("br"))

	newExp.upButtp = document.createElement("button");
	newExp.upButtp.innerHTML = "|^|"
	newExp.upButtp.classList.add("exp_" + String(exp_list.length))
	newExp.upButtp.onclick = function() 
	{
		var which_box = Number(this.className.substring(4))
		
		exp_list_swap(which_box, -2)
	}
	newExp.border.appendChild(newExp.upButtp)

	newExp.upButt = document.createElement("button");
	newExp.upButt.innerHTML = "^"
	newExp.upButt.classList.add("exp_" + String(exp_list.length))
	newExp.upButt.onclick = function() 
	{
		var which_box = Number(this.className.substring(4))
		
		exp_list_swap(which_box, -1)
	}
	newExp.border.appendChild(newExp.upButt)

	newExp.removeButt = document.createElement("button");
	newExp.removeButt.innerHTML = "X"
	newExp.removeButt.classList.add("exp_" + String(exp_list.length))
	newExp.removeButt.onclick = function() 
	{
		var which_box = Number(this.className.substring(4))
		exp_list[which_box].border.remove()
		exp_list[which_box].linebreak.remove()
		exp_list.splice(which_box, 1)
		refresh_exp()
	}
	newExp.border.appendChild(newExp.removeButt)

	newExp.downButt = document.createElement("button");
	newExp.downButt.innerHTML = "v"
	newExp.downButt.classList.add("exp_" + String(exp_list.length))
	newExp.downButt.onclick = function() 
	{
		var which_box = Number(this.className.substring(4))
		
		exp_list_swap(which_box, 1)
	}
	newExp.border.appendChild(newExp.downButt)

	newExp.downButtp = document.createElement("button");
	newExp.downButtp.innerHTML = "|v|"
	newExp.downButtp.classList.add("exp_" + String(exp_list.length))
	newExp.downButtp.onclick = function() 
	{
		var which_box = Number(this.className.substring(4))
		
		exp_list_swap(which_box, 2)
	}
	newExp.border.appendChild(newExp.downButtp)

	exp_box.appendChild(newExp.border)

	newExp.linebreak = document.createElement("br");
	///exp_box.appendChild(newExp.linebreak)
	
	exp_list.push(newExp)
}

function download_it()
{
	awesome_str = ""
	awesome_str += char_name.value + "\n"

	var hold_it = ""
	for(let i = 0; i < exp_list.length; i++)
	{
		hold_it += '<option value="'
		var save_cav = document.createElement('canvas');
        	save_cav.width = exp_list[i].expression.width;
        	save_cav.height = exp_list[i].expression.height;
        	var btx = save_cav.getContext('2d');
       		btx.drawImage(exp_list[i].expression, 0, 0);	
		hold_it += save_cav.toDataURL()
		hold_it += '">'
		hold_it += exp_list[i].exp_name.value
		hold_it += '</option>'
	}

	awesome_str += char_name.value + "-" + (cyrb53(hold_it)) + "\n"

	awesome_str += hold_it

	download("char-" + char_name.value + ".txt", awesome_str)
}

function destroy_all()
{
	char_name.value = ""
	while(exp_list.length > 0)
	{
		exp_list[0].border.remove()
		exp_list[0].linebreak.remove()
		exp_list.splice(0, 1)
	}
	refresh_exp()
}

char_loader.addEventListener('change', function(ev) {
   if(ev.target.files) {
      let file = ev.target.files[0];
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onloadend = function (e) {
	destroy_all()
	
	linz = e.target.result.split('\n')
	
	char_name.value = linz[0]

	oh_goodness = linz[2].split('"')

	var the_img = ""
	for(let i = 1; i < oh_goodness.length; i++)
	{
		if(i % 2 == 1) {the_img = oh_goodness[i]}
		else
		{
			new_exp(oh_goodness[i].split("<")[0].substring(1), the_img)
		}	
	}
	char_loader.value = ""
      }
   }
});
