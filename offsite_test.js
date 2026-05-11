async function getData(url) {
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

getData('https://paste.c-net.org/OfferedUnclear')
