const canvas = document.getElementById("textbox_work");
const ctx = canvas.getContext("2d");

const canvas_stack = document.getElementById("stack_work");
const ctx_stack = canvas_stack.getContext("2d");

ctx.fillStyle = "black"
ctx.fillRect(0,0,canvas.width,canvas.height)

let awesome_canvas = document.getElementById("canvasTrue");
let awesome_canvas_Stacked = document.getElementById("canvasStack");

let portrait_blacka = document.getElementById("portrait_outline").getContext("2d");

const marge = document.getElementById("margesimpson");
const homer = document.getElementById("dark");

function loadImage(filePath)
{
	my_tempo = new Image()
	my_tempo.src = filePath
	return my_tempo
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


let textbox_exp_txt_1 = document.getElementById(id="exp_txt")

let font_dt_mono = loadImage("assets/determination_mono.png")
let font_dt_mono_ol = loadImage("assets/determination_mono_outline.png")
let font_dt_mono_dw = loadImage("assets/determination_mono_dw.png")

let boxes_in = []

ctx.imageSmoothingEnabled = false
canvas.imageSmoothingEnabled = false

let portraits_in = []

let offset = [0,0]

let box_size = [0,0,578,152]

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
	else
	{return 67}
}

function draw_text(x,y,str)
{
	var draw_pos_x = [x, x]
	var draw_pos_y = [y, y]
	var i = 0
	while(i < str.length) {
		if (str.charAt(i) == "\\")
		{
			if(str.charAt(i+1) == "n")
			{
				draw_pos_x[0] = draw_pos_x[1]
				draw_pos_y[0] += 36
			}
			i += 2
		}
		var cur_letter = letter_to_index(str, i)
		if(!homer.checked)
		{
   			ctx.drawImage(font_dt_mono_ol,(cur_letter%10)*18,Math.floor(cur_letter/10)*26,18,26, draw_pos_x[0]-1, draw_pos_y[0]-1, 18, 26)
   			ctx.drawImage(font_dt_mono_ol,(cur_letter%10)*18,Math.floor(cur_letter/10)*26,18,26, draw_pos_x[0]-1, draw_pos_y[0]+1, 18, 26)
   			ctx.drawImage(font_dt_mono_ol,(cur_letter%10)*18,Math.floor(cur_letter/10)*26,18,26, draw_pos_x[0]+1, draw_pos_y[0]-1, 18, 26)
   			ctx.drawImage(font_dt_mono_ol,(cur_letter%10)*18,Math.floor(cur_letter/10)*26,18,26, draw_pos_x[0]+1, draw_pos_y[0]+1, 18, 26)
		}
		else
		{
			ctx.drawImage(font_dt_mono_dw,(cur_letter%10)*18,Math.floor(cur_letter/10)*26,18,26, draw_pos_x[0]+1, draw_pos_y[0]+1, 18, 26)
		}
   		ctx.drawImage(font_dt_mono,(cur_letter%10)*18,Math.floor(cur_letter/10)*26,18,26, draw_pos_x[0], draw_pos_y[0], 18, 26)
		i++
		draw_pos_x[0] += 16
 	}
}

function draw_canvas()
{
	var draw_it = true
	if(textbox_bg.value == "custom")
	{image_i_use = thatExistsAlso}
	else
	{var image_i_use = loadImage("assets/textboxes/"+textbox_bg.value+".png")}
	if(textbox_chr.value == "custom")
	{portrait_i_use = thatExists}
	else
	{var portrait_i_use = loadImage("assets/characters/"+textbox_chr.value+"/"+textbox_exp.value+".png")}
	//alert(portrait_i_use)
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
	if(draw_it)
	{
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
		ctx.drawImage(image_i_use,offset[0],offset[1])
		if(textbox_chr.value != "none")
		{
			portrait_blacka.imageSmoothingEnabled = false
			canvas.imageSmoothingEnabled = false
			portrait_blacka.clearRect(0,0,134,140)
			portrait_blacka.drawImage(portrait_i_use, 0,0, 134,140)
			alert("M")
			var cool_pixels = portrait_blacka.getImageData(0,0, 134,140)
			alert("N")
			for(var i = 3; i < cool_pixels.length; i += 4)
			{
				if(cool_pixels[i] == 255)
				{
					cool_pixels[i-3] = 0
					cool_pixels[i-2] = 0
					cool_pixels[i-1] = 0
				}
			}
			alert("O")
			portrait_blacka.putImageData(cool_pixels, 0, 0);
			ctx.drawImage(portrait_i_use, 6+offset[0]+box_size[0], 6+offset[1]+box_size[1], 134,140)
		}
		if(textbox_chr.value == "none")
		{offset[0] -= 144-28}
		draw_text(144+box_size[0]+offset[0],26+box_size[1]+offset[1],textbox_text.value)
		//canvas.style.display = 'none'
		const dataURL = canvas.toDataURL('image/png');
		awesome_canvas.src = dataURL;
		//canvas.style.display = 'none'
	}
	else
	{
		setTimeout(draw_canvas, 160)
	}
}

function box_stack_update()
{
	//alert(box_size)
	canvas_stack.height = (box_size[3] + 12)*bonus_boxes.length
	canvas_stack.width = (box_size[2] + 12)
	ctx_stack.fillRect(0,0,canvas_stack.width,canvas_stack.height)
	for (let i = 0; i < bonus_boxes.length; i++) 
	{
		if(marge.checked)
  		{ctx_stack.drawImage(bonus_boxes[i], 0, (box_size[3] + 12)*i)}
		else
  		{ctx_stack.drawImage(bonus_boxes[i], 6, 6+(box_size[3] + 12)*i)}
	}

	const dataURL = canvas_stack.toDataURL('image/png');
	awesome_canvas_Stacked.style.display = 'block'
	awesome_canvas_Stacked.src = dataURL;
}

function box_stack_remove(which)
{
	document.body.removeChild(bonus_boxes[which])
	document.body.removeChild(bonus_buttons[which])
	document.body.removeChild(bonus_breaks[which])
	bonus_boxes.splice(which, 1)
	bonus_buttons.splice(which, 1)
	bonus_breaks.splice(which, 1)
	for (let i = which; i < bonus_buttons.length; i++)
	{
		bonus_buttons[i].value -= 1
	}
	if(bonus_boxes.length > 0)
	{box_stack_update()}
	else
	{stack_reset()}
}

function box_stack_add()
{
	const img = document.createElement('img');
	img.src = awesome_canvas.src;
	document.body.appendChild(img);
	//img.style.display = 'none'
	bonus_boxes.push(img)
	const button = document.createElement('button')
	button.innerHTML = "Remove"
	button.value = bonus_boxes.length-1
	button.onclick = function() {box_stack_remove(this.value)}
	document.body.appendChild(button);
	bonus_buttons.push(button)
	const br = document.createElement('br')
	document.body.appendChild(br);
	bonus_breaks.push(br)
	box_stack_update()
}

function stack_reset()
{
	while(bonus_boxes.length > 0)
	{
		document.body.removeChild(bonus_boxes[0])
		document.body.removeChild(bonus_breaks[0])
		document.body.removeChild(bonus_buttons[0])
		bonus_boxes.shift()
		bonus_buttons.shift()
		bonus_breaks.shift()
	}
	canvas_stack.height = 0
	awesome_canvas_Stacked.style.display = 'none'
}

let thatExists = false

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
          document.body.appendChild(image);
		thatExists = image
		thatExists.style.display='none'
	}
	else
	{
	thatExists.src=e.target.result;
	}
      }
   }
});

let thatExistsAlso = false

textbox_bg_alt.addEventListener('change', function(ev) {
   if(ev.target.files) {
      let file = ev.target.files[0];
      var reader  = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
	if(thatExistsAlso == false)
	{
          var image = new Image();
          image.src = e.target.result;
          document.body.appendChild(image);
		thatExistsAlso = image
		thatExistsAlso.style.display='none'
	}
	else
	{
	thatExistsAlso.src=e.target.result;
	}
      }
   }
});

const exp_options = {
"clover": '<option value="default">Default</option><option value="neutral">Neutral</option><option value="bummed">Bummed</option>',
"toriel": '<option value="default">Default</option><option value="looking-away">Looking Away</option><option value="sad">Sad</option>'}
textbox_exp.innerHTML=exp_options[textbox_chr.value]
textbox_chr.addEventListener("change", (event) => {
	if(textbox_chr.value == "none")
	{
		textbox_exp_txt_1.style.display = "none"
		textbox_exp.style.display = "none"
		textbox_exp_alt.style.display = "none"
	}
	else
	{
		textbox_exp_txt_1.style.display = "inline"
		textbox_exp.style.display = "inline"
		if(textbox_chr.value == "custom")
		{
			textbox_exp.style.display = "none";
			textbox_exp_alt.style.display = "inline";
		}
		else
		{
			textbox_exp.style.display = "inline";
			textbox_exp_alt.style.display = "none";
			textbox_exp.innerHTML=exp_options[textbox_chr.value]
		}
	}
})

const box_sizes = {
"undertale": [0,0,578,152],
"outertale": [0,0,578,152],
"transparent": [0,0,578,152],
"deltarune": [8,10,594,168]}

textbox_bg.addEventListener("change", (event) => {
	if(textbox_bg.value == "custom")
	{
		textbox_bg_alt.style.display = "inline"
	}
	else
	{
		if(textbox_bg.value != "transparent")
		{box_size = box_sizes[textbox_bg.value]}
		textbox_bg_alt.style.display = "none"
	}
})

draw_canvas()
