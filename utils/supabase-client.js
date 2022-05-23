import { createClient } from '@supabase/supabase-js';

const API_URL = process.env.SUPABASE_API_URL;
const API_KEY = process.env.SUPABASE_API_KEY;

export const client = createClient(API_URL, API_KEY);
