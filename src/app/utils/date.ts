export function convertISOToDDMMYYYY(isoString: string): string{
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0'); // 18
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 09 (meses começam em 0)
    const year = date.getFullYear(); // 2025

    return `${day}/${month}/${year}`;
}

export function formatDateToYYYYMMDD(isoString: string): string {
  const date = new Date(isoString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}