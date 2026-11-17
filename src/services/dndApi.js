const BASE_URL = "https://www.dnd5eapi.co/api";

// Obtener la lista completa de monstruos
export async function fetchMonsters() {
  try {
    const response = await fetch(`${BASE_URL}/monsters`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error al obtener los monstruos:", error);
    return [];
  }
}

// Obtener los detalles de un monstruo específico
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

// Obtener equipo estándar para el Módulo de Loot
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

// Obtener objetos mágicos para recompensas de nivel alto
export async function fetchMagicItems() {
  try {
    const response = await fetch(`${BASE_URL}/magic-items`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error al obtener objetos mágicos:", error);
    return [];
  }
}

// Obtener detalles de un objeto específico (equipo o mágico)
export async function fetchItemDetails(url) {
  try {
    const response = await fetch(`https://www.dnd5eapi.co${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener detalles del objeto:", error);
    return null;
  }
}