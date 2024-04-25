import { useInputControl } from "@conform-to/react";
import {
  Checkbox,
  type CheckboxProps,
} from "components/shadcn-ui/checkbox.tsx";
import { Input } from "components/shadcn-ui/input.tsx";
import { Label } from "components/shadcn-ui/label.tsx";
import type React from "react";
import { useId, useRef } from "react";
import { cn } from "utils/utils.ts";

export type ListOfErrors = Array<string | null | undefined> | null | undefined;

export function ErrorList({
  id,
  errors,
}: {
  errors?: ListOfErrors;
  id?: string;
}) {
  const errorsToRender = errors?.filter(Boolean);
  if (!errorsToRender?.length) return null;
  return (
    <ul id={id} data-testid={id} className="flex flex-col items-start gap-1">
      {errorsToRender.map((e) => (
        <li key={e} className="text-rouge text-[10px]">
          {e}
        </li>
      ))}
    </ul>
  );
}

export function Field({
  labelProps,
  inputProps,
  errors,
  className = "items-start flex flex-col gap-2",
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  errors?: ListOfErrors;
  className?: string;
}) {
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div className={cn(className, "relative")}>
      <Label htmlFor={id} {...labelProps} className="text-start" />
      <div className="relative w-full">
        <Input
          id={id}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          {...inputProps}
        />
      </div>

      {errorId ? (
        <div className="min-h-[32px] px-2 pb-3 pt-0">
          {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
        </div>
      ) : null}
    </div>
  );
}

export function CheckboxField({
  labelProps,
  buttonProps,
  errors,
  className = "items-start flex flex-col gap-2",
}: {
  labelProps: JSX.IntrinsicElements["label"];
  buttonProps: CheckboxProps & {
    form: string;
    value?: string;
    name: string;
  };
  errors?: ListOfErrors;
  className?: string;
}) {
  const fallbackId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { key, defaultChecked, ...checkboxProps } = buttonProps;
  const checkedValue = buttonProps.value ?? "on";
  // To emulate native events that Conform listen to:
  // See https://conform.guide/integrations
  const input = useInputControl({
    formId: buttonProps.form,
    name: buttonProps.name,
    initialValue: defaultChecked ? checkedValue : undefined,
  });
  const id = buttonProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Checkbox
          {...checkboxProps}
          id={id}
          ref={buttonRef}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          checked={input.value === checkedValue}
          onCheckedChange={(state) => {
            input?.change(state.valueOf() ? checkedValue : "");
            buttonProps.onCheckedChange?.(state);
          }}
          onFocus={(event) => {
            input?.focus();
            buttonProps.onFocus?.(event);
          }}
          onBlur={(event) => {
            input?.blur();
            buttonProps.onBlur?.(event);
          }}
          type="button"
        />
        <label
          htmlFor={id}
          {...labelProps}
          className="text-midnightblue self-center text-sm"
        />
      </div>
      {errorId ? (
        <div className="px-4 pb-3 pt-1">
          {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
        </div>
      ) : null}
    </div>
  );
}
