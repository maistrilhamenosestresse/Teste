CREATE TABLE IF NOT EXISTS public."agendas" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  "title" text NOT NULL,
  "date" date NOT NULL,
  "price" numeric NOT NULL,
  "description" text NOT NULL,
  "meeting_point" text,
  "images" text[] DEFAULT '{}'::text[],
  "video_url" text,
  "flyer_url" text,
  "views" integer DEFAULT 0,
  "max_capacity" integer DEFAULT 15,
  "requirements" text,
  "duration_hours" numeric,
  "distance_km" numeric,
  "difficulty" text DEFAULT 'medium'::text,
  "accepted_payment_methods" text[] DEFAULT '{PIX,CREDIT_CARD,BOLETO}'::text[]
);

CREATE TABLE IF NOT EXISTS public."global_stats" (
  "id" integer NOT NULL,
  "total_views" integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public."clients" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "full_name" text NOT NULL,
  "cpf" text,
  "rg" text,
  "birth_date" date,
  "phone" text,
  "emergency_contact_name" text,
  "emergency_contact_phone" text,
  "health_notes" text,
  "photo_url" text,
  "created_at" timestamp without time zone DEFAULT now(),
  "email" text,
  "image_authorization" boolean DEFAULT true,
  "signature_url" text
);

CREATE TABLE IF NOT EXISTS public."avaliacoes" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "rating" integer NOT NULL,
  "comment" text NOT NULL,
  "agenda_id" uuid,
  "approved" boolean DEFAULT true,
  "created_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public."whatsapp_messages" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "client_name" text,
  "client_phone" text NOT NULL,
  "message" text NOT NULL,
  "status" text DEFAULT 'pending'::text,
  "error_log" text,
  "scheduled_for" timestamp with time zone DEFAULT now(),
  "created_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public."trilha_custos" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  "agenda_id" uuid NOT NULL,
  "item_nome" text NOT NULL,
  "valor_custo" numeric NOT NULL,
  "data_pagamento" date
);

CREATE TABLE IF NOT EXISTS public."reservas" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  "agenda_id" uuid NOT NULL,
  "client_id" uuid NOT NULL,
  "status_pagamento" text DEFAULT 'pendente'::text,
  "valor_pago" numeric,
  "metodo_pagamento" text,
  "nsu_transacao" text
);

CREATE TABLE IF NOT EXISTS public."notificacoes" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  "reserva_id" uuid,
  "mensagem" text NOT NULL,
  "lida" boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS public."coupon_redemptions" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "campaign_id" text NOT NULL,
  "ip_address" text,
  "user_agent" text,
  "redeemed_at" timestamp with time zone DEFAULT now(),
  "person_name" text
);

CREATE TABLE IF NOT EXISTS public."bolao_apostas" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone DEFAULT now(),
  "nome" text NOT NULL,
  "whatsapp" text NOT NULL,
  "placar_brasil" integer NOT NULL,
  "placar_rival" integer NOT NULL,
  "rival_nome" text NOT NULL
);

CREATE TABLE IF NOT EXISTS public."settings" (
  "id" integer NOT NULL DEFAULT 1,
  "maintenance_mode" boolean DEFAULT false
);

