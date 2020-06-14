document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.getElementById('boxes');
  const createButton = document.querySelector('button[data-action=create]');
  const destroyButton = document.querySelector('button[data-action=destroy]');

  createButton.addEventListener('click', () => {
    const amount = document.getElementsByClassName('js-input')[0].value;
    createBoxes(+amount);
  });

  destroyButton.addEventListener('click', destroyBoxes);

  function createBoxes(amount) {
    let size = 25;

    for (let i = 0; i < amount; i++) {
      const div = document.createElement('div');
      size += 10;
      div.style.width = `${size}px`;
      div.style.height = `${size}px`;
      div.style.backgroundColor = getRandomRGB();
      boxes.append(div);
    }
  }

  function destroyBoxes() {
    boxes.innerHTML = '';
  }

  function getRandomRGB() {
    const R = getRandomInt(255);
    const G = getRandomInt(255);
    const B = getRandomInt(255);
    return `rgb(${R}, ${G}, ${B})`;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
});
