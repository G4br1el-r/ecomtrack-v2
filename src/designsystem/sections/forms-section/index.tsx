import { Percent } from "lucide-react";

import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/animate-ui/components/radix/radio-group";
import { Switch } from "@/components/animate-ui/components/radix/switch";
import { SearchField } from "@/components/Modules/Core/DesignSystem/search-field";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";

import { Showcase } from "../../components/showcase";
import { Specimen } from "../../components/specimen";
import { BrandFormDemo } from "../../demos/brand-form-demo";
import { ChannelComboboxDemo } from "../../demos/channel-combobox-demo";
import { MarginSliderDemo } from "../../demos/margin-slider-demo";
import { PeriodFieldDemo } from "../../demos/period-field-demo";

export function FormsSection() {
  return (
    <Showcase
      id="formularios"
      title="Formulários"
      description="React Hook Form + Zod + Field do shadcn. Label acima, descrição abaixo, erro no lugar da descrição. Campos com 36px."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Specimen
          title="Formulário validado"
          description="Zod no schema, erro aparece ao sair do campo"
          className="block"
        >
          <BrandFormDemo />
        </Specimen>
        <Specimen title="Campos de texto" className="block">
          <FieldGroup>
            <Field data-invalid>
              <FieldLabel htmlFor="produto-sku">SKU</FieldLabel>
              <Input id="produto-sku" defaultValue="PSN 100" aria-invalid />
              <FieldError>SKU não pode conter espaços.</FieldError>
            </Field>
            <Field data-disabled>
              <FieldLabel htmlFor="produto-id">ID interno</FieldLabel>
              <Input id="produto-id" defaultValue="prd_8f2a1c" disabled />
            </Field>
            <Field>
              <FieldLabel htmlFor="produto-obs">Observações</FieldLabel>
              <Textarea id="produto-obs" placeholder="Anotações internas" />
            </Field>
          </FieldGroup>
        </Specimen>
        <Specimen
          title="Complementos e seleção"
          description="Seleção usa combobox (Popover animado + Command)"
          className="block"
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="busca">Busca</FieldLabel>
              <SearchField id="busca" placeholder="Buscar por nome, SKU ou pedido..." />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="preco">Preço de venda</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>R$</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput id="preco" inputMode="decimal" placeholder="0,00" />
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="margem-input">Margem</FieldLabel>
                <InputGroup>
                  <InputGroupInput id="margem-input" inputMode="decimal" placeholder="0" />
                  <InputGroupAddon align="inline-end">
                    <Percent aria-hidden="true" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="canal">Canal de venda</FieldLabel>
              <ChannelComboboxDemo id="canal" />
            </Field>
            <Field>
              <FieldLabel>Período</FieldLabel>
              <PeriodFieldDemo />
            </Field>
            <MarginSliderDemo />
          </FieldGroup>
        </Specimen>
        <Specimen title="Escolhas" description="Checkbox, radio e switch animados" className="block">
          <FieldGroup>
            <FieldSet>
              <FieldLegend variant="label">Notificações</FieldLegend>
              <Field orientation="horizontal">
                <Checkbox id="notif-pedido" defaultChecked />
                <FieldLabel htmlFor="notif-pedido" className="font-normal">
                  Novo pedido
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="notif-estoque" />
                <FieldLabel htmlFor="notif-estoque" className="font-normal">
                  Estoque baixo
                </FieldLabel>
              </Field>
            </FieldSet>
            <FieldSet>
              <FieldLegend variant="label">Tipo de entrega</FieldLegend>
              <RadioGroup defaultValue="digital">
                <Field orientation="horizontal">
                  <RadioGroupItem value="digital" id="entrega-digital" />
                  <FieldLabel htmlFor="entrega-digital" className="font-normal">
                    Digital
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="fisica" id="entrega-fisica" />
                  <FieldLabel htmlFor="entrega-fisica" className="font-normal">
                    Física
                  </FieldLabel>
                </Field>
              </RadioGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="sync-auto">Sincronização automática</FieldLabel>
                <FieldDescription>Atualiza preço e estoque a cada alteração.</FieldDescription>
              </FieldContent>
              <Switch id="sync-auto" defaultChecked />
            </Field>
          </FieldGroup>
        </Specimen>
      </div>
    </Showcase>
  );
}
