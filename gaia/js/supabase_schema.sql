-- 1. Criar a tabela de produtos se não existir
CREATE TABLE IF NOT EXISTS produtos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    weight TEXT,
    dimensions TEXT,
    retail_price DECIMAL(10,2) NOT NULL,
    wholesale_price DECIMAL(10,2) NOT NULL,
    min_wholesale_quantity INTEGER DEFAULT 1,
    stock INTEGER DEFAULT 0,
    image TEXT
);

-- 2. Adicionar a coluna created_at se ela não existir (para tabelas antigas)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='produtos' AND column_name='created_at') THEN
        ALTER TABLE produtos ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL;
    END IF;
END $$;

-- 3. Habilitar RLS (Row Level Security)
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

-- 4. Limpar políticas existentes para evitar erros de duplicidade
DROP POLICY IF EXISTS "Permitir leitura pública de produtos" ON produtos;
DROP POLICY IF EXISTS "Permitir inserção para usuários autenticados" ON produtos;
DROP POLICY IF EXISTS "Permitir atualização para usuários autenticados" ON produtos;
DROP POLICY IF EXISTS "Permitir exclusão para usuários autenticados" ON produtos;

-- 5. Criar novas políticas com permissões corretas
CREATE POLICY "Permitir leitura pública de produtos" 
ON produtos FOR SELECT 
USING (true);

CREATE POLICY "Permitir inserção para usuários autenticados" 
ON produtos FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Permitir atualização para usuários autenticados" 
ON produtos FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir exclusão para usuários autenticados" 
ON produtos FOR DELETE 
TO authenticated 
USING (true);

-- 6. Garantir permissões básicas para as roles padrão do Supabase
GRANT ALL ON TABLE produtos TO authenticated;
GRANT SELECT ON TABLE produtos TO anon;
GRANT ALL ON TABLE produtos TO service_role;
