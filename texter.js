const canvas = document.getElementById("textbox_work");
const ctx = canvas.getContext("2d");

//const canvas_stack = document.getElementById("stack_work");
//const ctx_stack = canvas_stack.getContext("2d");

ctx.fillStyle = "black"
ctx.fillRect(0,0,canvas.width,canvas.height)

let awesome_canvas = document.getElementById("canvasTrue");

const marge = document.getElementById("margesimpson");

function loadImage(filePath)
{
	my_tempo = new Image()
	my_tempo.src = filePath
	return my_tempo
}

//canvas.style.display = 'none'

let bonus_boxes = []

let textbox_bg = document.getElementById("text_bg")
let textbox_text = document.getElementById("text_input")
let textbox_chr = document.getElementById("text_chr")
let textbox_exp = document.getElementById("text_exp")

let font_dt_mono = loadImage("assets/determination_mono.png")

let boxes_in = []

ctx.imageSmoothingEnabled = false
canvas.imageSmoothingEnabled = false

let portraits_in = []

let offset = [0,0]

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
	else if(code == 44 || code == 8220 || code == 8221)
	{return 69}
	else if(code == 39 || code == 8216)
	{return 70}
	else if(code == 34)
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
   		ctx.drawImage(font_dt_mono,(cur_letter%10)*18,Math.floor(cur_letter/10)*26,18,26, draw_pos_x[0], draw_pos_y[0], 18, 26)
		i++
		draw_pos_x[0] += 16
 	}
}

function draw_canvas()
{
	var draw_it = true
	var image_i_use = loadImage("assets/textboxes/"+textbox_bg.value+".png")
	var portrait_i_use = loadImage("assets/characters/"+textbox_chr.value+"/"+textbox_exp.value+".png")
	if(!boxes_in.includes(textbox_bg.value))
	{
		draw_it = false
		boxes_in.push(textbox_bg.value)
	}
	if(!portraits_in.includes(textbox_chr.value + "-" + textbox_exp.value))
	{
		draw_it = false
		portraits_in.push(textbox_chr.value + "-" + textbox_exp.value)
	}
	if(draw_it)
	{
		if(marge.checked)
		{
			canvas.height = 152 + 12
			canvas.width = 578 + 12
			awesome_canvas.height = 152 + 12
			awesome_canvas.width = 578 + 12
			offset = [6,6]
		}
		else
		{
			canvas.height = 152
			canvas.width = 578
			awesome_canvas.height = 152
			awesome_canvas.width = 578
			offset = [0,0]
		}
		ctx.imageSmoothingEnabled = false
		canvas.imageSmoothingEnabled = false
		ctx.fillRect(0,0,canvas.width,canvas.height)
		ctx.drawImage(image_i_use,offset[0],offset[1])
		ctx.drawImage(portrait_i_use, 6+offset[0], 6+offset[1], 134,140)
		draw_text(144+offset[0],26+offset[1],textbox_text.value)
		//canvas.style.display = 'none'
		const dataURL = canvas.toDataURL('image/png');
		awesome_canvas.src = dataURL;
		//canvas.style.display = 'none'
	}
	else
	{
		setTimeout(draw_canvas, 100)
	}
}

function box_stack_add()
{
	alert("go on")
	const dataURL = canvas.toDataURL('image/png');
	const faux_img = document.createElement('img');
	alert("test")
	faux_img.src = dataURL;
	document.body.appendChild(faux_img);
	bonus_boxes.push(faux_img)
}

function stack_reset()
{
	canvas_stack.height = 0
}

const exp_options = {
"clover": '<option value="default">Default</option><option value="neutral">Neutral</option><option value="bummed">Bummed</option>',
"toriel": '<option value="default">Default</option><option value="looking-away">Looking Away</option><option value="sad">Sad</option>'}
textbox_exp.innerHTML=exp_options[textbox_chr.value]
textbox_chr.addEventListener("change", (event) => {textbox_exp.innerHTML=exp_options[textbox_chr.value]})

draw_canvas()