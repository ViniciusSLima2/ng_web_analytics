export function referrersEffectProcessData(list: any[]) {
  // Agrupar por source somando visits
  const map = new Map<string, number>();
  list.forEach((r: any) => map.set(r.source, (map.get(r.source) ?? 0) + (r.visits ?? 0)));

  // Converter para arrays ordenadas por visitas desc (opcional)
  const entries = Array.from(map.entries())
    .map(([source, visits]) => ({ source, visits }))
    .sort((a, b) => b.visits - a.visits);

  const labels = entries.map((e) => e.source);
  const data = entries.map((e) => e.visits);

  // cores simples (pode customizar)
  const backgroundColor = labels.map(
    (_, i) => `rgba(${(50 + i * 30) % 255}, ${(99 + i * 50) % 255}, ${(200 - i * 20) % 255}, 0.8)`
  );
  return {
    labels,
    datasets: [
      {
        label: 'Visits',
        data,
        backgroundColor,
      },
    ],
  }
}

