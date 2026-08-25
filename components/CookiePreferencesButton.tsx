"use client";

const STORAGE_KEY = "cy_consent_v1";

export function CookiePreferencesButton() {
  function resetPreferences() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }

  return (
    <button className="button button-secondary" type="button" onClick={resetPreferences}>
      Çerez tercihlerini değiştir
    </button>
  );
}
