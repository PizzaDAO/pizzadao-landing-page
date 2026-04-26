/* PizzaDAO Landing Page — app.js */

const DEFAULT_THUMBNAIL =
  "https://pbs.twimg.com/profile_images/1960434112029745152/eiqMx2L2_400x400.jpg";

const THUMBS = {
  MOLTO_BENNY_ROUTE: "images/molto-benny-route.jpeg",
  PIZZA_CHEF: "images/pizza-chef.jpeg",
  BITCOIN_BLASTOFF: "images/bitcoin-blastoff.png",
  SUBMIT_PROPOSAL: "images/submit-proposal.png",
  JOIN_PIZZADAO: "images/join-pizzadao.png",
  RARE_PIZZAS: "images/rare-pizzas.png",
  CREW_CALLS: "images/crew-calls.png",
  PIZZA_MAP: "images/pizza-map.png",
  GITHUB: "images/github.png",
  ENS: "images/ens.png",
  COMMUNITY_CALL: "images/community-call.png",
  VOXELS_PIZZERIA: "images/voxels-pizzeria.jpeg",
  VOXELS_GALLERY: "images/voxels-gallery.jpeg",
  ONCYBER: "images/oncyber.jpeg",
};

const START_HERE = [
  {
    name: "Claim Your Pizza Mafia Name",
    url: "https://pizzadao.org",
    description: "What's your favorite pizza topping + mafia movie?",
    icon: "\u{1F355}",
    thumbnail: THUMBS.JOIN_PIZZADAO,
  },
  {
    name: "Global Pizza Party Map",
    url: "https://map.pizzadao.xyz",
    description: "See all the cities we host the Global Pizza Party in.",
    icon: "\u{1F5FA}\uFE0F",
    thumbnail: THUMBS.PIZZA_MAP,
  },
  {
    name: "Plan a Pizza Party",
    url: "https://rsv.pizza/gpp",
    description: "Host a Global Pizza Party in your city!",
    icon: "\u{1F389}",
  },
];

const GAMES = [
  {
    name: "Pizza Chef",
    url: "https://pizzachef.bolt.host",
    description: "Fast arcade lane action. Cook, serve, and chase streaks.",
    icon: "\u{1F468}\u200D\u{1F373}",
    thumbnail: THUMBS.PIZZA_CHEF,
  },
  {
    name: "Molto Benny's Delivery Route",
    url: "https://pizzadao.github.io/moltobennydelivery/",
    description: "Plan the route. Deliver the pies. Speedrun the planet.",
    icon: "\u{1F6F5}",
    thumbnail: THUMBS.MOLTO_BENNY_ROUTE,
  },
  {
    name: "Bitcoin Pizza Blastoff",
    url: "https://c-r-x-s-s.github.io/Bitcoin-Pizza-Blastoff/",
    description:
      "Retro blastoff vibes \u2014 dodge, boost, and send the slice.",
    icon: "\u{1F680}",
    thumbnail: THUMBS.BITCOIN_BLASTOFF,
  },
];

const GET_INVOLVED = [
  {
    name: "Community Call",
    url: "https://discord.pizzadao.xyz",
    description: "Every Sunday on our Discord at 1pm ET.",
    icon: "\u260E\uFE0F",
    thumbnail: THUMBS.COMMUNITY_CALL,
  },
  {
    name: "Join a Crew Call",
    url: "https://calendar.pizzadao.xyz",
    description: "Come see what we're working on during the week!",
    icon: "\u{1F4C5}",
    thumbnail: THUMBS.CREW_CALLS,
  },
  {
    name: "Contribute to Our Projects",
    url: "https://pizzadao.org/tech/projects",
    description: "See what we're building and jump in!",
    icon: "\u{1F527}",
    thumbnail: THUMBS.GITHUB,
  },
];

const GET_DEEPER = [
  {
    name: "Submit a Proposal",
    url: "https://propose.pizzadao.xyz",
    description: "Need pizza for an event?",
    icon: "\u{1F4DD}",
    thumbnail: THUMBS.SUBMIT_PROPOSAL,
  },
  {
    name: "Claim PizzaDAO ENS",
    url: "https://pizzadao.namespace.ninja/",
    description: "Claimable by Rare Pizzas NFT holders.",
    icon: "\u{1F680}",
    thumbnail: THUMBS.ENS,
  },
];

const METAVERSE = [
  {
    name: "Birthday Gallery",
    url: "http://oncyber.com/pizzadao",
    description:
      "Explore the history of PizzaDAO in this gallery we built for our 4th birthday.",
    icon: "\u{1F3DB}\uFE0F",
    thumbnail: THUMBS.ONCYBER,
  },
  {
    name: "Metaverse Pizzeria",
    url: "https://www.cryptovoxels.com/play?coords=W@192W,251N",
    description: "Hungry? Grab a slice at our first shop in the metaverse.",
    icon: "\u{1F355}",
    thumbnail: THUMBS.VOXELS_PIZZERIA,
  },
  {
    name: "Art Gallery",
    url: "https://www.cryptovoxels.com/play?coords=E@153W,346N",
    description:
      "The finest works of pizza art, curated from all corners of the metaverse.",
    icon: "\u{1F3A8}",
    thumbnail: THUMBS.VOXELS_GALLERY,
  },
];

function cardHTML(c) {
  const thumb = c.thumbnail || DEFAULT_THUMBNAIL;
  return `
    <a class="card" href="${c.url}" target="_blank" rel="noreferrer" aria-label="Open ${c.name}">
      <div class="thumb" aria-hidden="true">
        <img src="${thumb}" alt="${c.name} thumbnail" loading="lazy" />
      </div>
      <div class="cardBody">
        <div class="titleRow">
          <h2 class="title">${c.icon ? `${c.icon} ` : ""}${c.name}</h2>
        </div>
        <div class="meta">${c.description || ""}</div>
      </div>
    </a>
  `;
}

function renderSection(id, cards) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = cards.map(cardHTML).join("");
}

renderSection("modal-start-grid", START_HERE);
renderSection("modal-deeper-grid", GET_DEEPER);
renderSection("modal-involve-grid", GET_INVOLVED);
renderSection("modal-metaverse-grid", METAVERSE);

/* ============================================================
   Modal system — replaces all inline onclick handlers
   ============================================================ */

let lastFocusedElement = null;

function openModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (!overlay) return;

  lastFocusedElement = document.activeElement;

  // Special handling for arcade iframe
  if (modalId === "modal-arcade") {
    const iframe = document.getElementById("arcade-iframe");
    if (iframe) iframe.src = "https://c-r-x-s-s.github.io/PizzaDAO-Arcade/";
  }

  overlay.classList.add("open");

  // Focus the close button inside the modal
  const closeBtn = overlay.querySelector(".modal-close");
  if (closeBtn) closeBtn.focus();
}

function closeModal(overlay) {
  if (!overlay) return;
  overlay.classList.remove("open");

  // Clear arcade iframe when closing
  const iframe = overlay.querySelector("iframe");
  if (iframe) iframe.src = "about:blank";

  // Restore focus to the trigger element
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

// Section buttons with data-modal attribute
document.querySelectorAll("[data-modal]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    openModal(this.getAttribute("data-modal"));
  });
});

// Close on overlay background click
document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
  overlay.addEventListener("click", function (e) {
    if (e.target === this) closeModal(this);
  });
});

// Close buttons
document.querySelectorAll(".modal-close").forEach(function (btn) {
  btn.addEventListener("click", function () {
    closeModal(this.closest(".modal-overlay"));
  });
});

// Escape key closes topmost open modal
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    // Find the last open modal (topmost)
    var openModals = document.querySelectorAll(".modal-overlay.open");
    if (openModals.length > 0) {
      closeModal(openModals[openModals.length - 1]);
    }
  }
});

// Focus trapping inside open modals
document.addEventListener("keydown", function (e) {
  if (e.key !== "Tab") return;

  var openModal = document.querySelector(".modal-overlay.open");
  if (!openModal) return;

  var focusable = openModal.querySelectorAll(
    'a[href], button, textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return;

  var first = focusable[0];
  var last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

/* ============================================================
   Loading shimmer — hide once button images load
   ============================================================ */

document.querySelectorAll(".section-btn .btn-img").forEach(function (img) {
  function markLoaded() {
    img.closest(".section-btn").classList.add("img-loaded");
  }
  if (img.complete && img.naturalWidth > 0) {
    markLoaded();
  } else {
    img.addEventListener("load", markLoaded);
    img.addEventListener("error", markLoaded);
  }
});
