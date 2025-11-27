const canvas = document.getElementById("textbox_work");
const ctx = canvas.getContext("2d");

const canvas_stack = document.getElementById("stack_work");
const ctx_stack = canvas_stack.getContext("2d");

ctx.fillStyle = "black"
ctx.fillRect(0,0,canvas.width,canvas.height)

let awesome_canvas = document.getElementById("canvasTrue");
let awesome_canvas_Stacked = document.getElementById("canvasStack");

const marge = document.getElementById("margesimpson");

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
let textbox_text = document.getElementById("text_input")
let textbox_chr = document.getElementById("text_chr")
let textbox_exp = document.getElementById("text_exp")
let textbox_exp_alt = document.getElementById("text_exp_alt")

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
   		ctx.drawImage(font_dt_mono,(cur_letter%10)*18,Math.floor(cur_letter/10)*26,18,26, draw_pos_x[0], draw_pos_y[0], 18, 26)
		i++
		draw_pos_x[0] += 16
 	}
}

function draw_canvas()
{
	var draw_it = true
	var image_i_use = loadImage("assets/textboxes/"+textbox_bg.value+".png")
	if(textbox_chr.value == "custom")
	{
portrait_i_use = thatExists}
	else
	{var portrait_i_use = loadImage("assets/characters/"+textbox_chr.value+"/"+textbox_exp.value+".png")}
	//alert(portrait_i_use)
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
			ctx.fillRect(0,0,canvas.width,canvas.height)
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
		setTimeout(draw_canvas, 160)
	}
}

function box_stack_update()
{
	canvas_stack.height = (152 + 12)*bonus_boxes.length
	ctx_stack.fillRect(0,0,canvas_stack.width,canvas_stack.height)
	for (let i = 0; i < bonus_boxes.length; i++) {
		if(marge.checked)
  		{ctx_stack.drawImage(bonus_boxes[i], 0, (152 + 12)*i)}
		else
  		{ctx_stack.drawImage(bonus_boxes[i], 6, 6+(152 + 12)*i)}}

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
	canvas_stack.height = (152 + 12)*bonus_boxes.length
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

const exp_options = {
"clover": '<option value="default">Default</option><option value="neutral">Neutral</option><option value="bummed">Bummed</option>',
"toriel": '<option value="default">Default</option><option value="looking-away">Looking Away</option><option value="sad">Sad</option>'}
textbox_exp.innerHTML=exp_options[textbox_chr.value]
textbox_chr.addEventListener("change", (event) => {
if(textbox_chr.value == "custom")
{textbox_exp.style.display = "none";
textbox_exp_alt.style.display = "inline";}
else
{textbox_exp.style.display = "inline";
textbox_exp_alt.style.display = "none";
textbox_exp.innerHTML=exp_options[textbox_chr.value]}
})

draw_canvas()
