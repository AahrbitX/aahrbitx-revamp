import { AnyFieldApi } from "@tanstack/react-form";

export function FieldError({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <p className="text-sm text-destructive my-2">
          {field.state.meta.errors.map((err) => err.message).join(",")}
        </p>
      ) : null}
    </>
  );
}
