const TELEGRAM_USERNAME = "your_telegram_username";

function buildTelegramUrl(message) {
  const text = encodeURIComponent(message || "Hi, I want to buy/sell USDT through P2P.");
  return `https://t.me/${TELEGRAM_USERNAME}?text=${text}`;
}

function wireTelegramButtons() {
  const links = document.querySelectorAll(".telegram-link");
  links.forEach((link) => {
    const msg = link.getAttribute("data-message") || "Hi, I want to buy/sell USDT through P2P.";
    link.setAttribute("href", buildTelegramUrl(msg));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

function setFooterYear() {
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
}

wireTelegramButtons();
setFooterYear();
