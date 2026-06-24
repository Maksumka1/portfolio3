// Mock products used as local fallbacks when the API returns no items
export const mockProducts = [
  // Components (10)
  { id: 'comp-1', name: 'Intel Core i5-14600K', category: 'CPU', type: 'component', price: 9500, short_desc: 'Шестиядерний процесор для ігор та роботи', specs: { cpu: 'Intel Core i5-14600K' }, rating: 4.4 },
  { id: 'comp-2', name: 'Intel Core i7-14700K', category: 'CPU', type: 'component', price: 15200, short_desc: 'Висока продуктивність для складних завдань', specs: { cpu: 'Intel Core i7-14700K' }, rating: 4.6 },
  { id: 'comp-3', name: 'AMD Ryzen 7 7800X3D', category: 'CPU', type: 'component', price: 16200, short_desc: 'Чудовий вибір для ігор', specs: { cpu: 'AMD Ryzen 7 7800X3D' }, rating: 4.8 },
  { id: 'comp-4', name: 'AMD Ryzen 5 7600', category: 'CPU', type: 'component', price: 7200, short_desc: 'Вдалий бюджетний вибір для ігор', specs: { cpu: 'AMD Ryzen 5 7600' }, rating: 4.3 },
  { id: 'comp-5', name: 'NVIDIA RTX 4070 Super 12GB', category: 'GPU', type: 'component', price: 32000, short_desc: 'Потужна відеокарта для 1440p', specs: { gpu: 'RTX 4070 Super' }, rating: 4.7 },
  { id: 'comp-6', name: 'NVIDIA RTX 4060 Ti 8GB', category: 'GPU', type: 'component', price: 22000, short_desc: 'Баланс продуктивності та ціни', specs: { gpu: 'RTX 4060 Ti' }, rating: 4.5 },
  { id: 'comp-7', name: 'ASUS ROG Strix B760-F', category: 'Motherboard', type: 'component', price: 7600, short_desc: 'Материнська плата ATX для Intel процесорів', specs: { socket: 'LGA1700', form_factor: 'ATX' }, rating: 4.5 },
  { id: 'comp-8', name: 'MSI MAG B650 Tomahawk', category: 'Motherboard', type: 'component', price: 6800, short_desc: 'Материнська плата для AMD AM5', specs: { socket: 'AM5', form_factor: 'ATX' }, rating: 4.4 },
  { id: 'comp-9', name: 'Corsair Vengeance 32GB DDR5', category: 'RAM', type: 'component', price: 5600, short_desc: 'Швидка та надійна оперативна памʼять', specs: { ram: '32 GB DDR5' }, rating: 4.6 },
  { id: 'comp-10', name: 'G.Skill Trident Z5 32GB DDR5', category: 'RAM', type: 'component', price: 5800, short_desc: 'Високочастотна RGB памʼять для ентузіастів', specs: { ram: '32 GB DDR5' }, rating: 4.7 },
  { id: 'comp-11', name: 'Samsung 970 EVO Plus 1TB NVMe', category: 'Storage', type: 'component', price: 2800, short_desc: 'Накопичувач NVMe зі швидким читанням/записом', specs: { storage: '1TB NVMe SSD' }, rating: 4.5 },
  { id: 'comp-12', name: 'Samsung 980 PRO 2TB NVMe', category: 'Storage', type: 'component', price: 7200, short_desc: 'NVMe Gen4 для максимальних швидкостей', specs: { storage: '2TB NVMe SSD' }, rating: 4.8 },
  { id: 'comp-13', name: 'Seagate 2TB HDD', category: 'Storage', type: 'component', price: 1200, short_desc: 'Великий обсяг для зберігання даних', specs: { storage: '2TB HDD' }, rating: 4.0 },
  { id: 'comp-14', name: 'Cooler Master Hyper 212', category: 'Cooler', type: 'component', price: 900, short_desc: 'Популярне повітряне охолодження для CPU', specs: { type: 'Air' }, rating: 4.1 },
  { id: 'comp-15', name: 'NZXT Kraken X63', category: 'Cooler', type: 'component', price: 5200, short_desc: 'Система рідинного охолодження 280mm', specs: { type: 'AIO', radiator: '280mm' }, rating: 4.6 },
  { id: 'comp-16', name: 'Cooler Master 750W PSU', category: 'PSU', type: 'component', price: 3100, short_desc: 'Блок живлення з сертифікацією 80+ Gold', specs: {}, rating: 4.3 },
  { id: 'comp-17', name: 'Seasonic Focus GX-850 850W', category: 'PSU', type: 'component', price: 4200, short_desc: 'Надійний 850W блок живлення 80+ Gold', specs: {}, rating: 4.8 },
  { id: 'comp-18', name: 'NZXT H510 Case', category: 'Case', type: 'component', price: 2200, short_desc: 'Елегантний корпус з гарною вентиляцією', specs: {}, rating: 4.2 },
  { id: 'comp-19', name: 'Lian Li O11 Dynamic', category: 'Case', type: 'component', price: 4600, short_desc: 'Популярний корпус для збірок з AIO', specs: {}, rating: 4.6 },
  { id: 'comp-20', name: 'Noctua NF-A12x25 PWM', category: 'Fan', type: 'component', price: 600, short_desc: 'Надійний 120mm вентилятор з високим статичним тиском', specs: {}, rating: 4.8 },
  { id: 'comp-21', name: 'Thermal Grizzly Kryonaut 1g', category: 'Thermal Paste', type: 'component', price: 250, short_desc: 'Професійна термопаста для максимального тепловідводу', specs: {}, rating: 4.9 },
  { id: 'comp-22', name: 'ASUS TUF Gaming RTX 4080', category: 'GPU', type: 'component', price: 98000, short_desc: 'Потужна відеокарта для 4K і креативних задач', specs: { gpu: 'RTX 4080' }, rating: 4.9 },
  { id: 'comp-23', name: 'PCIe WiFi 6E Card', category: 'Network', type: 'component', price: 1500, short_desc: 'Безпровідна карта з підтримкою WiFi 6E', specs: {}, rating: 4.2 },
  { id: 'comp-24', name: 'M.2 Heatsink', category: 'Accessory', type: 'component', price: 300, short_desc: 'Алюмінієвий радіатор для NVMe SSD', specs: {}, rating: 4.1 },
  { id: 'comp-25', name: 'RGB Controller', category: 'Accessory', type: 'component', price: 450, short_desc: 'Контролер для RGB-стрічок і вентиляторів', specs: {}, rating: 4.0 },

  // Ready builds (10) — type 'pc' to match Catalog filter
  { id: 'pc-1', name: 'STRATUM Entry RTX 4060 Ti', type: 'pc', price: 42000, short_desc: 'Бюджетна ігрова збірка для 1080p', specs: { cpu: 'Intel Core i5-14600K', gpu: 'RTX 4060 Ti', ram: '16 GB DDR5', storage: '1TB NVMe SSD' }, rating: 4.6, featured: true },
  { id: 'pc-2', name: 'STRATUM Vortex RTX 4070 Super', type: 'pc', price: 62000, short_desc: 'Оптимальна збірка для 1440p', specs: { cpu: 'AMD Ryzen 7 7800X3D', gpu: 'RTX 4070 Super', ram: '32 GB DDR5', storage: '1TB NVMe SSD' }, rating: 4.9, featured: true },
  { id: 'pc-3', name: 'STRATUM Phantom RTX 5080', type: 'pc', price: 95000, short_desc: 'Флагман для 4K', specs: { cpu: 'Intel Core i9-14900K', gpu: 'RTX 5080', ram: '64 GB DDR5', storage: '2TB NVMe SSD' }, rating: 5 },
  { id: 'pc-4', name: 'STRATUM Apex RTX 5090', type: 'pc', price: 165000, short_desc: 'Без компромісів — максимум продуктивності', specs: { cpu: 'Intel Core i9-14900K', gpu: 'RTX 5090', ram: '128 GB DDR5', storage: '4TB NVMe SSD' }, rating: 5 },
  { id: 'pc-5', name: 'WORKSTATION Pro 5800X3D', type: 'pc', price: 88000, short_desc: 'Станція для монтажу та 3D задач', specs: { cpu: 'AMD Ryzen 9 5900X', gpu: 'RTX 4080', ram: '64 GB DDR4', storage: '2TB NVMe SSD' }, rating: 4.8 },
  { id: 'pc-6', name: 'STREAMER Mini ITX', type: 'pc', price: 54000, short_desc: 'Компактна збірка для стрімів та роботи', specs: { cpu: 'Intel Core i7-13700K', gpu: 'RTX 4070', ram: '32 GB DDR5', storage: '1TB NVMe SSD' }, rating: 4.5 },
  { id: 'pc-7', name: 'CREATOR Studio RTX 4080', type: 'pc', price: 120000, short_desc: 'Потужна збірка для креаторів', specs: { cpu: 'AMD Ryzen 9 7950X', gpu: 'RTX 4080', ram: '64 GB DDR5', storage: '2TB NVMe SSD' }, rating: 4.9 },
  { id: 'pc-8', name: 'OFFICE Basic', type: 'pc', price: 22000, short_desc: 'Надійна офісна машина для повсякденних задач', specs: { cpu: 'Intel Core i3', gpu: 'Integrated', ram: '8 GB', storage: '500GB SSD' }, rating: 4.0 },
  { id: 'pc-9', name: 'GAMER Lite', type: 'pc', price: 30000, short_desc: 'Доступна збірка для початківців-геймерів', specs: { cpu: 'AMD Ryzen 5', gpu: 'RTX 3050', ram: '16 GB', storage: '1TB SSD' }, rating: 4.2 },
  { id: 'pc-10', name: 'HYBRID Creator-Gamer', type: 'pc', price: 78000, short_desc: 'Баланс між створенням контенту і іграми', specs: { cpu: 'Intel Core i7', gpu: 'RTX 4070', ram: '32 GB', storage: '2TB NVMe SSD' }, rating: 4.7 },
];

export default mockProducts;
