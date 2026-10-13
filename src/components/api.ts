/** Frontend / research-backend contract. All scientific content is server supplied. */
export interface Experiment {
  id: string; program: string; title: string; material: string; gravity: string;
  oxygen: string | null; airflow: string | null; year: number | null;
  summary: string; source_id: string | null; source_url: string | null;
}
export interface ScientificLimitation {
  id: string;
  category: 'experimental_conditions' | 'data_coverage' | 'measurement_uncertainty' | 'methodology' | 'interpretation' | 'other';
  severity?: 'info' | 'caution' | 'critical';
  title: string;
  description: string;
  affected_experiment_ids?: string[];
  source_ids?: string[];
  source_urls?: string[];
}
export interface ComparisonResult {
  summary: string;
  items: { experiment_id: string; comparable: boolean; reason: string }[];
  limitations?: ScientificLimitation[];
  methodology?: string;
  sources?: { source_id: string; title: string; url: string | null }[];
  generated_at?: string;
}
export interface Answer {
  answer: string; limitations?: string;
  citations: { source_id: string; title: string; url: string | null }[];
}
const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
async function request<T>(path:string, options?:RequestInit):Promise<T>{
  if(!BASE) throw new Error('Research API is not configured. Set NEXT_PUBLIC_API_BASE_URL in .env.local.');
  const res = await fetch(`${BASE}${path}`, { ...options, headers: {'Content-Type':'application/json',...options?.headers} });
  if(!res.ok) throw new Error(`Research API returned ${res.status}. Check the backend service and CORS settings.`);
  return res.json() as Promise<T>;
}
export async function fetchExperiments():Promise<Experiment[]>{
  const result = await request<Experiment[]|{experiments:Experiment[]}>('/api/experiments');
  return Array.isArray(result)?result:result.experiments;
}
export function compareExperiments(ids:string[]):Promise<ComparisonResult>{
  return request('/api/compare',{method:'POST',body:JSON.stringify({experiment_ids:ids})});
}
export function askResearch(question:string,ids:string[]):Promise<Answer>{
  return request('/api/ask',{method:'POST',body:JSON.stringify({question,experiment_ids:ids})});
}
