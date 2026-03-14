const canvas = document.getElementById("textbox_work");
const ctx = canvas.getContext("2d");

const canvas_stack = document.getElementById("stack_work");
const ctx_stack = canvas_stack.getContext("2d");

ctx.fillStyle = "black"
ctx.fillRect(0,0,canvas.width,canvas.height)

const box_container = document.getElementById("box_box");
const text_container = document.getElementById("text_box");
const char_container = document.getElementById("char_box");

let awesome_canvas = document.getElementById("canvasTrue");
let awesome_canvas_Stacked = document.getElementById("canvasStack");

let portrait_blacka = document.getElementById("portrait_outline").getContext("2d");
let portrait_blacked = document.getElementById("portrait_outline");

const marge = document.getElementById("margesimpson");
const bart = document.getElementById("outtheline");
const homer = document.getElementById("complexmode");

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
//stolen code lol https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

function loadImage(filePath)
{
	my_tempo = new Image()
	my_tempo.src = filePath
	return my_tempo
}

function copy(it) 
{
	return JSON.parse(JSON.stringify(it))
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

//canvas.style.display = 'none'

let bonus_boxes = []
let bonus_buttons = []
let bonus_breaks = []

let textbox_bg = document.getElementById("text_bg")
let textbox_bg_alt = document.getElementById("text_bg_alt")
let textbox_text = document.getElementById("text_input")
let textbox_chr = document.getElementById("text_chr")
let textbox_exp = document.getElementById("text_exp")
let textbox_exp_alt = document.getElementById("text_exp_alt")
let textbox_exp_c = document.getElementById("text_exp_color")

let textbox_exp_sc = document.getElementById("text_exp_sc")

let textbox_over = document.getElementById("text_over")
let textbox_over_alt = document.getElementById("text_over_alt")
let textbox_font = document.getElementById("text_font")
let textbox_font_alt = document.getElementById("text_font_alt")

//let textbox_bg_x = document.getElementById("origin_x")
//let textbox_bg_y = document.getElementById("origin_y")
let textbox_bg_w = document.getElementById("origin_w")
let textbox_bg_h = document.getElementById("origin_h")
//let textbox_bg_c = document.getElementById("origin_c")

let font_box_hidden = document.getElementById("custom_show")
let mono_spaced_real = document.getElementById("noJoke")
let this_is_gonna_suck_i_guess = document.getElementById("text_font_spacin")

let portrait_x = document.getElementById("port_x")
let portrait_y = document.getElementById("port_y")

let textbox_exp_txt_1 = document.getElementById(id="exp_txt")

/*let font_dt_mono = loadImage("assets/determination_mono.png")
let font_dt_mono_ol = loadImage("assets/determination_mono_outline.png")
let font_dt_mono_dw = loadImage("assets/determination_mono_dw.png")*/

let boxes_in = []

let stack_width_inp = document.getElementById(id="stack_width")

ctx.imageSmoothingEnabled = false
canvas.imageSmoothingEnabled = false

let portraits_in = []

let overlays_in = []

let offset = [0,0]

let box_size = [0,0,578,152]

let cur_font = new Image()
let cur_outline = new Image()
let cur_dw = new Image()

let list_of_boxes = [];
let list_of_text = [];
let list_of_portraits = [];

let prebaked_boxes = {
	undertale: [578, 152, ["", "assets/textboxes/undertale.png", 0, 0, "#ffffff", "true"], "text", ["", 28, 26, 116, 0, true, false, false], "port", ["", 0, 0, "2x_Scaling", true], "over"],
	outertale: [578, 152, ["", "assets/textboxes/outertale.png", 0, 0, "#ffffff", "true"], "text", ["", 28, 26, 116, 0, true, false, false], "port", ["", 0, 0, "2x_Scaling", true], "over"],
	underswap: [578, 152, ["", "assets/textboxes/underswap.png", 0, 0, "#ffffff", "true"], "text", ["", 28, 26, 116, 0, true, false, false], "port", ["", 0, 0, "2x_Scaling", true], "over"],
	deltarune: [594,168, ["", "assets/textboxes/deltarune.png", 0, 0, "#ffffff", "true"], "text", ["", 28+8, 26+10, 116, 0, true, false, false], "port", ["", 8, 10, "2x_Scaling", true], "over"],
	jumbo: [578, 188, ["", "assets/textboxes/jumbo.png", 0, 0, "#ffffff", "true"], "text", ["", 28, 26, 116, 0, true, false, false], "port", ["", 0, 0, "2x_Scaling", true], "over"],
	cavestory: [488, 128, ["", "assets/textboxes/cave_story.png", 0, 0, "#ffffff", "true"], "text", ["", 27, 23, 110, 0, false, false, false], "port", ["", 3, -11, "2x_Scaling", false], "over"],
}

let char_options = '<option value="none">None</option><option value="custom">Custom</option><option value="flowey">Flowey</option><option value="toriel">Toriel</option>'

let exp_options = 
{
	"flowey": '<option value="assets/characters/flowey/spr_floweynice_0.png">Nice</option><option value="assets/characters/flowey/spr_floweywink_0.png">Wink</option><option value="assets/characters/flowey/spr_floweysassy_0.png">Sassy</option><option value="assets/characters/flowey/spr_floweyplain_0.png">D:</option><option value="assets/characters/flowey/spr_floweyniceside_0.png">Side (Smile)</option><option value="assets/characters/flowey/spr_floweynicesideum_0.png">Side (Uh)</option><option value="assets/characters/flowey/spr_floweygrin_0.png">Grin</option><option value="assets/characters/flowey/spr_floweyevil_0.png">Evil</option><option value="assets/characters/flowey/spr_floweylaugh_0.png">Laugh</option><option value="assets/characters/flowey/spr_floweyside_0.png">Side</option><option value="assets/characters/flowey/spr_floweysideshock_0.png">Side (Ah)</option><option value="assets/characters/flowey/spr_floweytoriel_0.png">Toriel</option><option value="assets/characters/flowey/spr_floweytoriel2_0.png">Toriel (Distorted)</option><option value="assets/characters/flowey/spr_floweyhurt_0.png">Hurt</option>',
	"toriel": '<option value="assets/characters/toriel/default.png">Default</option><option value="assets/characters/toriel/looking-away.png">Looking Away</option><option value="sad">Sad</option>'
}

function refresh_box_list()
{
	for(var i = 0; i < list_of_boxes.length; i++)
	{
		list_of_boxes[i].image_sel.className = "box_" + String(i)
		//list_of_boxes[i].upButt.className = "box_" + String(i)
		list_of_boxes[i].removeButt.id = "box_" + String(i)
		//list_of_boxes[i].downButt.className = "box_" + String(i)
	}
}

function refresh_text_list()
{
	for(var i = 0; i < list_of_text.length; i++)
	{
		list_of_text[i].removeButt.id = "text_" + String(i)
	}
}

function refresh_char_list()
{
	for(var i = 0; i < list_of_portraits.length; i++)
	{
		list_of_portraits[i].removeButt.id = "port_" + String(i)
		list_of_portraits[i].chara_pos.className = "port_" + String(i)
		list_of_portraits[i].exp_select.className = "port_" + String(i)
		list_of_portraits[i].image_sel.className = "port_" + String(i)
	}
}

function complex_br()
{
	const complx_br = document.createElement("br")
	complx_br.classList.add("complex")
	return complx_br
}

function new_box(def_name="", def_image=-1, def_x=0, def_y=0, def_w=578, def_h=152, def_c="#ffffff", def_v=true)
{
	var newBox = {};
	newBox.border = document.createElement("div");
	newBox.border.classList.add("box")
	newBox.border.style.width = "330px"

	var name_txt = document.createElement("span");
	name_txt.innerHTML = "Name: "
	name_txt.classList.add("complex")
	newBox.border.appendChild(name_txt)
	newBox.name_field = document.createElement("input");
	newBox.name_field.value = def_name;
	newBox.name_field.classList.add("complex")
	newBox.border.appendChild(newBox.name_field)

	newBox.border.appendChild(complex_br())
	var image_txt = document.createElement("span");
	image_txt.innerHTML = "Image: "
	newBox.border.appendChild(image_txt)

	newBox.image = false

	newBox.image_sel = document.createElement("input");
	newBox.image_sel.type = "file"
	newBox.image_sel.accept = "image/png"
	newBox.image_sel.classList.add("box_" + String(list_of_boxes.length))
	newBox.image_sel.addEventListener('change', function(ev)
	{
		if(ev.target.files) {
			let file = ev.target.files[0];
			var reader = new FileReader();
			
     		 	reader.readAsDataURL(file);
      			reader.onloadend = (e) => 
			{
				var which_box = Number(this.className.substring(4))
				//alert(which_box)
				if(list_of_boxes[which_box].image == false)
				{
       					var image = new Image();
        				image.src = e.target.result;
					list_of_boxes[which_box].image = image
					list_of_boxes[which_box].image.style.display='none'
				}
				else
				{
					list_of_boxes[which_box].image.src=e.target.result;
				}
      			}
   		}
	});
	if(def_image != -1)
	{
		if(def_image.substring(0,7) == "assets/")
		{
			newBox.image = loadImage(def_image)
			newBox.image.style.display = 'none'
		}
		else
		{
			//def_image = def_image.substring(22)
			//console.log(def_image)
			//alert(def_image)
			
			var image = new Image();
        		image.src = def_image;
			newBox.image = image
			newBox.image.style.display='none'
		}
	}
	newBox.border.appendChild(newBox.image_sel)

	newBox.border.appendChild(document.createElement("br"))
	newBox.border.appendChild(complex_br())

	var set_txt = document.createElement("span");
	set_txt.innerHTML = "Box Settings: "
	set_txt.classList.add("complex")
	newBox.border.appendChild(set_txt)
	newBox.border.appendChild(complex_br())

	var x_txt = document.createElement("span");
	x_txt.innerHTML = "Box X: "
	x_txt.classList.add("complex")
	newBox.border.appendChild(x_txt)
	newBox.x_pos = document.createElement("input");
	newBox.x_pos.type = "number"
	newBox.x_pos.value = def_x
	newBox.x_pos.style = "width: 40px;"
	newBox.x_pos.classList.add("complex")
	newBox.border.appendChild(newBox.x_pos);

	var y_txt = document.createElement("span");
	y_txt.innerHTML = " Box Y: "
	y_txt.classList.add("complex")
	newBox.border.appendChild(y_txt)
	newBox.y_pos = document.createElement("input");
	newBox.y_pos.type = "number"
	newBox.y_pos.value = def_y
	newBox.y_pos.style = "width: 40px;"
	newBox.y_pos.classList.add("complex")
	newBox.border.appendChild(newBox.y_pos);

	newBox.border.appendChild(complex_br())

	var c_txt = document.createElement("span");
	c_txt.innerHTML = "Box Color "
	newBox.border.appendChild(c_txt)
	newBox.c_type = document.createElement("select");
	newBox.c_type.innerHTML = '<option value="white">(Replacing White)</option><option value="multi">(Multiplicative)</option><option value="whole">(All Of It)</option>'
	newBox.c_type.classList.add("complex")
	newBox.border.appendChild(newBox.c_type)
	c_txt = document.createElement("span");
	c_txt.innerHTML = ": "
	newBox.border.appendChild(c_txt)
	newBox.c_pos = document.createElement("input");
	newBox.c_pos.type = "color"
	newBox.c_pos.value = def_c
	newBox.border.appendChild(newBox.c_pos);

	newBox.border.appendChild(complex_br())

	var vis_txt = document.createElement("span");
	vis_txt.innerHTML = "Visible: "
	vis_txt.classList.add("complex")
	newBox.border.appendChild(vis_txt)
	newBox.v_pos = document.createElement("input");
	newBox.v_pos.type = "checkbox"
	newBox.v_pos.checked = def_v
	newBox.v_pos.classList.add("complex")
	newBox.border.appendChild(newBox.v_pos)
	
	newBox.border.appendChild(document.createElement("br"))
	newBox.border.appendChild(document.createElement("br"))

	/*newBox.upButt = document.createElement("button");
	newBox.upButt.innerHTML = "^"
	newBox.upButt.classList.add("box_" + String(list_of_boxes.length))
	newBox.upButt.onclick = function() 
	{
		var which_box = Number(this.className.substring(4))
		if(which_box > 0)
		{
			alert("?")
			list_of_boxes.length = 0
			refresh_box_list()
		}
	}
	newBox.border.appendChild(newBox.upButt)*/

	newBox.removeButt = document.createElement("button");
	newBox.removeButt.innerHTML = "Remove"
	newBox.removeButt.id = "box_" + String(list_of_boxes.length)
	newBox.removeButt.classList.add("complex")
	newBox.removeButt.onclick = function() 
	{
		var which_box = Number(this.id.substring(4))
		list_of_boxes[which_box].border.remove()
		list_of_boxes[which_box].linebreak.remove()
		list_of_boxes.splice(which_box, 1)
		refresh_box_list()
	}
	newBox.border.appendChild(newBox.removeButt)

	/*newBox.downButt = document.createElement("button");
	newBox.downButt.innerHTML = "v"
	newBox.border.appendChild(newBox.downButt)*/

	box_container.appendChild(newBox.border)

	newBox.linebreak = complex_br()
	box_container.appendChild(newBox.linebreak)
	list_of_boxes.push(newBox)
}

function new_text(def_name="", def_x=0, def_y=0, def_x_off=0, def_y_off=0, def_o=true, def_d=false, def_a=false)
{
	var newText = {};
	newText.border = document.createElement("div");
	newText.border.classList.add("box")
	newText.border.style.width = "600px"

	var name_txt = document.createElement("span");
	name_txt.innerHTML = "Name: "
	name_txt.classList.add("complex")
	newText.border.appendChild(name_txt)
	newText.name_field = document.createElement("input");
	newText.name_field.value = def_name;
	newText.name_field.classList.add("complex")
	newText.border.appendChild(newText.name_field)

	newText.border.appendChild(complex_br())

	/*var font_txt = document.createElement("span");
	font_txt.innerHTML = "Font: "
	newText.border.appendChild(font_txt)
	
	var placeholder = document.createElement("span");
	placeholder.innerHTML = "[WIP]"
	newText.border.appendChild(placeholder)
	
	newText.border.appendChild(document.createElement("br"))*/
	newText.border.appendChild(document.createElement("br"))

	var set_txt = document.createElement("span");
	set_txt.innerHTML = "Text Settings: "
	newText.border.appendChild(set_txt)

	newText.border.appendChild(document.createElement("br"))

	var x_txt = document.createElement("span");
	x_txt.innerHTML = "Text X: "
	newText.border.appendChild(x_txt)
	newText.x_pos = document.createElement("input");
	newText.x_pos.type = "number"
	newText.x_pos.value = def_x
	newText.x_pos.style = "width: 40px;"
	newText.border.appendChild(newText.x_pos);

	var y_txt = document.createElement("span");
	y_txt.innerHTML = " Text Y: "
	newText.border.appendChild(y_txt)
	newText.y_pos = document.createElement("input");
	newText.y_pos.type = "number"
	newText.y_pos.value = def_y
	newText.y_pos.style = "width: 40px;"
	newText.border.appendChild(newText.y_pos);

	newText.border.appendChild(complex_br())

	var x_txt = document.createElement("span");
	x_txt.innerHTML = "Portrait X-Offset: "
	x_txt.classList.add("complex")
	newText.border.appendChild(x_txt)
	newText.x_pos_alt = document.createElement("input");
	newText.x_pos_alt.type = "number"
	newText.x_pos_alt.value = def_x_off
	newText.x_pos_alt.style = "width: 40px;"
	newText.x_pos_alt.classList.add("complex")
	newText.border.appendChild(newText.x_pos_alt);

	var y_txt = document.createElement("span");
	y_txt.innerHTML = " Portrait Y-Offset: "
	y_txt.classList.add("complex")
	newText.border.appendChild(y_txt)
	newText.y_pos_alt = document.createElement("input");
	newText.y_pos_alt.type = "number"
	newText.y_pos_alt.value = def_y_off
	newText.y_pos_alt.style = "width: 40px;"
	newText.y_pos_alt.classList.add("complex")
	newText.border.appendChild(newText.y_pos_alt);

	newText.border.appendChild(document.createElement("br"))

	var out_txt = document.createElement("span");
	out_txt.innerHTML = "Outline: "
	newText.border.appendChild(out_txt)
	newText.o_pos = document.createElement("input");
	newText.o_pos.type = "checkbox"
	newText.o_pos.checked = def_o
	newText.border.appendChild(newText.o_pos)

	var dark_txt = document.createElement("span");
	dark_txt.innerHTML = " Dark World: "
	newText.border.appendChild(dark_txt)
	newText.d_pos = document.createElement("input");
	newText.d_pos.type = "checkbox"
	newText.d_pos.checked = def_d
	newText.border.appendChild(newText.d_pos)

	newText.border.appendChild(document.createElement("br"))

	var auto_txt = document.createElement("span");
	auto_txt.innerHTML = "Auto-Linebreak: "
	newText.border.appendChild(auto_txt)
	newText.a_pos = document.createElement("input");
	newText.a_pos.type = "checkbox"
	newText.a_pos.checked = def_a
	newText.border.appendChild(newText.a_pos)

	newText.border.appendChild(complex_br())

	auto_txt = document.createElement("span");
	auto_txt.innerHTML = "Color-Blend: "
	auto_txt.classList.add("complex")
	newText.border.appendChild(auto_txt)
	newText.c_type = document.createElement("select");
	newText.c_type.innerHTML = '<option value="white">(Replacing White)</option><option value="multi">(Multiplicative)</option><option value="whole">(All Of It)</option>'
	newText.c_type.classList.add("complex")
	newText.border.appendChild(newText.c_type)

	newText.border.appendChild(document.createElement("br"))
	newText.border.appendChild(document.createElement("br"))
	
	var txt_txt = document.createElement("span");
	txt_txt.innerHTML = "Text: "
	newText.border.appendChild(txt_txt)
	newText.border.appendChild(document.createElement("br"))
	newText.text = document.createElement("input");
	newText.text.type = "text"
	newText.text.style = "width: 500px;"
	newText.border.appendChild(newText.text)

	newText.border.appendChild(complex_br())
	newText.border.appendChild(complex_br())

	newText.removeButt = document.createElement("button");
	newText.removeButt.innerHTML = "Remove"
	newText.removeButt.id ="text_" + String(list_of_text.length)
	newText.removeButt.classList.add("complex")
	newText.removeButt.onclick = function() 
	{
		var which_text = Number(this.id.substring(5))
		list_of_text[which_text].border.remove()
		list_of_text[which_text].linebreak.remove()
		list_of_text.splice(which_text, 1)
		refresh_text_list()
	}
	newText.border.appendChild(newText.removeButt)

	text_container.appendChild(newText.border)
	newText.linebreak = complex_br()
	text_container.appendChild(newText.linebreak)
	list_of_text.push(newText)
}

function new_port(def_name="", def_x=0, def_y=0, def_s="2x_Scaling", def_o=true)
{
	var newPort = {};
	newPort.border = document.createElement("div");
	newPort.border.classList.add("box")
	newPort.border.style.width = "370px"

	var name_txt = document.createElement("span");
	name_txt.innerHTML = "Name: "
	name_txt.classList.add("complex")
	newPort.border.appendChild(name_txt)
	newPort.name_field = document.createElement("input");
	newPort.name_field.value = def_name;
	newPort.name_field.classList.add("complex")
	newPort.border.appendChild(newPort.name_field)

	newPort.border.appendChild(complex_br())

	var label_txt = document.createElement("span");
	label_txt.innerHTML = "Character: "
	newPort.border.appendChild(label_txt)

	newPort.image = false

	newPort.chara_pos = document.createElement("select");
	newPort.chara_pos.innerHTML = char_options
	newPort.chara_pos.classList.add("port_" + String(list_of_portraits.length))

	
	newPort.chara_pos.addEventListener("change", function(event) 
	{
		var which_char = Number(this.className.substring(5))
		if(this.value == "none")
		{
			list_of_portraits[which_char].exp_txt.style = "display: none"
			list_of_portraits[which_char].exp_select.style = "display: none"
			list_of_portraits[which_char].image_sel.style = "display: none"
			var prehold = copy(list_of_portraits[which_char].image)
			if(prehold != false)
			{
				list_of_portraits[which_char].border.removeChild(list_of_portraits[which_char].image)
				list_of_portraits[which_char].border.removeChild(list_of_portraits[which_char].linebreak_two)
			}
			list_of_portraits[which_char].image = false
		}
		else
		{
			list_of_portraits[which_char].exp_txt.style = "display: inline"
			if(this.value == "custom")
			{
				list_of_portraits[which_char].image_sel.style = "display: inline"
				list_of_portraits[which_char].exp_select.style = "display: none"
			}
			else
			{
				list_of_portraits[which_char].image_sel.style = "display: none"
				list_of_portraits[which_char].exp_select.style = "display: inline"
				list_of_portraits[which_char].exp_select.innerHTML = exp_options[this.value]
				var event = new Event('change');
				list_of_portraits[which_char].exp_select.dispatchEvent(event);
			}
		}
	})
	newPort.border.appendChild(newPort.chara_pos)

	newPort.border.appendChild(document.createElement("br"))
	
	newPort.exp_txt = document.createElement("span");
	newPort.exp_txt.innerHTML = "Expression: "
	newPort.exp_txt.style = "display: none"
	newPort.border.appendChild(newPort.exp_txt)
	
	newPort.exp_select = document.createElement("select");
	newPort.exp_select.innerHTML = char_options
	newPort.exp_select.classList.add("port_" + String(list_of_portraits.length))
	newPort.exp_select.style = "display: none"

	newPort.exp_select.addEventListener("change", function(event) 
	{
		var which_char = Number(this.className.substring(5))
		var prehold = copy(list_of_portraits[which_char].image)
		if(prehold != false)
		{
			list_of_portraits[which_char].border.removeChild(list_of_portraits[which_char].image)
			list_of_portraits[which_char].border.removeChild(list_of_portraits[which_char].linebreak_two)
		}
		if(this.value.substring(0,7) == "assets/")
		{
			list_of_portraits[which_char].image = loadImage(this.value)
		}
		else
		{
			var image = new Image();
        		image.src = this.value;
			list_of_portraits[which_char].image = image
		}
		list_of_portraits[which_char].image.classList.add("image_border")
		list_of_portraits[which_char].border.appendChild(list_of_portraits[which_char].linebreak_two)
		list_of_portraits[which_char].border.appendChild(list_of_portraits[which_char].image)
	})
	newPort.border.appendChild(newPort.exp_select)

	newPort.image_sel = document.createElement("input");
	newPort.image_sel.type = "file"
	newPort.image_sel.accept = "image/png"
	newPort.image_sel.classList.add("port_" + String(list_of_portraits.length))
	newPort.image_sel.style = "display: none"
	newPort.image_sel.addEventListener('change', function(ev)
	{
		if(ev.target.files) {
			let file = ev.target.files[0];
			var reader = new FileReader();
			
     		 	reader.readAsDataURL(file);
      			reader.onloadend = (e) => 
			{
				var which_char = Number(this.className.substring(5))
				alert(which_char)
				if(list_of_portraits[which_char].image == false)
				{
       					var image = new Image();
        				image.src = e.target.result;
					list_of_portraits[which_char].image = image
					list_of_portraits[which_char].image.classList.add("image_border")
					list_of_portraits[which_char].border.appendChild(list_of_portraits[which_char].linebreak_two)
					list_of_portraits[which_char].border.appendChild(list_of_portraits[which_char].image)
				}
				else
				{
					list_of_portraits[which_char].image.src=e.target.result;
				}
      			}
   		}
	});

	
	newPort.border.appendChild(newPort.image_sel)
	//newPort.image_sel.addEventListener('change', function(ev)

	newPort.border.appendChild(document.createElement("br"))
	var set_txt = document.createElement("span");
	set_txt.innerHTML = "Portrait Settings: "
	newPort.border.appendChild(set_txt)
	newPort.border.appendChild(document.createElement("br"))

	var x_txt = document.createElement("span");
	x_txt.innerHTML = "Portrait X Offset: "
	newPort.border.appendChild(x_txt)
	newPort.x_pos = document.createElement("input");
	newPort.x_pos.type = "number"
	newPort.x_pos.value = def_x
	newPort.x_pos.style = "width: 40px;"
	newPort.border.appendChild(newPort.x_pos);

	var y_txt = document.createElement("span");
	y_txt.innerHTML = " Portrait Y Offset: "
	newPort.border.appendChild(y_txt)
	newPort.y_pos = document.createElement("input");
	newPort.y_pos.type = "number"
	newPort.y_pos.value = def_y
	newPort.y_pos.style = "width: 40px;"
	newPort.border.appendChild(newPort.y_pos);

	newPort.border.appendChild(complex_br())

	var s_txt = document.createElement("span");
	s_txt.innerHTML = "Portrait Scaling: "
	s_txt.classList.add("complex")
	newPort.border.appendChild(s_txt)
	newPort.s_pos = document.createElement("select");
	newPort.s_pos.innerHTML = '<option value="2x_Scaling">2X Upscale And Center</option><option value="Fit_Basic">Squish/Stretch to Fit</option><option value="Center_It">Center</option><option value="0.5x_Scaling">0.5X Downscale And Center</option><option value="Fit_Square">Scale Evenly to Fit</option><option value="Unchanged_Anything">Unchanged</option>'
	newPort.s_pos.classList.add("complex")
	newPort.s_pos.value = def_s
	newPort.border.appendChild(newPort.s_pos)

	newPort.border.appendChild(document.createElement("br"))

	var out_txt = document.createElement("span");
	out_txt.innerHTML = "Outline: "
	newPort.border.appendChild(out_txt)
	newPort.o_pos = document.createElement("input");
	newPort.o_pos.type = "checkbox"
	newPort.o_pos.checked = def_o
	newPort.border.appendChild(newPort.o_pos)
	
	newPort.border.appendChild(document.createElement("br"))
	
	var c_txt = document.createElement("span");
	c_txt.innerHTML = "Portrait Color "
	newPort.border.appendChild(c_txt)
	newPort.c_type = document.createElement("select");
	newPort.c_type.innerHTML = '<option value="white">(Replacing White)</option><option value="multi">(Multiplicative)</option><option value="whole">(All Of It)</option>'
	newPort.c_type.classList.add("complex")
	newPort.border.appendChild(newPort.c_type)
	c_txt = document.createElement("span");
	c_txt.innerHTML = ": "
	newPort.border.appendChild(c_txt)
	newPort.c_pos = document.createElement("input");
	newPort.c_pos.type = "color"
	newPort.c_pos.value = "#ffffff"
	newPort.border.appendChild(newPort.c_pos);

	newPort.border.appendChild(complex_br())
	newPort.border.appendChild(complex_br())

	newPort.removeButt = document.createElement("button");
	newPort.removeButt.innerHTML = "Remove"
	newPort.removeButt.id = "port_" + String(list_of_portraits.length)
	newPort.removeButt.classList.add("complex")
	newPort.removeButt.onclick = function() 
	{
		var which_char = Number(this.id.substring(5))
		list_of_portraits[which_char].border.remove()
		list_of_portraits[which_char].linebreak.remove()
		list_of_portraits.splice(which_char, 1)
		refresh_char_list()
	}
	newPort.border.appendChild(newPort.removeButt)

	char_container.appendChild(newPort.border)
	newPort.linebreak = complex_br()
	newPort.linebreak_two = document.createElement("br")
	char_container.appendChild(newPort.linebreak)
	list_of_portraits.push(newPort)
}

function loader_up(awesome_template)
{
	for(let i = 0; i < list_of_boxes.length; i++)
	{
		list_of_boxes[i].border.remove()
		list_of_boxes[i].linebreak.remove()
	}
	list_of_boxes.length = 0
	var save_this_tho = []
	for(let i = 0; i < list_of_text.length; i++)
	{
		save_this_tho.push(copy(list_of_text[i].text.value))
		list_of_text[i].border.remove()
		list_of_text[i].linebreak.remove()
	}
	list_of_text.length = 0
	for(let i = 0; i < list_of_portraits.length; i++)
	{
		list_of_portraits[i].border.remove()
		list_of_portraits[i].linebreak.remove()
	}
	list_of_portraits.length = 0
	origin_w.value = awesome_template[0]
	origin_h.value = awesome_template[1]
	let i = 2
	while(i < awesome_template.length && typeof(awesome_template[i]) != "string")
	{
		new_box(awesome_template[i][0], awesome_template[i][1], awesome_template[i][2], awesome_template[i][3], awesome_template[i][4], awesome_template[i][5], awesome_template[i][6], awesome_template[i][7])
		i++
	}
	i++
	while(i < awesome_template.length && typeof(awesome_template[i]) != "string")
	{
		new_text(awesome_template[i][0], awesome_template[i][1], awesome_template[i][2], awesome_template[i][3], awesome_template[i][4], awesome_template[i][5], awesome_template[i][6], awesome_template[i][7])
		list_of_text[list_of_text.length-1].text.value = save_this_tho[list_of_text.length-1]
		i++
	}
	i++
	while(i < awesome_template.length && typeof(awesome_template[i]) != "string")
	{
		new_port(awesome_template[i][0], awesome_template[i][1], awesome_template[i][2], awesome_template[i][3], awesome_template[i][4])
		i++
	}
	
	toggle_complex(homer.checked)
	//toggle_complex(true)
}

loader_up(prebaked_boxes["undertale"])
list_of_text[0].text.value = "* Type in your text here!\\n* For colored text, do \\#ff0000T\\#ffa500H\\#ffff00I\\#00ff00S\\#0000ff!\\#a901c0!\\n  \\#ffffffIt uses the hex code. \\y-2]S\\y4]H\\y-4]A\\y4]K\\y-4]Y\\y2]!"

function generate_font(new_fnt)
{
	portrait_blacked.width = cur_font.width
	portrait_blacked.height = cur_font.height
	portrait_blacka.clearRect(0,0,cur_font.width,cur_font.height)
	portrait_blacka.imageSmoothingEnabled = false
	portrait_blacka.drawImage(cur_font,0,0)
	var cool_pixels = portrait_blacka.getImageData(0,0,cur_font.width,cur_font.height)
	for(var i = 3; i < cool_pixels.data.length; i += 4)
	{
		if(cool_pixels.data[i] > 0)
		{
			cool_pixels.data[i-3] = 0
			cool_pixels.data[i-2] = 0
			cool_pixels.data[i-1] = 0
		}
	}
	portrait_blacka.putImageData(cool_pixels, 0, 0)
	var blacked_out = portrait_blacked.toDataURL('image/png');
	cur_outline.src = blacked_out;
	portrait_blacked.width = cur_font.width
	portrait_blacked.height = cur_font.height
	portrait_blacka.clearRect(0,0,cur_font.width,cur_font.height)
	portrait_blacka.imageSmoothingEnabled = false
	portrait_blacka.drawImage(cur_font,0,0)
	var cool_pixels = portrait_blacka.getImageData(0,0,cur_font.width,cur_font.height)
	for(var i = 3; i < cool_pixels.data.length; i += 4)
	{
		if(cool_pixels.data[i] > 0)
		{
			cool_pixels.data[i-3] = 15
			cool_pixels.data[i-2] = 15
			cool_pixels.data[i-1] = 112
		}
	}
	portrait_blacka.putImageData(cool_pixels, 0, 0)
	var blacked_out = portrait_blacked.toDataURL('image/png');
	cur_dw.src = blacked_out;
}

//generate_font('assets/fonts/cfc determination_mono.png')

cur_font = loadImage('assets/fonts/determination_mono.png')

function toggle_complex(complex)
{
	//alert(complex)
	if(!complex)
	{
		var box_borders = document.getElementsByClassName('box');
  		for(i = 0; i < box_borders.length; i++) {
  			box_borders[i].style.border = 'none'
			box_borders[i].style.padding = '0px'
		}
		box_borders = document.getElementsByClassName('complex');
  		for(i = 0; i < box_borders.length; i++) {
  			box_borders[i].style.display = 'none'
		}
		box_borders = document.getElementsByClassName('simple');
  		for(i = 0; i < box_borders.length; i++) {
  			box_borders[i].style.display = 'inline'
		}
	}
	else
	{
		var box_borders = document.getElementsByClassName('box');
  		for(i = 0; i < box_borders.length; i++) {
  			box_borders[i].style.border = '3px double black'
			box_borders[i].style.padding = '4px'
		}
		box_borders = document.getElementsByClassName('complex');
  		for(i = 0; i < box_borders.length; i++) {
  			box_borders[i].style.display = 'inline'
		}
		box_borders = document.getElementsByClassName('simple');
  		for(i = 0; i < box_borders.length; i++) {
  			box_borders[i].style.display = 'none'
		}
	}
}

toggle_complex(homer.checked)

homer.addEventListener('change', (event) => {
  toggle_complex(event.currentTarget.checked)
})

function letter_to_index(letta, index)
{
	var code = letta.charCodeAt(index)
	if(code >= 48 && code <= 57)
	{ 
		return code + (57-48)
	}
	else if(code >= 65 && code <= 90)
	{return code-65}
	else if(code >= 97 && code <= 122)
	{return code-97+26}
	else if(code == 42)
	{return 54}
	else if(code == 63)
	{return 52}
	else if(code == 40 || code == 41)
	{return code+15}
	else if(code == 33)
	{return 53}
	else if(code == 46)
	{return 68}
	else if(code == 44)
	{return 69}
	else if(code == 39 || code == 8216 || code == 8217)
	{return 70}
	else if(code == 34 || code == 8220 || code == 8221)
	{return 71}
	else if(code == 58 || code == 69)
	{return code+(80-58)}
	else if(code == 94)
	{return 82}
	else if(code == 38)
	{return 83}
	else if(code == 64)
	{return 84}
	else if(code == 95)
	{return 85}
	else if(code == 91)
	{return 86}
	else if(code == 93)
	{return 87}
	else if(code == 93)
	{return 86}
	else if(code == 60)
	{return 72}
	else if(code == 62)
	{return 73}
	else if(code == 43)
	{return 74}
	else if(code == 45)
	{return 75}
	else if(code == 47)
	{return 76}
	else if(code == 37)
	{return 77}
	else if(code == 36)
	{return 78}
	else if(code == 61)
	{return 89}
	else
	{return 67}
}

let readThisBozo = []

let doColorMath = true
function draw_text(pass_in)//(x,y,str)
{
	var x = Number(copy(pass_in.x_pos.value)) + offset[0]
	var y = Number(copy(pass_in.y_pos.value)) + offset[1]
	if(any_portraits)
	{
		x += Number(copy(pass_in.x_pos_alt.value))
		y += Number(copy(pass_in.y_pos_alt.value))
	}
	var str = copy(pass_in.text.value)
	var draw_pos_x = [x, x]
	var draw_pos_y = [y, y]
	var color = hexToRgb("#ffffff")
	var i = 0
	var chr_length = cur_font.naturalWidth/10
	var chr_height = cur_font.naturalHeight/9 //!REMEMBER TO CHANGE LATER!
	var per_char_spacing = [] //this is empty so it's monospaced
	var line_break_height = Math.floor(chr_height*18/13)
	if(!mono_spaced_real.checked)
	{
		per_char_spacing = JSON.parse(JSON.stringify(readThisBozo))
		if(per_char_spacing.length > 90)
		{line_break_height = Number(per_char_spacing[90][0])}
	} //Just In Case Man
	while(i < str.length) {
		if (str.charAt(i) == "\\")
		{
			if(str.charAt(i+1) == "n")
			{
				draw_pos_x[0] = draw_pos_x[1]
				draw_pos_y[0] += Math.floor(chr_height*18/13)
			}
			else if(str.charAt(i+1) == "#")
			{
				color = "#"
				for(var j = 2; j < 8; j++)
				{
					color += str.charAt(i+j)
				}
				i += 6
				color = hexToRgb(color)
			}
			else if(str.charAt(i+1) == "x")
			{
				x_off = ""
				var j = 2
				while(str.charAt(i+j) != "]")
				{
					x_off += str.charAt(i+j)
					j++
				}
				i += j-1
				draw_pos_x[0] += Number(x_off)
				draw_pos_x[1] += Number(x_off)
			}
			else if(str.charAt(i+1) == "y")
			{
				x_off = ""
				var j = 2
				while(str.charAt(i+j) != "]")
				{
					x_off += str.charAt(i+j)
					j++
				}
				i += j-1
				draw_pos_y[0] += Number(x_off)
				draw_pos_y[1] += Number(x_off)
			}
			i += 2
			continue
		}
		var cur_letter = letter_to_index(str, i)
		if(per_char_spacing.length == 0)
		{
			letter_posed = [0, 0, Math.floor(chr_length*8/9)]
		}
		else
		{
			letter_posed = [Number(per_char_spacing[cur_letter][1]), Number(per_char_spacing[cur_letter][2])]
			if(per_char_spacing[cur_letter][3] == "default")
			{
				letter_posed.push(Math.floor(chr_length*8/9))
			}
			else
			{
				letter_posed.push(Number(per_char_spacing[cur_letter][3]))
			}
		}
		var letter_info = [(cur_letter%10)*chr_length,Math.floor(cur_letter/10)*chr_height,chr_length,chr_height]
		if(!pass_in.d_pos.checked)
		{
			if(pass_in.o_pos.checked)
			{
   				ctx.drawImage(cur_outline,letter_info[0],letter_info[1],letter_info[2],letter_info[3], draw_pos_x[0]-1+letter_posed[0], draw_pos_y[0]-1+letter_posed[1], letter_info[2],letter_info[3])
   				ctx.drawImage(cur_outline,letter_info[0],letter_info[1],letter_info[2],letter_info[3], draw_pos_x[0]-1+letter_posed[0], draw_pos_y[0]+1+letter_posed[1], letter_info[2],letter_info[3])
				ctx.drawImage(cur_outline,letter_info[0],letter_info[1],letter_info[2],letter_info[3], draw_pos_x[0]+1+letter_posed[0], draw_pos_y[0]-1+letter_posed[1], letter_info[2],letter_info[3])
				ctx.drawImage(cur_outline,letter_info[0],letter_info[1],letter_info[2],letter_info[3], draw_pos_x[0]+1+letter_posed[0], draw_pos_y[0]+1+letter_posed[1], letter_info[2],letter_info[3])
				ctx.drawImage(cur_outline,letter_info[0],letter_info[1],letter_info[2],letter_info[3], draw_pos_x[0]-1+letter_posed[0], draw_pos_y[0]+letter_posed[1], letter_info[2],letter_info[3])
				ctx.drawImage(cur_outline,letter_info[0],letter_info[1],letter_info[2],letter_info[3], draw_pos_x[0]+1+letter_posed[0], draw_pos_y[0]+letter_posed[1], letter_info[2],letter_info[3])
				ctx.drawImage(cur_outline,letter_info[0],letter_info[1],letter_info[2],letter_info[3], draw_pos_x[0]+letter_posed[0], draw_pos_y[0]-1+letter_posed[1], letter_info[2],letter_info[3])
				ctx.drawImage(cur_outline,letter_info[0],letter_info[1],letter_info[2],letter_info[3], draw_pos_x[0]+letter_posed[0], draw_pos_y[0]+1+letter_posed[1], letter_info[2],letter_info[3])
			}
		}
		else
		{
			ctx.drawImage(cur_outline,letter_info[0],letter_info[1],letter_info[2],letter_info[3], draw_pos_x[0]+1+letter_posed[0], draw_pos_y[0]+1+letter_posed[1], letter_info[2],letter_info[3])
		}
		if(doColorMath && (!(color.r == 255 && color.g == 255 && color.b == 255) || pass_in.c_type.value == "whole") )
		{
			portrait_blacked.width = letter_info[2]
			portrait_blacked.height = letter_info[3]
			portrait_blacka.clearRect(0,0,18,26)
			portrait_blacka.imageSmoothingEnabled = false
			canvas.imageSmoothingEnabled = false
			portrait_blacka.drawImage(cur_font,letter_info[0],letter_info[1],letter_info[2],letter_info[3],0,0,letter_info[2],letter_info[3])
			var what_to = pass_in.c_type.value
			var cool_pixels = portrait_blacka.getImageData(0,0,letter_info[2],letter_info[3])
			for(var j = 3; j < cool_pixels.data.length; j += 4)
			{
				if(what_to == "multi")
				{
					cool_pixels.data[j-3] *= color.r / 255
					cool_pixels.data[j-2] *= color.g / 255
					cool_pixels.data[j-1] *= color.b / 255
				}
				else if(what_to == "white")
				{
					if(cool_pixels.data[j-3] == 255 && cool_pixels.data[j-2] == 255 && cool_pixels.data[j-1] == 255)
					{
						cool_pixels.data[j-3] = color.r
						cool_pixels.data[j-2] = color.g
						cool_pixels.data[j-1] = color.b
					}
				}
				else if(what_to == "whole")
				{
					cool_pixels.data[j-3] = color.r
					cool_pixels.data[j-2] = color.g
					cool_pixels.data[j-1] = color.b
				}
			}
			portrait_blacka.putImageData(cool_pixels, 0, 0)
			var blacked_out = portrait_blacked.toDataURL('image/png');
			const img_a = document.createElement('img');
			img_a.src = blacked_out;
			ctx.drawImage(img_a, draw_pos_x[0]+letter_posed[0], draw_pos_y[0]+letter_posed[1])
		}
		else
		{ctx.drawImage(cur_font,letter_info[0],letter_info[1],letter_info[2],letter_info[3], draw_pos_x[0]+letter_posed[0], draw_pos_y[0]+letter_posed[1], letter_info[2],letter_info[3])}
		i++
		draw_pos_x[0] += letter_posed[2] //idk?
		if(str.charAt(i-1) == " " && pass_in.a_pos.checked)
		{
			var total_pos = draw_pos_x[0]
			var j = 1
			while(str.charAt(i+j) != " " && i+j < str.length)
			{
				total_pos += Math.floor(chr_length*8/9)
				j++
			}
			if(total_pos >= box_size[2] - 6)
			{
				var look_str = str.slice(0, i)
				draw_pos_x[0] = draw_pos_x[1]
				if (look_str.indexOf('* ') > -1)
				{
					if(per_char_spacing.length == 0)
					{draw_pos_x[0] += Math.floor(chr_length*8/9)*2}
					else
					{draw_pos_x[0] += Number(per_char_spacing[67][3])*2}
				}
				draw_pos_y[0] += Math.floor(chr_height*18/13)
				//str = [str.slice(0, i), "  ", str.slice(i)].join('')
			}
		}
 	}
}

let iters = 0

let any_portraits = false

function draw_canvas()
{
	if(iters == 0)
	{
		generate_font(cur_font) //uncomment!
		iters = 0.1
	}
	any_portraits = false
	var draw_it = true
	/*if(textbox_chr.value == "custom")
	{portrait_i_use = thatExists}
	else
	{if(textbox_chr.value != "none"){var portrait_i_use = loadImage("assets/characters/"+textbox_chr.value+"/"+textbox_exp.value+".png")}}
	//alert(portrait_i_use)
	if(textbox_over.value == "custom")
	{overlay_i_use = ohAndThis}
	else
	{var overlay_i_use = loadImage("assets/overlays/"+textbox_over.value+".png")}

	if(!boxes_in.includes(textbox_bg.value))
	{
		draw_it = false
		boxes_in.push(textbox_bg.value)
	}
	if(textbox_chr.value != "none")
	{
		if(!portraits_in.includes(textbox_chr.value + "-" + textbox_exp.value))
		{
			draw_it = false
			portraits_in.push(textbox_chr.value + "-" + textbox_exp.value)
		}
	}
	if(!overlays_in.includes(textbox_over.value))
	{
		draw_it = false
		overlays_in.push(textbox_over.value)
	}*/
	if(draw_it)
	{
		//box_size = [Number(textbox_bg_x.value), Number(textbox_bg_y.value), Number(textbox_bg_w.value), Number(textbox_bg_h.value), Number(portrait_x.value), Number(portrait_y.value)]
		box_size = [0,0, Number(textbox_bg_w.value), Number(textbox_bg_h.value)]//, Number(portrait_x.value), Number(portrait_y.value)]
		if(marge.checked)
		{
			canvas.height = box_size[3] + 12
			canvas.width = box_size[2] + 12
			awesome_canvas.height = box_size[3] + 12
			awesome_canvas.width = box_size[2] + 12
			offset = [6,6]
			ctx.fillRect(0,0,canvas.width,canvas.height)
		}
		else
		{
			canvas.height = box_size[3]
			canvas.width = box_size[2]
			awesome_canvas.height = box_size[3]
			awesome_canvas.width = box_size[2]
			offset = [0,0]
		}
		ctx.imageSmoothingEnabled = false
		canvas.imageSmoothingEnabled = false
		//if(textbox_bg_c.value == "#ffffff")
		for(var i = 0; i < list_of_boxes.length; i++)
		{	
			if(!list_of_boxes[i].v_pos.checked)
				{continue}
			if(list_of_boxes[i].c_pos.value == "#ffffff" || list_of_boxes[i].c_type.value == "whole")
				{ctx.drawImage(list_of_boxes[i].image,offset[0] + Number(list_of_boxes[i].x_pos.value),offset[1] + Number(list_of_boxes[i].y_pos.value))}
			else
			{
				portrait_blacked.width = box_size[2]
				portrait_blacked.height = box_size[3]
				portrait_blacka.clearRect(0,0,box_size[2],box_size[3])
				new_color = hexToRgb(list_of_boxes[i].c_pos.value)
				portrait_blacka.imageSmoothingEnabled = false
				canvas.imageSmoothingEnabled = false
				portrait_blacka.drawImage(list_of_boxes[i].image,0,0)
				var what_to = list_of_boxes[i].c_type.value
				var cool_pixels = portrait_blacka.getImageData(0,0,box_size[2],box_size[3])
				for(var j = 3; j < cool_pixels.data.length; j += 4)
				{
					if(what_to == "multi")
					{
						cool_pixels.data[j-3] *= new_color.r / 255
						cool_pixels.data[j-2] *= new_color.g / 255
						cool_pixels.data[j-1] *= new_color.b / 255
					}
					else if(what_to == "white")
					{
						if(cool_pixels.data[j-3] == 255 && cool_pixels.data[j-2] == 255 && cool_pixels.data[j-1] == 255)
						{
							cool_pixels.data[j-3] = new_color.r
							cool_pixels.data[j-2] = new_color.g
							cool_pixels.data[j-1] = new_color.b
						}
					}
					else if(what_to == "whole")
					{
						cool_pixels.data[j-3] = new_color.r
						cool_pixels.data[j-2] = new_color.g
						cool_pixels.data[j-1] = new_color.b
					}
				}
				portrait_blacka.putImageData(cool_pixels, 0, 0)
				var blacked_out = portrait_blacked.toDataURL('image/png');
				const img_a = document.createElement('img');
				img_a.src = blacked_out;
				ctx.drawImage(img_a, offset[0] + Number(list_of_boxes[i].x_pos.value),offset[1] + Number(list_of_boxes[i].y_pos.value))
			}
		}
		for(var i = 0; i < list_of_portraits.length; i++)
		{
			//console.log(list_of_portraits[i])
			if(!list_of_portraits[i].image)
			{continue}
			any_portraits = true
			var portrait_i_use = list_of_portraits[i].image
			portrait_blacked.width = portrait_i_use.width
			portrait_blacked.height = portrait_i_use.height
			var port_pos = [6+offset[0]+Number(list_of_portraits[i].x_pos.value), 6+offset[1]+Number(list_of_portraits[i].y_pos.value),134,140]
			if(list_of_portraits[i].s_pos.value == "Center_It")
			{
				port_pos[2] = portrait_i_use.width
				port_pos[3] = portrait_i_use.height
				port_pos[0] += Math.floor((134 - port_pos[2])/2)
				port_pos[1] += Math.floor((140 - port_pos[3])/2)
			}
			else if(list_of_portraits[i].s_pos.value == "2x_Scaling")
			{
				port_pos[2] = portrait_i_use.width*2
				port_pos[3] = portrait_i_use.height*2
				port_pos[0] += Math.floor((134 - port_pos[2])/2)
				port_pos[1] += Math.floor((140 - port_pos[3])/2)
			}
			else if(list_of_portraits[i].s_pos.value == "0.5x_Scaling")
			{
				port_pos[2] = portrait_i_use.width*0.5
				port_pos[3] = portrait_i_use.height*0.5
				port_pos[0] += Math.floor((134 - port_pos[2])/2)
				port_pos[1] += Math.floor((140 - port_pos[3])/2)
			}
			else if(list_of_portraits[i].s_pos.value == "Fit_Square")
			{
				var width_power = 134/portrait_i_use.width
				var height_power = 140/portrait_i_use.height
				if(width_power < height_power)
				{
					port_pos[2] = portrait_i_use.width*width_power
					port_pos[3] = portrait_i_use.height*width_power
				}
				else
				{
					port_pos[2] = portrait_i_use.width*height_power
					port_pos[3] = portrait_i_use.height*height_power
				}
				port_pos[0] += Math.floor((134 - port_pos[2])/2)
				port_pos[1] += Math.floor((140 - port_pos[3])/2)
			}
			else if(list_of_portraits[i].s_pos.value == "Unchanged_Anything")
			{
				port_pos[2] = portrait_i_use.width
				port_pos[3] = portrait_i_use.height
			}
			if(list_of_portraits[i].o_pos.checked)
			{
				portrait_blacka.imageSmoothingEnabled = false
				canvas.imageSmoothingEnabled = false
				portrait_blacka.clearRect(0,0,portrait_i_use.width,portrait_i_use.height)
				portrait_blacka.drawImage(portrait_i_use,0,0)
				var cool_pixels = portrait_blacka.getImageData(0,0,portrait_i_use.width,portrait_i_use.height)
				for(var j = 3; j < cool_pixels.data.length; j += 4)
				{
					if(cool_pixels.data[j] == 255)
					{
						cool_pixels.data[j-3] = 0
						cool_pixels.data[j-2] = 0
						cool_pixels.data[j-1] = 0
					}
				}
				portrait_blacka.putImageData(cool_pixels, 0, 0)
				var blacked_out = portrait_blacked.toDataURL('image/png');
				const img_a = document.createElement('img');
				img_a.src = blacked_out;
				for(var _x = -1; _x < 2; _x++)
				{
					for(var _y = -1; _y < 2; _y++)
					{
						if(_x == 0 && _y == 0)
						{continue}
						else
						{ctx.drawImage(img_a, port_pos[0]+_x, port_pos[1]+_y, port_pos[2], port_pos[3])}
					}
				}
			}
			if(list_of_portraits[i].c_pos.value != "#ffffff" || list_of_portraits[i].c_type.value == "whole")
			{
				new_color = hexToRgb(list_of_portraits[i].c_pos.value)
				portrait_blacka.imageSmoothingEnabled = false
				canvas.imageSmoothingEnabled = false
				portrait_blacka.clearRect(0,0,portrait_i_use.width,portrait_i_use.height)
				portrait_blacka.drawImage(portrait_i_use,0,0)
				var what_to = list_of_portraits[i].c_type.value
				var cool_pixels = portrait_blacka.getImageData(0,0,portrait_i_use.width,portrait_i_use.height)
				for(var j = 3; j < cool_pixels.data.length; j += 4)
				{
					if(what_to == "multi")
					{
						cool_pixels.data[j-3] *= new_color.r / 255
						cool_pixels.data[j-2] *= new_color.g / 255
						cool_pixels.data[j-1] *= new_color.b / 255
					}
					else if(what_to == "white")
					{
						if(cool_pixels.data[j-3] == 255 && cool_pixels.data[j-2] == 255 && cool_pixels.data[j-1] == 255)
						{
							cool_pixels.data[j-3] = new_color.r
							cool_pixels.data[j-2] = new_color.g
							cool_pixels.data[j-1] = new_color.b
						}
					}
					else if(what_to == "whole")
					{
						cool_pixels.data[j-3] = new_color.r
						cool_pixels.data[j-2] = new_color.g
						cool_pixels.data[j-1] = new_color.b
					}
				}
				portrait_blacka.putImageData(cool_pixels, 0, 0)
				var blacked_out = portrait_blacked.toDataURL('image/png');
				//portrait_i_use.src = blacked_out
				img_a = document.createElement('img');
				img_a.src = blacked_out;
				ctx.drawImage(img_a, port_pos[0], port_pos[1], port_pos[2], port_pos[3])
			}
			else
			{
				ctx.drawImage(portrait_i_use, port_pos[0], port_pos[1], port_pos[2], port_pos[3])
			}
		}
		//if(textbox_chr.value == "none")
		//{offset[0] -= 144-28}
		//draw_text(144+box_size[0]+offset[0],26+box_size[1]+offset[1],textbox_text.value)
		for(let z = 0; z < list_of_text.length; z++)
		{
			draw_text(list_of_text[z])
			//alert(list_of_text[z].text)
		}
		//canvas.style.display = 'none'
		//if(textbox_chr.value == "none")
		//{offset[0] += 144-28}
		//ctx.drawImage(overlay_i_use,0,0,box_size[2],box_size[3],offset[0],offset[1],box_size[2],box_size[3])
		const dataURL = canvas.toDataURL('image/png');
		awesome_canvas.src = dataURL;
		//canvas.style.display = 'none'
		if(iters<3)
		{
			setTimeout(draw_canvas, 250)
			iters+=1
		}
		else
		{
			iters=0
		}
	}
	else
	{
		setTimeout(draw_canvas, 250)
	}
}

function box_stack_update()
{
	//console.log(bonus_boxes)
	for(let i = 0; i < bonus_boxes.length; i++)
	{
		document.body.removeChild(bonus_boxes[i][0])
	}
	for(let i = 0; i < bonus_boxes.length; i++)
	{
		document.body.appendChild(bonus_boxes[i][0])
		bonus_boxes[i][2].value = i
		bonus_boxes[i][3].value = i
		bonus_boxes[i][4].value = i
	}
	var stack_width = Number(stack_width_inp.value)
	canvas_stack.height = (box_size[3] + 12)*Math.ceil(bonus_boxes.length/stack_width)
	canvas_stack.width = (box_size[2] + 12)*stack_width
	ctx_stack.fillRect(0,0,canvas_stack.width,canvas_stack.height)
	for (let i = 0; i < bonus_boxes.length; i++) 
	{
		//to future me: check if the first 6 pixels diagonally are black
		if(marge.checked)
  		{ctx_stack.drawImage(bonus_boxes[i][1], box_size[2]*(i%stack_width), (box_size[3] + 12)*Math.floor(i/stack_width))}
		else
  		{ctx_stack.drawImage(bonus_boxes[i][1], 6+(12+box_size[2])*(i%stack_width), 6+(box_size[3] + 12)*Math.floor(i/stack_width))}
	}

	const dataURL = canvas_stack.toDataURL('image/png');
	awesome_canvas_Stacked.style.display = 'block'
	awesome_canvas_Stacked.src = dataURL;
}

function box_stack_remove(which)
{
	bonus_boxes[which][0].remove()
	bonus_boxes.splice(which, 1)
	if(bonus_boxes.length > 0)
	{box_stack_update()}
	else
	{stack_reset()}
}

function box_stack_swap(which, dir)
{
	if(dir == -1 && which > 0)
	{
		var the_guy = bonus_boxes.splice(which, 1);
		bonus_boxes.splice(which-1,0,the_guy[0])
	}
	else if (dir == 1 && which < bonus_boxes.length)
	{
		var the_guy = bonus_boxes.splice(which, 1);
		bonus_boxes.splice(which+1,0,the_guy[0])
	}
	box_stack_update()
}

function box_stack_add()
{
	var new_stack = document.createElement('div')
	const img = document.createElement('img');
	img.src = awesome_canvas.src;
	new_stack.appendChild(img);
	//img.style.display = 'none'
	//bonus_boxes.push(img)
	const button_up = document.createElement('button')
	button_up.innerHTML = "^"
	button_up.value = bonus_boxes.length
	button_up.onclick = function() {box_stack_swap(this.value, -1)}
	new_stack.appendChild(button_up);
	const button = document.createElement('button')
	button.innerHTML = "X"
	button.value = bonus_boxes.length
	button.onclick = function() {box_stack_remove(this.value)}
	new_stack.appendChild(button);
	
	const button_down = document.createElement('button')
	button_down.innerHTML = "v"
	button_down.value = bonus_boxes.length
	button_down.onclick = function() {box_stack_swap(this.value, 1)}
	new_stack.appendChild(button_down);
	//bonus_buttons.push(button)
	//const br = document.createElement('br')
	document.body.appendChild(new_stack);
	var the_thing = [new_stack, img, button, button_up, button_down, bonus_boxes.length]
	bonus_boxes.push(the_thing)
	box_stack_update()
}

function stack_reset()
{
	while(bonus_boxes.length > 0)
	{
		bonus_boxes[0][0].remove()
		bonus_boxes.shift()
	}
	canvas_stack.height = 0
	awesome_canvas_Stacked.style.display = 'none'
}

function save_box()
{
	var save_array = []
	save_array.push(textbox_bg_w.value)
	save_array.push(textbox_bg_h.value)

	if(list_of_boxes.length > 0) 
	{
		save_array.push([])
	}

	for(var i = 0; i < list_of_boxes.length; i++)
	{
		//console.log(list_of_boxes[i])
		save_array[save_array.length-1].push(list_of_boxes[i].name_field.value)
		if(list_of_boxes[i].image == false)
		{save_array[save_array.length-1].push(-1)}
		else
		{
			var save_cav = document.createElement('canvas');
        		save_cav.width = list_of_boxes[i].image.width;
        		save_cav.height = list_of_boxes[i].image.height;
			//save_cav.style = "display: block"
        		var btx = save_cav.getContext('2d');
       			btx.drawImage(list_of_boxes[i].image, 0, 0);	
			//document.body.appendChild(save_cav);
			save_array[save_array.length-1].push(save_cav.toDataURL())
		}
		save_array[save_array.length-1].push(list_of_boxes[i].x_pos.value)
		save_array[save_array.length-1].push(list_of_boxes[i].y_pos.value)
		save_array[save_array.length-1].push(list_of_boxes[i].c_pos.value)
		save_array[save_array.length-1].push(list_of_boxes[i].v_pos.checked)
		if(i + 1 < list_of_boxes.length)
		{
			save_array.push([])
		}
	}

	save_array.push("text")

	if(list_of_text.length > 0) 
	{
		save_array.push([])
	}

	for(var i = 0; i < list_of_text.length; i++)
	{
		//console.log(list_of_text[i])
		save_array[save_array.length-1].push(list_of_text[i].name_field.value)
		save_array[save_array.length-1].push(list_of_text[i].x_pos.value)
		save_array[save_array.length-1].push(list_of_text[i].y_pos.value)
		save_array[save_array.length-1].push(list_of_text[i].x_pos_alt.value)
		save_array[save_array.length-1].push(list_of_text[i].y_pos_alt.value)
		save_array[save_array.length-1].push(list_of_text[i].o_pos.checked)
		save_array[save_array.length-1].push(list_of_text[i].d_pos.checked)
		save_array[save_array.length-1].push(list_of_text[i].a_pos.checked)
		if(i + 1 < list_of_text.length)
		{
			save_array.push([])
		}
	}

	
	save_array.push("port")

	if(list_of_portraits.length > 0) 
	{
		save_array.push([])
	}
	
	for(var i = 0; i < list_of_portraits.length; i++)
	{
		//console.log(list_of_portraits[i])
		save_array[save_array.length-1].push(list_of_portraits[i].name_field.value)
		save_array[save_array.length-1].push(list_of_portraits[i].x_pos.value)
		save_array[save_array.length-1].push(list_of_portraits[i].y_pos.value)
		save_array[save_array.length-1].push(list_of_portraits[i].s_pos.value)
		save_array[save_array.length-1].push(list_of_portraits[i].o_pos.checked)
		if(i + 1 < list_of_portraits.length)
		{
			save_array.push([])
		}
	}

	save_array.push("over")
	//wip!

	download("new_box", JSON.stringify(save_array))
}

/*let thatExists = false

textbox_exp_alt.addEventListener('change', function(ev) {
   if(ev.target.files) {
      let file = ev.target.files[0];
      var reader  = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
	if(thatExists == false)
	{
       		var image = new Image();
        	image.src = e.target.result;
		thatExists = image
		thatExists.style.display='none'
	}
	else
	{
		thatExists.src=e.target.result;
	}
      }
   }
});*/

textbox_bg_alt.addEventListener('change', function(ev) {
   if(ev.target.files) {
      let file = ev.target.files[0];
      var reader  = new FileReader();
      reader.readAsText(file);
      reader.onloadend = function (e) {
	var awesome_template = JSON.parse(e.target.result)
	loader_up(awesome_template)
      }
   }
});

textbox_bg.addEventListener("change", (event) => {
	if(textbox_bg.value == "custom")
	{
		textbox_bg_alt.style.display = "inline"
	}
	else
	{
		var awesome_template = prebaked_boxes[textbox_bg.value]
		loader_up(awesome_template)
		
		textbox_bg_alt.style.display = "none"
	}
})

let ohAndThis = false

textbox_over_alt.addEventListener('change', function(ev) {
   if(ev.target.files) {
      let file = ev.target.files[0];
      var reader  = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
	if(ohAndThis == false)
	{
		var image = new Image();
		image.src = e.target.result;
		ohAndThis = image
		ohAndThis.style.display='none'
	}
	else
	{
		ohAndThis.src=e.target.result;
	}
      }
   }
});

const box_sizes = {
"undertale": [0,0,578,152,0,0],
"outertale": [0,0,578,152,0,0],
"jumbo": [0,0,578,188,0,0],
"deltarune": [8,10,594,168,0,0]
}

textbox_over.addEventListener("change", (event) => {
	if(textbox_over.value == "custom")
	{
		textbox_over_alt.style.display = "inline"
	}
	else
	{
		textbox_over_alt.style.display = "none"
	}
})

let custom_spaced_fonts = {"arial": "QSwwLDAsMTgKQiwtMSwwLDE2CkMsLTEsMCwxNwpELC0xLDAsMTcKRSwtMSwwLDE2CkYsLTIsMCwxNApHLC0xLDAsMTgKSCwtMiwwLDE2CkksLTIsMCw0CkosMCwwLDEyCkssLTEsMCwxNQpMLC0xLDAsMTQKTSwtMSwwLDE4Ck4sLTEsMCwxNgpPLC0xLDAsMTcKUCwtMSwwLDE2ClEsLTEsMCwxOQpSLC0xLDAsMTcKUywtMSwwLDE2ClQsMCwwLDE3ClUsLTEsMCwxNwpWLDAsMCwxNwpXLDAsMCwyNQpYLDAsMCwxOApZLDAsMCwxOApaLDAsMCwxNgphLDAsMCwxNApiLC0xLDAsMTQKYywtMSwwLDEzCmQsMCwwLDE0CmUsMCwwLDE1CmYsMCwwLDEwCmcsMCwwLDE0CmgsLTEsMCwxMwppLC0xLDAsNQpqLDAsMCw3CmssLTEsMCwxMwpsLC0xLDAsNQptLC0xLDAsMjAKbiwtMSwwLDEzCm8sMCwwLDE1CnAsLTEsMCwxNApxLDAsMCwxNApyLC0xLDAsOApzLDAsMCwxMwp0LDAsMCw5CnUsLTEsMCwxMwp2LDAsMCwxNAp3LDAsMCwyMAp4LDAsMCwxNAp5LDAsMCwxNAp6LDAsMCwxNAo/LC0xLDAsMTQKISwtMiwwLDUKKiwwLDAsMTEKKCwtMSwwLDkKKSwtMSwwLDkKMCwtMSwwLDE0CjEsLTIsMCw5CjIsMCwwLDE0CjMsLTEsMCwxNAo0LDAsMCwxNQo1LC0xLDAsMTQKNiwwLDAsMTUKNywtMSwwLDE0CjgsLTEsMCwxNAo5LC0xLDAsMTQKICwwLDAsMTQKLiwtMiwwLDcKW2NvbW1hXSwtMiwwLDcKJywtMSwwLDUKIiwtMSwwLDcKPCwtMSwwLDE0Cj4sLTEsMCwxNAorLC0xLDAsMTQKLSwwLDAsOQovLDAsMCw3CiUsLTEsMCwyMQokLDAsMCwxNAokLDAsMCwxNQo6LC0yLDAsOAo7LC0yLDAsOApeLDAsLTEsMTEKJiwtMSwwLDE2CkAsLTEsMCwyNQpfLDAsLTMsMTYKWywtMSwwLDgKXSwtMSwwLDgKfiwtMSwwLDE0Cj0sLTEsMCwxNAoyMA=="}

textbox_font.addEventListener("change", (event) => {
	mono_spaced_real.checked = true
	if(textbox_font.value == "custom")
	{
		textbox_font_alt.style.display = "inline"
		font_box_hidden.style.display = "inline"
	}
	else
	{
		if(textbox_font.value in custom_spaced_fonts)
		{
			mono_spaced_real.checked = false
			read_this_bozo_temp = atob(custom_spaced_fonts[textbox_font.value]).split('\n')
			readThisBozo = []
			for(var i = 0; i < read_this_bozo_temp.length; i++)
			{
				readThisBozo[i] = read_this_bozo_temp[i].split(',')
			}
		}
		font_box_hidden.style.display = "none"
		textbox_font_alt.style.display = "none"
		cur_font = loadImage('assets/fonts/'+textbox_font.value+'.png')
	}
})

textbox_font_alt.addEventListener('change', function(ev) {
   if(ev.target.files) {
      let file = ev.target.files[0];
      var reader  = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
	if(true)
	{
        	var image = new Image();
    		image.src = e.target.result;
		cur_font = image
	}
	else
	{
		ohAndThis.src=e.target.result;
	}
      }
   }
});

this_is_gonna_suck_i_guess.addEventListener('change', function(ev) {
   if(ev.target.files) {
      let file = ev.target.files[0];
      var reader  = new FileReader();
      reader.readAsText(file);
      reader.onloadend = function (e) {
	//read_this_bozo = alert(e.target.result)
	read_this_bozo_temp = e.target.result.split('\n')
	readThisBozo = []
	for(var i = 0; i < read_this_bozo_temp.length; i++)
	{
		readThisBozo[i] = read_this_bozo_temp[i].split(',')
	}
      }
   }
});

draw_canvas()
setTimeout(draw_canvas, 1080)
