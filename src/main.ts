import "./style.css";
import { createWorker } from "tesseract.js";

const worker = await createWorker("hrv");
const input = document.getElementById("billy");
const textEl = document.getElementById("text");

input?.addEventListener("change", function (e) {
  const file = e.target?.files[0];
  const reader = new FileReader();

  reader.onloadend = async function () {
    const {
      data: { text },
    } = await worker.recognize(reader.result);
    await worker.terminate();

    console.log(text);
    renderText(text);
  };

  if (!file) {
    return;
  }
  reader.readAsDataURL(file);
});

function renderText(text: string) {
  if (!textEl) {
    return;
  }
  const formattedText = text.replace(/\n/g, "<br>");
  textEl.innerHTML = formattedText;
}
