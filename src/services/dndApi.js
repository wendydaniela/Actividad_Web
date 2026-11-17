const BASE_URL = "https://www.dnd5eapi.co/api";

// Obtener la lista completa de monstruos
export async function fetchMonsters() {
  try {
    const response = await fetch(`${BASE_URL}/monsters`);
    const data = await response.json();
    return data.results; // Retorna un array de { index, name, url }
  } catch (error) {
    console.error("Error al obtener los monstruos:", error);
    return [];
  }
}

// Obtener los detalles de un monstruo específico (AC, HP, Challenge Rating, etc.)
export async function fetchMonsterDetails(index) {
  try {
    const response = await fetch(`${BASE_URL}/monsters/${index}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener detalles del monstruo:", error);
    return null;
  }
}

// Obtener equipo para el Módulo de Loot
export async function fetchEquipment() {
  try {
    const response = await fetch(`${BASE_URL}/equipment`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error al obtener el equipo:", error);
    return [];
  }
}