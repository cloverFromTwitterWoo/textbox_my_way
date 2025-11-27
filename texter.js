const canvas = document.getElementById("textbox_work");
const ctx = canvas.getContext("2d");

const canvas_stack = document.getElementById("stack_work");
const ctx_stack = canvas_stack.getContext("2d");

ctx.fillStyle = "black"
ctx.fillRect(0,0,canvas.width,canvas.height)

let awesome_canvas = document.getElementById("canvasTrue");

function loadImage(filePath)
{
	my_tempo = new Image()
	my_tempo.src = filePath
	return my_tempo
}

//canvas.style.display = 'none'

let textbox_bg = document.getElementById("text_bg")
let textbox_text = document.getElementById("text_input")

let font_dt_mono = loadImage("assets/determination_mono.png")

let boxes_in = []

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
	if(!boxes_in.includes(textbox_bg.value))
	{
		draw_it = false
		boxes_in.push(textbox_bg.value)
	}
	if(draw_it)
	{
		ctx.drawImage(image_i_use,0,0)
		draw_text(144,26,textbox_text.value)
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
	const dataURL = canvas_stack.toDataURL('image/png');
	canvas_stack.height += 164
	ctx_stack.drawImage(dataURL,0,0)
	ctx_stack.fillRect(0,canvas_stack.height-164,canvas_stack.width,164)
	ctx_stack.drawImage(awesome_canvas,6,canvas_stack.height-164+6)
}

function stack_reset()
{
	canvas_stack.height = 0
}

draw_canvas()