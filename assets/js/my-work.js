function productCard(product, index) {
  const tptLink = product.tptUrl
    ? `<a class="btn btn-outline-secondary btn-sm" href="${product.tptUrl}" target="_blank" rel="noopener noreferrer">View on TPT</a>`
    : '';

  return `
    <div class="col-md-6 col-xl-4" data-aos="fade-up" data-aos-delay="${Math.min(index * 60, 240)}">
      <article class="soft-card bg-white p-3 h-100">
        <img class="product-placeholder mb-3" src="${product.image}" alt="Cover image for ${product.title}" loading="lazy" />
        <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
          <h2 class="h5 mb-0">${product.title}</h2>
          <span class="badge badge-soft">${product.category}</span>
        </div>
        <p class="text-secondary">${product.description}</p>
        <div class="d-flex gap-2 flex-wrap mt-auto">
          <a class="btn ac-btn btn-sm" href="${product.amazonUrl}" target="_blank" rel="noopener noreferrer">View on Amazon</a>
          ${tptLink}
        </div>
      </article>
    </div>
  `;
}

async function loadProducts() {
  const root = document.getElementById('products-grid');
  if (!root) return;

  try {
    const data = await getJson('/data/products.json');
    root.innerHTML = data.products.map((product, index) => productCard(product, index)).join('');
    if (window.AOS) window.AOS.refresh();
  } catch {
    root.innerHTML = '<p class="text-danger">Unable to load products right now.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);
