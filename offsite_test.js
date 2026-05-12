im_Sorry = []

async function getData(my_url) {
  //alert("function is running!!!")
  //alert(my_url)
  try {
    const response = await fetch(my_url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = response.text();
	
    //return result
	im_Sorry.push(result)
  } catch (error) {
    console.error(error.message);
  }
}
alert("does this work")
const char_name = document.getElementById("char_name");

function destroy_all()
{
 	getData(char_name.value)
}


function destroy()
{
console.log(im_Sorry)
}