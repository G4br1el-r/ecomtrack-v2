import type { ApiEndpointEntry } from "@/@types/Modules/Core/Api/api-endpoint-key";
import { Badge } from "@/components/ui/badge";
import { HTTP_METHOD_TONE } from "@/constants/Modules/Core/Shell/page-endpoints";

export function DevEndpointItem({ endpoint }: { endpoint: ApiEndpointEntry }) {
  const access = endpoint.isPublic
    ? "Pública"
    : (endpoint.component ?? (endpoint.page ? `Página ${endpoint.page}` : "Qualquer usuário logado"));
  return (
    <li className="flex items-start gap-2 rounded-md px-2 py-1.5">
      <Badge variant={HTTP_METHOD_TONE[endpoint.method]} className="mt-0.5 w-14 justify-center font-mono text-[10px]">
        {endpoint.method}
      </Badge>
      <div className="min-w-0 flex-1">
        <p className="truncate font-mono text-xs" title={endpoint.path}>
          {endpoint.path}
        </p>
        <p className="truncate text-muted-foreground text-xs">{endpoint.summary}</p>
        <p className="truncate text-[11px] text-muted-foreground/80">{access}</p>
      </div>
    </li>
  );
}
