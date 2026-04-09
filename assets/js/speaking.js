const typeLabels = {
  upcoming_conference: 'Upcoming Conference',
  speaking_engagement: 'Speaking Engagement',
  past_appearance: 'Past Appearance'
};

function toGoogleCalendarUrl(event) {
  if (event.googleCalendarUrl) return event.googleCalendarUrl;

  const start = new Date(`${event.date}T10:00:00-08:00`);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.talkTitle,
    dates: `${fmt(start)}/${fmt(end)}`,
    location: `${event.venue}, ${event.city}`,
    details: `${event.topic} (PST)`
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function eventCard(event) {
  return `
    <div class="col-lg-6">
      <article class="soft-card bg-white p-3 h-100">
        <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
          <h2 class="h5 mb-0">${event.talkTitle}</h2>
          <span class="badge badge-soft">${typeLabels[event.type] || event.type}</span>
        </div>
        <p class="mb-2"><strong>Date:</strong> ${event.date} · ${event.time || 'PST'}</p>
        <p class="mb-2"><strong>Venue:</strong> ${event.venue}, ${event.city}</p>
        <p class="mb-3"><strong>Topic:</strong> ${event.topic}</p>
        <div class="d-flex gap-2 flex-wrap mt-auto">
          <a class="btn btn-outline-secondary btn-sm" href="${event.venueMapUrl}" target="_blank" rel="noopener noreferrer">Open Venue</a>
          <a class="btn ac-btn btn-sm" href="${toGoogleCalendarUrl(event)}" target="_blank" rel="noopener noreferrer">Add to Google Calendar</a>
        </div>
      </article>
    </div>
  `;
}

function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]).filter(Boolean))].sort();
}

function fillSelect(id, values) {
  const select = document.getElementById(id);
  if (!select) return;
  values.forEach((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

async function loadEvents() {
  const root = document.getElementById('events-grid');
  if (!root) return;

  try {
    const data = await getJson('/data/events.json');
    const events = data.events;

    fillSelect('filter-topic', uniqueValues(events, 'topic'));
    fillSelect('filter-year', uniqueValues(events.map((event) => ({ year: event.date.slice(0, 4) })), 'year'));
    fillSelect('filter-city', uniqueValues(events, 'city'));

    const render = () => {
      const type = document.getElementById('filter-type').value;
      const topic = document.getElementById('filter-topic').value;
      const year = document.getElementById('filter-year').value;
      const city = document.getElementById('filter-city').value;

      const filtered = events.filter((event) => {
        if (type && event.type !== type) return false;
        if (topic && event.topic !== topic) return false;
        if (year && !event.date.startsWith(year)) return false;
        if (city && event.city !== city) return false;
        return true;
      });

      root.innerHTML = filtered.length
        ? filtered.map(eventCard).join('')
        : '<p class="text-secondary">No events match your filters right now.</p>';
    };

    ['filter-type', 'filter-topic', 'filter-year', 'filter-city'].forEach((id) => {
      const element = document.getElementById(id);
      element?.addEventListener('change', render);
    });

    render();
  } catch {
    root.innerHTML = '<p class="text-danger">Unable to load events right now.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadEvents);
