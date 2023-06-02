
const API_KEY = "your OPENAI_API_KEY";
const submitIcon = document.querySelector("#submit-icon");
const input = document.querySelector("input");
const imageSection = document.querySelector(".image-section");

const getImages = async () => {
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: input.value,
      n: 2,
      size: "512x512",
      temperature : 0.8
    })
  };
  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", options);
    const data = await response.json();
    data?.data.forEach(imageObject => {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      const imageElement = document.createElement('img');
      imageElement.setAttribute('src', imageObject.url);
      imageContainer.append(imageElement);
      imageSection.append(imageContainer);
    });
  } catch (error) {
    console.error(error);
  }
};

submitIcon.addEventListener('click', getImages);

