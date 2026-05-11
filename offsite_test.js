alert("ill do this properly later")


async function getData(url) {
  alert("function is running!!!)
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    alert(result);
    alert(result.body); //mayve?
  } catch (error) {
    console.error(error.message);
  }
}
alert("man i wish i could console log")
const char_name = document.getElementById("char_name");

function destroy_all()
{
  getData(char_name.innerHTML)
}


