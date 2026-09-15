document.addEventListener('DOMContentLoaded', () => {
  // 1. Copy Wi-Fi Password to Clipboard
  const copyBtn = document.querySelector('.copy-btn');
  const wifiPass = document.querySelector('.wifi-pass-copy .bold');

  if (copyBtn && wifiPass) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(wifiPass.textContent.trim());
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'COPIED!';
        copyBtn.style.color = 'var(--terracotta)';

        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy password: ', err);
      }
    });
  }

  // 2. Print Receipt Dialog
  const printBtn = document.querySelector('.header-actions .btn-outline');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 3. Add to Calendar (Generate .ics File)
  const calendarBtn = document.querySelector('.header-actions .btn-primary');
  if (calendarBtn) {
    calendarBtn.addEventListener('click', () => {
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Maison Soleil//Booking Confirmation//EN',
        'BEGIN:VEVENT',
        'SUMMARY:Stay at Maison Soleil (La Garrigue)',
        'DESCRIPTION:Booking confirmation № MS-2026. Check-in: 15:00. Address: 12 Rue des Oliviers, Cassis.',
        'LOCATION:Maison Soleil, 12 Rue des Oliviers, Cassis',
        'DTSTART:20260425T150000Z',
        'DTEND:20260429T110000Z',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'maison-soleil-stay.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // 4. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
});