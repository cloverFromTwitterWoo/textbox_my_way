const canvas = document.getElementById("textbox_work");
const ctx = canvas.getContext("2d");

const canvas_stack = document.getElementById("stack_work");
const ctx_stack = canvas_stack.getContext("2d");

ctx.fillStyle = "black"
ctx.fillRect(0,0,canvas.width,canvas.height)

let awesome_canvas = document.getElementById("canvasTrue");
let awesome_canvas_Stacked = document.getElementById("canvasStack");

let portrait_blacka = document.getElementById("portrait_outline").getContext("2d");
let portrait_blacked = document.getElementById("portrait_outline");

const marge = document.getElementById("margesimpson");
const homer = document.getElementById("dark");
const bart = document.getElementById("outtheline");
const lisa = document.getElementById("outthelineTxt");
const maggie = document.getElementById("smart");

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

let textbox_bg_x = document.getElementById("origin_x")
let textbox_bg_y = document.getElementById("origin_y")
let textbox_bg_w = document.getElementById("origin_w")
let textbox_bg_h = document.getElementById("origin_h")
let textbox_bg_c = document.getElementById("origin_c")

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
function draw_text(x,y,str)
{
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
			letter_posed = [Number(per_char_spacing[cur_letter][1]), Number(per_char_spacing[cur_letter][2]), Number(per_char_spacing[cur_letter][3])+Math.floor(chr_length*8/9)]
		}
		var letter_info = [(cur_letter%10)*chr_length,Math.floor(cur_letter/10)*chr_height,chr_length,chr_height]
		if(!homer.checked)
		{
			if(lisa.checked)
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
		if(doColorMath && !(color.r == 255 && color.g == 255 && color.b == 255) )
		{
			portrait_blacked.width = letter_info[2]
			portrait_blacked.height = letter_info[3]
			portrait_blacka.clearRect(0,0,18,26)
			portrait_blacka.imageSmoothingEnabled = false
			canvas.imageSmoothingEnabled = false
			portrait_blacka.drawImage(cur_font,letter_info[0],letter_info[1],letter_info[2],letter_info[3],0,0,letter_info[2],letter_info[3])
			var cool_pixels = portrait_blacka.getImageData(0,0,letter_info[2],letter_info[3])
			for(var j = 3; j < cool_pixels.data.length; j += 4)
			{
				if(cool_pixels.data[j] > 0)
				{
					if(cool_pixels.data[j-3] == color.r && cool_pixels.data[j-2] == color.g && cool_pixels.data[j-1] == color.b)
					{
						break
					}
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
		if(str.charAt(i-1) == " " && maggie.checked)
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
					{draw_pos_x[0] += (Number(per_char_spacing[67][3])+Math.floor(chr_length*8/9))*2}
				}
				draw_pos_y[0] += Math.floor(chr_height*18/13)
				//str = [str.slice(0, i), "  ", str.slice(i)].join('')
			}
		}
 	}
}

let iters = 0

function draw_canvas()
{
	if(iters == 0)
	{
		generate_font(cur_font) //uncomment!
		iters = 0.1
	}
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
	}
	if(draw_it)
	{
		box_size = [Number(textbox_bg_x.value), Number(textbox_bg_y.value), Number(textbox_bg_w.value), Number(textbox_bg_h.value), Number(portrait_x.value), Number(portrait_y.value)]
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
		if(textbox_bg_c.value == "#ffffff")
		{ctx.drawImage(image_i_use,offset[0],offset[1])}
		else
		{
			portrait_blacked.width = box_size[2]
			portrait_blacked.height = box_size[3]
			portrait_blacka.clearRect(0,0,box_size[2],box_size[3])
			new_color = hexToRgb(textbox_bg_c.value)
			portrait_blacka.imageSmoothingEnabled = false
			canvas.imageSmoothingEnabled = false
			portrait_blacka.drawImage(image_i_use,0,0)
			var cool_pixels = portrait_blacka.getImageData(0,0,box_size[2],box_size[3])
			for(var i = 3; i < cool_pixels.data.length; i += 4)
			{
				if(cool_pixels.data[i] == 255 && cool_pixels.data[i-3] == 255 && cool_pixels.data[i-2] == 255 && cool_pixels.data[i-1] == 255)
				{
					cool_pixels.data[i-3] = new_color.r
					cool_pixels.data[i-2] = new_color.g
					cool_pixels.data[i-1] = new_color.b
				}
			}
			portrait_blacka.putImageData(cool_pixels, 0, 0)
			var blacked_out = portrait_blacked.toDataURL('image/png');
			const img_a = document.createElement('img');
			img_a.src = blacked_out;
			ctx.drawImage(img_a, offset[0], offset[1])
		}
		if(textbox_chr.value != "none")
		{
			portrait_blacked.width = portrait_i_use.width
			portrait_blacked.height = portrait_i_use.height
			var port_pos = [6+offset[0]+box_size[0]+box_size[4], 6+offset[1]+box_size[1]+box_size[5],134,140]
			if(textbox_exp_sc.value == "Center_It")
			{
				port_pos[2] = portrait_i_use.width
				port_pos[3] = portrait_i_use.height
				port_pos[0] += Math.floor((134 - port_pos[2])/2)
				port_pos[1] += Math.floor((140 - port_pos[3])/2)
			}
			else if(textbox_exp_sc.value == "2x_Scaling")
			{
				port_pos[2] = portrait_i_use.width*2
				port_pos[3] = portrait_i_use.height*2
				port_pos[0] += Math.floor((134 - port_pos[2])/2)
				port_pos[1] += Math.floor((140 - port_pos[3])/2)
			}
			else if(textbox_exp_sc.value == "0.5x_Scaling")
			{
				port_pos[2] = portrait_i_use.width*0.5
				port_pos[3] = portrait_i_use.height*0.5
				port_pos[0] += Math.floor((134 - port_pos[2])/2)
				port_pos[1] += Math.floor((140 - port_pos[3])/2)
			}
			else if(textbox_exp_sc.value == "Fit_Square")
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
			else if(textbox_exp_sc.value == "Unchanged_Anything")
			{
				port_pos[2] = portrait_i_use.width
				port_pos[3] = portrait_i_use.height
			}
			if(bart.checked)
			{
				portrait_blacka.imageSmoothingEnabled = false
				canvas.imageSmoothingEnabled = false
				portrait_blacka.clearRect(0,0,portrait_i_use.width,portrait_i_use.height)
				portrait_blacka.drawImage(portrait_i_use,0,0)
				var cool_pixels = portrait_blacka.getImageData(0,0,portrait_i_use.width,portrait_i_use.height)
				for(var i = 3; i < cool_pixels.data.length; i += 4)
				{
					if(cool_pixels.data[i] == 255)
					{
						cool_pixels.data[i-3] = 0
						cool_pixels.data[i-2] = +0
						cool_pixels.data[i-1] = 0
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
			if(textbox_exp_c.value != "#ffffff")
			{
				new_color = hexToRgb(textbox_exp_c.value)
				portrait_blacka.imageSmoothingEnabled = false
				canvas.imageSmoothingEnabled = false
				portrait_blacka.clearRect(0,0,portrait_i_use.width,portrait_i_use.height)
				portrait_blacka.drawImage(portrait_i_use,0,0)
				var cool_pixels = portrait_blacka.getImageData(0,0,portrait_i_use.width,portrait_i_use.height)
				for(var i = 3; i < cool_pixels.data.length; i += 4)
				{
					if(cool_pixels.data[i] == 255 && cool_pixels.data[i-3] == 255 && cool_pixels.data[i-2] == 255 && cool_pixels.data[i-1] == 255)
					{
						cool_pixels.data[i-3] = new_color.r
						cool_pixels.data[i-2] = new_color.g
						cool_pixels.data[i-1] = new_color.b
					}
				}
				portrait_blacka.putImageData(cool_pixels, 0, 0)
				var blacked_out = portrait_blacked.toDataURL('image/png');
				portrait_i_use = blacked_out
			}
			ctx.drawImage(portrait_i_use, port_pos[0], port_pos[1], port_pos[2], port_pos[3])
		}
		if(textbox_chr.value == "none")
		{offset[0] -= 144-28}
		draw_text(144+box_size[0]+offset[0],26+box_size[1]+offset[1],textbox_text.value)
		//canvas.style.display = 'none'
		if(textbox_chr.value == "none")
		{offset[0] += 144-28}
		ctx.drawImage(overlay_i_use,0,0,box_size[2],box_size[3],offset[0],offset[1],box_size[2],box_size[3])
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
	//alert(box_size)
	var stack_width = Number(stack_width_inp.value)
	canvas_stack.height = (box_size[3] + 12)*Math.ceil(bonus_boxes.length/stack_width)
	canvas_stack.width = (box_size[2] + 12)*stack_width
	ctx_stack.fillRect(0,0,canvas_stack.width,canvas_stack.height)
	for (let i = 0; i < bonus_boxes.length; i++) 
	{
		if(marge.checked)
  		{ctx_stack.drawImage(bonus_boxes[i], box_size[2]*(i%stack_width), (box_size[3] + 12)*Math.floor(i/stack_width))}
		else
  		{ctx_stack.drawImage(bonus_boxes[i], 6+(12+box_size[2])*(i%stack_width), 6+(box_size[3] + 12)*Math.floor(i/stack_width))}
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

const exp_options = {
"flowey": '<option value="spr_floweynice_0">Nice</option><option value="spr_floweywink_0">Wink</option><option value="spr_floweysassy_0">Sassy</option><option value="spr_floweyplain_0">D:</option><option value="spr_floweyniceside_0">Side (Smile)</option><option value="spr_floweynicesideum_0">Side (Uh)</option><option value="spr_floweygrin_0">Grin</option><option value="spr_floweyevil_0">Evil</option><option value="spr_floweylaugh_0">Laugh</option><option value="spr_floweyside_0">Side</option><option value="spr_floweysideshock_0">Side (Ah)</option><option value="spr_floweytoriel_0">Toriel</option><option value="spr_floweytoriel2_0">Toriel (Distorted)</option><option value="spr_floweyhurt_0">Hurt</option>',
"toriel": '<option value="default">Default</option><option value="looking-away">Looking Away</option><option value="sad">Sad</option>'}
textbox_exp.innerHTML=exp_options[textbox_chr.value]
textbox_chr.addEventListener("change", (event) => {
	if(textbox_chr.value == "none")
	{
		textbox_exp_c.style.display = "none"
		textbox_exp_txt_1.style.display = "none"
		textbox_exp.style.display = "none"
		textbox_exp_alt.style.display = "none"
	}
	else
	{
		textbox_exp_c.style.display = "inline"
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
"undertale": [0,0,578,152,0,0],
"outertale": [0,0,578,152,0,0],
"jumbo": [0,0,578,188,0,0],
"deltarune": [8,10,594,168,0,0]
}

textbox_bg.addEventListener("change", (event) => {
	if(textbox_bg.value == "custom")
	{
		textbox_bg_alt.style.display = "inline"
	}
	else
	{
		if(textbox_bg.value != "transparent")
		{
			box_size = box_sizes[textbox_bg.value]
			textbox_bg_x.value = box_size[0]
			textbox_bg_y.value = box_size[1]
			textbox_bg_w.value = box_size[2]
			textbox_bg_h.value = box_size[3]
			portrait_x.value = box_size[4]
			portrait_y.value = box_size[5]
		}
		textbox_bg_alt.style.display = "none"
	}
})

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

textbox_font.addEventListener("change", (event) => {
	if(textbox_font.value == "custom")
	{
		textbox_font_alt.style.display = "inline"
		font_box_hidden.style.display = "inline"
	}
	else
	{
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
	if(ohAndThis == false)
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
