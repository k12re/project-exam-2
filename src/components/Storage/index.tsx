export function save(key: string, value: string) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function load(key: string) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    return null;
  }
}

export function remove(key: string) {
  localStorage.removeItem(key);
}
