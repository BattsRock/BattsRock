const views = {
  home: document.querySelector("#homeView"),
  management: document.querySelector("#managementView"),
  marketplace: document.querySelector("#marketplaceView"),
  tenant: document.querySelector("#tenantView"),
  stays: document.querySelector("#staysView"),
};

const titles = {
  home: "Home",
  management: "Management",
  marketplace: "Listings",
  tenant: "Tenant",
  stays: "Stays",
};

const properties = [
  {
    name: "Escazu Loft 12B",
    tenant: "Sofia Alvarez",
    phone: "+506 7012 8840",
    email: "sofia.alvarez@example.com",
    payDate: "5th of each month",
    lease: "Feb 1, 2026 - Jan 31, 2027",
    deposit: "₡430,000",
    paid: true,
  },
  {
    name: "La Sabana Studio",
    tenant: "Mateo Rojas",
    phone: "+506 6120 4477",
    email: "mateo.rojas@example.com",
    payDate: "1st of each month",
    lease: "Apr 15, 2026 - Apr 14, 2027",
    deposit: "₡390,000",
    paid: false,
  },
  {
    name: "Santa Ana Garden House",
    tenant: "Nora Jimenez",
    phone: "+506 8990 1500",
    email: "nora.jimenez@example.com",
    payDate: "10th of each month",
    lease: "Jan 10, 2026 - Jan 9, 2028",
    deposit: "$1,150",
    paid: true,
  },
];

const listings = [
  {
    title: "Drone fly-through for rentals",
    category: "Drone",
    location: "San Jose and Escazu",
    price: 145000,
    badge: "Verified",
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=500&q=80",
    description: "Indoor/outdoor cinematic package with 48-hour delivery.",
  },
  {
    title: "Rental photography day rate",
    category: "Photography",
    location: "Greater Metropolitan Area",
    price: 88000,
    badge: "Popular",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80",
    description: "Bright listing photos, detail shots, and vertical reels.",
  },
  {
    title: "Bilingual realtor tenant placement",
    category: "Realtor",
    location: "Escazu, Santa Ana, Rohrmoser",
    price: 285000,
    badge: "Exclusive",
    img: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=500&q=80",
    description: "Screening, showings, lease coordination, and handoff.",
  },
  {
    title: "Landlord accounting setup",
    category: "Accounting",
    location: "Remote",
    price: 65000,
    badge: "New",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=500&q=80",
    description: "Monthly income tracking, deposits, and expense categories.",
  },
  {
    title: "Presale condo tower in Curridabat",
    category: "Presale",
    location: "Curridabat",
    price: 950000,
    badge: "Presale",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80",
    description: "Investor allocation with rental projection sheet.",
  },
];

const stays = [
  {
    title: "City-view condo in Nunciatura",
    meta: "4 guests · 2 beds · Pool · Parking",
    price: "₡72,000 night",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Minimal studio by Avenida Escazu",
    meta: "2 guests · 1 bed · Workspace",
    price: "₡54,000 night",
    img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Family townhouse in Santa Ana",
    meta: "6 guests · 3 beds · Garden",
    price: "₡89,000 night",
    img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=600&q=80",
  },
];

const formatCrc = (value) =>
  new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    maximumFractionDigits: 0,
  }).format(value);

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function setView(name) {
  Object.entries(views).forEach(([key, view]) => {
    view.classList.toggle("active", key === name);
  });
  document.querySelector("#pageTitle").textContent = titles[name];
  document.querySelectorAll(".bottom-nav button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === name);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderProperties() {
  const container = document.querySelector("#propertyList");
  container.innerHTML = properties
    .map(
      (property) => `
        <article class="card">
          <div class="card-top">
            <div>
              <p class="eyebrow">${property.name}</p>
              <h3>${property.tenant}</h3>
              <p>${property.phone} · ${property.email}</p>
            </div>
            <span class="badge">${property.paid ? "Paid" : "Unpaid"}</span>
          </div>
          <div class="meta-grid">
            <div><span>Pay date</span><strong>${property.payDate}</strong></div>
            <div><span>Deposit</span><strong>${property.deposit}</strong></div>
            <div><span>Lease</span><strong>${property.lease}</strong></div>
            <div><span>Contract</span><strong>Hosted demo PDF</strong></div>
          </div>
          <div class="button-row">
            <button type="button" data-pay="${property.name}">Check month</button>
            <button type="button" data-contract="${property.name}">View contract</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderListings() {
  const query = document.querySelector("#listingSearch").value.trim().toLowerCase();
  const category = document.querySelector("#categoryFilter").value;
  const maxPrice = Number(document.querySelector("#priceFilter").value);
  const filtered = listings.filter((listing) => {
    const matchesQuery = `${listing.title} ${listing.description} ${listing.location}`.toLowerCase().includes(query);
    const matchesCategory = category === "all" || listing.category === category;
    return matchesQuery && matchesCategory && listing.price <= maxPrice;
  });

  document.querySelector("#priceLabel").textContent = `Up to ${formatCrc(maxPrice)}`;
  document.querySelector("#listingCount").textContent = `${filtered.length} result${filtered.length === 1 ? "" : "s"}`;
  document.querySelector("#marketplaceList").innerHTML = filtered
    .map(
      (listing) => `
        <article class="card listing-card">
          <img src="${listing.img}" alt="${listing.category} service listing" />
          <div class="listing-body">
            <div class="card-top">
              <div>
                <p class="eyebrow">${listing.category}</p>
                <h3>${listing.title}</h3>
              </div>
              <span class="badge">${listing.badge}</span>
            </div>
            <p class="location-line">${listing.location}</p>
            <p>${listing.description}</p>
            <div class="price-line">
              <strong>${formatCrc(listing.price)}</strong>
              <small>30 days</small>
            </div>
            <div class="mini-actions">
              <button type="button" data-click="${listing.title}">Contact</button>
              <button type="button" data-click="${listing.title}">Favorite</button>
              <button type="button" data-click="${listing.title}">Track click</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderStays() {
  document.querySelector("#stayList").innerHTML = stays
    .map(
      (stay) => `
        <article class="card stay-card">
          <img src="${stay.img}" alt="${stay.title}" />
          <div>
            <p class="eyebrow">Available stay</p>
            <h3>${stay.title}</h3>
            <p>${stay.meta}</p>
            <div class="price-line">
              <strong>${stay.price}</strong>
              <small>Mirrors Airbnb UX</small>
            </div>
            <div class="mini-actions">
              <button type="button" data-click="${stay.title}">Reserve</button>
              <button type="button" data-click="${stay.title}">Share</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.jump));
});

document.querySelector("#propertyList").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.pay) {
    const property = properties.find((item) => item.name === button.dataset.pay);
    showToast(`${property.name}: ${property.paid ? "June payment is marked paid." : "June payment is still pending."}`);
  }
  if (button.dataset.contract) {
    showToast(`Opening hosted contract demo for ${button.dataset.contract}.`);
  }
});

document.querySelector("#marketplaceList").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button?.dataset.click) showToast(`Demo tracked action for ${button.dataset.click}.`);
});

document.querySelector("#stayList").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button?.dataset.click) showToast(`Demo stay action: ${button.textContent.trim()} ${button.dataset.click}.`);
});

["#listingSearch", "#categoryFilter", "#priceFilter"].forEach((selector) => {
  document.querySelector(selector).addEventListener("input", renderListings);
});

document.querySelector("#demoParse").addEventListener("click", () => {
  showToast("Demo parser extracted tenant, pay date, lease dates, and deposit from hosted contracts.");
});

document.querySelector("#sendCleaning").addEventListener("click", () => {
  const company = document.querySelector("#cleanerCompany").value;
  const number = document.querySelector("#cleanerNumber").value;
  showToast(`WhatsApp message prepared for ${company} at ${number}.`);
});

document.querySelector("#submitProof").addEventListener("click", () => {
  showToast("Payment proof submitted to landlord demo inbox.");
});

renderProperties();
renderListings();
renderStays();
