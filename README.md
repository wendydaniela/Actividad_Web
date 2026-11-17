# Dungeon Master Assistant (D&D 5e)

Aplicación web responsiva y aplicación móvil híbrida para Android diseñada para asistir a un Dungeon Master (DM) durante sus partidas de Dungeons & Dragons 5ª Edición.

## Enlace de Despliegue (Web)
- **Aplicación en producción (Vercel):** [Ver aplicación web aquí](TU_ENLACE_DE_VERCEL)

## Descarga para Android (.apk)
- El archivo instalable (`.apk`) generado con Capacitor y Android Studio se encuentra disponible en la sección **[Releases (v1.0.0)](../../releases)** de este repositorio.

## Módulos Principales
1. **Bestiario y Enemigos:** Consulta en tiempo real a los monstruos oficiales de la API de D&D 5e, con buscador por nombre y visualización detallada de Clase de Armadura (AC), Puntos de Golpe (HP) y Nivel de Desafío (CR).
2. **Generador de Loot (Botín):** Cálculo dinámico de monedas (cobre, plata, oro y platino) y obtención aleatoria de equipamiento y objetos mágicos reales de la API según el rango de Nivel de Desafío seleccionado.
3. **Bandeja de Dados:** Simulador interactivo de lanzamientos para todos los dados estándar de D&D (`d4`, `d6`, `d8`, `d10`, `d12`, `d20` y `d100`), con detección de críticos e historial reciente.

## Tecnologías Utilizadas
- **Frontend:** React, Vite, JavaScript, Tailwind CSS
- **Empaquetado Móvil:** CapacitorJS y Android Studio
- **Despliegue:** Vercel