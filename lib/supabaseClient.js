import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ovhzgksfkntdzhepsgil.supabase.co"; // Reemplaza con tu URL de Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aHpna3Nma250ZHpoZXBzZ2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MDMwMDksImV4cCI6MjA1ODA3OTAwOX0.G6aGeyOg_XzCJvB0XYNZ1DJ17Aewp9P8hFdZP67s9s4"; // Reemplaza con tu clave pública
export const supabase = createClient(supabaseUrl, supabaseKey);