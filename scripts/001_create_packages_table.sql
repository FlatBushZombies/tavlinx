-- Create packages table for tracking shipments
CREATE TABLE IF NOT EXISTS public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id VARCHAR(20) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50) NOT NULL,
  origin VARCHAR(100) DEFAULT 'Dubai, UAE',
  destination VARCHAR(100) DEFAULT 'Harare, Zimbabwe',
  transport_type VARCHAR(50) DEFAULT 'Air', -- 'Air', 'Sea', 'Air Dangerous Goods'
  batch_number VARCHAR(50),
  ctn_quantity INTEGER DEFAULT 1,
  weight DECIMAL(10, 2),
  price DECIMAL(10, 2),
  currency VARCHAR(10) DEFAULT 'USD',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create package events table for tracking status updates
CREATE TABLE IF NOT EXISTS public.package_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
  status VARCHAR(100) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  event_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_packages_tracking_id ON public.packages(tracking_id);
CREATE INDEX IF NOT EXISTS idx_package_events_package_id ON public.package_events(package_id);

-- Enable Row Level Security
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for packages - allow authenticated users (admins) full access
CREATE POLICY "packages_select_all" ON public.packages FOR SELECT USING (true);
CREATE POLICY "packages_insert_auth" ON public.packages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "packages_update_auth" ON public.packages FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "packages_delete_auth" ON public.packages FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS Policies for package_events - allow authenticated users (admins) full access
CREATE POLICY "package_events_select_all" ON public.package_events FOR SELECT USING (true);
CREATE POLICY "package_events_insert_auth" ON public.package_events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "package_events_update_auth" ON public.package_events FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "package_events_delete_auth" ON public.package_events FOR DELETE USING (auth.uid() IS NOT NULL);

-- Function to generate unique tracking ID
CREATE OR REPLACE FUNCTION generate_tracking_id()
RETURNS VARCHAR(20)
LANGUAGE plpgsql
AS $$
DECLARE
  new_id VARCHAR(20);
  exists_count INTEGER;
BEGIN
  LOOP
    -- Generate format: TVX-YYYYMMDD-XXXX (e.g., TVX-20260330-A7B2)
    new_id := 'TVX-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 4));
    
    SELECT COUNT(*) INTO exists_count FROM public.packages WHERE tracking_id = new_id;
    
    IF exists_count = 0 THEN
      RETURN new_id;
    END IF;
  END LOOP;
END;
$$;

-- Trigger to auto-generate tracking_id on insert if not provided
CREATE OR REPLACE FUNCTION set_tracking_id()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.tracking_id IS NULL OR NEW.tracking_id = '' THEN
    NEW.tracking_id := generate_tracking_id();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_set_tracking_id ON public.packages;
CREATE TRIGGER trigger_set_tracking_id
  BEFORE INSERT ON public.packages
  FOR EACH ROW
  EXECUTE FUNCTION set_tracking_id();

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_update_updated_at ON public.packages;
CREATE TRIGGER trigger_update_updated_at
  BEFORE UPDATE ON public.packages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
