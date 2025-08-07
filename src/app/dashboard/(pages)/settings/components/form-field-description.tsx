import React from "react";

function FormFieldDescription({ description }: { description: string }) {
  return <span className="text-muted-foreground text-sm">{description}</span>;
}

export default FormFieldDescription;
