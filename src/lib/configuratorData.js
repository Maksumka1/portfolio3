// Static data for the PC Builder/Configurator
export const configuratorSteps = [
  {
    key: 'cpu',
    label: 'Процесор',
    shortLabel: 'CPU',
    required: true,
    options: [
      { id: 'cpu-1', name: 'Intel Core i5-14600K', price: 9500, socket: 'LGA1700', tdp: 125, tier: 'mid' },
      { id: 'cpu-2', name: 'Intel Core i7-14700K', price: 15200, socket: 'LGA1700', tdp: 125, tier: 'high' },
      { id: 'cpu-3', name: 'Intel Core i9-14900K', price: 22800, socket: 'LGA1700', tdp: 150, tier: 'ultra' },
      { id: 'cpu-4', name: 'AMD Ryzen 5 7600X', price: 8200, socket: 'AM5', tdp: 105, tier: 'mid' },
      { id: 'cpu-5', name: 'AMD Ryzen 7 7800X3D', price: 14500, socket: 'AM5', tdp: 120, tier: 'high' },
      { id: 'cpu-6', name: 'AMD Ryzen 9 7950X', price: 21500, socket: 'AM5', tdp: 170, tier: 'ultra' },
    ],
  },
  {
    key: 'motherboard',
    label: 'Материнська плата',
    shortLabel: 'MB',
    required: true,
    dependsOn: 'cpu',
    options: [
      { id: 'mb-1', name: 'ASUS ROG Strix Z790-A', price: 12500, socket: 'LGA1700', formFactor: 'ATX' },
      { id: 'mb-2', name: 'MSI MAG Z790 Tomahawk', price: 9800, socket: 'LGA1700', formFactor: 'ATX' },
      { id: 'mb-3', name: 'Gigabyte B760M Aorus Elite', price: 6500, socket: 'LGA1700', formFactor: 'mATX' },
      { id: 'mb-4', name: 'ASUS ROG Strix X670E-E', price: 15200, socket: 'AM5', formFactor: 'ATX' },
      { id: 'mb-5', name: 'MSI MAG X670E Tomahawk', price: 11500, socket: 'AM5', formFactor: 'ATX' },
      { id: 'mb-6', name: 'Gigabyte B650 Aorus Elite AX', price: 7800, socket: 'AM5', formFactor: 'ATX' },
    ],
  },
  {
    key: 'ram',
    label: "Оперативна пам'ять",
    shortLabel: 'RAM',
    required: true,
    options: [
      { id: 'ram-1', name: 'Kingston Fury Beast 16GB DDR5-5600', price: 2200, capacity: '16 GB' },
      { id: 'ram-2', name: 'G.Skill Trident Z5 32GB DDR5-6000', price: 4800, capacity: '32 GB' },
      { id: 'ram-3', name: 'Corsair Dominator 32GB DDR5-6400', price: 6200, capacity: '32 GB' },
      { id: 'ram-4', name: 'G.Skill Trident Z5 64GB DDR5-6000', price: 9500, capacity: '64 GB' },
    ],
  },
  {
    key: 'gpu',
    label: 'Відеокарта',
    shortLabel: 'GPU',
    required: true,
    options: [
      { id: 'gpu-1', name: 'NVIDIA RTX 4060 Ti 8GB', price: 16500, tdp: 160, tier: 'mid' },
      { id: 'gpu-2', name: 'NVIDIA RTX 4070 Super 12GB', price: 24000, tdp: 220, tier: 'high' },
      { id: 'gpu-3', name: 'NVIDIA RTX 4080 Super 16GB', price: 42000, tdp: 320, tier: 'ultra' },
      { id: 'gpu-4', name: 'NVIDIA RTX 5070 Ti 16GB', price: 35000, tdp: 300, tier: 'ultra' },
      { id: 'gpu-5', name: 'NVIDIA RTX 5080 16GB', price: 48000, tdp: 360, tier: 'ultra' },
      { id: 'gpu-6', name: 'AMD Radeon RX 7800 XT 16GB', price: 19500, tdp: 263, tier: 'high' },
      { id: 'gpu-7', name: 'AMD Radeon RX 9070 XT 16GB', price: 25000, tdp: 300, tier: 'ultra' },
    ],
  },
  {
    key: 'storage',
    label: 'Накопичувач',
    shortLabel: 'SSD',
    required: true,
    options: [
      { id: 'ssd-1', name: 'Samsung 980 Pro 1TB NVMe', price: 3500 },
      { id: 'ssd-2', name: 'Samsung 990 Pro 2TB NVMe', price: 6800 },
      { id: 'ssd-3', name: 'WD Black SN850X 1TB', price: 3200 },
      { id: 'ssd-4', name: 'WD Black SN850X 2TB', price: 6200 },
      { id: 'ssd-5', name: 'Kingston KC3000 2TB NVMe', price: 5800 },
    ],
  },
  {
    key: 'psu',
    label: 'Блок живлення',
    shortLabel: 'PSU',
    required: true,
    options: [
      { id: 'psu-1', name: 'Corsair RM750e 750W 80+ Gold', price: 4200, wattage: 750 },
      { id: 'psu-2', name: 'Corsair RM850x 850W 80+ Gold', price: 5500, wattage: 850 },
      { id: 'psu-3', name: 'Seasonic Focus GX-1000 1000W', price: 7200, wattage: 1000 },
      { id: 'psu-4', name: 'be quiet! Dark Power 13 1200W', price: 10500, wattage: 1200 },
    ],
  },
  {
    key: 'case',
    label: 'Корпус',
    shortLabel: 'CASE',
    required: false,
    options: [
      { id: 'case-1', name: 'NZXT H7 Flow Black', price: 4500, formFactor: 'ATX' },
      { id: 'case-2', name: 'Corsair 5000D Airflow', price: 5800, formFactor: 'ATX' },
      { id: 'case-3', name: 'Lian Li O11 Dynamic EVO', price: 6200, formFactor: 'ATX' },
      { id: 'case-4', name: 'Fractal Design Torrent', price: 7500, formFactor: 'ATX' },
    ],
  },
  {
    key: 'cooling',
    label: 'Охолодження',
    shortLabel: 'COOL',
    required: false,
    options: [
      { id: 'cool-1', name: 'Noctua NH-D15 (повітря)', price: 3800, type: 'air' },
      { id: 'cool-2', name: 'be quiet! Dark Rock Pro 5', price: 3200, type: 'air' },
      { id: 'cool-3', name: 'NZXT Kraken X63 280mm (рідина)', price: 5200, type: 'liquid' },
      { id: 'cool-4', name: 'Corsair iCUE H150i 360mm (рідина)', price: 7500, type: 'liquid' },
      { id: 'cool-5', name: 'EKWB AIO 360mm D-RGB', price: 6800, type: 'liquid' },
    ],
  },
];

export function getCompatibleOptions(step, selections) {
  if (step.key === 'motherboard' && selections.cpu) {
    const cpuSocket = step.options.length > 0 ? selections.cpu.socket : null;
    if (cpuSocket) {
      return step.options.filter(o => o.socket === cpuSocket);
    }
  }
  return step.options;
}

export function getTotalTDP(selections) {
  let tdp = 0;
  if (selections.cpu?.tdp) tdp += selections.cpu.tdp;
  if (selections.gpu?.tdp) tdp += selections.gpu.tdp;
  tdp += 50; // misc
  return tdp;
}

export function checkPSUWarning(selections) {
  const totalTDP = getTotalTDP(selections);
  const psuWattage = selections.psu?.wattage || 0;
  if (psuWattage && totalTDP > psuWattage * 0.85) {
    return `Рекомендована потужність БЖ: ${Math.ceil(totalTDP / 50) * 50}W+. Ваш БЖ може бути недостатнім.`;
  }
  return null;
}